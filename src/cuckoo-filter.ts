import BaseFilter from './base-filter'

/**
 * Cuckoo filter
 */
export default class CuckooFilter extends BaseFilter {
  /**
   * Reserve space for the filter
   * @param minCapacity Minimum capacity
   * @return OK on success, error otherwise
   */
  public reserve(minCapacity: number): Promise<string> {
    return this.client.call('CF.RESERVE', this.name, minCapacity)
  }

  /**
   * Add an item to the filter
   * @param item Item
   * @param notExistsOnly Whether to accept duplicates
   * @return 1 if item was added, 0 if item already exists and notExistsOnly, error otherwise
   */
  public add(item: any, notExistsOnly: boolean = true): Promise<number> {
    const command = notExistsOnly ? 'CF.ADDNX' : 'CF.ADD'
    return this.client.call(command, this.name, item)
  }

  /**
   * Check if an item already exists in the filter
   * @param item Item
   * @return 0 if item certainly does not exist, 1 if item may exist
   */
  public exists(item: any): Promise<number> {
    return this.client.call('CF.EXISTS', this.name, item)
  }

  /**
   * Count the number of occurrences of an item in the filter
   * @param item Item
   * @return The number of occurrences of item
   */
  public count(item: any): Promise<number> {
    return this.client.call('CF.COUNT', this.name, item)
  }

  /**
   * Remove an occurrence of an item from the filter
   * @param item Item
   * @return 1 if item has been removed, 0 if item was not found
   */
  public remove(item: any): Promise<number> {
    return this.client.call('CF.DEL', this.name, item)
  }
}
