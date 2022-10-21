export default class Queue {
  private items: string[];

  constructor() {
    this.items = []
  }

  enqueue(el: string) {
    this.items.unshift(el)
  }

  top() {
    return this.items[0]
  }

  dequeue() {
    return this.items.shift()
  }
}