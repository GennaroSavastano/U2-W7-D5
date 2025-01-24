const URL = "https://striveschool-api.herokuapp.com/api/product/";

const form = document.getElementById("product-form");

form.onsubmit = function (event) {
  event.preventDefault();

  const newProduct = {
    name: form.elements.name.value,
    description: form.elements.description.value,
    brand: form.elements.brand.value,
    imageUrl: form.elements.imageUrl.value,
    price: form.elements.price.value,
  };

  console.log(newProduct);

  fetch(URL, {
    method: "POST",
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNjM1YmI3NDcwMTAwMTU4YjJiM2QiLCJpYXQiOjE3Mzc3MTI0NzUsImV4cCI6MTczODkyMjA3NX0.G35XYSgW1idS8P7PFphzDi_nEEqC1B0A7YhCTz-o85M`,
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Errore durante la creazione del prodotto !");
      }
    })
    .then((createdProduct) => {
      alert("Creazione prodotto con id" + createdProduct._id + "a buon fine !");
    });
};
