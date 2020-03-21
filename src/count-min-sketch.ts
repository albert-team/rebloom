import BaseFilter from './base-filter'

/**
 * Count-min sketch
 */
export default class CountMinSketch extends BaseFilter {
  /**
   * Initialize the sketch from specified dimensions
   * @param width The number of counter in each array
   * @param depth The number of counter-arrays
   * @return OK on success, error otherwise
   */
  public fromDimensions(width: number, depth: number): Promise<string> {
    return this.client.call('CMS.INITBYDIM', this.name, width, depth)
  }

  /**
   * Initialize the sketch from specified probability
   * @param errorRate Error rate
   * @param probability The desired probability for inflated count
   * @return OK on success, error otherwise
   */
  public fromProbability(errorRate: number, probability: number): Promise<string> {
    return this.client.call('CMS.INITBYPROB', this.name, errorRate, probability)
  }

  /**
   * Add an item to the sketch
   * @param item Item
   * @param increment Increment
   * @return The number of occurrences of item
   */
  public add(item: any, increment = 1): Promise<string> {
    return this.client.call('CMS.INCRBY', this.name, item, increment)
  }

  /**
   * Count the number of occurrences an item may be in the sketch.
   * Because this is a probabilistic data structure, this may not necessarily be accurate.
   * @param item Item
   * @return The number of occurrences of item
   */
  public count(item: any): Promise<number> {
    return this.client.call('CMS.QUERY', this.name, item)
  }
}
