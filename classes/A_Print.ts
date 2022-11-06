import Token from "../Token";

export default class A_Print {
  public t_print: Token;
  public ap: Token;
  public id: Token;
  public fp: Token;
  
  constructor(t_print: Token, ap:Token, id: Token, fp:Token,) {
    this.t_print = t_print;
    this.ap = ap;
    this.id = id;
    this.fp = fp;
  }
}