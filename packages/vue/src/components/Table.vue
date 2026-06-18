<script lang="ts">
export type TableDensity = 'regular' | 'compact'
export type TableAlign = 'left' | 'right' | 'center'
export type SortDirection = 'asc' | 'desc'

export interface TableSort {
  key: string
  direction: SortDirection
}

export interface TableColumn {
  key: string
  header: string
  align?: TableAlign
  width?: number | string
  sortable?: boolean
  sortKey?: string
}
</script>

<script setup lang="ts" generic="T extends Record<string, unknown>">
import { computed } from 'vue'
import { cx } from '../utils/cx.js'
import Icon from './Icon.vue'

const props = withDefaults(
  defineProps<{
    columns: TableColumn[]
    data: T[]
    density?: TableDensity
    stickyHeader?: boolean
    loading?: boolean
    loadingRows?: number
    sort?: TableSort | null
    caption?: string
  }>(),
  {
    density: 'regular',
    stickyHeader: false,
    loading: false,
    loadingRows: 5,
    sort: null,
  },
)

const emit = defineEmits<{ sortChange: [sort: TableSort | null]; rowClick: [row: T, index: number] }>()

const tableCls = computed(() =>
  cx('ik-table', `ik-table-${props.density}`, props.stickyHeader && 'ik-table-sticky'),
)

const alignClass = (a?: TableAlign) =>
  a === 'right' ? 'ik-table-align-right' : a === 'center' ? 'ik-table-align-center' : undefined

function sortKey(col: TableColumn) {
  return col.sortKey ?? col.key
}

function ariaSort(col: TableColumn) {
  if (!col.sortable) return undefined
  const sk = sortKey(col)
  if (props.sort?.key !== sk) return 'none'
  return props.sort.direction === 'asc' ? 'ascending' : 'descending'
}

function handleSort(col: TableColumn) {
  if (!col.sortable) return
  const sk = sortKey(col)
  if (props.sort?.key !== sk) emit('sortChange', { key: sk, direction: 'asc' })
  else if (props.sort.direction === 'asc') emit('sortChange', { key: sk, direction: 'desc' })
  else emit('sortChange', null)
}
</script>

<template>
  <div class="ik-table-wrap">
    <table :class="tableCls">
      <caption v-if="caption">{{ caption }}</caption>
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            scope="col"
            :class="alignClass(col.align)"
            :style="col.width ? { width: typeof col.width === 'number' ? `${col.width}px` : col.width } : undefined"
            :aria-sort="ariaSort(col)"
          >
            <button
              v-if="col.sortable"
              type="button"
              class="ik-table-sort-btn"
              @click="handleSort(col)"
            >
              <span class="ik-table-th-inner">
                <span class="ik-table-th-label">{{ col.header }}</span>
                <span class="ik-table-sort-icons" aria-hidden="true">
                  <Icon
                    name="chevron-up"
                    :size="10"
                    :style="{ opacity: sort?.key === sortKey(col) && sort?.direction === 'asc' ? 1 : 0.35 }"
                  />
                  <Icon
                    name="chevron-down"
                    :size="10"
                    :style="{ opacity: sort?.key === sortKey(col) && sort?.direction === 'desc' ? 1 : 0.35 }"
                  />
                </span>
              </span>
            </button>
            <span v-else class="ik-table-th-inner">
              <span class="ik-table-th-label">{{ col.header }}</span>
              <span v-if="$slots[`filter-${col.key}`]" class="ik-table-th-filter">
                <slot :name="`filter-${col.key}`" />
              </span>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="loading">
          <tr v-for="r in loadingRows" :key="`sk-${r}`">
            <td v-for="col in columns" :key="col.key" :class="alignClass(col.align)">
              <div class="ik-skeleton ik-skeleton-text" aria-hidden="true" />
            </td>
          </tr>
        </template>
        <tr v-else-if="!data.length">
          <td class="ik-table-state" :colspan="columns.length">
            <slot name="empty" />
          </td>
        </tr>
        <tr
          v-for="(row, i) in data"
          v-else
          :key="String(row.id ?? i)"
          @click="emit('rowClick', row, i)"
        >
          <td v-for="col in columns" :key="col.key" :class="alignClass(col.align)">
            <slot :name="`cell-${col.key}`" :row="row" :index="i">
              {{ row[col.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
