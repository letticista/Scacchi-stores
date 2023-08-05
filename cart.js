// Funzione per ottenere i prodotti dal file di testo
async function getProductsFromFile() {
  try {
    const response = await fetch('/getCartProducts');
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Errore durante il recupero dei prodotti dal server:', error);
    return [];
  }
}

// Funzione per visualizzare i prodotti nel carrello
async function displayCart() {
  const cartItems = document.querySelector('.cart-items');
  const cartTotal = document.querySelector('.cart-total');

  // Ottieni i prodotti dal server
  const selectedProducts = await getProductsFromFile();

  // Pulisci la lista dei prodotti nel carrello
  cartItems.innerHTML = '';

  // Visualizza i prodotti nel carrello
  selectedProducts.forEach((product) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.name;

    const productNameElement = document.createElement('h3');
    productNameElement.textContent = product.name;

    const productPriceElement = document.createElement('span');
    productPriceElement.textContent = `Prezzo: €${product.price.toFixed(2)}`;

    cartItem.appendChild(productImage);
    cartItem.appendChild(productNameElement);
    cartItem.appendChild(productPriceElement);

    cartItems.appendChild(cartItem);
  });

  // Aggiorna il totale del carrello
  updateCartTotal(selectedProducts);
}

// Funzione per aggiornare il totale del carrello
function updateCartTotal(products) {
  const cartTotal = document.querySelector('.cart-total');
  let total = 0;

  // Calcola il totale dei prodotti nel carrello
  products.forEach((product) => {
    total += product.price;
  });

  cartTotal.textContent = `Totale: €${total.toFixed(2)}`;
}

// Aggiungi l'evento DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  displayCart();
});
