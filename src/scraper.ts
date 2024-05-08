import { Product } from 'interfaces'
import { parse } from 'node-html-parser'

export async function getProduct (googleId: string): Promise<Product> {
  return await fetch(`https://www.google.com/shopping/product/${googleId}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } }).then(async response => {
    const text = await response.text()
    return text
  })
    .then(html => {
      const root = parse(html)
      const divs = root.querySelectorAll('.HsDfZc')
      const nameDiv = divs[0]
      let url = ''
      if (nameDiv != null) {
        const anchor = nameDiv.getElementsByTagName('a')[1]
        if (anchor != null) {
          url = anchor.getAttribute('href')?.replace('/url?q=', '') ?? ''
          const index = url.indexOf('%')
          url = url.substring(0, index)
        }
      }

      const priceDiv = divs[1]
      const priceText = priceDiv?.getElementsByTagName('span')[0]?.textContent?.replace(/[^\d.,]/g, '') ?? '' // Asegurarse de que el texto del precio sea una cadena válida
      console.log(priceText) // Verificar el texto del precio sin caracteres no numéricos

      // Convertir el texto del precio a un número
      let price = parseFloat(priceText.replace(',', '.'))
      if (isNaN(price)) {
        price = 0
      }
      console.log(price) // Verificar el número del precio

      const product: Product = {
        name: nameDiv?.text ?? 'Product Name',
        price: price ?? 0,
        url: url ?? 'https://www.google.com'
      }
      return product
    })
    .catch(error => {
      console.error('Error getting the product', error)
      throw error
    })
}
