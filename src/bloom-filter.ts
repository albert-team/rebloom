import BaseFilter from './base-filter'

/**
 * Bloom filter
 */
export default class BloomFilter extends BaseFilter {
  /**
   * Reserve space for the filter
   * @param errorRate Error rate
   * @param minCapacity Minimum capacity
   * @return OK on success, error otherwise
   */
  public reserve(errorRate: number, minCapacity: number): Promise<string> {
    return this.client.call('BF.RESERVE', this.name, errorRate, minCapacity)
  }

  /**
   * Add an item to the filter
   * @param item Item
   * @return 1 if item was newly added, 0 if it may have previously existed
   */
  public add(item: any): Promise<number> {
    return this.client.call('BF.ADD', this.name, item)
  }

  /**
   * Add some items to the filter
   * @param items Items
   * @return Array of integers. Each is either 1 or 0
   */
  public addMany(...items: any[]): Promise<number[]> {
    return this.client.call('BF.MADD', this.name, ...items)
  }

  /**
   * Check if an item already exists in the filter
   * @param item Item
   * @return 0 if item certainly does not exist, 1 if item may exist
   */
  public exists(item: any): Promise<number> {
    return this.client.call('BF.EXISTS', this.name, item)
  }

  /**
   * Check if some items already exist in the filter
   * @param items Items
   * @return Array of integers. Each is either 1 or 0
   */
  public existsMany(...items: any[]): Promise<number[]> {
    return this.client.call('BF.MEXISTS', this.name, ...items)
  }
}
