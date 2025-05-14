import books from "./data.js";
console.log("Books:", books);

// Snack 1 - Filtra e Modifica
//      Crea un array (longBooks) con i libri che hanno più di 300 pagine;
//      Creare un array (longBooksTitles) che contiene solo i titoli dei libri contenuti in longBooks.
//      Stampa in console ogni titolo nella console.

const longBooks = books.filter((b) => b.pages > 300);

const longBooksTitles = longBooks.map((b) => b.title);

longBooksTitles.forEach((t) => console.log("Snack 1:", t));

// ----------

// Snack 2 - Il primo libro scontato
//      Creare un array (availableBooks) che contiene tutti i libri disponibili.
//      Crea un array (discountedBooks) con gli availableBooks, ciascuno con il prezzo scontato del 20% (mantieni lo stesso formato e arrotonda al centesimo)
//      Salva in una variabile (fullPricedBook) il primo elemento di discountedBooks che ha un prezzo intero (senza centesimi).
const availableBooks = books.filter((b) => b.available === true);

const applyDiscount = (fullPrice, discount) => {
  const onlyValuePrice = parseFloat(fullPrice.replace("€", ""));
  const discounted = (onlyValuePrice * discount) / 100;
  const newPrice = (onlyValuePrice - discounted).toFixed(2) + "€";
  return newPrice;
};
const discountedBooks = availableBooks.map((b) => {
  return { ...b, price: applyDiscount(b.price, 20) };
});

const onlyValue = (price) => parseFloat(price.replace("€", ""));
const fullPricedBook = discountedBooks.find((b) =>
  Number.isInteger(onlyValue(b.price))
);

console.log("Snack 2:", fullPricedBook);
// ----------

// Snack 3 - Ordinare gli Autori
// Creare un array (authors) che contiene gli autori dei libri.
// Crea una variabile booleana (areAuthorsAdults) per verificare se gli autori sono tutti maggiorenni.
// Ordina l’array authors in base all’età, senza creare un nuovo array.
// (se areAuthorsAdult è true, ordina in ordine crescente, altrimenti in ordine decrescente)
const authors = books.map((b) => b.author);

const areAuthorsAdults = authors.every((a) => a.age >= 18);

authors.sort((a, b) => a.age - b.age) * (areAuthorsAdults ? 1 : -1);
// stessa funzionalità, codice più verboso
// if (areAuthorsAdults) {
//   authors.sort((a, b) => a.age - b.age);
// } else {
//   authors.sort((a, b) => b.age - a.age);
// }

console.log("Snack 3:", authors);
// ----------

// Snack 4 - Calcola l’età media
// Creare un array (ages) che contiene le età degli autori dei libri.
// Calcola la somma delle età (agesSum) usando reduce.
// Stampa in console l’età media degli autori dei libri.
const ages = books.map((b) => b.author.age);

const agesSum = ages.reduce((acc, curr) => acc + curr, 0);

console.log("Snack 4:", agesSum / ages.length);
// ----------

// Snack 5 (Bonus) - Raccogli i libri
//  Usando la l'API https://boolean-spec-frontend.vercel.app/freetestapi/books/{id} usa la combinazione di .map() e Promise.all(), per creare una funzione (getBooks) che a partire da un array di id (ids), ritorna una promise che risolve un array di libri (books).
//  Testala con l’array [2, 13, 7, 21, 19] .
function getBooks(ids) {
  return Promise.all(
    ids.map((id) =>
      fetch(`http://127.0.0.1:5000/books/${id}`).then((res) => {
        if (!res.ok) {
          throw new Error(`Errore: id ${id}, ${res.status}`);
        }
        return res.json();
      })
    )
  );
}

getBooks([2, 13, 7, 21, 19])
  .then((b) => console.log("Snack 5 (Bonus):", b))
  .catch((error) => console.error("Errore:", error.message));
// ----------

// Snack 6 (Bonus) - Ordina i libri
//  Crea una variabile booleana (areThereAvailableBooks) per verificare se c’è almeno un libro disponibile.
//  Crea un array (booksByPrice) con gli elementi di books ordinati in base al prezzo (crescente).
//  Ordina l’array booksByPricein base alla disponibilità (prima quelli disponibili), senza creare un nuovo array.
const areThereAvailableBooks = books.some((b) => b.available === true);

const booksByPrice = [...books].sort(
  (a, b) => onlyValue(a.price) - onlyValue(b.price)
);

booksByPrice.sort((a, b) => b.available - a.available);

console.log("Snack 6 (Bonus):", booksByPrice);
// ----------

// Snack 7 (Bonus) - Analizza i tag
// Usa reduce per creare un oggetto (tagCounts) che conta quante volte ogni tag viene usato tra i libri.
const tagCounts = books.reduce((acc, curr) => {
  curr.tags.forEach((tag) => {
    if (acc[tag]) {
      acc[tag]++;
    } else {
      acc[tag] = 1;
    }
  });
  return acc;
}, {});

console.log("Snack 7 (Bonus):", tagCounts);
