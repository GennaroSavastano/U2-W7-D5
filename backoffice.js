const params = new URLSearchParams(window.location.search);
const detailPrdId = params.get("prodId");

const URL = detailPrdId
  ? "https://striveschool-api.herokuapp.com/api/product/" + detailPrdId
  : "https://striveschool-api.herokuapp.com/api/product/";

const form = document.getElementById("product-form");

window.addEventListener("DOMContentLoaded", function () {
  const submitBtn = document.getElementById("submit-button");
  const deleteBtn = document.getElementById("delete-button");

  const subTitle = document.querySelector("h3");

  if (detailPrdId) {
    submitBtn.innerText = "Modifica Prodotto";
    submitBtn.classList.add("btn-success");

    deleteBtn.classList.remove("d-none");
    deleteBtn.onclick = handleDelete;

    subTitle.innerText = " Modifica Prodotto ";

    fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNjM1YmI3NDcwMTAwMTU4YjJiM2QiLCJpYXQiOjE3Mzc3MTI0NzUsImV4cCI6MTczODkyMjA3NX0.G35XYSgW1idS8P7PFphzDi_nEEqC1B0A7YhCTz-o85M`,
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((detailPrd) => {
        console.log(detailPrd);

        form.elements.name.value = detailPrd.name;
        form.elements.description.value = detailPrd.description;
        form.elements.brand.value = detailPrd.brand;
        form.elements.imageUrl.value = detailPrd.imageUrl;
        form.elements.price.value = detailPrd.price;
      });
  } else {
    submitBtn.innerText = "Aggiungi Prodotto";
    submitBtn.classList.add("btn-primary");

    subTitle.innerText = " Crea Nuovo Prodotto ";
  }
});

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
    method: detailPrdId ? "PUT" : "POST",
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
      if (!detailPrdId) {
        alert("Creazione prodotto con id" + createdProduct._id + "a buon fine !");
      } else {
        alert("Modifica prodotto con id" + createdProduct._id + "a buon fine !");
      }
    });
};

const formReset = function () {
  form.reset();
};

const resetBtn = document.getElementById("reset-form");
resetBtn.onclick = formReset;

//   const buttonDlt = document.createElement("button");
//   buttonDlt.classList.add("btn", "btn-danger", "w-100", "my-2");
//   buttonDlt.innerText = "Cancella";

const handleDelete = () => {
  const hasConfirmed = confirm("Sicuro di voler ELIMINARE il prodotto ?");

  if (hasConfirmed) {
    fetch(URL, {
      method: "DELETE",
      body: JSON.stringify(deletedProd),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNjM1YmI3NDcwMTAwMTU4YjJiM2QiLCJpYXQiOjE3Mzc3MTI0NzUsImV4cCI6MTczODkyMjA3NX0.G35XYSgW1idS8P7PFphzDi_nEEqC1B0A7YhCTz-o85M`,
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json;
        }
      })
      .then((deletedProd) => {
        alert("Prodotto " + deletedProd.name + " con ID " + deletedProd._id + " eliminato con successo ! ");

        window.location.assign("./index.html");
      });
  }
};
