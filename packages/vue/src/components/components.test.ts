import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from './Button.vue';
import Switch from './Switch.vue';
import Alert from './Alert.vue';
import Tabs from './Tabs.vue';

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
