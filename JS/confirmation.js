
const OrderData = JSON.parse(localStorage.getItem('data'))

console.log(OrderData.orderId)

const confirmationContainer = document.querySelector('#confirmContainer').innerHTML =
`
<div class="confirmationOrder">
<h1>Merci pour votre commande ${OrderData.contact.firstName}</h1>
<p>Votre commande n°<strong>${OrderData.orderId}</strong> sera bientôt expediée</p>
<p>vous recevrez un mail de confirmation sur ${OrderData.contact.email}<p>
</div>
`
console.log(confirmationContainer)
