// 1. Sticky Header Logic
window.addEventListener('scroll', function() {
    var header = document.querySelector('.header');
    if (window.scrollY > 20) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// 2. Mobile Menu Toggle Logic (Fix for "Menu not opening")
const mobileMenuBtn = document.getElementById('mobile-menu');
const navbar = document.querySelector('.navbar');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        // This adds/removes the "active" class to show/hide the menu
        navbar.classList.toggle('active');
        // Optional: Change icon shape if you want (e.g., bars to X)
        mobileMenuBtn.classList.toggle('is-active'); 
    });
}
// --- CONFIGURATION ---
// I added '91' before your number for the WhatsApp link to work correctly
const WHATSAPP_PHONE = "919731544680"; 
// --- CONFIGURATION ---
// REPLACE THIS WITH YOUR ACTUAL WHATSAPP NUMBER (International format without +)
const WHATSAPP_PHONE = "919999999999"; 

// --- PRODUCT DATA ---
const products = [
    {
        id: 101,
        name: "Premium Organic Moringa Powder",
        weight: "250g",
        price: 350, 
        description: "Purely sourced from the fertile lands of Gujarat. 100% Organically grown, sun-dried, and ground to perfection.",
        image: "images/WhatsApp Image 2026-01-14 at 1.47.25 AM.jpeg", 
        isDummy: false
    },
    {
        id: 103,
        name: "Ashwagandha",
        weight: "Coming Soon",
        price: 0,
        description: "Coming soon. The ancient root of strength and vitality.",
        image: "images/dummy2.png",
        isDummy: true
    },
    {
        id: 104,
        name: "Triphala Mix",
        weight: "Coming Soon",
        price: 0,
        description: "Coming soon. The ultimate digestive balancer.",
        image: "images/dummy3.png",
        isDummy: true
    }
];

// --- APP STATE ---
let cart = [];

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});

// --- RENDER PRODUCTS ---
function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    products.forEach(product => {
        const isDummyClass = product.isDummy ? 'dummy-card' : '';
        
        // Button Logic: Disable if dummy
        const buttonHTML = product.isDummy 
            ? `<button class="btn-add" disabled style="background:#ccc; cursor:not-allowed;">Coming Soon</button>`
            : `<button class="btn-add" onclick="addToCart(${product.id})">Add to Cart</button>`;

        // Price Logic: Hide price if dummy
        const priceDisplay = product.isDummy ? '' : `₹${product.price}`;

        // Badge Logic: Show Green "Coming Soon" badge if dummy
        const badgeHTML = product.isDummy 
            ? `<span class="badge">Coming Soon</span>` 
            : '';

        // Create Card HTML
        const cardHTML = `
            <div class="product-card ${isDummyClass}">
                <div class="card-img-container">
                    ${badgeHTML}
                    <img src="${product.image}" alt="${product.name}" class="card-img" onerror="this.src='https://placehold.co/200x200?text=Coming+Soon'">
                </div>
                <div class="card-details">
                    <h3 class="card-title">${product.name}</h3>
                    <div class="card-weight">${product.weight}</div>
                    <p class="card-desc">${product.description}</p>
                    <div class="card-price-row">
                        <div class="price">${priceDisplay}</div>
                        ${buttonHTML}
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += cardHTML;
    });
}

// --- CART FUNCTIONS ---

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.querySelector('.cart-overlay');
    
    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
    } else {
        sidebar.classList.add('open');
        overlay.classList.add('open');
    }
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    updateCartUI();
    // Automatically open cart when adding
    document.getElementById('cart-sidebar').classList.add('open');
    document.querySelector('.cart-overlay').classList.add('open');
}

function updateQty(id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
    }
    updateCartUI();
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    // Update Badge
    const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
    cartCount.innerText = totalQty;

    // Render Items
    cartItemsContainer.innerHTML = '';
    let totalAmount = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            totalAmount += item.price * item.qty;
            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <div class="item-info">
                        <h4>${item.name}</h4>
                        <span>${item.weight} x ${item.qty}</span>
                        <div style="font-weight:600; margin-top:5px;">₹${item.price * item.qty}</div>
                    </div>
                    <div class="item-controls">
                        <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                    </div>
                </div>
            `;
        });
    }

    cartTotal.innerText = `₹${totalAmount}`;
}

// --- WHATSAPP CHECKOUT ---
function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = "Hello V-Nurture! I would like to place an order:%0A%0A";
    let total = 0;

    cart.forEach((item, index) => {
        const lineTotal = item.price * item.qty;
        total += lineTotal;
        message += `${index + 1}. *${item.name}* (${item.weight})%0A`;
        message += `   Quantity: ${item.qty}%0A`;
        message += `   Price: ₹${lineTotal}%0A%0A`;
    });

    message += `*Total Amount: ₹${total}*`;
    message += `%0A%0APlease confirm availability and payment details.`;

    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${message}`;
    window.open(url, '_blank');
}
