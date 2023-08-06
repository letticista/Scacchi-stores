// Funzione per ottenere i prodotti dal server utilizzando PHP
async function getProductsFromServer() {
  try {
    const response = await fetch('/getProducts'); // Assicurati di avere una rotta nel tuo server che restituisce i dati dei prodotti
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
  const selectedProducts = await getProductsFromServer();

  productsContainer.innerHTML = ''; // Pulisci la lista dei prodotti

  // Visualizza i prodotti
  selectedProducts.forEach((product) => {
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

    productDiv.appendChild(productImage);
    productDiv.appendChild(productNameElement);
    productDiv.appendChild(productDescriptionElement);
    productDiv.appendChild(productPriceElement);

    productsContainer.appendChild(productDiv);
  });
}

// Esegui la funzione per visualizzare i prodotti quando il DOM è completamente caricato
document.addEventListener('DOMContentLoaded', () => {
  displayProducts();
});
