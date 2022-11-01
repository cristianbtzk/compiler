export default class Token {
  public token: string;
  public text: string;
  public line: number;
  public initialPosition: number;
  public finalPosition: number;

  constructor(token: string, text: string, line: number, initialPosition: number, finalPosition: number) {
    this.token = token;
    this.text = text
    this.line = line
    this.initialPosition = initialPosition
    this.finalPosition = finalPosition
  }
}