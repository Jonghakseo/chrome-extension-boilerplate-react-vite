import React, { useContext } from 'react'
import { PopupContext } from '../Popup'

type GenericEnvironmentMapping<T> = {
  [key: string]: T
}

type EnvironmentMapping = GenericEnvironmentMapping<string>

const ENVIRONMENT_MAPPINGS: EnvironmentMapping = {
  'https://espnbet.com': 'https://espnbet.app.link',
  'https://staging.endzonebet.com': 'https://espnbet.test-app.link/Kf3yzFBkVRb',
  'https://uat.endzonebet.com': 'https://espnbet.test-app.link/aayushUAT',
}

function getGeneratedLinks() {
  const generatedLinks = localStorage.getItem('generatedLinks')
  if (generatedLinks) {
    return JSON.parse(generatedLinks)
  }

  return []
}
function addGeneratedLink({ newLink, eventNames, title }) {
  const links = getGeneratedLinks()
  const newItem = {
    link: newLink,
    eventNames,
    title,
  }
  localStorage.setItem('generatedLinks', JSON.stringify([...links, newItem]))
}

function extractBaseAndPath(url: string) {
  const urlObj = new URL(url)
  const baseUrl = `${urlObj.protocol}//${urlObj.host}` // This gives us the base URL (protocol + host)
  const relativePath = urlObj.pathname // This gives us the path after the host

  return {
    baseUrl,
    relativePath,
  }
}

const GenerateLinkPage = () => {
  const { marketSelections, campaign, tags, location, eventNames, title } = useContext(PopupContext)

  const [showFlash, setShowFlash] = React.useState(false)

  const flashConfirmationMessage = () => {
    setShowFlash(true)
    setTimeout(() => setShowFlash(false), 3000)
  }

  const generateLink = () => {
    const { baseUrl, relativePath } = extractBaseAndPath(location)

    const urlString = ENVIRONMENT_MAPPINGS[baseUrl]
    const url = new URL(urlString)

    marketSelections?.forEach((item, index) => {
      url.searchParams.append(`market_selection_id[${index}]`, item.id)
      url.searchParams.append(`odds_numerator[${index}]`, item.numerator.toString())
      url.searchParams.append(`odds_denominator[${index}]`, item.denominator.toString())
    })

    if (relativePath) {
      url.searchParams.append('$canonical_url', relativePath)
    }

    if (campaign.length > 0) {
      url.searchParams.append('campaign', campaign[0])
    }

    tags.forEach((item, index) => {
      url.searchParams.append(`tags[${index}}`, item)
    })

    navigator.clipboard.writeText(url.toString())
    flashConfirmationMessage()
    addGeneratedLink({
      newLink: url.toString(),
      eventNames,
      title,
    })
  }

  return (
    <>
      {showFlash && <p>Link Copied!</p>}
      <button type="submit" className="pure-button pure-button-primary" onClick={generateLink}>
        Copy Link
      </button>
    </>
  )
}
export default GenerateLinkPage
