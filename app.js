const http = require('http');
const fs = require('fs');
const path = require('path');

// Funzione per ottenere i prodotti dal file di testo
async function getProductsFromFile() {
  try {
    const data = await fs.promises.readFile('selected_products.txt', 'utf-8');
    return data.split('\n').filter(Boolean);
  } catch (error) {
    console.error('Errore durante il recupero dei prodotti dal file:', error);
    return [];
  }
}

// Funzione per scrivere i prodotti nel file di testo
async function writeProductsToFile(products) {
  try {
    await fs.promises.writeFile('selected_products.txt', products.join('\n'));
  } catch (error) {
    console.error('Errore durante la scrittura dei prodotti nel file:', error);
  }
}

// Creazione del server HTTP
const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  // Gestione della richiesta per la pagina dei prodotti
  if (method === 'GET' && url === '/products.html') {
    try {
      // Leggi il file HTML dei prodotti
      const html = await fs.promises.readFile('products.html', 'utf-8');

      // Ottieni i prodotti dal file di testo
      const selectedProducts = await getProductsFromFile();

      // Sostituisci il placeholder con i prodotti selezionati
      const productListHTML = selectedProducts.map((productName) => {
        const product = findProductByName(productName);
        if (product) {
          return `
            <div class="product">
              <img src="${product.image}" alt="${product.name}">
              <h3>${product.name}</h3>
              <p>${product.description}</p>
              <span>Prezzo: €${product.price.toFixed(2)}</span>
            </div>
          `;
        }
      }).join('');

      // Sostituisci il placeholder dei prodotti nel file HTML
      const updatedHTML = html.replace('{{PRODUCTS_PLACEHOLDER}}', productListHTML);

      // Invia la pagina HTML dei prodotti al client
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(updatedHTML);
    } catch (error) {
      console.error('Errore durante la gestione della richiesta:', error);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Errore del server');
    }
  }

  // Gestione della richiesta per i file CSS e JS
  else if (['GET', 'HEAD'].includes(method) && (url.endsWith('.css') || url.endsWith('.js'))) {
    try {
      const filePath = path.join(__dirname, url);
      const fileStream = fs.createReadStream(filePath);

      fileStream.on('open', () => {
        res.writeHead(200, { 'Content-Type': url.endsWith('.css') ? 'text/css' : 'text/javascript' });
        fileStream.pipe(res);
      });

      fileStream.on('error', () => {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File non trovato');
      });
    } catch (error) {
      console.error('Errore durante la gestione della richiesta:', error);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Errore del server');
    }
  }

  // Gestione delle richieste non gestite
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Pagina non trovata');
  }
});

// Aggiorna i prodotti nel file di testo al termine del server
server.on('close', () => {
  const selectedProducts = [...selectedProductSet];
  writeProductsToFile(selectedProducts);
});

// Avvia il server sulla porta 3000
server.listen(3000, () => {
  console.log('Server avviato sulla porta 3000');
});
