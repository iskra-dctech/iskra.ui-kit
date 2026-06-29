import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { useStoryT } from '../../storybook/useStoryT.js';
import { AppHeader } from './AppHeader.js';
import { Avatar } from '../Avatar/Avatar.js';
import { Icon } from '../Icon/Icon.js';
import { IconButton } from '../IconButton/IconButton.js';
import { Popover } from '../Popover/Popover.js';
import { SearchField } from '../SearchField/SearchField.js';

const meta = {
  title: 'Patterns/AppHeader',
  component: AppHeader,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Composable: Story = {
  render: () => {
    const t = useStoryT();
    return (
      <AppHeader
        leading={
          <AppHeader.Nav
            items={[
              { id: 'platform', label: t('demo.labels.platform') },
              { id: 'space', label: 'Notifier', current: true },
            ]}
          />
        }
        trailing={
          <>
            <SearchField
              placeholder={t('common.search')}
              shortcut="⌘K"
              enableShortcut
              style={{ width: 240 }}
            />
            <AppHeader.Actions>
              <Popover
                trigger={
                  <IconButton
                    icon={<Icon name="bell" size={16} />}
                    aria-label={t('a11y.notifications')}
                    variant="ghost"
                  />
                }
              >
                <div style={{ padding: 12, fontSize: 12 }}>
                  {t('demo.labels.noNewNotifications')}
                </div>
              </Popover>
              <IconButton
                icon={<Avatar name={t('demo.labels.sampleUser1')} size="sm" status="online" />}
                aria-label={t('demo.labels.userProfile')}
                variant="ghost"
              />
            </AppHeader.Actions>
            <AppHeader.Text mono>{t('demo.labels.operatorRole')}</AppHeader.Text>
          </>
        }
      />
    );
  },
};

export const SlotApi: Story = {
  render: () => {
    const t = useStoryT();
    const [notifOpen, setNotifOpen] = useState(false);
    return (
      <AppHeader>
        <AppHeader.Leading>
          <AppHeader.Indicator dot="ok" mono>
            SYNC OK
          </AppHeader.Indicator>
        </AppHeader.Leading>
        <AppHeader.Trailing>
          <SearchField
            placeholder={t('demo.labels.globalSearch')}
            variant="inline"
            style={{ width: 220 }}
          />
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
                  minWidth: 260,
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 12, color: 'var(--fg2)' }}>
                  {t('demo.labels.notificationsHeader')}
                </div>
                <div style={{ fontSize: 12, color: 'var(--fg2)' }}>
                  {t('demo.labels.noNewNotifications')}
                </div>
              </div>
            </Popover>
            <IconButton
              icon={<Avatar name={t('demo.labels.sampleUser2')} size="sm" status="online" />}
              aria-label={t('demo.labels.userProfile')}
              variant="ghost"
            />
          </AppHeader.Actions>
        </AppHeader.Trailing>
      </AppHeader>
    );
  },
};
