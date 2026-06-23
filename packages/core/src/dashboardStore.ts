import {
  createEmptyDashboard,
  migrateDashboardConfig,
  type DashboardConfig,
  type DashboardSummary,
} from './dashboard.js';

/** Persistence adapter for dashboard configurations. */
export interface DashboardStore {
  load(dashboardId: string): Promise<DashboardConfig | null>;
  save(config: DashboardConfig): Promise<void>;
  list(): Promise<DashboardSummary[]>;
  remove?(dashboardId: string): Promise<void>;
}

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  key(index: number): string | null;
  readonly length: number;
}

export interface LocalStorageDashboardStoreOptions {
  /** Prefix for localStorage keys, e.g. `iskra.dashboard`. */
  keyPrefix?: string;
  storage?: StorageLike;
}

const DEFAULT_PREFIX = 'iskra.dashboard';

function configKey(prefix: string, id: string) {
  return `${prefix}:${id}`;
}

function indexKey(prefix: string) {
  return `${prefix}:__index__`;
}

function readIndex(storage: StorageLike, prefix: string): DashboardSummary[] {
  const raw = storage.getItem(indexKey(prefix));
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is DashboardSummary =>
        typeof item === 'object' &&
        item !== null &&
        typeof (item as DashboardSummary).id === 'string' &&
        typeof (item as DashboardSummary).name === 'string' &&
        typeof (item as DashboardSummary).updatedAt === 'string',
    );
  } catch {
    return [];
  }
}

function writeIndex(storage: StorageLike, prefix: string, index: DashboardSummary[]) {
  storage.setItem(indexKey(prefix), JSON.stringify(index));
}

function upsertSummary(index: DashboardSummary[], config: DashboardConfig): DashboardSummary[] {
  const summary: DashboardSummary = {
    id: config.id,
    name: config.name,
    updatedAt: config.updatedAt,
  };
  const existing = index.findIndex((item) => item.id === config.id);
  if (existing === -1) return [...index, summary];
  const next = [...index];
  next[existing] = summary;
  return next;
}

function removeSummary(index: DashboardSummary[], id: string): DashboardSummary[] {
  return index.filter((item) => item.id !== id);
}

/**
 * Browser LocalStorage-backed dashboard store.
 * Suitable for single-device personalization; use API store for cross-device sync.
 */
export function createLocalStorageDashboardStore(
  options: LocalStorageDashboardStoreOptions = {},
): DashboardStore {
  const prefix = options.keyPrefix ?? DEFAULT_PREFIX;
  const storage =
    options.storage ??
    (typeof globalThis !== 'undefined' && 'localStorage' in globalThis
      ? globalThis.localStorage
      : null);

  if (!storage) {
    const memory = new Map<string, string>();
    const memStorage: StorageLike = {
      get length() {
        return memory.size;
      },
      getItem(key: string) {
        return memory.get(key) ?? null;
      },
      key(index: number) {
        return [...memory.keys()][index] ?? null;
      },
      removeItem(key: string) {
        memory.delete(key);
      },
      setItem(key: string, value: string) {
        memory.set(key, value);
      },
    };
    return createLocalStorageDashboardStore({ ...options, storage: memStorage });
  }

  return {
    async load(dashboardId) {
      const raw = storage.getItem(configKey(prefix, dashboardId));
      if (!raw) return null;
      try {
        const parsed: unknown = JSON.parse(raw);
        return migrateDashboardConfig(parsed);
      } catch {
        return null;
      }
    },

    async save(config) {
      storage.setItem(configKey(prefix, config.id), JSON.stringify(config));
      const index = readIndex(storage, prefix);
      writeIndex(storage, prefix, upsertSummary(index, config));
    },

    async list() {
      return readIndex(storage, prefix);
    },

    async remove(dashboardId) {
      storage.removeItem(configKey(prefix, dashboardId));
      const index = readIndex(storage, prefix);
      writeIndex(storage, prefix, removeSummary(index, dashboardId));
    },
  };
}

export interface ApiDashboardStoreOptions {
  /** Base URL for dashboard API, e.g. `/api/v1/dashboards`. */
  baseUrl: string;
  /** Custom fetch implementation (defaults to global fetch). */
  fetcher?: typeof fetch;
  /** Optional auth headers for API requests. */
  getHeaders?: () => Record<string, string> | Promise<Record<string, string>>;
}

/**
 * HTTP API dashboard store for cross-device synchronization.
 *
 * Expected backend contract:
 * - `GET {baseUrl}` → `DashboardSummary[]`
 * - `GET {baseUrl}/{id}` → `DashboardConfig`
 * - `PUT {baseUrl}/{id}` → body `DashboardConfig`
 * - `DELETE {baseUrl}/{id}` → 204
 */
export function createApiDashboardStore(options: ApiDashboardStoreOptions): DashboardStore {
  const fetcher = options.fetcher ?? globalThis.fetch.bind(globalThis);

  const withHeaders = async (init?: RequestInit): Promise<RequestInit> => {
    const extra = options.getHeaders ? await options.getHeaders() : {};
    return {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...extra,
        ...init?.headers,
      },
    };
  };

  return {
    async load(dashboardId) {
      const res = await fetcher(
        `${options.baseUrl}/${encodeURIComponent(dashboardId)}`,
        await withHeaders(),
      );
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`Failed to load dashboard: ${res.status}`);
      const raw: unknown = await res.json();
      const config = migrateDashboardConfig(raw);
      if (!config) throw new Error('Invalid dashboard payload from API');
      return config;
    },

    async save(config) {
      const res = await fetcher(
        `${options.baseUrl}/${encodeURIComponent(config.id)}`,
        await withHeaders({
          method: 'PUT',
          body: JSON.stringify(config),
        }),
      );
      if (!res.ok) throw new Error(`Failed to save dashboard: ${res.status}`);
    },

    async list() {
      const res = await fetcher(options.baseUrl, await withHeaders());
      if (!res.ok) throw new Error(`Failed to list dashboards: ${res.status}`);
      const raw: unknown = await res.json();
      if (!Array.isArray(raw)) return [];
      return raw.filter(
        (item): item is DashboardSummary =>
          typeof item === 'object' &&
          item !== null &&
          typeof (item as DashboardSummary).id === 'string' &&
          typeof (item as DashboardSummary).name === 'string' &&
          typeof (item as DashboardSummary).updatedAt === 'string',
      );
    },

    async remove(dashboardId) {
      const res = await fetcher(
        `${options.baseUrl}/${encodeURIComponent(dashboardId)}`,
        await withHeaders({ method: 'DELETE' }),
      );
      if (!res.ok && res.status !== 404) {
        throw new Error(`Failed to remove dashboard: ${res.status}`);
      }
    },
  };
}

export { createEmptyDashboard };
