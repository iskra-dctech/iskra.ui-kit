import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataList } from './DataList.js';
import { Badge } from '../Badge/Badge.js';
import { Card } from '../Card/Card.js';

const meta = {
  title: 'Patterns/DataList',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

interface Incident {
  id: string;
  severity: string;
  service: string;
}

const incidents: Incident[] = [
  { id: 'INC-001', severity: 'critical', service: 'Сбой резервного хранилища' },
  { id: 'INC-002', severity: 'warning', service: 'Рост задержки API-шлюза' },
];

export const EntityCards: Story = {
  parameters: {
    viewport: { defaultViewport: 'compact375' },
    docs: {
      description: {
        story:
          'Явное compact-представление. На desktop используйте Table с теми же данными — без auto-switch внутри Table.',
      },
    },
  },
  render: () => (
    <DataList
      items={incidents}
      getItemKey={(r) => r.id}
      aria-label="Инциденты"
      renderItem={(r) => (
        <Card padding="s">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{r.id}</span>
            <Badge variant={r.severity === 'critical' ? 'error' : 'warning'}>
              {r.severity === 'critical' ? 'Критический' : 'Предупреждение'}
            </Badge>
          </div>
          <div style={{ marginTop: 6, fontSize: 13 }}>{r.service}</div>
        </Card>
      )}
    />
  ),
};

export const Empty: Story = {
  render: () => (
    <DataList
      items={[]}
      getItemKey={(r: Incident) => r.id}
      renderItem={() => null}
      empty="Ни одного инцидента"
      aria-label="Инциденты"
    />
  ),
};
