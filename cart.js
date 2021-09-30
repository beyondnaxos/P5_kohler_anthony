// récupération des objetsJSON stockés dans le localStorage et converson en objets JS
const productInLocalStorage = JSON.parse(localStorage.getItem('produit'))
console.log(productInLocalStorage)
const displayProductCart = document.querySelector('#productToShow')
console.log(displayProductCart)

// si le panier est vide
if (productInLocalStorage === null) {
  const emptyCart = '<div id="cartIsEmpty"><p class="emptyCartStyle">Le panier est vide</p></div>'
  displayProductCart.innerHTML = emptyCart

// si le panier es rempli
} else {
// création du tableau qui contiendra les articles du panier
  const itemsCart = []
  // Boucle pour parcourir les items du local storage
  for (let k = 0; k < productInLocalStorage.length; k++) {
    // création du code à integrer
    itemsCart[k] = `
    <div id="cartIsFilled">
    <p class="itemCart">${productInLocalStorage[k].name}</p>
    <p class="itemCart">${productInLocalStorage[k].option}</p>
    <input type="number" class="inputQuantity" min="1" max="10">      
    <p class="itemCart">${productInLocalStorage[k].price},00€</p>
    <button class="removeItem"><i class="far fa-trash-alt"></i></button>
    </div>`
  }
  console.log(itemsCart)
  // intégration du code à la div displayProductCart
  displayProductCart.innerHTML = itemsCart
  console.log('je ne suis pas vide')
}

// add event listener on click clear local storage to clear cart
const removeItem = document.querySelectorAll('.removeItem')
console.log(removeItem)

for (let i = 0; i < removeItem.length; i++) {
  removeItem[i].addEventListener('click', (event) => {
    event.preventDefault()
    const itemIDDelete = productInLocalStorage[i]
    console.log(itemIDDelete)
    // test
    ouvrePopup(page)
  })
}
const page = 'index.html'

function ouvrePopup (page) {
  // window.open(page, 'nom_popup', 'menubar=no, status=no, scrollbars=no, menubar=no, width=200, height=100')
}
