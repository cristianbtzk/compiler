import Atr from "./classes/Atr";
import A_Function from "./classes/A_Function";
import If from "./classes/A_If";
import A_Print from "./classes/A_Print";
import A_While from "./classes/A_While";
import Comp from "./classes/Comp";
import Decl from "./classes/Decl";
import ListaBloco from "./classes/ListaBloco";
import ListaFuncao from "./classes/ListaFuncao";
import ListaParam from "./classes/ListaParam";
import ListaParam2 from "./classes/ListaParam2";
import Program from "./classes/Program";
import Start from "./classes/Start";

export default class Semantico {
  analise(items: any[], type: string) {
    switch (type) {
      case 'Program':
        return new Program(items[0], items[1])
      case 'ListaParam':
        return new ListaParam(items[0], items[1])
      case 'ListaParam2':
        return new ListaParam2(items[0], items[1])
      case 'Function':
        return new A_Function(items[0], items[1], items[2], items[3], items[4], items[5], items[6], items[7])
      case 'ListaFuncao':
        return new ListaFuncao(items[0], items[1])
      case 'Start':
        return new Start(items[0], items[1], items[2], items[3], items[4], items[5], items[6])
      case 'Comp':
        return new Comp(items[0], items[1], items[2])
      case 'Atr':
        return new Atr(items[0], items[1], items[2])
      case 'A_Print':
        return new A_Print(items[0], items[1], items[2], items[3])
      case 'A_While':
        return new A_While(items[0], items[1], items[2], items[3], items[4], items[5], items[6])
      case 'A_If':
        return new If(items[0], items[1], items[2], items[3], items[4], items[5], items[6])
      case 'ListaBloco':
        return new ListaBloco(items[0], items[1])
      case 'Decl':
        return new Decl(items[0], items[1])
      default:
        break;
    }
  }
}