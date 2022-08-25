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

  const E = () => {
    const anterior = cont
    return term('START') && term('AC') && term('FC')
    return term('ID') && term('ATR') && term('CONST') && X()
  }

  console.log(E())
})()

// E -> T | T + SOMA + CONST
// T -> ID + ATR  + CONST  

