import { useState, useEffect } from 'react'

const useLocalStorage = (key: string, initialValue: any) => {
  // Get initial value from localStorage if available, otherwise use the provided initialValue
  const storedValue = localStorage.getItem(key)
  const parsedValue = storedValue ? JSON.parse(storedValue) : initialValue

  const [value, setValue] = useState(parsedValue)

  // Effect to sync localStorage with state
  useEffect(() => {
    // Update localStorage whenever the state changes
    if (value !== undefined) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [key, value])

  // Effect to listen for changes in localStorage from other tabs/windows
  useEffect(() => {
    const handleStorageChange = event => {
      if (event.key === key) {
        const newValue = event.newValue ? JSON.parse(event.newValue) : initialValue
        setValue(newValue)
      }
    }

    // Add event listener to handle storage changes
    window.addEventListener('storage', handleStorageChange)

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [key, initialValue])

  return [value, setValue]
}

export default useLocalStorage
