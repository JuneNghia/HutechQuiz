function findChangedKeys(initialValue, newValue) {
  const changedKeys = {}
  const deletedKeys = {}

  for (const key in newValue) {
    if (initialValue.hasOwnProperty(key) && newValue.hasOwnProperty(key)) {
      if (initialValue[key] !== newValue[key]) {
        changedKeys[key] = newValue[key]
      }
    }
  }

  for (const key in initialValue) {
    if (initialValue.hasOwnProperty(key) && !newValue.hasOwnProperty(key)) {
      deletedKeys[key] = true
    }
  }

  return changedKeys
}

export default findChangedKeys
