import BaseFilter from './base-filter'

/**
 * Cuckoo filter
 */
export default class CuckooFilter extends BaseFilter {
  /**
   * Reserve space for the filter
   * @param capacity Estimated capacity for the filter
   * @param bucketSize Number of items in each bucket
   * @param maxIterations Number of attempts to swap buckets before declaring filter as full and creating an additional filter
   * @param expansionRate Expansion rate
   * @return OK on success, error otherwise
   */
  public reserve(
    capacity: number,
    bucketSize = 2,
    maxIterations = 20,
    expansionRate = 1
  ): Promise<string> {
    const cmd = ['CF.RESERVE', this.name, capacity]
    if (bucketSize) cmd.push('BUCKETSIZE', bucketSize)
    if (maxIterations) cmd.push('MAXITERATIONS', maxIterations)
    if (expansionRate) cmd.push('EXPANSION', expansionRate)
    return this.client.callOne(cmd)
  }

  /**
   * Add an item to the filter
   * @param item Item
   * @param notExistsOnly Whether to accept duplicates
   * @return 1 if item was newly added, 0 if item already exists and notExistsOnly is true, error otherwise
   */
  public add(item: any, notExistsOnly = true): Promise<number> {
    const command = notExistsOnly ? 'CF.ADDNX' : 'CF.ADD'
    return this.client.call(command, this.name, item)
  }

  /**
   * Check if an item already exists in the filter
   * @param item Item
   * @return 1 if item may exist, 0 if item certainly does not exist
   */
  public exists(item: any): Promise<number> {
    return this.client.call('CF.EXISTS', this.name, item)
  }

  /**
   * Count the number of occurrences an item may be in the filter.
   * Because this is a probabilistic data structure, this may not necessarily be accurate.
   * @param item Item
   * @return The number of occurrences of item
   */
  public count(item: any): Promise<number> {
    return this.client.call('CF.COUNT', this.name, item)
  }

  /**
   * Remove an occurrence of an item from the filter.
   * Remove elements that are not in the filter may delete a different item, resulting in false negatives!
   * @param item Item
   * @return 1 if item has been removed, 0 if item was not found
   */
  public remove(item: any): Promise<number> {
    return this.client.call('CF.DEL', this.name, item)
  }
}
