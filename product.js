// Récupération de l'id des articles de l'api  grâce à une fonction async et stockage dans une constante
(async function () {
  const articleID = getArticleID()
  await getArticle(articleID)
})()
// fonction permettant la création de l'url ID
function getArticleID () {
  return new URL(location.href).searchParams.get('id')
}

async function getArticle (articleID) {
  try {
    const response = await fetch(`http://localhost:3000/api/furniture/${articleID}`)
    const furniture = await response.json()

    const sectionArticles = `<ul>${hydrateArticle(furniture)}</ul>`
    document.querySelector('#apitest').innerHTML = sectionArticles

    const select = document.querySelector('#varnish')
    console.log(select)

    // selection du bouton ajouter au panier

    const btnSendToCart = document.querySelector('#buttonClic')
    btnSendToCart.addEventListener('click', (event) => {
      event.preventDefault()

      const chooseOption = select.value
      console.log(chooseOption)

      const productOption = {
        name: furniture.name,
        price: furniture.price / 100,
        option: chooseOption,
        qunatité: 1
      }
      console.log(productOption)

      const confirmation = () => {
        if (window.confirm(` ${furniture.name} avec l'option ${chooseOption} a bien été ajouté au panier`)) {
          window.location.href = 'cart.html'
        } else {
          window.location.href = 'index.html'
        }
      }

      // --------------LOCAL STORAGE---------------------------------------
      // ---------------------stocker la récupération des valeurs du formulaire dans le local storage ---

      let productInLocalStorage = JSON.parse(localStorage.getItem('produit'))

      // fonction pour ajouter un produit dans le local storage
      const addToLS = () => {
        productInLocalStorage.push(productOption)
        localStorage.setItem('produit', JSON.stringify(productInLocalStorage))
      }
      // condition pour verifier si un produit  est déjà enregistré dans le local storage

      if (productInLocalStorage) {
        addToLS()
        confirmation()
      } else {
        productInLocalStorage = []
        addToLS()
        console.log(productInLocalStorage)
        confirmation()
      }
    })
    console.log(btnSendToCart)

    // gestion de l'erreur
  } catch (error) {
    console.error(error.message)
    alert('un problème est survenu')
  }
}
// dans cette fonction article vaut les valeurs de furniture

function hydrateArticle (article) {
  return `<li class="productList">
  <img class="imgProduct" src="${article.imageUrl}"></img>
  <div class=description--groupProduct>
  <div class="blackLine"></div>
  <p class="pTitleProduct">${article.name}</p>
  <div class="blackLineSmall"></div>
  <p class="description">${article.description}</p>
  <select name="Vernis" id="varnish" >
  ${displayVarnish(article.varnish)}
  </select>
  <p class="pPriceProduct">${article.price / 100 + '.00 €'}</p>
  <div id="cartButton">
  <a href="#"><button type="submit" id="buttonClic">Ajouter au panier</button></a>
  </div>
  </div>
  </li>`
}

function displayVarnish (varnishs) {
  return varnishs.map(varnish => `<option>${varnish}</option>`).join('')
}
