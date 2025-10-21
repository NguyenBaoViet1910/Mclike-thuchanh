// ----------------------------
// DỮ LIỆU MÓN ĂN
// ----------------------------
const menuData = {
  burger: [
    { name: "Burger Bò Phô Mai", price: 49000, img: "images/buger/bophomai.jpg" },
    { name: "Burger Gà Giòn Cay", price: 45000, img: "images/buger/gagioncay.jpg" },
    { name: "Burger Tôm", price: 47000, img: "images/buger/tom.jpg" },
    { name: "Burger Bò BBQ", price: 52000, img: "images/buger/bbq.jpg" },
    { name: "Burger Xúc Xích", price: 50000, img: "images/buger/xucxich.jpg" },
    { name: "Cheese Burger", price: 55000, img: "images/buger/cheese.jpg" },
    { name: "Burger Gà Phô Mai", price: 53000, img: "images/buger/gaphomai.jpg" }
  ],
  chicken: [
    { name: "Gà Rán Truyền Thống", price: 35000, img: "images/chicken/garan.jpg" },
    { name: "Gà Cay Sốt Hàn", price: 38000, img: "images/chicken/gasothan.jpg" },
    { name: "Gà Không Xương", price: 42000, img: "images/chicken/gakhongxuong.jpg" },
    { name: "Gà Rán Phô Mai", price: 45000, img: "images/chicken/gaphomai.jpg" },
    { name: "Gà BBQ", price: 47000, img: "images/chicken/gabbq.jpg" },
    { name: "Gà Giòn Cay", price: 40000, img: "images/chicken/gagioncay.jpg" },
    { name: "Gà Rán Family", price: 85000, img: "images/chicken/gafamily.jpg" }
  ],
  pizza: [
    { name: "Pizza Hải Sản", price: 99000, img: "images/pizza/pizzahaisan.jpg" },
    { name: "Pizza Bò Bằm", price: 89000, img: "images/pizza/pizzabobam.jpg" },
    { name: "Pizza Gà BBQ", price: 93000, img: "images/pizza/pizzagabbq.jpg" },
    { name: "Pizza Phô Mai", price: 95000, img: "images/pizza/pizzaphomai.jpg" },
    { name: "Pizza Xúc Xích", price: 90000, img: "images/pizza/pizzaxucxich.jpg" },
    { name: "Pizza Bò BBQ", price: 97000, img: "images/pizza/pizzabobbq.jpg" },
    { name: "Pizza Thập Cẩm", price: 105000, img: "images/pizza/pizzathapcam.jpg" }
  ],
  drink: [
    { name: "Coca Cola", price: 15000, img: "images/drinks/cocacola.jpg" },
    { name: "Trà Đào Cam Sả", price: 25000, img: "images/drinks/tradaocamsa.jpg" },
    { name: "Cafe Sữa Đá", price: 20000, img: "images/drinks/cafesuada.jpg" },
    { name: "Nước Cam Ép", price: 20000, img: "images/drinks/nuoccam.jpg" },
    { name: "Trà Sữa Trân Châu", price: 30000, img: "images/drinks/trasuatranchau.jpg" },
    { name: "Sinh Tố Bơ", price: 30000, img: "images/drinks/sinhtobo.jpg" },
    { name: "Pepsi", price: 15000, img: "images/drinks/pepsi.jpg" }
  ],
  combo: [
    { name: "Combo Gà + Khoai + Nước", price: 79000, img: "images/combo/gakhoainuoc.jpg" },
    { name: "Combo Burger + Nước", price: 69000, img: "images/combo/burgernuoc.jpg" },
    { name: "Combo Pizza + Nước", price: 109000, img: "images/combo/pizzanuoc.jpg" },
    { name: "Combo Gà + Burger", price: 125000, img: "images/combo/gaburger.jpg" },
    { name: "Combo Family", price: 250000, img: "images/combo/familycombo.jpg" },
  ]
};

// ----------------------------
// RENDER MENU
// ----------------------------
function renderMenu() {
  for (const section in menuData) {
    const list = document.getElementById(`${section}List`);
    if (!list) continue;

    list.innerHTML = menuData[section]
      .map(
        (item, i) => `
        <div class="col-6 col-md-4 col-lg-3">  <!-- Sử dụng Bootstrap grid để responsive -->
          <div class="card menu-card">  <!-- Thêm class menu-card để áp dụng CSS -->
            <img src="${item.img}" class="card-img-top" alt="${item.name}">
            <div class="card-body text-center p-2">
              <h6 class="fw-bold mb-1">${item.name}</h6>
              <p class="text-mc-red fw-bold mb-2">${item.price.toLocaleString()}₫</p>
              <button class="btn btn-warning btn-sm fw-bold w-100" onclick="addToCart('${section}', ${i})">Thêm vào giỏ</button>
            </div>
          </div>
        </div>`
      )
      .join("");
  }
}

// ----------------------------
// GIỎ HÀNG
// ----------------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartBadge() {
  document.getElementById("cartBadge").textContent = cart.length;
}

function calcTotal() {
  return cart.reduce((t, i) => t + i.price, 0);
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (cart.length === 0) {
    cartItems.innerHTML = `<div class="text-muted">Giỏ hàng trống</div>`;
    cartTotal.textContent = "0₫";
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item, i) => `
      <div class="d-flex align-items-center justify-content-between mb-2 border-bottom pb-2">
        <div>
          <strong>${item.name}</strong><br>
          <small>${item.price.toLocaleString()}₫</small>
        </div>
        <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${i})">x</button>
      </div>`
    )
    .join("");

  cartTotal.textContent = calcTotal().toLocaleString() + "₫";
}

function addToCart(section, index) {
  const item = menuData[section][index];
  cart.push(item);
  saveCart();
  updateCartBadge();
  renderCart();
  showToast(`Đã thêm ${item.name} vào giỏ hàng`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartBadge();
  renderCart();
}

document.getElementById("clearCart").addEventListener("click", () => {
  if (confirm("Xóa toàn bộ giỏ hàng?")) {
    cart = [];
    saveCart();
    updateCartBadge();
    renderCart();
  }
});

// ----------------------------
// CART PANEL TOGGLE
// ----------------------------
const cartPanel = document.getElementById("cartPanel");
const cartBtn = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");

cartBtn.addEventListener("click", () => {
  cartPanel.classList.add("open");
});
closeCart.addEventListener("click", () => {
  cartPanel.classList.remove("open");
});

// ----------------------------
// TOAST THÔNG BÁO
// ----------------------------
function showToast(msg) {
  const toastEl = document.getElementById("addToast");
  const body = document.getElementById("addToastBody");
  body.textContent = msg;
  const toast = new bootstrap.Toast(toastEl, { delay: 1500 });
  toast.show();
}

// ----------------------------
// LOGIN / REGISTER MODAL
// ----------------------------
document.getElementById("openRegister").addEventListener("click", (e) => {
  e.preventDefault();
  const loginModal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
  loginModal.hide();
  new bootstrap.Modal(document.getElementById("registerModal")).show();
});

// ----------------------------
// INIT
// ----------------------------
renderMenu();
renderCart();
updateCartBadge();
// ----------------------------
// CHECKOUT - THANH TOÁN
// ----------------------------
const checkoutBtn = document.getElementById("checkoutBtn");

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Giỏ hàng trống!");
    return;
  }

  // Render danh sách đơn
  const checkoutList = document.getElementById("checkoutList");
  checkoutList.innerHTML = cart
    .map(
      (i) => `
        <div class="d-flex justify-content-between">
          <span>${i.name}</span>
          <span>${i.price.toLocaleString()}₫</span>
        </div>`
    )
    .join("");

  document.getElementById("checkoutTotal").textContent = calcTotal().toLocaleString() + "₫";

  new bootstrap.Modal(document.getElementById("checkoutModal")).show();
});

document.getElementById("checkoutConfirm").addEventListener("click", () => {
  const addr = document.getElementById("checkoutAddress").value.trim();
  const payMethod = document.getElementById("checkoutMethod").value;

  if (!addr) {
    alert("Vui lòng nhập địa chỉ giao hàng!");
    return;
  }

  // Giả lập đặt hàng
  const modal = bootstrap.Modal.getInstance(document.getElementById("checkoutModal"));
  modal.hide();

  showToast("🎉 Đặt hàng thành công! Cảm ơn bạn.");
  cart = [];
  saveCart();
  renderCart();
  updateCartBadge();
});
