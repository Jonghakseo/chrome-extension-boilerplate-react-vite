import React from 'react'

const FlowNavigationButtons = ({ back, next, onFirstPage, onLastPage }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        gap: '12px',
      }}>
      <button type="submit" disabled={onFirstPage} onClick={back}>
        Back
      </button>
      <button type="submit" disabled={onLastPage} onClick={next}>
        Next
      </button>
    </div>
  )
}

export default FlowNavigationButtons
