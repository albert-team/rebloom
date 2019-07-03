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
   * Increases the count of an item by increment
   * @param item Item
   * @param increment Increment
   * @return OK on success, error otherwise
   */
  public add(item: any, increment: number): Promise<string> {
    return this.client.call('CMS.INCRBY', this.name, item, increment)
  }

  /**
   * Count the number of occurrences of an item in the sketch
   * @param item Item
   * @return The number of occurrences of item
   */
  public count(item: any): Promise<number> {
    return this.client.call('CMS.QUERY', this.name, item)
  }
}
