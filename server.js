const express = require('express');
const mysql = require('mysql2');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

// Configurazione per la connessione al database "employees"
const connectionEmployees = mysql.createConnection({
  host: 'psedge.global',
  port: 3306,
  user: 'fff83ddc-88c5-4f45-bf73-0f2332f4f24c-polyscale',
  password: 'playground',
  database: 'employees', // Modifica il nome del database se necessario
});

// Configurazione per la connessione al database "progetto_negozio_scacchi"
const connectionProgetto = mysql.createConnection({
  host: 'psedge.global',
  port: 3306,
  user: 'fff83ddc-88c5-4f45-bf73-0f2332f4f24c-polyscale',
  password: 'playground',
  database: 'progetto_negozio_scacchi',
});

// Funzione per generare un ID utente univoco
function generateUserId() {
  return uuidv4();
}

// Funzione per inserire i dati nel carrello di un utente
function insertCartData(connection, userId, productId, quantity) {
  return new Promise((resolve, reject) => {
    connection.query(
      'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
      [userId, productId, quantity],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
}

// Funzione per ottenere tutti i prodotti dal database "progetto_negozio_scacchi"
function getProducts(connection) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM products', (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Funzione per ottenere i prodotti nel carrello di un utente specifico dal database "progetto_negozio_scacchi"
function getCartProducts(connection, userId) {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT cart.product_id, products.product_name, products.price, cart.quantity ' +
        'FROM cart ' +
        'JOIN products ON cart.product_id = products.product_id ' +
        'WHERE cart.user_id = ?',
      [userId],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
}

// Endpoint API per ottenere i prodotti dal database "progetto_negozio_scacchi"
app.get('/getProducts', async (req, res) => {
  try {
    // Connessione al database "progetto_negozio_scacchi"
    await connectionProgetto.promise().connect();
    console.log('Connessione al database "progetto_negozio_scacchi" avvenuta con successo!');

    // Ottieni tutti i prodotti dal database
    const allProducts = await getProducts(connectionProgetto);
    res.json({ products: allProducts });
  } catch (error) {
    console.error('Si è verificato un errore:', error);
    res.status(500).json({ error: 'Si è verificato un errore durante il recupero dei prodotti.' });
  } finally {
    // Chiudi la connessione al database alla fine della richiesta
    connectionProgetto.end();
  }
});

// Endpoint API per inserire i dati nel carrello
app.post('/addToCart', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Connessione al database "progetto_negozio_scacchi"
    await connectionProgetto.promise().connect();
    console.log('Connessione al database "progetto_negozio_scacchi" avvenuta con successo!');

    // Inserisci i dati nel carrello
    await insertCartData(connectionProgetto, userId, productId, quantity);
    res.json({ message: 'Dati inseriti correttamente nel carrello.' });
  } catch (error) {
    console.error('Si è verificato un errore:', error);
    res.status(500).json({ error: 'Si è verificato un errore durante l\'inserimento dei dati nel carrello.' });
  } finally {
    // Chiudi la connessione al database alla fine della richiesta
    connectionProgetto.end();
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server avviato su http://localhost:${port}`);
});
