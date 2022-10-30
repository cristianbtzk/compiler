export default class Queue {
  private items: any[];

  constructor() {
    this.items = []
  }

  enqueue(el: any) {
    this.items.unshift(el)
  }

  top() {
    return this.items[0]
  }

  dequeue() {
    return this.items.shift()
  }
}