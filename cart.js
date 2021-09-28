const productInLocalStorage = JSON.parse(localStorage.getItem('produit'))
console.log(productInLocalStorage)

// for (const objectLoop of localStorageObject) {

// --------affichage des produits du panier

const displayProductCart = document.querySelector('#productToShow')
console.log(displayProductCart)

// si le panier est vide

if (productInLocalStorage === null) {
  const emptyCart = '<div id="cartIsEmpty"><p class="emptyCartStyle">Le panier est vide</p></div>'
  displayProductCart.innerHTML = emptyCart
} else {
  const itemsCart = []
  for (let k = 0; k < productInLocalStorage.lenght; k++) {
    console.log(productInLocalStorage.lenght)
  }

  //  itemsCart = `
  //  <div id="cartIsFilled">
  //  <p class="itemCart">${displayProductCart.name}</p>
  //  <p class="itemCart">${displayProductCart.varnish}</p>
  //  <p class="itemCart">1</p>
  //  <p class="itemCart">${displayProductCart.price}</p>
  //  </div>`
  //  displayProductCart.innerHTML = itemsCart
  //  console.log('je ne suis pas vide')
}

// add event listener on click clear local storage to clear cart
