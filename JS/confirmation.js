// récupération des données du local storage
const orderData = JSON.parse(localStorage.getItem('data'))
// récupération du container et ajout du contenu
const confirmationContainer = document.querySelector('#confirmContainer').innerHTML =
    `
<div class="confirmationOrder">
<h1>Merci pour votre commande ${orderData.contact.firstName}</h1>
<p>Votre commande n°<strong>${orderData.orderId}</strong> sera bientôt expediée</p>
<p>vous recevrez un mail de confirmation sur ${orderData.contact.email}<p>
</div>
`

console.log(confirmationContainer)
