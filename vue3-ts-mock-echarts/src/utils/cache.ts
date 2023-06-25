class cache {
  storage: Storage
  constructor() {
    this.storage = localStorage
  }
  setCache(key: string, value: any) {
    if (value) {
      this.storage?.setItem(key, JSON.stringify(value))
    }
  }
  getCache(key: string) {
    const value = this.storage?.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  removeCache(key: string) {
    this.storage?.removeItem(key)
  }
  clearCache() {
    this.storage?.clear()
  }
}
const localCache = new cache()
export default localCache
