import { describe, expect, it, vi } from 'vitest';
import { h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import Button from './Button.vue';
import Switch from './Switch.vue';
import Alert from './Alert.vue';
import Tabs from './Tabs.vue';
import Drawer from './Drawer.vue';
import Sheet from './Sheet.vue';
import DataList from './DataList.vue';
import ContextMenu from './ContextMenu.vue';
import ContextMenuTrigger from './ContextMenuTrigger.vue';
import ContextMenuContent from './ContextMenuContent.vue';
import ContextMenuItem from './ContextMenuItem.vue';
import ContextMenuSeparator from './ContextMenuSeparator.vue';

describe('Button (vue)', () => {
  it('renders native button with variant/size classes', () => {
    const wrapper = mount(Button, {
      props: { variant: 'destructive', size: 'l' },
      slots: { default: 'Удалить' },
    });
    const btn = wrapper.get('button');
    expect(btn.classes()).toContain('ik-btn-destructive');
    expect(btn.classes()).toContain('ik-btn-l');
    expect(btn.text()).toContain('Удалить');
  });

  it('is disabled while loading', () => {
    const wrapper = mount(Button, { props: { loading: true } });
    expect(wrapper.get('button').attributes('disabled')).toBeDefined();
  });
});

describe('Switch (vue)', () => {
  it('emits update:modelValue on toggle', async () => {
    const wrapper = mount(Switch, { props: { modelValue: false, label: 'Drift' } });
    const input = wrapper.get('input[role="switch"]');
    await input.setValue(true);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
  });
});

describe('Alert (vue)', () => {
  it('uses role=alert for errors and role=status otherwise', () => {
    expect(
      mount(Alert, { props: { variant: 'error' } })
        .get('div')
        .attributes('role'),
    ).toBe('alert');
    expect(
      mount(Alert, { props: { variant: 'info' } })
        .get('div')
        .attributes('role'),
    ).toBe('status');
  });
});

describe('Tabs (vue)', () => {
  const items = [
    { value: 'a', label: 'A', content: 'Panel A' },
    { value: 'b', label: 'B', content: 'Panel B' },
  ];

  it('selects the first tab by default and roves with arrows', async () => {
    const wrapper = mount(Tabs, { props: { items, ariaLabel: 'demo' } });
    const tabs = wrapper.findAll('[role="tab"]');
    expect(tabs[0]!.attributes('aria-selected')).toBe('true');
    await tabs[0]!.trigger('keydown', { key: 'ArrowRight' });
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b']);
  });
});

describe('Drawer (vue)', () => {
  it('renders dialog when open', () => {
    const wrapper = mount(Drawer, {
      props: { open: true, ariaLabel: 'Навигация' },
      slots: { default: 'nav' },
      attachTo: document.body,
    });
    expect(document.body.querySelector('[role="dialog"]')).toBeTruthy();
    wrapper.unmount();
  });
});

describe('Sheet (vue)', () => {
  it('renders dialog when open', () => {
    const wrapper = mount(Sheet, {
      props: { open: true, title: 'Форма' },
      slots: { default: 'body' },
      attachTo: document.body,
    });
    expect(document.body.querySelector('[role="dialog"]')).toBeTruthy();
    wrapper.unmount();
  });
});

describe('DataList (vue)', () => {
  it('renders list items', () => {
    const wrapper = mount(DataList<{ id: string; name: string }>, {
      props: {
        items: [{ id: '1', name: 'alpha' }],
        getItemKey: (r: { id: string }) => r.id,
        ariaLabel: 'Список',
      },
      slots: {
        default: ({ item }: { item: { name: string } }) => item.name,
      },
    });
    expect(wrapper.find('[role="list"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('alpha');
  });
});

describe('ContextMenu (vue)', () => {
  const mountMenu = () =>
    mount(ContextMenu, {
      attachTo: document.body,
      slots: {
        default: () => [
          h(ContextMenuTrigger, () => [h('button', { type: 'button' }, 'Область')]),
          h(ContextMenuContent, () => [
            h(ContextMenuItem, { onSelect: () => undefined }, () => 'Копировать'),
            h(ContextMenuSeparator),
            h(ContextMenuItem, { disabled: true, destructive: true }, () => 'Удалить'),
          ]),
        ],
      },
    });

  it('opens on contextmenu and emits select', async () => {
    const onSelect = vi.fn();
    const wrapper = mount(ContextMenu, {
      attachTo: document.body,
      slots: {
        default: () => [
          h(ContextMenuTrigger, () => [h('button', { type: 'button' }, 'Область')]),
          h(ContextMenuContent, () => [
            h(ContextMenuItem, { onSelect }, () => 'Копировать'),
          ]),
        ],
      },
    });
    await wrapper.get('button').trigger('contextmenu');
    await nextTick();
    expect(document.body.querySelector('[role="menu"]')).toBeTruthy();
    const item = document.body.querySelector('[role="menuitem"]') as HTMLButtonElement;
    item.click();
    expect(onSelect).toHaveBeenCalledTimes(1);
    await nextTick();
    expect(document.body.querySelector('[role="menu"]')).toBeFalsy();
    wrapper.unmount();
  });

  it('closes on Escape', async () => {
    const wrapper = mountMenu();
    await wrapper.get('button').trigger('click');
    await nextTick();
    expect(document.body.querySelector('[role="menu"]')).toBeTruthy();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await nextTick();
    expect(document.body.querySelector('[role="menu"]')).toBeFalsy();
    wrapper.unmount();
  });
});
