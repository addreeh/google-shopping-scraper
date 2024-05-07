import { getProduct } from './scraper.mjs'
import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/evowhey', async (req, res) => {
  try {
    const product = await getProduct('8157208109625064108')
    res.send(product)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).send('Error obteniendo el producto')
  }
})

app.get('/evocasein', async (req, res) => {
  try {
    const product = await getProduct('6581023728851403541')
    console.log(product)
    res.send(product)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).send('Error obteniendo el producto')
  }
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
