import { useMemo, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { getNotifierNav } from '@iskra-ui/core'
import { useIskraLocale } from '../../i18n/useIskraLocale.js'
import { useStoryT } from '../../storybook/useStoryT.js'
import { useDemoIncidents } from '../../storybook/useDemoIncidents.js'
import { AppHeader } from '../AppHeader/AppHeader.js'
import { Avatar } from '../Avatar/Avatar.js'
import { Button } from '../Button/Button.js'
import { DataList } from '../DataList/DataList.js'
import { Drawer } from '../Drawer/Drawer.js'
import { Icon } from '../Icon/Icon.js'
import { IconButton } from '../IconButton/IconButton.js'
import { Modal } from '../Modal/Modal.js'
import { Popover } from '../Popover/Popover.js'
import { SearchField } from '../SearchField/SearchField.js'
import { Sheet } from '../Sheet/Sheet.js'
import { Sidebar } from '../Sidebar/Sidebar.js'
import { Table, type TableSort } from '../Table/Table.js'
import { Card } from '../Card/Card.js'

const meta = {
  title: 'Patterns/AppShell',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Reference composition — example Notifier product screen built from primitives (Sidebar, AppHeader, Table, Modal). Not a standalone component or default API: copy the pattern into your app with the presets and content you need.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function ManualIncidentForm({
  onClose,
  t,
}: {
  onClose: () => void
  t: ReturnType<typeof useStoryT>
}) {
  return (
    <>
      <Button variant="ghost" onClick={onClose}>
        {t('common.cancel')}
      </Button>
      <Button onClick={onClose}>{t('demo.labels.create')}</Button>
    </>
  )
}

export const Desktop: Story = {
  parameters: {
    viewport: { defaultViewport: 'desktop1280' },
    docs: {
      description: {
        story: 'Desktop shell: inline Sidebar, Table, Modal. Explicit layout for width ≥ 768px.',
      },
    },
  },
  render: () => {
    const t = useStoryT()
    const { locale } = useIskraLocale()
    const { incidents, columns, renderSeverityBadge } = useDemoIncidents()
    const notifierNav = useMemo(() => getNotifierNav(locale), [locale])
    const [page, setPage] = useState('incidents')
    const [modalOpen, setModalOpen] = useState(false)
    const [sort, setSort] = useState<TableSort | null>(null)
    const [notifOpen, setNotifOpen] = useState(false)

    const sorted = useMemo(() => {
      if (!sort) return incidents
      return [...incidents].sort((a, b) => {
        const av = String(a[sort.key as keyof typeof a] ?? '')
        const bv = String(b[sort.key as keyof typeof b] ?? '')
        const cmp = av.localeCompare(bv)
        return sort.direction === 'asc' ? cmp : -cmp
      })
    }, [incidents, sort])

    return (
      <div style={{ display: 'flex', height: '100vh', background: 'var(--bg)' }}>
        <Sidebar
          groups={notifierNav}
          brand={
            <span className="isb-wmark" style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>
              {t('demo.labels.iskraNotifications')}
            </span>
          }
          collapsed={false}
          onToggle={() => undefined}
          activeItem={page}
          onNavigate={setPage}
          ariaLabel={t('demo.labels.notifierNav')}
        />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <AppHeader
            leading={
              <>
                <AppHeader.Nav
                  items={[
                    { id: 'platform', label: t('demo.labels.platform') },
                    { id: 'notifier', label: t('demo.labels.notifier'), current: true },
                    { id: 'incidents', label: t('demo.labels.incidents'), current: page === 'incidents' },
                  ]}
                  onNavigate={setPage}
                />
                <AppHeader.Indicator dot="ok" mono>
                  {t('demo.labels.coreSynced')}
                </AppHeader.Indicator>
              </>
            }
            center={
              <SearchField
                placeholder={t('demo.labels.searchAllSpaces')}
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
                        aria-label={t('a11y.notifications')}
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
                        {t('demo.labels.notificationsHeader')}
                      </div>
                      <div style={{ fontSize: 12 }}>
                        <span style={{ color: 'var(--status-err)' }}>{t('demo.labels.errorTag')}</span>{' '}
                        {t('demo.labels.deliveryError')}
                      </div>
                    </div>
                  </Popover>
                  <IconButton
                    icon={<Avatar name={t('demo.labels.operatorAvatar')} size="sm" status="online" />}
                    aria-label={t('demo.labels.profile')}
                    variant="ghost"
                  />
                </AppHeader.Actions>
                <AppHeader.Text mono>{t('demo.labels.roleOperator')}</AppHeader.Text>
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
              <h1 style={{ fontSize: 24, fontWeight: 600 }}>{t('demo.labels.incidentRegistry')}</h1>
              <Button onClick={() => setModalOpen(true)}>
                {t('demo.labels.createPrefix')} {t('demo.labels.manualIncident')}
              </Button>
            </div>
            <Table
              columns={columns}
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
          title={t('demo.titles.manualIncident')}
          description={t('demo.descriptions.manualIncident')}
          footer={<ManualIncidentForm onClose={() => setModalOpen(false)} t={t} />}
        >
          {t('demo.descriptions.manualIncidentBody')}
        </Modal>
      </div>
    )
  },
}

export const Compact: Story = {
  parameters: {
    viewport: { defaultViewport: 'compact375' },
    docs: {
      description: {
        story:
          'Compact shell: Drawer + Sidebar, DataList instead of Table, Sheet instead of Modal. Explicit presentation choice — Table does not auto-transform into cards.',
      },
    },
  },
  render: () => {
    const t = useStoryT()
    const { locale } = useIskraLocale()
    const { incidents, renderSeverityBadge } = useDemoIncidents()
    const notifierNav = useMemo(() => getNotifierNav(locale), [locale])
    const [page, setPage] = useState('incidents')
    const [navOpen, setNavOpen] = useState(false)
    const [sheetOpen, setSheetOpen] = useState(false)
    const [notifOpen, setNotifOpen] = useState(false)

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          background: 'var(--bg)',
        }}
      >
        <Drawer open={navOpen} onOpenChange={setNavOpen} aria-label={t('demo.labels.notifierNav')}>
          <Sidebar
            groups={notifierNav}
            brand={
              <span className="isb-wmark" style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>
                {t('demo.labels.iskraNotifications')}
              </span>
            }
            activeItem={page}
            onNavigate={(id) => {
              setPage(id)
              setNavOpen(false)
            }}
            ariaLabel={t('demo.labels.notifierNav')}
          />
        </Drawer>
        <AppHeader
          leading={
            <>
              <IconButton
                icon={<Icon name="menu" size={16} />}
                aria-label={t('demo.labels.openNavigation')}
                variant="ghost"
                onClick={() => setNavOpen(true)}
              />
              <span style={{ fontSize: 14, fontWeight: 600 }}>{t('demo.labels.incidents')}</span>
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
                    aria-label={t('a11y.notifications')}
                    variant="ghost"
                  />
                }
              >
                <div style={{ padding: 12, fontSize: 12 }}>{t('demo.labels.noNewNotifications')}</div>
              </Popover>
              <IconButton
                icon={<Avatar name={t('demo.labels.operatorAvatar')} size="sm" status="online" />}
                aria-label={t('demo.labels.profile')}
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
            <h1 style={{ fontSize: 18, fontWeight: 600 }}>{t('demo.labels.registry')}</h1>
            <Button size="s" onClick={() => setSheetOpen(true)}>
              {t('demo.labels.createPrefix')} {t('demo.labels.incident')}
            </Button>
          </div>
          <DataList
            items={incidents}
            getItemKey={(r) => r.id}
            aria-label={t('demo.labels.incidents')}
            renderItem={(r) => (
              <Card padding="s">
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>{r.id}</span>
                  {renderSeverityBadge(r.severity)}
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
          title={t('demo.titles.manualIncident')}
          description={t('demo.descriptions.manualIncident')}
          footer={<ManualIncidentForm onClose={() => setSheetOpen(false)} t={t} />}
        >
          {t('demo.descriptions.manualIncidentBody')}
        </Sheet>
      </div>
    )
  },
}
