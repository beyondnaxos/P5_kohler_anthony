(async function () {
  const articleID = getArticleID()
  await getArticle(articleID)
})()

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

    const chooseOption = select.value
    console.log(chooseOption)
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
  <p class="pPriceProduct">${article.price / 1000 + '0 €'}</p>
  <div id="cartButton">
  <a href="#"><button type="button" id="buttonClic">Ajouter au panier</button></a>
  </div>
  </div>
  </li>`
}

function displayVarnish (varnishs) {
  return varnishs.map(varnish => `<option>${varnish}</option>`).join('')
}

// ----------gestion du panier -----------
// la récupération des données séléctionnées dans le panier ---

// const idForm = document.getElementsByTagName('select')
// console.log(idForm)

// mettre le choix d'utilisateur dans une variable

// --------------LOCAL STORAGE---------------------------------------
// ---------------------stocker la récupération des valeurs du formulaire dans le local storage ---
