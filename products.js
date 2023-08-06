// Funzione per ottenere i prodotti dal server
async function getProductsFromServer() {
  try {
    const response = await fetch('/getProducts');
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Errore durante il recupero dei prodotti dal server:', error);
    return [];
  }
}

// Funzione per visualizzare i prodotti nella pagina
async function displayProducts() {
  const productsContainer = document.querySelector('.products-grid');

  // Ottieni i prodotti dal server
  const products = await getProductsFromServer();

  products.forEach((product) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    const productImage = document.createElement('img');
    productImage.src = product.image_url;
    productImage.alt = product.product_name;

    const productNameElement = document.createElement('h3');
    productNameElement.textContent = product.product_name;

    const productDescriptionElement = document.createElement('p');
    productDescriptionElement.textContent = product.description;

    const productPriceElement = document.createElement('span');
    productPriceElement.textContent = `Prezzo: €${product.price.toFixed(2)}`;

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Aggiungi al Carrello';
    addToCartButton.setAttribute('data-product', product.product_name);
    addToCartButton.setAttribute('data-price', product.price);
    addToCartButton.addEventListener('click', addToCart);

    productDiv.appendChild(productImage);
    productDiv.appendChild(productNameElement);
    productDiv.appendChild(productDescriptionElement);
    productDiv.appendChild(productPriceElement);
    productDiv.appendChild(addToCartButton);

    productsContainer.appendChild(productDiv);
  });
}

// Funzione per aggiungere un prodotto al carrello
async function addToCart(event) {
  const productName = event.target.dataset.product;
  const productPrice = parseFloat(event.target.dataset.price);

  try {
    const response = await fetch('/addToCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 'user123', // Sostituisci con l'ID dell'utente corrente
        productId: productName,
        quantity: 1, // Quantità fisssa per l'esempio
      }),
    });

    if (!response.ok) {
      throw new Error('Errore durante l\'aggiunta del prodotto al carrello.');
    }

    alert(`Prodotto ${productName} aggiunto al carrello.`);
  } catch (error) {
    console.error('Errore durante l\'aggiunta del prodotto al carrello:', error);
    alert('Si è verificato un errore durante l\'aggiunta del prodotto al carrello.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  displayProducts();
});
