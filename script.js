// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true
});

// State
let cart = [];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCountElement = document.getElementById('cart-count');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initialize
function init() {
    renderProducts(products); // Load all products initially
    setupEventListeners();
}

// Format Currency
function formatCurrency(amount) {
    return '₦' + amount.toLocaleString();
}

// Render Products
function renderProducts(items) {
    productGrid.innerHTML = items.map((product, index) => `
        <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="glass-card h-100 position-relative">
                <div class="overflow-hidden">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                </div>
                <div class="card-body p-4 text-white">
                    <span class="card-category d-block mb-2">${product.category}</span>
                    <h5 class="card-title fw-bold mb-3">${product.name}</h5>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <span class="card-price">${formatCurrency(product.price)}</span>
                        <button class="btn btn-sm btn-light rounded-circle p-2" onclick="addToCart(${product.id})">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter Functionality
function setupEventListeners() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            e.target.classList.add('active');

            const category = e.target.dataset.category;
            if (category === 'all') {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.category === category);
                renderProducts(filtered);
            }
        });
    });

    // Navbar links
    const navLinks = document.querySelectorAll('.nav-link[data-category]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const category = e.target.dataset.category;
            if (category) {
                filterBtns.forEach(b => {
                    if (b.dataset.category === category) b.classList.add('active');
                    else b.classList.remove('active');
                });

                if (category === 'all') {
                    renderProducts(products);
                } else {
                    const filtered = products.filter(p => p.category === category);
                    renderProducts(filtered);
                }
            }
        });
    });
}

// Cart Functionality
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    const cartOffcanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
    cartOffcanvas.show();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function updateCartUI() {
    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;

    // Update total price
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = formatCurrency(totalPrice);

    // Update items list
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-center text-white-50 mt-5">Your cart is empty.</p>';
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="d-flex align-items-center mb-3 p-2 rounded-3" style="background: rgba(255,255,255,0.05);">
            <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 10px;">
            <div class="ms-3 flex-grow-1 text-white">
                <h6 class="mb-0 fw-bold font-heading" style="font-size: 0.9rem;">${item.name}</h6>
                <small class="text-white-50">${formatCurrency(item.price)} x ${item.quantity}</small>
            </div>
            <button onclick="removeFromCart(${item.id})" class="btn btn-sm text-danger border-0"><i class="fas fa-trash"></i></button>
        </div>
    `).join('');
}

// Run init
init();
