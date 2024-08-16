function calculateTotal() {
    const pricePerGame = 60;
    const shippingPerGame = 15;

    const game1Qty = parseInt(document.getElementById('game1').value);
    const game2Qty = parseInt(document.getElementById('game2').value);
    const game3Qty = parseInt(document.getElementById('game3').value);

    const totalGames = game1Qty + game2Qty + game3Qty;
    const totalCost = (totalGames * (pricePerGame + shippingPerGame)).toFixed(2);

    document.getElementById('totalAmount').textContent = totalCost;
}

function payWithPaypal() {
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: document.getElementById('totalAmount').textContent
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Transaction completed by ' + details.payer.name.given_name);
            });
        }
    }).render('#paypal-button-container');

    // Trigger the PayPal checkout
    document.getElementById('paypal-button-container').style.display = 'block';
    document.getElementById('payButton').style.display = 'none';
    document.querySelector('.paypal-buttons button').click();
}
