import React, { useContext } from 'react'
import { PopupContext } from '../Popup'

const MarketingSettingsPage = () => {
  const VALID_CAMPAIGNS = ['campaign_1', 'campaign_2', 'campaign_3']
  const VALID_TAGS = ['tag_1', 'tag_2', 'tag_3']

  const { campaign, setCampaign, tags, setTags } = useContext(PopupContext)

  return (
    <div style={{ width: '100%' }}>
      <div>
        <p>Customer Campaign</p>
        <Dropdown options={VALID_CAMPAIGNS} selected={campaign} setSelected={setCampaign} />
      </div>
      <div>
        <p>Tags</p>
        <Dropdown options={VALID_TAGS} selected={tags} setSelected={setTags} inputType="checkbox" />
      </div>
    </div>
  )
}

type DropdownProps = {
  options: string[]
  selected: string[]
  setSelected: (newVal: []) => void
  inputType: 'checkbox' | 'select'
}

const Dropdown = ({ options, selected, setSelected, inputType = 'select' }: DropdownProps) => {
  const CheckboxOption = ({ name }) => {
    const handleSelect = event => {
      const checked = event.target.checked
      if (checked) setSelected(Array.from(new Set([...selected, name])))
      else setSelected(selected.filter(i => i !== name))
    }
    return (
      <li>
        <label>
          <input type="checkbox" onClick={handleSelect} checked={selected.includes(name)} />
          {name}
        </label>
      </li>
    )
  }

  const DefaultOption = ({ name }) => {
    const handleSelect = () => {
      if (!selected.length || !selected.includes(name)) setSelected([name])
      else setSelected([])
    }
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
    return <li onClick={handleSelect}>{name}</li>
  }

  return (
    <details className="dropdown">
      <summary>{selected ? selected.join(' | ') : 'Select'}</summary>
      <ul>
        {options.map(i => {
          if (inputType === 'checkbox') return <CheckboxOption name={i} />
          else return <DefaultOption name={i} />
        })}
      </ul>
    </details>
  )
}

export default MarketingSettingsPage
