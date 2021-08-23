export const getItem = (storageKey) => {
  const value = window.localStorage.getItem(storageKey)
  return JSON.parse(value)
}

export const setItem = (key, val) => {
  const value = JSON.stringify(val)
  window.localStorage.setItem(key, value)
}

export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}

export const getColor = (value) => {
  const colors = {
    0: '#E83D2A',
    1: '#FF9602',
    2: '#CA4495',
    3: '#2D823F',
    4: '#3B6DCE'
  }

  return colors[value]
}
