import 'fake-indexeddb/auto'
import { ClientStorage } from '@/utils/ClientStorage'

const collectionName = 'collection'

describe('ClientStorage', () => {
  it('should save collection to indexDB', async () => {
    const clientStorage = new ClientStorage()
    const items = [{ name: 'fakeItem'}]
    await clientStorage.setItem(collectionName, items)
    const data = await clientStorage.getItem(collectionName)
    expect(items).toEqual(data)
  })

  it('should save collection to LocalStorage', async () => {
    indexedDB = null
    const clientStorage = new ClientStorage()
    const items = [{ name: 'fakeItem'}]
    await clientStorage.setItem(collectionName, items)
    expect(items).toEqual(JSON.parse(localStorage.getItem(collectionName) as any))
  })

  it('should return undefined IF key not exist', async () => {
    const clientStorage = new ClientStorage()
    const result = await clientStorage.getItem('not existing key')
    expect(result).toBeUndefined()
  })

  it('should through an error if there is no storage support', async () => {
    const clientStorage = new ClientStorage()
    clientStorage.storage = null
    const items = [{ name: 'fakeItem'}]
    await expect(clientStorage.setItem(collectionName, items)).rejects.toThrow();
  })
})
