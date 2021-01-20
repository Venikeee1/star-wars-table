export interface Storage<T> {
  getItem: (key: string) => Promise<T | void>;
  setItem: (key: string, value: T) => Promise<void>;
  supported: boolean
}
