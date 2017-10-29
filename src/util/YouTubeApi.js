import Request from 'superagent'

const KEY = 'AIzaSyDB5d4w7q0YomDmsrQgJepmYZpg7elDjKA'

export const search = (query, nextPageToken = null) => {
  return new Promise((resolve, result) => {
    const params = {
      key: KEY,
      part: 'snippet',
      q: query,
      type: 'playlist',
      maxResults: 20,
      pageToken: nextPageToken
    }

    Request
      .get('https://www.googleapis.com/youtube/v3/search')
      .query(params)
      .then(res => {
        resolve(res.body)
      })
    .catch(err => resolve(err))
  })
}

export const getPlaylistItemsById = (playlistId, nextPageToken = null) => {
  return new Promise((resolve, result) => {
    const params = {
      key: KEY,
      part: 'snippet, contentDetails',
      maxResults: 20,
      playlistId: playlistId,
      pageToken: nextPageToken
    }

    Request
      .get('https://www.googleapis.com/youtube/v3/playlistItems')
      .query(params)
      .then(res => {
        resolve(res.body)
      })
    .catch(err => resolve(err))
  })
}
