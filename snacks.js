import books from "./data.js";
console.log("Books:", books);

// Snack 1 - Filtra e Modifica
//  Crea una funzione che somma due numeri.
//      Crea un array (longBooks) con i libri che hanno più di 300 pagine;
//      Creare un array (longBooksTitles) che contiene solo i titoli dei libri contenuti in longBooks.
//      Stampa in console ogni titolo nella console.
const somma = (a, b) => a + b;

const longBooks = books.filter((b) => b.pages > 300);

const longBooksTitles = longBooks.map((b) => b.title);

console.log("Snack 1:", longBooksTitles);
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

authors.sort((a, b) => b.age - a.age);

console.log("Snack 3:", authors);
// ----------

// Snack 4 - Calcola l’età media
// Creare un array (ages) che contiene le età degli autori dei libri.
// Calcola la somma delle età (agesSum) usando reduce.
// Stampa in console l’età media degli autori dei libri.
const ages = books.map((b) => b.author.age);

const agesSum = ages.reduce((acc, curr) => acc + curr);

console.log("Snack 4:", agesSum / ages.length);
