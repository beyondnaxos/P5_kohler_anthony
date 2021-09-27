function getCart () {
  return new URL(location.href).searchParams.get('cart')
}

const cat = localStorage.getItem('produit')
console.log(cat)

const catObject = JSON.parse(cat)
console.log(catObject)

const panier = {
  constructor (name, varnish, price, quantity) {
    this.name = catObject.name
    this.varnish = catObject.varnish
    this.price = catObject.price
  }
}

console.log(panier)

const sectionArticles = `<ul>${hydrateArticle(catObject)}</ul>`
document.querySelector('#apitest').innerHTML = sectionArticles

function hydrateArticle (panier) {
  return `<li class="productList">
    <img class="imgProduct" src="${panier.imageUrl}"></img>
    <div class=description--groupProduct>
    <div class="blackLine"></div>
    <p class="pTitleProduct">${panier.name}</p>
    <div class="blackLineSmall"></div>
    <p class="description">${panier.description}</p>
    <select name="Vernis" id="varnish" >
    ${panier.varnish}
    </select>
    <p class="pPriceProduct">${panier.price / 100 + '.00 €'}</p>
    <div id="cartButton">
    <a href="#"><button type="submit" id="buttonClic">Ajouter au panier</button></a>
    </div>
    </div>
    </li>`
}
