const productInLocalStorage = JSON.parse(localStorage.getItem('produit')) // récupération des produits du local storage
const displayProductCart = document.querySelector('#productToShow') // récupération de l'éspace dans lequel seront affichés les produits
displayCart(productInLocalStorage) // appel de la fonction d'affichage du produit avec les prduit de local storage en paramètre
changeQuantityListener(productInLocalStorage) // appel de la fonction du changement de prix dynamique avec les produits du local storage en paramètres

function displayCart (cart) { // fonction permettant d'afficher les articles du panier
  // si le panier est vide
  if (cart === null || cart.length === 0) { // si product in local storage est vide ou null
    const emptyCart = '<div id="cartIsEmpty"><p class="emptyCartStyle">Le panier est vide</p></div>' // phrase à afficher en cas de panier vide
    displayProductCart.innerHTML = emptyCart // integration de la phrase sur la page si le panier est vide
    const priceToChange = document.querySelector('#cartPriceTotal') // récupération de l'espace dans lequel est affiché le prix total
    const leprix = '0 €' // initialisation du prix à zero
    priceToChange.innerHTML = leprix // integration du prix sur le la page si le panier est vide
  } else { // sinon si le panier est rempli
    const itemsCart = [] // création d'un tableau qui contiendra le contenu à afficher pour chacun des produits
    for (let k = 0; k < cart.length; k++) { // boucle servant à parcourir le tableau dans on integralité
      itemsCart[k] = ` 
    <div id="cartIsFilled" data-index="${k}" >
    <p class="itemCart" id="itemName">${cart[k].name}</p>
    <p class="itemCart" id="itemOption">${cart[k].option}</p>
    <input type="number" class="inputQuantity" id="itemQt" min="1" max="10" value="${cart[k].quantity}">      
    <p class="itemCart itemPrice" data-price="${cart[k].price}" id="itemPrice">${cart[k].price},00€</p>
    <p class="itemCart totalPriceItem" id="itemTotalPrice">${totalLine(cart[k].price, cart[k].quantity)},00€</p>
    <button class="removeItem" data-index="${k}"><i class="far fa-trash-alt"></i></button>
    </div>` // contenu à intégrer dans le tableau avec en paramètres les éléments du local storage, soit : productInLocalStorage.name etc
    }
    displayProductCart.innerHTML = itemsCart.join('') // integration au panier des produits stockés dans le tableau
    const total = totalCart() // stockage du prix total du panier dans la variable total
    displayTotal(total) // integration du total dans son container grace à la fonction displayTotal
    removeItems(cart) // appel de la fonction pour retirer un article au click sur le bouton removeItem
    removeAll() // appel de la fonction pour retirer tous les articles du panier au click sur le bouton remove all
  }
}

function removeItems (cart) { // fonction permettant de retirer un article du panier ainsi que du local storage avec en paramètre productInLocalStorage
  const removeItem = document.querySelectorAll('.removeItem') // recupération du bouton removeItem et stockage dans une varibable
  for (let i = 0; i < removeItem.length; i++) { // boucle permettant de parcourir tous les boutons removeItem
    removeItem[i].addEventListener('click', (event) => { // écoute de l'event click sur le bouton
      event.preventDefault() // empêche les actions par défaut des boutons
      const target = event.target // cible l'evenement du click sur le bouton et le stock dans index
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

let email
let fName
let nom
let address
let city

// verification regex

// Verif email
document.querySelector('#email').addEventListener('input', (e) => {
  email = e.target.value
  const result = verifEmail(email)
  const spanEmail = document.querySelector('#validateEmail')
  manageErrorInfo(result, spanEmail)
})

// Verif first name
document.querySelector('#fName').addEventListener('input', (e) => {
  fName = e.target.value
  const result = verifName(fName)
  const spanFName = document.querySelector('#validateFName')
  manageErrorInfo(result, spanFName)
})

// Verif name
document.querySelector('#name').addEventListener('input', (e) => {
  nom = e.target.value
  const result = verifName(nom)
  const spanName = document.querySelector('#validateName')
  manageErrorInfo(result, spanName)
})

// Verif adresse
document.querySelector('#address').addEventListener('input', (e) => {
  address = e.target.value
  const result = verifAddress(address)
  const spanAddress = document.querySelector('#validateAddress')
  manageErrorInfo(result, spanAddress)
})

// Verif ville
document.querySelector('#city').addEventListener('input', (e) => {
  city = e.target.value
  const result = verifName(city)
  const spanCity = document.querySelector('#validateCity')
  manageErrorInfo(result, spanCity)
})

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()
  const formData = new FormData(e.target)
  email = formData.get('email')
  fName = formData.get('fname')
  nom = formData.get('name')
  address = formData.get('address')
  city = formData.get('city')
  const contact = {
    firstName: fName,
    lastName: nom,
    address: address,
    city: city,
    email: email
  }
  if (
    verifEmail(email) &&
    verifName(fName) &&
    verifName(nom) &&
    verifAddress(address) &&
    verifName(city)
  ) {
    console.log(contact)
    const products = productInLocalStorage.map(elt => elt.id)
    const order = { contact, products }
    localStorage.setItem('order', JSON.stringify(order))

    // ---------------
    console.log(order)
    fetchAPI('http://localhost:3000/api/furniture/order', {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(data => console.log(data))
    /* const promessePost = fetch('http://localhost:3000/api/furniture/order', {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const promiseResponse = promessePost.then(async (response) => {
      try {
        console.log(response)
        return response.json()
      } catch (e) {
        console.log(e)
      }
    })
    promiseResponse.then(orderConfirm => {
      console.log(order)
      localStorage.setItem('orderConfirm', JSON.stringify(orderConfirm))
    }) */
  }
})

function verifEmail (email) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  return regexEmail.test(email)
}
function verifName (alpha) {
  const regexName = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
  return regexName.test(alpha)
}
function verifAddress (address) {
  const regexAddress = /^([1-9][0-9]*(?:-[1-9][0-9]*)*)[\s,-]+(?:(bis|ter|qua)[\s,-]+)?([\w]+[-\w]*)[\s,]+([-\w].+)$/
  return regexAddress.test(address)
}

function manageErrorInfo (isOk, target) {
  if (isOk) {
    target.textContent = 'C\'est Ok'
    target.classList.remove('isIncorrect')
    target.classList.add('isValid')
  } else {
    target.textContent = 'C\'est pas bon'
    target.classList.add('isIncorrect')
  }
}

async function fetchAPI (url, options) {
  const response = await fetch(url, options)
  const data = await response.json()
  return data
}