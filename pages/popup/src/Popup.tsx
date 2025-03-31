import type { ReactNode } from 'react'
import React from 'react'
import './Popup.css'

// import ErrorPage from './Pages/ErrorPage';
import GenerateLinkPage from './Pages/GenerateLinkPage'
import LinkTitlePage from './Pages/LinkTitlePage'

// import FlowNavigationButtons from './components/FlowNavigationButtons';
import MarketingSettingsPage from './Pages/MarketingSettingsPage'
import ProgressBar from './components/ProgressBar'
import ErrorPage from './Pages/ErrorPage'
import FlowNavigationButtons from './components/FlowNavigationButtons'

type MarketSelection = {
  id: string
  numerator: number
  denominator: number
}

type PopupContextType = {
  title: string
  setTitle: React.Dispatch<React.SetStateAction<never[]>>
  location: string
  marketSelections: MarketSelection[]
  eventNames: string[]
  campaign: string[]
  setCampaign: React.Dispatch<React.SetStateAction<never[]>>
  tags: string[]
  setTags: React.Dispatch<React.SetStateAction<never[]>>
}

const PopupContext = React.createContext<PopupContextType>({
  title: '',
  setTitle: () => {},
  location: '',
  marketSelections: [],
  eventNames: [],

  campaign: [],
  setCampaign: () => {},

  tags: [],
  setTags: () => {},
})

type GenericFlow<T> = {
  [key: string]: T
}

type Flow = GenericFlow<ReactNode>

const Popup = () => {
  const [title, setTitle] = React.useState('')
  const [eventNames, setEventNames] = React.useState([])
  const [marketSelections, setMarketSelections] = React.useState([])
  const [campaign, setCampaign] = React.useState([])
  const [tags, setTags] = React.useState([])
  const [location, setLocation] = React.useState('')

  const FLOW: Flow = {
    LINK_TITLE: <LinkTitlePage />,
    MARKETING: <MarketingSettingsPage />,
    GENERATE: <GenerateLinkPage />,
  }

  const [flowIndex, setFlowIndex] = React.useState(0)

  const fetchSelections = React.useCallback(() => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      tabs => {
        //@ts-ignore
        chrome.tabs.sendMessage(tabs[0].id, { operation: 'GetMarketSelections' }, receieveMarketSelections)
      },
    )
  }, [])

  const receieveMarketSelections = (props: any) => {
    const { eventNames, marketSelections, location } = props
    console.log('props: ', props)
    setEventNames(eventNames ?? [])
    setMarketSelections(marketSelections ?? [])
    setLocation(location)
  }

  React.useEffect(() => {
    fetchSelections()
  }, [fetchSelections])

  const CURRENT_FLOW_PAGE = React.useMemo(() => {
    const CURRENT_FLOW_KEY = Object.keys(FLOW)[flowIndex]
    return FLOW[CURRENT_FLOW_KEY]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flowIndex, marketSelections, eventNames])

  const onFirstPage = flowIndex === 0
  const onLastPage = flowIndex === Object.keys(FLOW).length - 1

  const isErrorState = eventNames.length !== marketSelections.length

  const openwindow = () => {
    chrome.tabs.create({
      url: 'new-tab/index.html',
    })
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        padding: '12px 36px',
      }}>
      <div>
        <header className="flex flex-col justify-center">
          <h1 className="font-bold text-xl text-center">Branch Link Generator</h1>
          <button onClick={openwindow} className="mt-2">
            View All Links
          </button>
          <ProgressBar stepCount={Object.keys(FLOW).length} currentStepIndex={flowIndex} />
        </header>

        <PopupContext.Provider
          value={{ marketSelections, eventNames, campaign, setCampaign, tags, setTags, location, title, setTitle }}>
          <div className="max-h-screen">{isErrorState ? <ErrorPage /> : CURRENT_FLOW_PAGE}</div>
        </PopupContext.Provider>
      </div>

      <footer>
        <FlowNavigationButtons
          onFirstPage={onFirstPage}
          onLastPage={onLastPage}
          back={() => setFlowIndex(flowIndex - 1)}
          next={() => setFlowIndex(flowIndex + 1)}
        />
      </footer>
    </div>
  )
}

export default Popup

export { PopupContext }
