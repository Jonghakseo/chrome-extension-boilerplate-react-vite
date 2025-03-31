import React from 'react'

const ProgressBar = ({ stepCount, currentStepIndex }) => {
  const arr = new Array(stepCount).fill(0)
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '12px',
        margin: '24px',
      }}>
      {arr.map((_i, idx) => {
        if (idx === currentStepIndex) {
          return (
            <div
              key={idx}
              style={{
                backgroundColor: '#0172ad',
                height: '2px',
                width: '100%',
              }}></div>
          )
        }
        return <div key={idx} style={{ backgroundColor: 'white', height: '2px', width: '100%' }}></div>
      })}
    </div>
  )
}

export default ProgressBar
