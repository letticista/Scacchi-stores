<!DOCTYPE html>
<html>
<head>
  <title>Negozio di Scacchi</title>
  <!-- Collegamento ai fogli di stile CSS -->
  <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
  <h1>Benvenuto nel Negozio di Scacchi</h1>

  <!-- Sezione Prodotti -->
  <div class="products-section">
    <h2>Prodotti Disponibili</h2>
    <div class="products-grid">
      <!-- Qui verranno visualizzati i prodotti dal codice products.js -->
    </div>
  </div>

  <!-- Sezione Carrello -->
  <div class="cart-section">
    <h2>Il Mio Carrello</h2>
    <div class="cart-items">
      <!-- Qui verranno visualizzati i prodotti dal codice cart.js -->
    </div>
    <div class="cart-total">
      <!-- Qui verrà visualizzato il totale del carrello dal codice cart.js -->
    </div>
  </div>

  <!-- Script JavaScript -->
  <script src="products.js"></script>
  <script src="cart.js"></script>

  <!-- Includi il file PHP che comunica con il database e passa i dati ai file JavaScript -->
  <?php include 'server.php'; ?>
</body>
</html>
