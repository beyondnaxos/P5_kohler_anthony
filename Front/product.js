// const queryString = window.location.search
// console.log(queryString)
// const urlParams = new URLSearchParams(queryString)
// const product = urlParams.get('product')
// console.log(product)
// const furnitureID = 'http://localhost:3000/api/furniture/_id'
// document.querySelector('#apitest')
//  fetch(furnitureID).then(response => response.json())
//    .then(furniture => {
//      console.log(furniture)
//      let sectionArticles = '<ul>'
//      sectionArticles += displayProduct(furnitureID)
//      sectionArticles += '</ul>'
//      document.querySelector('#apitest').innerHTML = sectionArticles
//    }).catch(erreur => alert('un problème est survenu'))
//  function displayProduct (product) {
//    console.log(product)
//    return `<li>
//      <a href="product.html?id=${product._id}" ><img id="#product" src="${product.imageUrl}"></img></a>
//      <div class=description--group>
//      <p>${product.name}</p>
//      <p>${product.price / 1000 + '0 €'}</p>
//      </li>`
//  }
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
  return `<li>
    <a href="product.html?id=${article._id}" id="urlProduit" ><img id="#product" src="${article.imageUrl}"></img></a>
    <div class=description--group>
    <p>${article.name}</p>
    <p>${article.price / 1000 + '0 €'}</p>
    </li>`
}
