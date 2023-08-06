<?php
// Connetti al database usando i dettagli di connessione appropriati
$servername = "psedge.global";
$username = "fff83ddc-88c5-4f45-bf73-0f2332f4f24c-polyscale";
$password = "playground";
$dbname = "progetto_negozio_scacchi";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica la connessione
if ($conn->connect_error) {
    die("Connessione al database fallita: " . $conn->connect_error);
}

// Esegui la query SQL per ottenere i prodotti dal database
$sql = "SELECT product_id, product_name, description, price, image_url FROM products";
$result = $conn->query($sql);

// Crea un array di prodotti da passare a JavaScript
$products = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

// Chiudi la connessione al database
$conn->close();
?>

<script>
// Inserisci i dati dei prodotti nel codice JavaScript (products.js)
var products = <?php echo json_encode($products); ?>;
// Ora puoi utilizzare la variabile 'products' nel tuo codice JavaScript (products.js) per visualizzare i prodotti nella sezione "Prodotti"
// Ad esempio, puoi utilizzare una funzione JavaScript per creare e visualizzare gli elementi HTML dei prodotti nella sezione "Prodotti".
</script>
