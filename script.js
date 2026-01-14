// Load Cart from Local Storage on Page Load
let cart = JSON.parse(localStorage.getItem('vnurtureCart')) || [];
updateCartCount();

// Page Loader Logic
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1500); // 1.5 seconds loading time
    }
});

// Function to change quantity input
function changeQty(productId, delta) {
    const input = document.getElementById(`qty-${productId}`);
    let currentValue = parseInt(input.value);
    let newValue = currentValue + delta;
    if (newValue >= 1) {
        input.value = newValue;
    }
}

// Function to Add item to Cart
function addToCart(productName, productId) {
    const qty = document.getElementById(`qty-${productId}`).value;
    const sizeSelect = document.getElementById(`size-${productId}`);
    const size = sizeSelect ? sizeSelect.value : 'Standard';

    // Add to cart array
    cart.push({
        product: productName,
        qty: qty,
        size: size
    });

    // SAVE TO LOCAL STORAGE (Persist on Refresh)
    localStorage.setItem('vnurtureCart', JSON.stringify(cart));
    updateCartCount();

    // Show a quick alert
    alert(`${qty} x ${productName} (${size}) added to cart!`);
}

function updateCartCount() {
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.innerText = cart.length;
    }
}

// Clear Cart Function
function clearCart() {
    cart = [];
    localStorage.setItem('vnurtureCart', JSON.stringify(cart));
    updateCartCount();
    toggleCart(); // Refresh cart view
}

// Toggle Cart Modal
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    const itemsContainer = document.getElementById('cart-items');
    
    if (modal.style.display === 'flex') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'flex';
        // Render items
        itemsContainer.innerHTML = '';
        if (cart.length === 0) {
            itemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach((item, index) => {
                itemsContainer.innerHTML += `
                    <div style="text-align: left; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
                        <strong>${item.product}</strong><br>
                        Size: ${item.size} | Qty: ${item.qty}
                    </div>
                `;
            });
        }
    }
}

// WhatsApp Checkout Logic
function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    const phoneNumber = "919731544680"; 
    let message = "Hey V Nurture, I would like to place an order:\n\n";

    cart.forEach(item => {
        message += `- ${item.product} (Size: ${item.size}, Qty: ${item.qty})\n`;
    });

    message += "\nPlease confirm my order.";

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
}