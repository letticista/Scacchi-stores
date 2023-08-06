<?php
// Dati per la connessione al database MySQL
$hostname = "hostname";
$username = "username";
$password = "password";
$database = "database";

// Connessione al database MySQL
$conn = new mysqli($hostname, $username, $password, $database);

// Verifica della connessione
if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

// I dati dei prodotti da inserire nel database
$products = array(
    array('Scacchiera in Legno', 'Goditi partite di scacchi con questa scacchiera in legno di alta qualità.', 59.99, 'https://example.com/path/to/product1.jpg'),
    array('Set di Scacchi da Viaggio', 'Porta i tuoi scacchi ovunque tu vada con questo set da viaggio compatto.', 24.99, 'https://example.com/path/to/product2.jpg'),
    array('Pezzi di Scacchi in Marmo', 'Aggiungi un tocco di eleganza al tuo gioco con questi pezzi di scacchi realizzati in pregiato marmo italiano.', 89.99, 'https://example.com/path/to/product3.jpg'),
    array('Scacchiera Magnetica', 'Gioca a scacchi ovunque con questa scacchiera magnetica. I pezzi si aderiscono saldamente alla scacchiera, rendendo il gioco facile e divertente anche in movimento.', 34.99, 'https://example.com/path/to/product4.jpg'),
    array('Orologio da Scacchi', 'Prendi il controllo del tempo durante le tue partite di scacchi con questo elegante orologio da scacchi digitale. Gestisci il tempo con precisione per vincere le partite.', 49.99, 'https://example.com/path/to/product5.jpg'),
    array('Set di Scacchi in Vetro', 'Amplia la tua collezione di scacchi con questo set in vetro soffiato a mano. I dettagli artistici e l\'artigianato di alta qualità lo rendono un pezzo da esposizione.', 99.99, 'https://example.com/path/to/product6.jpg'),
    array('Scacchiera in Marmo e Onice', 'Una scacchiera unica realizzata con marmo e onice di alta qualità. Ogni scacchiera ha un design unico e sfumature di colore che la rendono un\'opera d\'arte.', 149.99, 'https://example.com/path/to/product7.jpg'),
    array('Set di Scacchi in Legno di Noce', 'Un set di scacchi pregiato realizzato in legno di noce massello. Il design classico e la qualità artigianale rendono questo set un pezzo da ereditare.', 129.99, 'https://example.com/path/to/product8.jpg'),
    array('Set di Scacchi in Metallo', 'Un set di scacchi unico realizzato in metallo pesante. I dettagli intricati e le finiture lucide lo rendono perfetto per gli appassionati di scacchi più esigenti.', 79.99, 'https://example.com/path/to/product9.jpg'),
    array('Scacchiera Pieghevole in Tessuto', 'Questa scacchiera pieghevole in tessuto è perfetta per giocare a scacchi in modo informale con amici e familiari. Facile da trasportare e da riporre.', 19.99, 'https://example.com/path/to/product10.jpg'),
    array('Pezzi di Scacchi in Legno', 'Aggiorna la tua scacchiera con questi pezzi di scacchi in legno intarsiato a mano. Lavorati con cura e attenzione ai dettagli.', 39.99, 'https://example.com/path/to/product11.jpg'),
    array('Orologio da Scacchi a Clessidra', 'Revive la magia degli scacchi classici con questo orologio a clessidra. Un modo tradizionale per gestire il tempo durante le partite.', 54.99, 'https://example.com/path/to/product12.jpg'),
    array('Set di Scacchi Art Deco', 'Un set di scacchi d\'arte ispirato allo stile Art Deco. I dettagli geometrici e i materiali di alta qualità lo rendono unico.', 69.99, 'https://example.com/path/to/product13.jpg'),
    array('Scacchiera con Luci LED', 'Gioca a scacchi anche di notte con questa scacchiera illuminata a LED. L\'illuminazione regolabile rende il gioco ancora più emozionante.', 79.99, 'https://example.com/path/to/product14.jpg'),
    array('Scacchiera Gigante all\'Aperto', 'Divertiti a giocare a scacchi all\'aperto con questa scacchiera gigante. I pezzi sono alti e grandi, perfetti per una partita nel parco o in giardino.', 199.99, 'https://example.com/path/to/product15.jpg'),
);

// Istruzione SQL per l'inserimento dei dati dei prodotti
$sql = "INSERT INTO products (product_name, description, price, image_url) VALUES ";

foreach ($products as $product) {
    $name = $conn->real_escape_string($product[0]);
    $description = $conn->real_escape_string($product[1]);
    $price = floatval($product[2]);
    $image_url = $conn->real_escape_string($product[3]);

    $sql .= "('$name', '$description', $price, '$image_url'),";
}

// Rimuovi l'ultima virgola dalla query
$sql = rtrim($sql, ",");

// Esegui l'istruzione SQL
if ($conn->query($sql) === TRUE) {
    echo "Dati dei prodotti inseriti con successo nel database.";
} else {
    echo "Errore durante l'inserimento dei dati dei prodotti: " . $conn->error;
}

// Chiudi la connessione al database
$conn->close();
?>
