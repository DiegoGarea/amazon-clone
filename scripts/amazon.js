import {addToCart, calculateCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

// import {cart as myCart} from '../data/cart.js'; --esto sirve para cambiar el nombre de la variable y no tener conflico, ya que se asigno con otro nombre

let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
  <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">$${formatCurrency(
            product.priceCents
          )}</div>

          

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
          Add to Cart
          </button>
        </div>
  `;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const {productId} = button.dataset;
    addToCart(productId);
    updateCartQuantity();

    // const quantitySelector = document.getElementById(
    //   `js-quantity-selector-${productId}`
    // );
    // const quantity = Number(quantitySelector.value);

    let timeoutId;

    const addedText = document.querySelector(`.js-added-to-cart-${productId}`);

    addedText.classList.add('added-cart-visible');

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      addedText.classList.remove('added-cart-visible');
    }, 2000);

    button.addEventListener('click', () => {
      clearTimeout(timeoutId);
    });
  });
});

updateCartQuantity();
