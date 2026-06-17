import { describe, expect, it } from 'vitest';
import { disclosureReducer, getTriggerAria } from './disclosure.js';

describe('disclosureReducer', () => {
  it('opens, closes and toggles', () => {
    expect(disclosureReducer(false, 'open')).toBe(true);
    expect(disclosureReducer(true, 'close')).toBe(false);
    expect(disclosureReducer(false, 'toggle')).toBe(true);
    expect(disclosureReducer(true, 'toggle')).toBe(false);
  });
});

describe('getTriggerAria', () => {
  it('wires expanded + controls', () => {
    expect(getTriggerAria(true, 'panel-1')).toEqual({
      'aria-expanded': true,
      'aria-controls': 'panel-1',
    });
  });
});
