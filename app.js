// Schritt 1: Elemente aus dem HTML "greifen".
const spruchAnzeige = document.getElementById('spruch-anzeige');
const randomSpruchBtn = document.getElementById('random-spruch-btn');
const neuesSpruchForm = document.getElementById('neuer-spruch-form');
const spruchInput = document.getElementById('spruch-input');
const autorInput = document.getElementById('autor-input');
const spruchListe = document.getElementById('spruch-liste');

// Schritt 2: Deine Daten. Füge hier gleich 2-3 deiner eigenen Lieblingssprüche hinzu!
let sprueche = [
    { text: "Der Weg ist das Ziel.", autor: "Konfuzius" },
    { text: "Phantasie ist wichtiger als Wissen, denn Wissen ist begrenzt.", autor: "Albert Einstein" }
];

// Schritt 3: Eine Funktion, die deine Sprüche-Liste im HTML anzeigt.
function renderSprueche() {
    spruchListe.innerHTML = '';
    sprueche.forEach(spruch => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `
            <p class="mb-1">"${spruch.text}"</p>
            <small class="text-muted fst-italic">- ${spruch.autor}</small>
        `;
        spruchListe.appendChild(li);
    });
}

// Schritt 4: Auf das Absenden des Formulars reagieren.
neuesSpruchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const neuerSpruch = { text: spruchInput.value, autor: autorInput.value };
    sprueche.push(neuerSpruch);
    renderSprueche();
    neuesSpruchForm.reset();
});

// Schritt 5: Auf den Klick des "Zufalls-Button" reagieren.
randomSpruchBtn.addEventListener('click', function() {
    const zufallsIndex = Math.floor(Math.random() * sprueche.length);
    const zufallsSpruch = sprueche[zufallsIndex];
    spruchAnzeige.innerHTML = `
        <p>"${zufallsSpruch.text}"</p>
        <footer class="blockquote-footer">${zufallsSpruch.autor}</footer>
    `;
});

// Initialer Aufruf: Die Liste beim Start der Seite laden.
renderSprueche();
