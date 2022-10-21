class A {
  constructor() {
    this.a = 'a';
  }

  print() {
    console.log("Olá")
  }
}

class B extends A{
  constructor() {
    super()
    this.b = 'b';
  }
}

const a = new B()
a.print()

function teste()