
const productInLocalStorage = JSON.parse(localStorage.getItem('produit'))
console.log(productInLocalStorage)
const displayProductCart = document.querySelector('#productToShow')
console.log(displayProductCart)

// si le panier est vide

if (productInLocalStorage === null) {
  const emptyCart = '<div id="cartIsEmpty"><p class="emptyCartStyle">Le panier est vide</p></div>'
  displayProductCart.innerHTML = emptyCart
} else {
  const itemsCart = []
  for (let k = 0; k < productInLocalStorage.length; k++) {
    // itemsCart.push(productInLocalStorage[k])
    itemsCart[k] = `
<div id="cartIsFilled">
<p class="itemCart">${productInLocalStorage[k].name}</p>
<p class="itemCart">${productInLocalStorage[k].option}</p>
<p class="itemCart">1</p>
<p class="itemCart">${productInLocalStorage[k].price}</p>
 </div>`
  }
  console.log(itemsCart)
  displayProductCart.innerHTML = itemsCart
  console.log('je ne suis pas vide')
}

// add event listener on click clear local storage to clear cart
