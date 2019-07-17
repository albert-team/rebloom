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
   * Increase the count of an item by increment
   * @param item Item
   * @param increment Increment
   * @return null if no change to the filter occurred, item dropped from the filter otherwise
   */
  public add(item: any, increment: number): Promise<null> | Promise<any> {
    return this.client.call('TOPK.INCRBY', this.name, item, increment)
  }

  /**
   * Check if an item already exists in the filter
   * @param item Item
   * @return 0 if item does not exist, 1 otherwise
   */
  public exists(item: any): Promise<number> {
    return this.client.call('TOPK.QUERY', this.name, item)
  }

  /**
   * Count the number of occurrences of an item in the filter. The result may be lower than the real count.
   * @param item Item
   * @return The number of occurrences of item
   */
  public count(item: any): Promise<number> {
    return this.client.call('TOPK.COUNT', this.name, item)
  }
}
