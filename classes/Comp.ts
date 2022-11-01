import Token from "../Token";

export default class Comp {
  public id: Token;
  public op_comp: Token;
  public cons: Token;
  
  constructor(id: Token, op_comp: Token, cons: Token) {
    this.id = id;
    this.op_comp = op_comp;
    this.cons = cons;
  }
}