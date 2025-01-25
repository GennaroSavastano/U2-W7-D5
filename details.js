const params = new URLSearchParams(window.location.search);

const detailPrdId = params.get("prodId");

const URL = "https://striveschool-api.herokuapp.com/api/product/";

fetch("https://striveschool-api.herokuapp.com/api/product/" + detailPrdId, {
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
    const container = document.getElementById("details-container");

    container.innerHTML = `
          <img src= "${detailPrd.imageUrl}" alt="${detailPrd.name}"  class="w-100"/>
          <h5 class="mt-3"> ${detailPrd.name} </h5>
          <p>${detailPrd.brand}</p>
          <p>${detailPrd.description}</p>
          <p>${detailPrd.price}</p>
          <a class="btn btn-success mb-5" href="./backoffice.html?prodId=${detailPrdId}">Modifica Prodotto</a>`;
  })
  .catch((err) => {
    console.dir(err);
    generateAlert(err.message);
  })
  .finally(() => {
    isLoading(false);
  });

const isLoading = function (loadingState) {
  const spinner = document.querySelector(".spinner-grow");
  if (loadingState) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

const generateAlert = function (message) {
  const alertContainer = document.getElementById("alert-container");
  alertContainer.innerHTML = `   
   <div class="alert alert-danger" role="alert">
    <h4 class="alert-heading">Attenzione !!!</h4>
    <p>${message}</p>
    <hr>
    <p class="mb-0">Riprova più tardi</p>
  </div>`;
};
