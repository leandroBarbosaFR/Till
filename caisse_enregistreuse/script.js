// document.addEventListener('DOMContentLoaded', function () {
//     const menuItems = document.querySelectorAll('.item');
//     const cartItems = document.getElementById('cart-items');
//     const totalAmount = document.getElementById('total');
//     let cart = [];

//     menuItems.forEach(item => {
//         item.addEventListener('click', () => {
//             const itemName = item.dataset.name;
//             const itemPrice = parseFloat(item.dataset.price);

//             cart.push({ name: itemName, price: itemPrice });
//             updateCart();
//         });
//     });

//     function updateCart() {
//         cartItems.innerHTML = '';
//         let totalPrice = 0;

//         cart.forEach(item => {
//             const li = document.createElement('li');
//             li.textContent = `${item.name} - €${item.price.toFixed(2)}`;
//             cartItems.appendChild(li);

//             totalPrice += item.price;
//         });

//         totalAmount.textContent = totalPrice.toFixed(2);
//     }

//     window.checkout = function () {
//         alert('Commande finalisée! Total: €' + totalAmount.textContent);
//         cart = [];
//         updateCart();
//     };

//     window.cancelTransaction = function () {
//         cart = [];
//         updateCart();
//     };
//    // Function to open the modal
//     window.openModal = function () {
//         const modal = document.getElementById('myModal');
//         modal.style.display = 'block';

//         // Display the order details in the modal using a closure
//         displayOrdersInModal([...cart]); // Pass a copy of the cart data to the function
//     };

//     // Function to close the modal
//     window.closeModal = function () {
//         const modal = document.getElementById('myModal');
//         modal.style.display = 'none';
//     };

//  // Function to display orders in the modal
// function displayOrdersInModal(cartData) {
//         const orderList = document.getElementById('order-list');
//         const grandTotalElement = document.getElementById('totalAllOrders');

//         orderList.innerHTML = '';
//         let grandTotal = 0;

//         // Loop through each order
//         for (let i = 0; i < cartData.length; i++) {
//             const order = cartData[i];
//             const orderTotal = getOrderTotal(order);

//             // Display order items
//             const li = document.createElement('li');
//             li.textContent = `${order.name} - €${order.price.toFixed(2)}`;
//             orderList.appendChild(li);

//             // Display order total
//             const totalLi = document.createElement('li');
//             totalLi.textContent = `Total: €${orderTotal.toFixed(2)}`;
//             orderList.appendChild(totalLi);

//             // Add order total to the grand total
//             grandTotal += orderTotal;
//         }

//         // Display grand total
//         grandTotalElement.textContent = grandTotal.toFixed(2);
//     }

//     // Function to calculate the total for a specific order
//     function getOrderTotal(order) {
//         let orderTotal = 0;

//         order.forEach(item => {
//             orderTotal += item.price;
//         });

//         return orderTotal;
//     }
// });

document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.item');
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total');
    const reportButton = document.getElementById('report-button');
    const orderList = document.getElementById('order-list');
    const grandTotalElement = document.getElementById('totalAllOrders');
    const modal = document.getElementById('myModal');

    let cart = [];
    let totalSales = [];

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const itemName = item.dataset.name;
            const itemPrice = parseFloat(item.dataset.price);

            cart.push({ name: itemName, price: itemPrice });
            updateCart();
        });
    });

    function updateCart() {
        cartItems.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - €${item.price.toFixed(2)}`;
            cartItems.appendChild(li);

            totalPrice += item.price;
        });

        totalAmount.textContent = totalPrice.toFixed(2);
    }

    window.checkout = function () {
        alert('Commande finalisée! Total: €' + totalAmount.textContent);
        totalSales.push([...cart]); // Save the current order
        cart = [];
        updateCart();
    };

    window.openModal = function () {
        modal.style.display = 'block';
        displayOrdersInModal();
    };

    window.closeModal = function () {
        modal.style.display = 'none';
    };

    reportButton.addEventListener('click', function () {
        displayOrdersInModal();
        openModal();
    });

function displayOrdersInModal() {
    orderList.innerHTML = '';
    let grandTotal = 0;

    totalSales.forEach((order, index) => {
        const orderTotal = getOrderTotal(order);

        // Display order items
        const li = document.createElement('li');
        li.textContent = `Commande ${index + 1}`;
        li.classList.add('order-item'); // Add a class to the li element
        orderList.appendChild(li);


        order.forEach(item => {
            const itemLi = document.createElement('li');
            itemLi.textContent = `${item.name} - €${item.price.toFixed(2)}`;
            li.classList.add('order-list'); // Add a class to the itemLi element
            orderList.appendChild(itemLi);
        });

        // Display order total
        const totalLi = document.createElement('li');
        totalLi.textContent = `Total: €${orderTotal.toFixed(2)}`;
        totalLi.classList.add('order-total'); // Add a class to the totalLi element
        orderList.appendChild(totalLi);


        // Add a horizontal line to separate orders
        const hr = document.createElement('hr');
        orderList.appendChild(hr);

        // Add order total to the grand total
        grandTotal += orderTotal;
    });

    // Display grand total
    grandTotalElement.textContent = grandTotal.toFixed(2);
}


    function getOrderTotal(order) {
        let orderTotal = 0;

        order.forEach(item => {
            orderTotal += item.price;
        });

        return orderTotal;
    }
});
