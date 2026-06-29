import { inject } from 'vue';
import {
  defaultIskraLocaleContext,
  IskraLocaleKey,
  type IskraLocaleContextValue,
} from './context.js';

export function useIskraLocale(): IskraLocaleContextValue {
  return inject(IskraLocaleKey, defaultIskraLocaleContext);
}

export function useIskraT() {
  return useIskraLocale().t;
}
