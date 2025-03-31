type MarketSelection = {
  id: string
  numerator: string
  denominator: string
}

let marketSelections: MarketSelection[] = []
let eventNames: string[] = []

console.log('content script injected')

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log('recieved: ', message)

  if (message.operation === 'BetslipAddMarketSelection') {
    marketSelections.push(message.data)
    setTimeout(() => {
      parseBetslip()
    }, 1000)
  }

  if (message.operation === 'BetslipRemoveMarketSelection') {
    marketSelections = marketSelections.filter(i => i.id !== message.data.id)
    setTimeout(() => {
      parseBetslip()
    }, 1000)
  }

  if (message.operation === 'BetslipClear') {
    marketSelections = []
    setTimeout(() => {
      parseBetslip()
    }, 1000)
  }

  if (message.operation === 'GetMarketSelections') {
    console.log('window.location.href: ', window.location.href)
    return sendResponse({
      eventNames,
      marketSelections,
      location: window.location.href,
    })
  }

  console.log('marketSelections: ', marketSelections)
})

function parseBetslip() {
  const betslipSelectionList = document.getElementsByClassName('betslip-selection-list')
  if (!betslipSelectionList.length) {
    eventNames = []
    return
  }

  const eventNamesOne: string[] = Array.prototype.map.call(
    betslipSelectionList.item(0)?.getElementsByClassName('text-sm text-betslip-primary'),
    e => e.innerHTML,
  )

  eventNames = [...eventNamesOne]

  return true
}
