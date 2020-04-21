import BaseFilter from './base-filter'

/**
 * TopK filter
 */
export default class TopKFilter extends BaseFilter {
  /**
   * Initialize the filter
   * @param topk The number of top items to keep
   * @param width The number of counter in each array
   * @param depth The number of counter-arrays
   * @param decay The probability of reducing a counter in an occupied bucket
   * @return OK on success, error otherwise
   */
  public reserve(
    topk: number,
    width: number,
    depth: number,
    decay: number
  ): Promise<string> {
    return this.client.call('TOPK.RESERVE', this.name, topk, width, depth, decay)
  }

  /**
   * Add an item to the filter
   * @param item Item
   * @param increment Increment
   * @return null if no change occurred, item dropped from the filter otherwise
   */
  public add(item: any, increment = 1): Promise<any> {
    return this.client.call('TOPK.INCRBY', this.name, item, increment)
  }

  /**
   * Check if an item already exists in the filter
   * @param item Item
   * @return 1 if item may exist, 0 if item certainly does not exist
   */
  public exists(item: any): Promise<number> {
    return this.client.call('TOPK.QUERY', this.name, item)
  }

  /**
   * Count the number of occurrences an item may be in the filter.
   * Because this is a probabilistic data structure, this may not necessarily be accurate.
   * @param item Item
   * @return The number of occurrences of item
   */
  public count(item: any): Promise<number> {
    return this.client.call('TOPK.COUNT', this.name, item)
  }

  /**
   * Get full list of items in the filter
   * @return Full list of items in the filter
   */
  public list(): Promise<string[]> {
    return this.client.call('TOPK.LIST', this.name)
  }
}
