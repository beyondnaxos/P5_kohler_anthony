// récupération des objetsJSON stockés dans le localStorage et converson en objets JS
const productInLocalStorage = JSON.parse(localStorage.getItem('produit'))
console.log(productInLocalStorage)
const displayProductCart = document.querySelector('#productToShow')
console.log(displayProductCart)
displayCart(productInLocalStorage)


// add event listener on click clear local storage to clear cart

function displayCart (cart) {
  // si le panier est vide
  if (cart === null || cart.length === 0) {
    const emptyCart = '<div id="cartIsEmpty"><p class="emptyCartStyle">Le panier est vide</p></div>'
    displayProductCart.innerHTML = emptyCart

    // si le panier es rempli
  } else {
    const itemsCart = []
    // Boucle pour parcourir les items du local storage
    for (let k = 0; k < cart.length; k++) {
    // création du code à integrer
      itemsCart[k] = `
    <div id="cartIsFilled">
    <p class="itemCart" id="itemName">${cart[k].name}</p>
    <p class="itemCart">${cart[k].option}</p>
    <input type="number" class="inputQuantity" min="1" max="10">      
    <p class="itemCart">${cart[k].price},00€</p>
    <button class="removeItem" data-index="${k}"><i class="far fa-trash-alt"></i></button>
    </div>`
    }
    console.log(itemsCart)
    // intégration du code à la div displayProductCart
    displayProductCart.innerHTML = itemsCart.join('')
    removeItems(cart)
    console.log('je ne suis pas vide')
  }
  // création du tableau qui contiendra les articles du panier
}

function removeItems (cart) {
  const removeItem = document.querySelectorAll('.removeItem')
  console.log(removeItem)

  for (let i = 0; i < removeItem.length; i++) {
    removeItem[i].addEventListener('click', (event) => {
      event.preventDefault()
      const target = event.target
      const index = target.classList.contains('removeItem') ? target.dataset.index : target.parentNode.dataset.index
      console.log(event.target)
      console.log(index)
      const newCart = [...cart]
      newCart.splice(index, 1)
      localStorage.setItem('produit', JSON.stringify(newCart))
      displayCart(newCart)
    })
  }
}
