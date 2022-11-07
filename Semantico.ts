import Atr from "./classes/Atr";
import A_Function from "./classes/A_Function";
import If from "./classes/A_If";
import A_Print from "./classes/A_Print";
import A_While from "./classes/A_While";
import Comp from "./classes/Comp";
import Command from "./classes/Command";
import Decl from "./classes/Decl";
import ListaBloco from "./classes/ListaBloco";
import ListaFuncao from "./classes/ListaFuncao";
import ListaParam from "./classes/ListaParam";
import ListaParam2 from "./classes/ListaParam2";
import Program from "./classes/Program";
import Start from "./classes/Start";


function checkIsCommand(element: any) {
  if (element instanceof Atr) return true
  if (element instanceof If) return true
  if (element instanceof A_Print) return true
  if (element instanceof A_While) return true
  if (element instanceof Decl) return true
  return false
}

export default class Semantico {
  private static instance: Semantico;

  private constructor() { }

  public static getInstance(): Semantico {
    if (!this.instance) this.instance = new Semantico()

    return this.instance;
  }

  analise(items: any[], type: string) {
    switch (type) {
      case 'Program':
        return new Program(items[0], items[1])
      case 'ListaParam':
        return new ListaParam(items[0], items[1], items[2])
      case 'ListaParam2':
        return new ListaParam2(items[0], items[1], items[2], items[3])
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
        let listaBlocoIf = checkIsCommand(items[5]) ? new ListaBloco(items[5], null) : items[5]

        return new If(items[0], items[1], items[2], items[3], items[4], listaBlocoIf, items[6])
      case 'ListaBloco':
        console.log('Lista Bloco');
        let listaBloco = checkIsCommand(items[1]) ? new ListaBloco(items[1], null) : items[1]
        if (checkIsCommand(items[1])) {
          console.log('É COMMANDO');

        }
        return new ListaBloco(items[0], listaBloco)
      case 'Decl':
        return new Decl(items[0], items[1])
      default:
        break;
    }
  }
}