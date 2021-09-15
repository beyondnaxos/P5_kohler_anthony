
(async function () {
  const articleID = getArticleID()
  await getArticle(articleID)
})()

function getArticleID () {
  return new URL(location.href).searchParams.get('id')
}

function getArticle (articleID) {
  return fetch(`http://localhost:3000/api/furniture/${articleID}`).then(response => response.json())
    .then(furniture => {
      console.log(furniture)
      let sectionArticles = '<ul>'
      sectionArticles += hydrateArticle(furniture)
      sectionArticles += '</ul>'
      document.querySelector('#apitest').innerHTML = sectionArticles
    }).catch(erreur => alert('un problème est survenu'))
}

function hydrateArticle (article) {
  return `<li class="productList">
  <img class="imgProduct" src="${article.imageUrl}"></img>
  <div class=description--groupProduct>
  <div class="blackLine"></div>
  <p class="pTitleProduct">${article.name}</p>
  <div class="blackLineSmall"></div>
  <p class="description">${article.description}</p>
  <select name="Vernis" id="varnish" >
  <option value="">${article.varnish[0]}</option>
  <option value="">${article.varnish[1]}</option>
  </select>
  <p class="pPriceProduct">${article.price / 1000 + '0 €'}</p>
  <div id="cartButton">
  <a href="#"><button type="button" id="buttonClic">Ajouter au panier</button></a>
  </div>
  </div>
  </li>`
}
