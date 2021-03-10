const DATA_CACHE = 'DATA_CACHE'
const TWO_WEEKS = 1000 * 60 * 60 * 24 * 14

const currentTime = () => Date.now()

const getDataCache = () => {
  let dataCache = {
    data: {},
    nextCleanup: new Date().getTime() + TWO_WEEKS,
  }
  // console.log(dataCache)
  try {
    const data = localStorage.getItem(DATA_CACHE)

    if (data) {
      dataCache = JSON.parse(data)
    }
  } catch (e) {
    console.error(e.message)
  }

  return dataCache
}

const setDataToCache = (inputValues) => {
  const dataCache = getDataCache()
  const { data } = dataCache

  const item = {
    inputValues,
    expiry: new Date().getTime() + TWO_WEEKS,
  }
  // console.log(item)

  dataCache.data = item
  try {
    localStorage.setItem(DATA_CACHE, JSON.stringify(dataCache))
  } catch (e) {
    cleanUpStorage(data)
  }
}

const cleanUpStorage = (data) => {
  let isDeleted
  let oldest
  let oldestKey

  // if 14 days have been passed, it removes the cache
  for (const key in data) {
    const { expiry } = data[key]
    if (expiry && expiry <= currentTime()) {
      delete data[key]
      isDeleted = true
    }

    // finding the oldest cache in case none of them are expired
    if (!oldest || oldest > expiry) {
      oldest = expiry
      oldestKey = key
    }
  }

  // remove the oldest cache if there is no more space in local storage (5 MB)
  if (!isDeleted && oldestKey) {
    delete data[oldestKey]
  }

  localStorage.setItem(
    DATA_CACHE,
    JSON.stringify({
      data: data,
      nextCleanup: currentTime() + TWO_WEEKS,
    })
  )
}

export { setDataToCache, getDataCache }
