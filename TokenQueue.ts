import Token from "./Token";

export default class TokenQueue {
  public items: Token[];

  constructor() {
    this.items = []
  }

  enqueue(el: Token) {
    this.items.unshift(el)
  }

  top() {
    return this.items[0]
  }

  dequeue() {
    return this.items.shift()
  }
}