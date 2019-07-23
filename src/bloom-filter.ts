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
   * @return 1 if item was newly added, 0 if it may have already existed
   */
  public add(item: any): Promise<number> {
    return this.client.call('BF.ADD', this.name, item)
  }

  /**
   * Check if an item already exists in the filter
   * @param item Item
   * @return 1 if item may exist, 0 if item certainly does not exist
   */
  public exists(item: any): Promise<number> {
    return this.client.call('BF.EXISTS', this.name, item)
  }
}
