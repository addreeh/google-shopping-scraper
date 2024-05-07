import { parse } from 'node-html-parser'

export function getProduct (googleId) {
  return fetch(`https://www.google.com/shopping/product/${googleId}`)
    .then(async response => {
      const text = await response.text()
      return text
    })
    .then(html => {
      const root = parse(html)
      const divs = root.querySelectorAll('.HsDfZc')
      const nameDiv = divs[0]
      let url = divs[0].getElementsByTagName('a')[1].getAttribute('href').replace('/url?q=', '')
      const index = url.indexOf('%')
      url = url.substring(0, index)
      const priceDiv = divs[1]
      const product = {
        name: nameDiv.text,
        price: priceDiv.getElementsByTagName('span')[0].textContent.replace('�', ''),
        url
      }
      return product
    })
    .catch(error => {
      console.error('Error al obtener el producto:', error)
      throw error // Propagar el error para que se maneje en la parte que llama a getProduct
    })
}
