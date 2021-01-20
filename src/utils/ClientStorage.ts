import { IndexDbService } from '@/services/indexDb.service'
import { LocalStorageService } from '@/services/localStorage.service'
import { Storage } from '@/services/storageType'

export class ClientStorage<T> {
  storage: Storage<T> | null

  constructor () {
    this.storage = this.setStorage()
  }

  setStorage (): Storage<T> | null {
    const indexDbService = new IndexDbService<T>()
    const localStorageService = new LocalStorageService<T>()

    if (indexDbService.supported) {
      return new IndexDbService<T>()
    }

    if (localStorageService.supported) {
      return new LocalStorageService<T>()
    }

    return null
  }

  getItem (key: string): Promise<T | void> {
    if (!this.storage) {
      return Promise.resolve()
    }

    return this.storage.getItem(key)
  }

  setItem (localStorageKey: string, value: T): Promise<void | Error> {
    if (!this.storage) {
      return Promise.reject(new Error('Local storage and IndexDB are not supporter in current browser'))
    }

    return this.storage.setItem(localStorageKey, value)
  }
}
