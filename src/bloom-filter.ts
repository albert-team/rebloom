import BaseFilter from './base-filter'

/**
 * Bloom filter
 */
export default class BloomFilter extends BaseFilter {
  /**
   * Reserve space for the filter
   * @param errorRate The desired probability for false positives
   * @param capacity The number of entries intended to be added to the filter
   * @param expansionRate Expansion rate. If expansionRate <= 0, the filter is non-scalable.
   * @return OK on success, error otherwise
   */
  public reserve(
    errorRate: number,
    capacity: number,
    expansionRate = 2
  ): Promise<string> {
    let cmd
    if (expansionRate <= 0) {
      cmd = ['BF.RESERVE', this.name, errorRate, capacity, 'NONSCALING']
    } else {
      cmd = ['BF.RESERVE', this.name, errorRate, capacity, 'EXPANSION', expansionRate]
    }
    return this.client.callOne(cmd)
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
