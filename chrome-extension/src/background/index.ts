console.log('background script loaded')

function cleanMarketSelectionId(marketSelectionId: string) {
  return marketSelectionId.split(':')[1]
}

function sendMessage(message: any) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    console.log('Background -> Content: ', message)
    chrome.tabs.sendMessage(tabs[0].id, message)
  })
}

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    if (details.url.includes('thescore.bet')) {
      if (details.method === 'POST') {
        const postedString = decodeURIComponent(
          //@ts-ignore
          String.fromCharCode.apply(null, new Uint8Array(details.requestBody.raw[0].bytes)),
        )

        const parsedBody = JSON.parse(postedString)
        const operationName = parsedBody.operationName

        console.log('parsedBody: ', parsedBody)

        if (operationName === 'BetslipAddMarketSelection') {
          sendMessage({
            operation: 'BetslipAddMarketSelection',
            data: {
              id: cleanMarketSelectionId(parsedBody.variables.input.selectionId),
              numerator: parsedBody.variables.input.odds.numerator,
              denominator: parsedBody.variables.input.odds.denominator,
            },
          })
        }

        if (operationName === 'BetslipRemoveMarketSelection') {
          sendMessage({
            operation: 'BetslipRemoveMarketSelection',
            data: {
              id: cleanMarketSelectionId(parsedBody.variables.selectionId),
            },
          })
        }

        if (operationName === 'BetslipClear') {
          sendMessage({ operation: 'BetslipClear' })
        }
      }
    }
  },
  {
    urls: ['<all_urls>'],
  },
  ['requestBody'],
)
