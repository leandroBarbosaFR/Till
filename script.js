document.addEventListener('DOMContentLoaded', function () {
    // DOM elements
    const menuItems = document.querySelectorAll('.item');
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total');
    const reportButton = document.getElementById('report-button');
    const orderList = document.getElementById('order-list');
    const grandTotalElement = document.getElementById('totalAllOrders');
    const modal = document.getElementById('myModal');
    const paymentButtons = document.getElementById('payment-buttons');

    // Data variables
    let cart = [];
    let totalSales = [];
    let paymentMode = '';

    // Event listeners for menu item clicks
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const itemName = item.dataset.name;
            const itemPrice = parseFloat(item.dataset.price);

            // Add selected item to the cart
            cart.push({ name: itemName, price: itemPrice });
            updateCart();
        });
    });

    // Update the cart display
    function updateCart() {
        cartItems.innerHTML = '';
        let totalPrice = 0;

        // Display items in the cart
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - €${item.price.toFixed(2)}`;
            cartItems.appendChild(li);

            totalPrice += item.price;
        });

        // Update the total amount
        totalAmount.textContent = totalPrice.toFixed(2);
    }

window.checkout = function () {
    // Push the current order into totalSales
    totalSales.push({ cart, paymentMode });

    // Reset the cart
    cart = [];
    updateCart();

    // Show a confirmation modal using SweetAlert library
    Swal.fire({
        title: 'Voulez-vous un ticket pour cette commande?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non',
    }).then((result) => {
        if (result.isConfirmed) {
            // If user clicks "Oui," proceed to print tickets
            printTickets();
        }
    });
};


    // Open the order details modal
    window.openModal = function () {
        modal.style.display = 'block';
        displayOrdersInModal();
    };

    // Close the order details modal
    window.closeModal = function () {
        modal.style.display = 'none';
    };

    // Display order details in the modal
    reportButton.addEventListener('click', function () {
        displayOrdersInModal();
        openModal();
    });

    // Handle payment mode selection
    paymentButtons.addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON') {
            paymentMode = event.target.textContent;
            alert(`Mode de paiement sélectionné: ${paymentMode}`);
        }
    });

    // Display order details in the modal
    function displayOrdersInModal() {
        orderList.innerHTML = '';
        let grandTotal = 0;

        // Display order details for each completed order
        totalSales.forEach((order, index) => {
            const orderTotal = getOrderTotal(order.cart);

            // Display order information
            const li = document.createElement('li');
            li.textContent = `Commande ${index + 1} - Mode de paiement: ${order.paymentMode}`;
            li.classList.add('order-item');
            orderList.appendChild(li);

            // Display individual items in the order
            order.cart.forEach(item => {
                const itemLi = document.createElement('li');
                itemLi.textContent = `${item.name} - €${item.price.toFixed(2)}`;
                itemLi.classList.add('order-list');
                orderList.appendChild(itemLi);
            });

            // Display total amount for the order
            const totalLi = document.createElement('li');
            totalLi.textContent = `Total: €${orderTotal.toFixed(2)}`;
            totalLi.classList.add('order-total');
            orderList.appendChild(totalLi);

            // Add a horizontal line to separate orders
            const hr = document.createElement('hr');
            orderList.appendChild(hr);

            grandTotal += orderTotal;
        });

        // Display grand total
        grandTotalElement.textContent = grandTotal.toFixed(2);
    }

    // Calculate the total amount for a specific order
    function getOrderTotal(order) {
        let orderTotal = 0;

        order.forEach(item => {
            orderTotal += item.price;
        });

        return orderTotal;
    }

    // Print tickets for completed orders
    window.printTickets = function () {
        if (totalSales.length === 0) {
            alert('Aucune commande à imprimer.');
            return;
        }

        // Assume each order is a separate ticket
        totalSales.forEach((order, index) => {
            // Open a new window for printing
            const printWindow = window.open('', '_blank');
            printWindow.document.write('<html><head><title>Order Ticket</title></head><body>');

            // Print order details
            printWindow.document.write(`<h2>Commande ${index + 1} - Mode de paiement: ${order.paymentMode}</h2>`);
            order.cart.forEach(item => {
                printWindow.document.write(`<p>${item.name} - €${item.price.toFixed(2)}</p>`);
            });

            // Print total amount
            const orderTotal = getOrderTotal(order.cart);
            printWindow.document.write(`<p>Total: €${orderTotal.toFixed(2)}</p>`);

            // Close the HTML document
            printWindow.document.write('</body></html>');
            printWindow.document.close();

            // Print the window
            printWindow.print();
        });
    };

        // Function to cancel the current transaction and clear the cart
    window.cancelTransaction = function () {
        // Clear the cart
        cart = [];
        updateCart();

        // Reset the total amount to 0
        totalAmount.textContent = '0.00';
    };

});
