// Schritt 1: Elemente aus dem HTML "greifen".
const spruchAnzeige = document.getElementById("spruch-anzeige");
const randomSpruchBtn = document.getElementById("random-spruch-btn");
const neuesSpruchForm = document.getElementById("neuer-spruch-form");
const spruchInput = document.getElementById("spruch-input");
const autorInput = document.getElementById("autor-input");
const spruchListe = document.getElementById("spruch-liste");

// Schritt 2: Deine Daten. Füge hier gleich 2-3 deiner eigenen Lieblingssprüche hinzu!
async function ladeSprueche() {
  // Rufe den Endpunkt an, den du im Backend erstellt hast
  try {
    const response = await fetch("http://localhost:3000/api/sprueche");
    if (!response.ok) {
      console.log(response.status);
    }
    // Wandle die Text-Antwort des Servers in ein echtes JavaScript-Array um
    const daten = await response.json();
    console.log(daten);

    renderSprueche(daten);
  } catch (error) {
    console.error("fehler", error);
  }
  // Rufe die render-Funktion mit den frischen Daten vom Server auf
//   renderSprueche(daten);
}

// app.js

function renderSprueche(sprueche) {
  spruchListe.innerHTML = "";
  sprueche.forEach((spruch) => {
    const li = document.createElement("li");
    // Beachte die Klassen für die Anordnung mit Flexbox
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
            <div>
                <p class="mb-1">"${spruch.text}"</p>
                <small class="text-muted fst-italic">- ${spruch.autor}</small>
            </div>
            <button class="btn btn-danger btn-sm" onclick="loescheSpruch(${spruch.id})">Löschen</button>
        `;
    spruchListe.appendChild(li);
  });
}

// NEUE Funktion, um einen Lösch-Anruf an den Server zu senden
async function loescheSpruch(id) {
  // Sende den Anruf an deinen DELETE-Endpunkt
  await fetch(`/api/sprueche/${id}`, {
    method: "DELETE",
  });

  // Lade die Liste neu, um die Änderung anzuzeigen
  ladeSprueche();
}

// Schritt 4: Auf das Absenden des Formulars reagieren.
// Passe deinen bestehenden Event Listener an
neuesSpruchForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  // Das Datenpaket, das wir an den Server senden
  const daten = {
    text: spruchInput.value,
    autor: autorInput.value,
  };

  // Sende die Daten an den POST-Endpunkt
  await fetch("/api/sprueche", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Sagt dem Server: "Ich schicke JSON"
    },
    body: JSON.stringify(daten), // Wandelt das JS-Objekt in Text um
  });

  // Lade die Liste neu und leere das Formular
  ladeSprueche();
  neuesSpruchForm.reset();
});

// Schritt 5: Auf den Klick des "Zufalls-Button" reagieren.
randomSpruchBtn.addEventListener("click",async function () {
     try {
    const response = await fetch("http://localhost:3000/api/sprueche");
    if (!response.ok) {
      console.log(response.status);
    }
    // Wandle die Text-Antwort des Servers in ein echtes JavaScript-Array um
    const sprueche = await response.json();
    console.log(sprueche);

  } catch (error) {
    console.error("fehler", error);
    return;
  }
  const zufallsIndex = Math.floor(Math.random() * sprueche.length);
  const zufallsSpruch = sprueche[zufallsIndex];
  spruchAnzeige.innerHTML = `
        <p>"${zufallsSpruch.text}"</p>
        <footer class="blockquote-footer">${zufallsSpruch.autor}</footer>
    `;
});

// Initialer Aufruf: Die Liste beim Start der Seite laden.

ladeSprueche();
