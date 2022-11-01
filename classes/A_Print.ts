import Token from "../Token";

export default class A_Print {
  public t_print: Token;
  public id: Token;
  
  constructor(t_print: Token, id: Token) {
    this.t_print = t_print;
    this.id = id;
  }
}