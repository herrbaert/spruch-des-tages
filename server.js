
// server.js
const express = require('express');
const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


// Middleware, damit unser Server JSON-Anfragen versteht.
app.use(express.json());

// Unsere Daten leben jetzt hier auf dem Server!
let sprueche = [
    { id: 1, text: "Der Weg ist das Ziel.", autor: "Konfuzius" },
    { id: 2, text: "Phantasie ist wichtiger als Wissen.", autor: "Albert Einstein" }
];

// --- HIER KOMMEN GLEICH UNSERE API-ENDPUNKTE HIN ---

// ENDPUNKT 1: Alle Sprüche holen (GET)
// Wenn das Frontend die URL /api/sprueche aufruft, passiert das hier:
app.get('/api/sprueche', (req, res) => {
    console.log("get-anfrage")
    res.json(sprueche);
    
});

// ENDPUNKT 2: Einen neuen Spruch speichern (POST)
app.post('/api/sprueche', (req, res) => {
    // Die Daten, die das Frontend schickt, sind in req.body
    const neuerSpruch = {
        id: sprueche[sprueche.length - 1].id + 1,
        text: req.body.text,
        autor: req.body.autor
    };
console.log(neuerSpruch);
    // Füge den neuen Spruch zu unserem Array hinzu
    sprueche.push(neuerSpruch); // LÜCKE: Was soll hier zum Array hinzugefügt werden?
console.log(neuerSpruch);
    // Schicke eine Erfolgsmeldung zurück
    res.status(201).json(neuerSpruch);
});

// ENDPUNKT 3: Einen bestimmten Spruch löschen (DELETE)
// Die :id in der URL ist ein Platzhalter.
app.delete('/api/sprueche/:id', (req, res) => {
    // Die ID aus der URL bekommen wir über req.params.id
    const idZumLoeschen = parseInt(req.params.id); // Wichtig: in eine Zahl umwandeln!

    // DEINE AUFGABE: Finde den Spruch mit der richtigen ID im `sprueche`-Array
    // und entferne ihn.
    // Tipp: Finde zuerst den Index des Spruchs (z.B. mit findIndex) und nutze
    // dann die splice-Methode, um ihn aus dem Array zu entfernen.
    // ______
const spruchIndex = sprueche.findIndex(s => s.id === idZumLoeschen)
    if (spruchIndex === -1){
        return res.status(404).json({error: "Spruch nicht gefunden"});
    };
    sprueche.splice(spruchIndex, 1);
    console.log(`Spruch mit ID ${idZumLoeschen} wurde gelöscht.`);
    res.status(204).send(); // 204 = Erfolg, aber keine Daten werden zurückgeschickt
});


app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});

