(async () => {
  const getTokens = require('./index')
  let cont = 0


  const tokens = await getTokens()
  const term = (token) => {
    const ret = tokens[cont]?.token === token
    cont++
    /* if (ret) cont++ */
    return ret
  }

  const OP = () => {
    const anterior = cont

    if (term('MENOS')) {
      return true
    }
    cont = anterior
    if (term('MAIS')) {
      return true
    }
    cont = anterior
    if (term('DIV')) {
      return true
    }
    cont = anterior
    if (term('MULT')) {
      return true
    }
    cont = anterior

    if (term('MAIOR')) {
      return true
    }
    cont = anterior
    if (term('MENOR')) {
      return true
    }
    cont = anterior
    if (term('MENOR_IGUAL')) {
      return true
    }
    cont = anterior
    if (term('MENOR_IGUAL')) {
      return true
    }
    cont = anterior

    if (term('DIF')) {
      return true
    }
    cont = anterior
    if (term('COMP')) {
      return true
    }
    cont = anterior
    return false
  }

  // COMP = term('')
  const PRINT = () => {
    return term('PRINT') && term('AP') && term('ID') && term('FP')
  }

  const WHILE = () => {
    return term('WHILE') && term('AP') && term('FP') && term('AC') && BL()
  }

  const COMP = () => {
    return term('ID') && OP() && term('CONST') && term('FP')
  }

  const ATR = () => {
    return term('ID') && term('ATR') && term('CONST')
  }

  const DECL = () => {
    return term('INT') && term('ID')
  }

  const IF = () => {
    return term('IF') && term('AP') && COMP() && term('AC') && BL()
  }

  const FUNC = () => {
    return term('ID') && term('AP') && term('FP')
  }

  const COM = () => {
    const anterior = cont
    if (IF()) {
      return true
    }
    cont = anterior
    if (DECL()) {
      return true
    }
    cont = anterior
    if (ATR()) {
      return true
    }
    cont = anterior
    if (WHILE()) {
      return true
    }
    cont = anterior
    if (PRINT()) {
      return true
    }
    cont = anterior
    if (FUNC()) {
      return true
    }
    return false
  }

  // BL = COMANDO & BL | COMANDO
  // BL = COM BL1
  // BL1 = VAZIO | COM & BL1

  const BL1 = () => {
    const anterior = cont
    if (term('FC')) {
      return true
    }
    cont = anterior
    return COM() && BL1()
  }

  const BL = () => {
    return COM() && BL1()
  }

  const S = () => {
    return term('START') && term('AC') && BL()
  }

  function VAZIO() {
    return true
  }

  const LI2 = () => {
    const anterior = cont
    if (term('FP')) {
      return true
    }
    cont = anterior
    return term('CMM') && term('ID') && LI2()
  }


  const LI1 = () => {
    const anterior = cont
    if (term('FP')) {
      return true
    }
    cont = anterior
    return term('ID') && LI2()
  }

  const LI = () => {
    return term('AP') && LI1()
  }

  const FUN = () => {
    return term('FUNCTION') && term('ID') && LI() && term('AC') && BL()
  }

  const E = () => {
    const anterior = cont

    if (S()) {
      return true
    }
    cont = anterior
    return FUN() && E()
  }

  console.log(E())
})()
// (), (x), (x, y...)
// LISTA PARAMS -> VAZIO || ID || ID, ID
// LI = VAZIO | ID + LI1
// LI1 = VAZIO | , + ID + LI1

// LISTA PARAMS -> ( + [  || ID || ID, ID] + )
// LI = ( +  [) | ID + LI1]
// LI1 = ) | [, + ID + LI1]


// E -> LFUN & START || START
// E -> EL START
// EL -> VAZIO || FUN & EL

// EL -> START || FUN & EL

// E -> T | T + SOMA + CONST
// T -> ID + ATR  + CONST  

