const mysql = require('mysql2');
const { v4: uuidv4 } = require('uuid');

// Configurazione per la connessione al database
const connection = mysql.createConnection({
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
function insertCartData(userId, productId, quantity) {
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

// Funzione per ottenere tutti i prodotti dal database
function getProducts() {
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

// Funzione per ottenere i prodotti nel carrello di un utente specifico
function getCartProducts(userId) {
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

// Esempio di utilizzo per generare utenti e inserire i dati nel carrello
async function main() {
  try {
    // Connessione al database
    await connection.promise().connect();

    // Genera utente e dati del carrello in modo automatico
    const users = ['user123', 'user456', 'user789']; // Esempio di utenti
    const products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // Esempio di ID dei prodotti
    const quantities = [2, 3, 1, 4, 2, 1, 3, 2, 1, 2, 3, 1, 4, 2, 1]; // Esempio di quantità dei prodotti

    for (let i = 0; i < users.length; i++) {
      const userId = generateUserId();
      console.log(`Generato ID utente per ${users[i]}: ${userId}`);

      for (let j = 0; j < products.length; j++) {
        await insertCartData(userId, products[j], quantities[j]);
        console.log(`Dati inseriti nel carrello per ${users[i]}: ProductID=${products[j]}, Quantity=${quantities[j]}`);
      }
    }

    // Ottieni tutti i prodotti
    const allProducts = await getProducts();
    console.log('Tutti i prodotti:', allProducts);

    // Ottieni i prodotti nel carrello dell'utente con ID 'user123'
    const userId = 'user123';
    const cartProducts = await getCartProducts(userId);
    console.log(`Prodotti nel carrello dell'utente ${userId}:`, cartProducts);
  } catch (error) {
    console.error('Si è verificato un errore:', error);
  } finally {
    // Chiudi la connessione al database alla fine dell'esecuzione
    connection.end();
  }
}

// Esegui la funzione main per generare gli utenti e inserire i dati nel carrello
main();
