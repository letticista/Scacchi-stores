// Definizione dei prodotti
const products = [
  {
    name: "Scacchiera in Legno",
    price: 59.99,
    image: "https://example.com/path/to/product1.jpg",
    description: "Goditi partite di scacchi con questa scacchiera in legno di alta qualità. Il design elegante e la finitura liscia rendono ogni partita un'esperienza unica.",
  },
  {
    name: "Set di Scacchi da Viaggio",
    price: 24.99,
    image: "https://example.com/path/to/product2.jpg",
    description: "Porta i tuoi scacchi ovunque tu vada con questo set da viaggio compatto. Perfetto per le partite in movimento o durante i viaggi.",
  },
  {
    name: "Pezzi di Scacchi in Marmo",
    price: 89.99,
    image: "https://example.com/path/to/product3.jpg",
    description: "Aggiungi un tocco di eleganza al tuo gioco con questi pezzi di scacchi realizzati in pregiato marmo italiano. Ideali per scacchiere di dimensioni standard.",
  },
  {
    name: "Scacchiera Magnetica",
    price: 34.99,
    image: "https://example.com/path/to/product4.jpg",
    description: "Gioca a scacchi ovunque con questa scacchiera magnetica. I pezzi si aderiscono saldamente alla scacchiera, rendendo il gioco facile e divertente anche in movimento.",
  },
  {
    name: "Orologio da Scacchi",
    price: 49.99,
    image: "https://example.com/path/to/product5.jpg",
    description: "Prendi il controllo del tempo durante le tue partite di scacchi con questo elegante orologio da scacchi digitale. Gestisci il tempo con precisione per vincere le partite.",
  },
  {
    name: "Set di Scacchi in Vetro",
    price: 99.99,
    image: "https://example.com/path/to/product6.jpg",
    description: "Amplia la tua collezione di scacchi con questo set in vetro soffiato a mano. I dettagli artistici e l'artigianato di alta qualità lo rendono un pezzo da esposizione.",
  },
  {
    name: "Scacchiera in Marmo e Onice",
    price: 149.99,
    image: "https://example.com/path/to/product7.jpg",
    description: "Una scacchiera unica realizzata con marmo e onice di alta qualità. Ogni scacchiera ha un design unico e sfumature di colore che la rendono un'opera d'arte.",
  },
  {
    name: "Set di Scacchi in Legno di Noce",
    price: 129.99,
    image: "https://example.com/path/to/product8.jpg",
    description: "Un set di scacchi pregiato realizzato in legno di noce massello. Il design classico e la qualità artigianale rendono questo set un pezzo da ereditare.",
  },
  {
    name: "Set di Scacchi in Metallo",
    price: 79.99,
    image: "https://example.com/path/to/product9.jpg",
    description: "Un set di scacchi unico realizzato in metallo pesante. I dettagli intricati e le finiture lucide lo rendono perfetto per gli appassionati di scacchi più esigenti.",
  },
  {
    name: "Scacchiera Pieghevole in Tessuto",
    price: 19.99,
    image: "https://example.com/path/to/product10.jpg",
    description: "Questa scacchiera pieghevole in tessuto è perfetta per giocare a scacchi in modo informale con amici e familiari. Facile da trasportare e da riporre.",
  },
  {
    name: "Pezzi di Scacchi in Legno",
    price: 39.99,
    image: "https://example.com/path/to/product11.jpg",
    description: "Aggiorna la tua scacchiera con questi pezzi di scacchi in legno intarsiato a mano. Lavorati con cura e attenzione ai dettagli.",
  },
  {
    name: "Orologio da Scacchi a Clessidra",
    price: 54.99,
    image: "https://example.com/path/to/product12.jpg",
    description: "Revive la magia degli scacchi classici con questo orologio a clessidra. Un modo tradizionale per gestire il tempo durante le partite.",
  },
  {
    name: "Set di Scacchi Art Deco",
    price: 69.99,
    image: "https://example.com/path/to/product13.jpg",
    description: "Un set di scacchi d'arte ispirato allo stile Art Deco. I dettagli geometrici e i materiali di alta qualità lo rendono unico.",
  },
  {
    name: "Scacchiera con Luci LED",
    price: 79.99,
    image: "https://example.com/path/to/product14.jpg",
    description: "Gioca a scacchi anche di notte con questa scacchiera illuminata a LED. L'illuminazione regolabile rende il gioco ancora più emozionante.",
  },
  {
    name: "Scacchiera Gigante all'Aperto",
    price: 199.99,
    image: "https://example.com/path/to/product15.jpg",
    description: "Divertiti a giocare a scacchi all'aperto con questa scacchiera gigante. I pezzi sono alti e grandi, perfetti per una partita nel parco o in giardino.",
  },
];

// Funzione per visualizzare i prodotti nella pagina
function displayProducts() {
  const productsContainer = document.querySelector(".products-grid");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    const productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = product.name;

    const productName = document.createElement("h3");
    productName.textContent = product.name;

    const productDescription = document.createElement("p");
    productDescription.textContent = product.description;

    const productPrice = document.createElement("span");
    productPrice.textContent = `Prezzo: €${product.price.toFixed(2)}`;

    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Aggiungi al Carrello";
    addToCartButton.dataset.product = product.name;
    addToCartButton.dataset.price = product.price;

    productDiv.appendChild(productImage);
    productDiv.appendChild(productName);
    productDiv.appendChild(productDescription);
    productDiv.appendChild(productPrice);
    productDiv.appendChild(addToCartButton);

    productsContainer.appendChild(productDiv);
  });
}

// Funzione per aggiungere il prodotto al carrello
function addToCart(productName, productPrice) {
  const cartItems = document.querySelector(".cart-items");
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");
  cartItem.innerHTML = `<span>${productName} - €${productPrice.toFixed(2)}</span>`;
  cartItems.appendChild(cartItem);

  updateCartTotal();

  // Salva il prodotto nel file di testo
  const productData = `${productName} - €${productPrice.toFixed(2)}\n`;
  const fileBlob = new Blob([productData], { type: "text/plain" });
  const fileUrl = URL.createObjectURL(fileBlob);

  const downloadLink = document.createElement("a");
  downloadLink.href = fileUrl;
  downloadLink.download = "carrello.txt";
  downloadLink.click();
}

// Funzione per aggiornare il totale del carrello
function updateCartTotal() {
  const cartItems = document.querySelectorAll(".cart-item");
  let total = 0;

  cartItems.forEach((item) => {
    const itemPrice = parseFloat(item.textContent.replace("€", ""));
    total += itemPrice;
  });

  const cartTotal = document.querySelector(".cart-total");
  cartTotal.textContent = `Totale: €${total.toFixed(2)}`;
}

// Aggiungiamo l'evento click al pulsante "Aggiungi al Carrello"
document.addEventListener("DOMContentLoaded", () => {
  displayProducts();

  const addToCartButtons = document.querySelectorAll("[data-product][data-price]");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productName = event.target.dataset.product;
      const productPrice = parseFloat(event.target.dataset.price);
      addToCart(productName, productPrice);
    });
  });
});
