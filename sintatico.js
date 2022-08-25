(async () => {
  const getTokens = require('./index')
  let cont = 0


  const tokens = await getTokens()
  const term = (token) => {
    const ret = tokens[cont]?.token === token

    if (ret) cont++
    return ret
  }

  const VAZIO = () => {
    const ret = tokens[cont]?.token === undefined
    cont++
    return ret
  }

  const X = () => {
    if (VAZIO())
      console.log('a');
  }

  const COMP = () => {

  }

  const ATR = () => {

  }

  const DECL = () => {

  }

  const IF = () => {
    return term('IF') 
  }

  const COM = () => {
    return IF() || DECL() || ATR()
  }

  // BL = COMANDO & BL | COMANDO
  // BL = COM BL1
  // BL1 = VAZIO | COM & BL1

  const BL1 = () => {
    return VAZIO() || COM() && BL1()
  }

  const BL = () => {
    return COM() && BL1()
  }

  const E1 = () => {
  }

  const E = () => {
    const anterior = cont
    return term('START') && BL()
  }

  console.log(E())
})()

// E -> T | T + SOMA + CONST
// T -> ID + ATR  + CONST  

