import Token from "../Token";
import Command from "./Command";

export default class Atr extends Command{
  public id: Token;
  public atr: Token;
  public cons: Token;
  
  constructor(id: Token, atr: Token, cons: Token) {
    super();
    this.id = id;
    this.atr = atr;
    this.cons = cons;
  }
}