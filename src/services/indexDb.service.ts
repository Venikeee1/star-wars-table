import { Storage } from './storageType'
import { get, set } from 'idb-keyval'

export class IndexDbService<T> implements Storage<T> {
  supported: boolean;

  constructor () {
    // eslint-disable-next-line
    this.supported = Boolean((window as any).indexedDB)
    if (!this.supported) this.warn()
  }

  // eslint-disable-next-line
  static supported = Boolean((window as any).indexedDB);

  warn (): void {
    console.warn('Warning. There is no indexDB support')
  }

  async getItem (key: string): Promise<T | void> {
    return get(key)
  }

  setItem (localStorageKey: string, value: T): Promise<void> {
    return set(localStorageKey, value)
  }
}
