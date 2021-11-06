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
      const index = target.classList.contains('removeItem') ? target.dataset.index : target.parentNode.dataset.index // crée un index qui va parcourir la cible de l'input
      const newCart = [...cart] // stock les élements du panier dans le tableau newCart
      newCart.splice(index, 1) // sépare les élément du tableau comme différents objets
      localStorage.setItem('produit', JSON.stringify(newCart)) // envoi des données dans le local storage
      displayCart(newCart) // appel la fonction d'affichage du panier pour qu'il se mette à jour
      window.location.href = 'cart.html' // actualisation de la page lors de la modification de quantité
    })
  }
}

function removeAll (cart) { // fonction permettant de retirer tous les articles du panier
  const viderPanier = document.querySelector('#clearCart') // récupération du btn pour vider le panier
  viderPanier.addEventListener('click', (e) => { // écoute de l'évenement click sur le bouton
    e.preventDefault() // empêche le comportement par défaut du bouton
    localStorage.removeItem('produit') // retrait des articles du local storage
    window.location.href = 'cart.html' // actualisation de la page lors de la modification de quantité
  })
}

function totalCart () { // fonction permettant de calculer le prix total du panier
  const cart = JSON.parse(localStorage.getItem('produit')) // récupération des élements du panier
  let total = 0 // initialisation du total à zero
  for (let i = 0; i < cart.length; i++) { // création d'une boucle pour parcourir les différents items du panier
    total += totalLine(cart[i].price, cart[i].quantity) // ajout à total du prix de chacune des lignes multiplié par la quantité grace à la fonction totalLine
  }
  return total // retourne le total
}

function displayTotal (price) { // fonction permettant l'affichage du total
  const priceToChange = document.querySelector('#cartPriceTotal') // récupération de l'éspace ou le prix doit changer
  const leprix = ` ${price} €` // stockage du prix de x item dans la variable leprix
  priceToChange.innerHTML = leprix // integration de "leprix" dans l'espace du document prévu à cet effet
}

// ouvrir popup form sur le bouton valider panier

const validCmd = document.querySelector('#payButton') // récupération du bouton valider la commande
validCmd.addEventListener('click', () => { // écoute de l'event click sur le bouton pour appeler la fonction openForm()
  openForm()
})

function openForm () { // fonction permettant d'afficher le formulaire
  document.getElementById('myForm').style.display = 'block' // display block sur le formulaire pour le faire apparaitre
}

const closePop = document.querySelector('.cancel') // récupération du btn cancel dans le formulaire
closePop.addEventListener('click', () => { // écoute de l'évent click sur le bouton cancel pour appeler la fonction closeForm()
  closeForm()
})

function closeForm () { // fonction permettant de masquer le formulaire
  document.getElementById('myForm').style.display = 'none' // display none sur le formulaire pour le faire disparaitre
}

function changeQuantityListener (cart) {
  const newCart = [...cart] // stock les elements du panier dans le tableau newCart
  const qtyElts = document.querySelectorAll('.inputQuantity') // récupération de l'input  quantity
  qtyElts.forEach(elt => { // parcour la quantité d'elts
    elt.addEventListener('input', (e) => { // écoute l'input quantity
      const priceElt = e.target.parentNode.querySelector('.itemPrice') // récupère la valeur ( prix de l'item )
      console.log(priceElt)
      const index = parseInt(e.target.parentNode.dataset.index) // crée une variable index qui stock l'index de l'element
      newCart[index].quantity = parseInt(e.target.value) // récupère une position demandée dans le table contenant les items du panier
      const totalElt = e.target.parentNode.querySelector('.totalPriceItem') // récupère la valeur de l'endroit où sera affiché le prix total
      const total = parseInt(e.target.value) * parseInt(priceElt.dataset.price) // multiplie la quantité par le prix du produit et stock dans total
      totalElt.textContent = `${total},00 €` // integre le prix total au document
      localStorage.setItem('produit', JSON.stringify(newCart)) // stock le prix total dans le local storage
      const totalPrice = totalCart() // stock la fonction de total dans la variable totalPrice
      displayTotal(totalPrice)
    })
  })
}

function totalLine (price, quantity) { // fonction permettant de calculer le prix total d'une ligne avec en paramètre un prix et une quantité
  return price * quantity // retourne le résultat de prix x quantité
}

// REGEX

// Création des variables utilses au regex
let email
let fName
let nom
let address
let city

// Fontions rel Regex

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
    }).then(data => {
      localStorage.setItem('data', JSON.stringify(data))
      window.location.href = 'confirmation.html'
    })
  }
})

async function fetchAPI (url, options) {
  const response = await fetch(url, options)
  const data = await response.json()
  return data
}
