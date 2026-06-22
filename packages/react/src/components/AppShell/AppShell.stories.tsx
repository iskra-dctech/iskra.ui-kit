import { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppHeader } from '../AppHeader/AppHeader.js';
import { Avatar } from '../Avatar/Avatar.js';
import { Badge } from '../Badge/Badge.js';
import { Button } from '../Button/Button.js';
import { DataList } from '../DataList/DataList.js';
import { Drawer } from '../Drawer/Drawer.js';
import { Icon } from '../Icon/Icon.js';
import { IconButton } from '../IconButton/IconButton.js';
import { Modal } from '../Modal/Modal.js';
import { Popover } from '../Popover/Popover.js';
import { SearchField } from '../SearchField/SearchField.js';
import { Sheet } from '../Sheet/Sheet.js';
import { Sidebar, NOTIFIER_NAV } from '../Sidebar/Sidebar.js';
import { Table, type TableColumn, type TableSort } from '../Table/Table.js';
import { Card } from '../Card/Card.js';

const meta = {
  title: 'Patterns/AppShell',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Reference composition — пример сборки продуктового экрана Notifier из примитивов (Sidebar, AppHeader, Table, Modal). Не отдельный компонент и не API по умолчанию: копируйте паттерн в своё приложение с нужными пресетами и контентом.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

interface Incident {
  id: string;
  severity: string;
  service: string;
  status: string;
}

const incidentColumns: TableColumn<Incident>[] = [
  {
    key: 'severity',
    header: 'Критичность',
    render: (r) => (
      <Badge variant={r.severity === 'critical' ? 'error' : 'warning'}>
        {r.severity === 'critical' ? 'Критический' : 'Предупреждение'}
      </Badge>
    ),
  },
  { key: 'id', header: 'ID инцидента', sortable: true },
  { key: 'service', header: 'Услуга / система', sortable: true },
  { key: 'status', header: 'Статус' },
];

const incidents: Incident[] = [
  {
    id: 'INC-2026-001245',
    severity: 'critical',
    service: 'Сбой резервного хранилища',
    status: 'Ожидает ACK',
  },
  {
    id: 'INC-2026-001242',
    severity: 'warning',
    service: 'Рост задержки API-шлюза',
    status: 'Отправлено',
  },
];

export const Desktop: Story = {
  parameters: {
    viewport: { defaultViewport: 'desktop1280' },
    docs: {
      description: {
        story:
          'Desktop shell: inline Sidebar, Table, Modal. Явное представление для ширины ≥ 768px.',
      },
    },
  },
  render: () => {
    const [page, setPage] = useState('incidents');
    const [modalOpen, setModalOpen] = useState(false);
    const [sort, setSort] = useState<TableSort | null>(null);
    const [notifOpen, setNotifOpen] = useState(false);

    const sorted = useMemo(() => {
      if (!sort) return incidents;
      return [...incidents].sort((a, b) => {
        const av = String(a[sort.key as keyof Incident] ?? '');
        const bv = String(b[sort.key as keyof Incident] ?? '');
        const cmp = av.localeCompare(bv);
        return sort.direction === 'asc' ? cmp : -cmp;
      });
    }, [sort]);

    return (
      <div style={{ display: 'flex', height: '100vh', background: 'var(--bg)' }}>
        <Sidebar
          groups={NOTIFIER_NAV}
          brand={
            <span className="isb-wmark" style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>
              ISKRA // УВЕДОМЛЕНИЯ
            </span>
          }
          collapsed={false}
          onToggle={() => undefined}
          activeItem={page}
          onNavigate={setPage}
          ariaLabel="Навигация Notifier"
        />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <AppHeader
            leading={
              <>
                <AppHeader.Nav
                  items={[
                    { id: 'platform', label: 'Искра' },
                    { id: 'notifier', label: 'Уведомления', current: true },
                    { id: 'incidents', label: 'Инциденты', current: page === 'incidents' },
                  ]}
                  onNavigate={setPage}
                />
                <AppHeader.Indicator dot="ok" mono>
                  ЯДРО СИНХРОНИЗИРОВАНО [v1.4.2]
                </AppHeader.Indicator>
              </>
            }
            center={
              <SearchField
                placeholder="Поиск по всем пространствам…"
                shortcut="⌘K"
                enableShortcut
                style={{ width: '100%', maxWidth: 320 }}
              />
            }
            trailing={
              <>
                <AppHeader.Actions>
                  <Popover
                    open={notifOpen}
                    onOpenChange={setNotifOpen}
                    trigger={
                      <IconButton
                        icon={<Icon name="bell" size={16} />}
                        aria-label="Уведомления"
                        variant="ghost"
                      />
                    }
                  >
                    <div
                      style={{
                        padding: 12,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                        minWidth: 300,
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: 11,
                          color: 'var(--fg3)',
                          letterSpacing: '0.08em',
                        }}
                      >
                        УВЕДОМЛЕНИЯ
                      </div>
                      <div style={{ fontSize: 12 }}>
                        <span style={{ color: 'var(--status-err)' }}>[Ошибка]</span> Ошибка доставки
                        в Telegram
                      </div>
                    </div>
                  </Popover>
                  <IconButton
                    icon={<Avatar name="Оператор UT-04" size="sm" status="online" />}
                    aria-label="Профиль"
                    variant="ghost"
                  />
                </AppHeader.Actions>
                <AppHeader.Text mono>РОЛЬ: ОПЕРАТОР (UT-04)</AppHeader.Text>
              </>
            }
          />
          <main style={{ flex: 1, padding: 24, overflow: 'auto' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
              }}
            >
              <h1 style={{ fontSize: 24, fontWeight: 600 }}>Реестр инцидентов</h1>
              <Button onClick={() => setModalOpen(true)}>+ Ручной инцидент</Button>
            </div>
            <Table
              columns={incidentColumns}
              data={sorted}
              getRowId={(r) => r.id}
              sort={sort}
              onSortChange={setSort}
            />
          </main>
        </div>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Ручной инцидент"
          description="Создание инцидента вне автоматического конвейера."
          footer={
            <>
              <Button variant="ghost" onClick={() => setModalOpen(false)}>
                Отмена
              </Button>
              <Button onClick={() => setModalOpen(false)}>Создать</Button>
            </>
          }
        >
          Укажите услугу, критичность и описание проблемы.
        </Modal>
      </div>
    );
  },
};

export const Compact: Story = {
  parameters: {
    viewport: { defaultViewport: 'compact375' },
    docs: {
      description: {
        story:
          'Compact shell: Drawer + Sidebar, DataList вместо Table, Sheet вместо Modal. Явный выбор представления — Table не превращается в карточки автоматически.',
      },
    },
  },
  render: () => {
    const [page, setPage] = useState('incidents');
    const [navOpen, setNavOpen] = useState(false);
    const [sheetOpen, setSheetOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          background: 'var(--bg)',
        }}
      >
        <Drawer open={navOpen} onOpenChange={setNavOpen} aria-label="Навигация Notifier">
          <Sidebar
            groups={NOTIFIER_NAV}
            brand={
              <span className="isb-wmark" style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>
                ISKRA // УВЕДОМЛЕНИЯ
              </span>
            }
            activeItem={page}
            onNavigate={(id) => {
              setPage(id);
              setNavOpen(false);
            }}
            ariaLabel="Навигация Notifier"
          />
        </Drawer>
        <AppHeader
          leading={
            <>
              <IconButton
                icon={<Icon name="menu" size={16} />}
                aria-label="Открыть навигацию"
                variant="ghost"
                onClick={() => setNavOpen(true)}
              />
              <span style={{ fontSize: 14, fontWeight: 600 }}>Инциденты</span>
            </>
          }
          trailing={
            <AppHeader.Actions>
              <Popover
                open={notifOpen}
                onOpenChange={setNotifOpen}
                trigger={
                  <IconButton
                    icon={<Icon name="bell" size={16} />}
                    aria-label="Уведомления"
                    variant="ghost"
                  />
                }
              >
                <div style={{ padding: 12, fontSize: 12 }}>Нет новых уведомлений</div>
              </Popover>
              <IconButton
                icon={<Avatar name="Оператор UT-04" size="sm" status="online" />}
                aria-label="Профиль"
                variant="ghost"
              />
            </AppHeader.Actions>
          }
        />
        <main style={{ flex: 1, padding: 16, overflow: 'auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <h1 style={{ fontSize: 18, fontWeight: 600 }}>Реестр</h1>
            <Button size="s" onClick={() => setSheetOpen(true)}>
              + Инцидент
            </Button>
          </div>
          <DataList
            items={incidents}
            getItemKey={(r) => r.id}
            aria-label="Инциденты"
            renderItem={(r) => (
              <Card padding="s">
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>{r.id}</span>
                  <Badge variant={r.severity === 'critical' ? 'error' : 'warning'}>
                    {r.severity === 'critical' ? 'Критический' : 'Предупреждение'}
                  </Badge>
                </div>
                <div style={{ marginTop: 6, fontSize: 13 }}>{r.service}</div>
                <div style={{ marginTop: 4, fontSize: 12, color: 'var(--fg2)' }}>{r.status}</div>
              </Card>
            )}
          />
        </main>
        <Sheet
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          title="Ручной инцидент"
          description="Создание инцидента вне автоматического конвейера."
          footer={
            <>
              <Button variant="ghost" onClick={() => setSheetOpen(false)}>
                Отмена
              </Button>
              <Button onClick={() => setSheetOpen(false)}>Создать</Button>
            </>
          }
        >
          Укажите услугу, критичность и описание проблемы.
        </Sheet>
      </div>
    );
  },
};
