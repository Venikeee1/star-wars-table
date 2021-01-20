import { Storage } from './storageType'

export class LocalStorageService<T> implements Storage<T> {
  supported: boolean;

  constructor () {
    // eslint-disable-next-line
    this.supported = Boolean((window as any).localStorage)
    if (!this.supported) this.warn()
  }

  // eslint-disable-next-line
  static supported = Boolean((window as any).localStorage);

  warn (): void {
    console.warn('Warning. There is no localStorage support')
  }

  getRawData (key: string): string | null {
    return localStorage.getItem(key)
  }

  getItem (key: string): Promise<T | void> {
    const value = this.getRawData(key)
    if (!value) {
      return Promise.resolve()
    }

    return Promise.resolve(JSON.parse(value) as T)
  }

  setItem (localStorageKey: string, value: T): Promise<void> {
    localStorage.setItem(localStorageKey, JSON.stringify(value))

    return Promise.resolve()
  }
}
