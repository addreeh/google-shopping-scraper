import express, { Request, Response } from 'express'
import { getProduct } from './scraper'
import { products } from '../products'

const app = express()

app.get('/', (_req: Request, res: Response) => {
  res.send('HSN Scraper API')
})

products.forEach(product => {
  app.get(`/${product.name}`, (_req: Request, res: Response) => {
    getProduct(product.id)
      .then(productData => {
        res.send(productData)
      })
      .catch(error => {
        console.error('Error:', error)
        res.status(500).send('Error obteniendo el producto')
      })
  })
})

app.listen(3000, () => {
  console.log('Example app listening on port http://localhost:3000')
})
