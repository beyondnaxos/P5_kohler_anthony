
const OrderData = JSON.parse(localStorage.getItem('data'))

console.log(OrderData.orderId)

const confirmationContainer = document.querySelector('#confirmContainer').innerHTML = `${OrderData.orderId}`
console.log(confirmationContainer)
