const express = require('express')
const axios = require('axios')

const app = express()

app.get('/proxy/url/fetch', async (req, res) => {
  try {
    const imageResponse = await axios.get(req.query.url)
    res.send(imageResponse.data)
  } catch (e) {
    res.sendStatus(500)
  }
})

module.exports = {
  path: '/api',
  handler: app
}
