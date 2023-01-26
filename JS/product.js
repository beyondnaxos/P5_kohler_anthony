
// Récupération de l'id des articles de l'api  grâce à une fonction auto appelante
(async function () {
  const articleID = getParamFromUrl('id')
  await getArticle(articleID)
})()

// fonction permettant la récupération de l'ID dans l'url
function getParamFromUrl (param) {
  return new URL(location.href).searchParams.get(param)
}

async function getArticle (articleID) {
  // récupération des prodtuits de l'API
  try {
    const response = await fetch(`http://localhost:3000/api/furniture/${articleID}`)
    const furniture = await response.json()
    const sectionArticles = `<ul>${hydrateArticle(furniture)}</ul>`
    document.querySelector('#apitest').innerHTML = sectionArticles
    const chooseOption = document.querySelector('#varnish').value
    const btnSendToCart = document.querySelector('#buttonClic')
    btnSendToCart.addEventListener('click', (event) => {
      event.preventDefault()
      const productOption = {
        id: furniture._id,
        name: furniture.name,
        price: furniture.price / 100,
        option: chooseOption,
        quantity: 1
      }
      console.log(productOption)
      addToLS(productOption, furniture, chooseOption)

    // gestion de l'erreur
    })
  } catch (error) {
    console.error(error.message)
    alert('un problème est survenu')
  }
}
// dans cette fonction de confirmation , 'article' vaut les valeurs de 'furniture'
function confirmation (furniture, chooseOption) {
  if (window.confirm(` ${furniture.name} avec l'option ${chooseOption} a bien été ajouté au panier`)) {
    window.location.href = 'cart.html'
  } else {
    window.location.href = 'index.html'
  }
}

// la fonction permet l'envoi des produits vers le local storage
function addToLS (productOption, furniture, chooseOption) {
  let productInLocalStorage = JSON.parse(localStorage.getItem('produit'))
  if (!productInLocalStorage) {
    productInLocalStorage = []
  }
  productInLocalStorage.push(productOption)
  localStorage.setItem('produit', JSON.stringify(productInLocalStorage))
  confirmation(furniture, chooseOption)
}

// la fonction permet de  retourner du code html dynamique
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

// la fonction permet de renvoyer une liste de vernis sous forme de tableau
function displayVarnish (varnishs) {
  return varnishs.map(varnish => `<option>${varnish}</option>`).join('')
}
