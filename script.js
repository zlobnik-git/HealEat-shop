let cartCount = 0;

document.querySelectorAll('.product button').forEach(btn => {
    btn.addEventListener('click', () => {
        cartCount++;
        document.querySelector('.cart-btn').innerText = "🛒 Корзина (" + cartCount + ")";
        alert("Товар добавлен в корзину!");
    });
});

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        alert("Переход в раздел: " + card.querySelector('h2').innerText);
    });
});
