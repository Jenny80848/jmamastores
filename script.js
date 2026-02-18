// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true
});

// State
let cart = JSON.parse(localStorage.getItem('jmama_cart')) || [];

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
    updateCartUI(); // Initialize cart UI from storage
    renderCartPage(); // Initialize cart page if present
    renderProductDetails(); // Initialize PDP if present
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
                    <a href="product.html?id=${product.id}">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    </a>
                </div>
                <div class="card-body p-4 text-white">
                    <span class="card-category d-block mb-2">${product.category}</span>
                    <h5 class="card-title fw-bold mb-3"><a href="product.html?id=${product.id}" class="text-white text-decoration-none">${product.name}</a></h5>
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

// Render Product Details (for product.html)
function renderProductDetails() {
    const container = document.getElementById('product-details-container');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);

    if (!product) {
        container.innerHTML = '<div class="text-center py-5"><h3>Product not found</h3><a href="index.html" class="btn btn-glow mt-3">Back to Store</a></div>';
        return;
    }

    container.innerHTML = `
        <div class="row g-5 align-items-center">
            <div class="col-lg-6">
                <div class="glass-card p-2">
                    <img src="${product.image}" class="img-fluid rounded-4 w-100" alt="${product.name}">
                </div>
            </div>
            <div class="col-lg-6">
                <span class="text-info text-uppercase fw-bold letter-spacing-2">${product.category}</span>
                <h1 class="display-4 fw-bold mt-2 mb-4">${product.name}</h1>
                <p class="lead text-white-50 mb-4">Experience premium quality with our ${product.name}. Carefully selected for the best value and satisfaction.</p>
                
                <h2 class="gradient-text fw-bold mb-4">${formatCurrency(product.price)}</h2>
                
                <div class="d-flex gap-3 mb-5">
                    <button class="btn btn-glow btn-lg px-5 rounded-pill" onclick="addToCart(${product.id})">ADD TO CART</button>
                    <button class="btn btn-outline-light btn-lg rounded-circle"><i class="far fa-heart"></i></button>
                </div>

                <div class="glass-card p-4">
                    <div class="d-flex align-items-center mb-3">
                        <i class="fas fa-truck text-warning fa-lg me-3"></i>
                        <div>
                            <h6 class="fw-bold mb-0">Fast Delivery</h6>
                            <small class="text-white-50">Delivery within 24 hours in Abuja</small>
                        </div>
                    </div>
                     <div class="d-flex align-items-center">
                        <i class="fas fa-shield-alt text-success fa-lg me-3"></i>
                        <div>
                            <h6 class="fw-bold mb-0">Quality Guarantee</h6>
                            <small class="text-white-50">Verified authentic products</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Render Related Products (Same category, excluding current)
    const relatedContainer = document.getElementById('related-products');
    if (relatedContainer) {
        const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
        relatedContainer.innerHTML = related.map((item, index) => `
            <div class="col-md-6 col-lg-3">
                 <div class="glass-card h-100 position-relative">
                    <div class="overflow-hidden">
                        <a href="product.html?id=${item.id}">
                            <img src="${item.image}" class="card-img-top" alt="${item.name}" style="height: 200px;">
                        </a>
                    </div>
                    <div class="card-body p-3 text-white">
                        <h6 class="card-title fw-bold mb-2 text-truncate"><a href="product.html?id=${item.id}" class="text-white text-decoration-none">${item.name}</a></h6>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="text-info fw-bold">${formatCurrency(item.price)}</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
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
// Cart Functionality
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartUI();
    const cartOffcanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
    cartOffcanvas.show();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
    // Also re-render cart page if we are on it
    renderCartPage();
}

function saveCart() {
    localStorage.setItem('jmama_cart', JSON.stringify(cart));
}

function updateCartUI() {
    // Check if elements exist (might not on all pages if offcanvas is removed, but it is present)
    if (!cartCountElement || !cartTotalElement || !cartItemsContainer) return;

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

// Render Cart Page (for cart.html)
function renderCartPage() {
    const cartPageBody = document.getElementById('cart-page-body');
    const cartPageTotal = document.getElementById('cart-page-total');
    const cartPageSubtotal = document.getElementById('cart-page-subtotal');

    if (!cartPageBody) return;

    if (cart.length === 0) {
        cartPageBody.innerHTML = '<tr><td colspan="6" class="text-center py-5"><h4 class="text-white">Your cart is empty.</h4><a href="index.html#products" class="btn btn-link text-warning">Start Shopping</a></td></tr>';
        if (cartPageTotal) cartPageTotal.textContent = formatCurrency(0);
        if (cartPageSubtotal) cartPageSubtotal.textContent = formatCurrency(0);
        return;
    }

    cartPageBody.innerHTML = cart.map(item => `
        <tr class="align-middle" style="border-bottom: 1px solid rgba(255,255,255,0.1);">
            <td style="width: 100px;">
                <img src="${item.image}" alt="${item.name}" class="rounded-3" style="width: 80px; height: 80px; object-fit: cover;">
            </td>
            <td>
                <h5 class="mb-1 text-white">${item.name}</h5>
                <small class="text-white-50 text-uppercase" style="letter-spacing: 1px;">${item.category}</small>
            </td>
            <td class="text-white">${formatCurrency(item.price)}</td>
            <td>
                <div class="d-flex align-items-center bg-dark rounded-pill p-1" style="width: fit-content; border: 1px solid rgba(255,255,255,0.2);">
                    <button class="btn btn-sm text-white rounded-circle" onclick="updateQuantity(${item.id}, -1)">
                        <i class="fas fa-minus fa-xs"></i>
                    </button>
                    <span class="mx-2 text-white fw-bold small">${item.quantity}</span>
                    <button class="btn btn-sm text-white rounded-circle" onclick="updateQuantity(${item.id}, 1)">
                        <i class="fas fa-plus fa-xs"></i>
                    </button>
                </div>
            </td>
            <td class="text-white text-end fw-bold">${formatCurrency(item.price * item.quantity)}</td>
            <td class="text-end">
                <button onclick="removeFromCart(${item.id})" class="btn btn-link text-danger p-0">
                    <i class="fas fa-times"></i>
                </button>
            </td>
        </tr>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartPageTotal) cartPageTotal.textContent = formatCurrency(total);
    if (cartPageSubtotal) cartPageSubtotal.textContent = formatCurrency(total);
}

function updateQuantity(id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            saveCart();
            updateCartUI(); // Update header cart
            renderCartPage(); // Update full cart page
        }
    }
}

// Run init
init();
