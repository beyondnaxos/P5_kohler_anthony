// récupération des objetsJSON stockés dans le localStorage et converson en objets JS
const productInLocalStorage = JSON.parse(localStorage.getItem('produit'))
console.log(productInLocalStorage)
const displayProductCart = document.querySelector('#productToShow')
console.log(displayProductCart)
displayCart(productInLocalStorage)
changeQuantityListener(productInLocalStorage)

function displayCart (cart) {
  // si le panier est vide
  if (cart === null || cart.length === 0) {
    const emptyCart = '<div id="cartIsEmpty"><p class="emptyCartStyle">Le panier est vide</p></div>'
    displayProductCart.innerHTML = emptyCart
    const priceToChange = document.querySelector('#cartPriceTotal')
    const leprix = '0 €'
    priceToChange.innerHTML = leprix

    // si le panier est rempli
  } else {
    const itemsCart = []
    // Boucle pour parcourir les items du local storage
    for (let k = 0; k < cart.length; k++) {
    // création du code à integrer
      itemsCart[k] = `
    <div id="cartIsFilled" data-index="${k}" >
    <p class="itemCart" id="itemName">${cart[k].name}</p>
    <p class="itemCart" id="itemOption">${cart[k].option}</p>
    <input type="number" class="inputQuantity" id="itemQt" min="1" max="10" value="${cart[k].quantity}">      
    <p class="itemCart itemPrice" data-price="${cart[k].price}" id="itemPrice">${cart[k].price},00€</p>
    <p class="itemCart totalPriceItem" id="itemTotalPrice">${totalLine(cart[k].price, cart[k].quantity)},00€</p>
    <button class="removeItem" data-index="${k}"><i class="far fa-trash-alt"></i></button>
    </div>`
    }
    console.log(itemsCart)
    // intégration du code à la div displayProductCart
    displayProductCart.innerHTML = itemsCart.join('')
    const total = totalCart()
    displayTotal(total)
    removeItems(cart)
    removeAll()
    console.log('je ne suis pas vide')
  }
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
      window.location.href = 'cart.html'
    })
  }
}

function removeAll (cart) {
  const viderPanier = document.querySelector('#clearCart')
  console.log(viderPanier)

  viderPanier.addEventListener('click', (e) => {
    e.preventDefault()
    localStorage.removeItem('produit')
    window.location.href = 'cart.html'
  })
}

function totalCart () {
  const cart = JSON.parse(localStorage.getItem('produit'))
  console.log('cart', cart)
  let total = 0
  for (let i = 0; i < cart.length; i++) {
    total += totalLine(cart[i].price, cart[i].quantity)
  }
  return total
}

function displayTotal (price) {
  const priceToChange = document.querySelector('#cartPriceTotal')
  const leprix = ` ${price} €`
  priceToChange.innerHTML = leprix
}

// ouvrir popup form sur le bouton valider panier

const validCmd = document.querySelector('#payButton')
validCmd.addEventListener('click', () => {
  openForm()
})

function openForm () {
  document.getElementById('myForm').style.display = 'block'
}

const closePop = document.querySelector('.cancel')
closePop.addEventListener('click', () => {
  closeForm()
})

function closeForm () {
  document.getElementById('myForm').style.display = 'none'
}

function changeQuantityListener (cart) {
  const newCart = [...cart]
  const qtyElts = document.querySelectorAll('.inputQuantity')
  qtyElts.forEach(elt => {
    elt.addEventListener('input', (e) => {
      const priceElt = e.target.parentNode.querySelector('.itemPrice')
      console.log(priceElt)
      const index = parseInt(e.target.parentNode.dataset.index)
      newCart[index].quantity = parseInt(e.target.value)
      const totalElt = e.target.parentNode.querySelector('.totalPriceItem')
      const total = parseInt(e.target.value) * parseInt(priceElt.dataset.price)
      totalElt.textContent = `${total},00 €`
      localStorage.setItem('produit', JSON.stringify(newCart))
      const totalPrice = totalCart()
      displayTotal(totalPrice)
    })
  })
}

function totalLine (price, quantity) {
  return price * quantity
}
// const form = document.querySelector('#form')

// form.name.addEventListener('change', function () {
//   validName(this)
// })

// const validName = function (inputName) {
//   const inputNameReg = /^([A-Za-z]+),\s+([A-Za-z]+)\s+([A-Za-z]+)?$/
// }

// const validBtn = document.getElementById('processBtn')
// validBtn.addEventListener('submit', function (e) {
//   e.preventDefault()
//   const erreur = 'ceci est une erreur'
//   const name = document.getElementById('name')
//   const prenom = document.getElementById('prenom')
//   const adresse = document.getElementById('adresse')
//   const zip = document.getElementById('zip')
//   const ville = document.getElementById('ville')

//   if (!name.value) {
//     console.log(erreur)
//   }
// })

// console.log(validBtn)
