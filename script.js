// script.js
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCounter = document.querySelector('.cart-count');

function updateCartCount() {
  cartCounter.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

updateCartCount();

document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const product = btn.closest('.product');
    const name = product.dataset.name;
    const price = parseInt(product.dataset.price);
    const img = product.dataset.img;
    
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ name, price, img, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    // alert('Добавлено в корзину!');
  });
});

// Для перехода по категориям
const categoryMap = {
  'Мясо, птица': 'meat.html',
  'Готовая еда': 'food.html',
  'Фрукты и овощи': 'fruits.html',
  'Сладости': 'sweet.html',
  'Молочные продукты': 'milk.html',
  'Выпечка': 'bakery.html'
};

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    const title = card.querySelector('h2').innerText;
    const page = categoryMap[title];
    if (page) {
      window.location.href = `pages/category/${page}`;
    }
  });
});

// Для страницы корзины
if (document.querySelector('.basket-items')) {
  function renderCart() {
    const container = document.querySelector('.basket-items');
    container.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'basket-item';
      div.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div class="basket-item-info">
          <h4>${item.name}</h4>
          <p>${item.price} ₽ x ${item.quantity} = ${item.price * item.quantity} ₽</p>
          <div class="quantity">
            <button onclick="changeQuantity(${index}, -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="changeQuantity(${index}, 1)">+</button>
          </div>
        </div>
        <button class="remove-btn" onclick="removeItem(${index})"><i class="fas fa-trash"></i></button>
      `;
      container.appendChild(div);
      total += item.price * item.quantity;
    });
    
    document.getElementById('total-price').textContent = `${total} ₽`;
  }
  
  window.changeQuantity = (index, delta) => {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
  };
  
  window.removeItem = (index) => {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
  };
  
  renderCart();
}

// Для кнопки оформления (пока просто alert)
document.querySelector('.checkout-btn')?.addEventListener('click', () => {
  alert('Заказ оформлен! Спасибо за покупку.');
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
});