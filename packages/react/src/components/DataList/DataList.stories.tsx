import type { Meta, StoryObj } from '@storybook/react-vite'
import { useStoryT } from '../../storybook/useStoryT.js'
import { useDemoIncidents } from '../../storybook/useDemoIncidents.js'
import { DataList } from './DataList.js'
import { Card } from '../Card/Card.js'

const meta = {
  title: 'Patterns/DataList',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const EntityCards: Story = {
  parameters: {
    viewport: { defaultViewport: 'compact375' },
    docs: {
      description: {
        story:
          'Explicit compact view. On desktop use Table with the same data — no auto-switch inside Table.',
      },
    },
  },
  render: () => {
    const t = useStoryT()
    const { shortIncidents, renderSeverityBadge } = useDemoIncidents()
    return (
      <DataList
        items={shortIncidents}
        getItemKey={(r) => r.id}
        aria-label={t('demo.labels.incidents')}
        renderItem={(r) => (
          <Card padding="s">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{r.id}</span>
              {renderSeverityBadge(r.severity)}
            </div>
            <div style={{ marginTop: 6, fontSize: 13 }}>{r.service}</div>
          </Card>
        )}
      />
    )
  },
}

export const Empty: Story = {
  render: () => {
    const t = useStoryT()
    return (
      <DataList
        items={[]}
        getItemKey={(r: { id: string }) => r.id}
        renderItem={() => null}
        empty={t('demo.labels.noIncidentsEmpty')}
        aria-label={t('demo.labels.incidents')}
      />
    )
  },
}
