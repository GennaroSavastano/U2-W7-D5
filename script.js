const URL = "https://striveschool-api.herokuapp.com/api/product/";

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
    } else {
      throw new Error("Errore durante la creazione del prodotto !");
    }
  })
  .then((products) => {
    console.log(products);

    const row = document.getElementById("product-grid");

    products.forEach((singleProduct) => {
      console.log(singleProduct);

      const col = document.createElement("div");
      col.classList.add("col");

      const card = document.createElement("div");
      card.classList.add("card", "text-center", "mb-4");

      const img = document.createElement("img");
      img.classList.add("card-img-top");
      img.alt = singleProduct.name;
      img.src = singleProduct.imageUrl;
      img.style.height = "200px";
      img.style.objectFit = "cover";

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const h5 = document.createElement("h5");
      h5.classList.add("card-title");
      h5.innerText = singleProduct.name;

      const p = document.createElement("p");
      p.classList.add("card-text");
      p.innerText = singleProduct.price + " € ";

      const a = document.createElement("a");
      a.classList.add("link-offset-2", "link-underline", "link-underline-opacity-50", "d-block", "my-3");
      a.href = `./details.html?prodId=${singleProduct._id}`;
      a.innerText = "Dettagli";

      const buttonMod = document.createElement("a");
      buttonMod.classList.add("btn", "btn-primary", "w-100", "my-2");
      buttonMod.innerText = "Modifica";
      buttonMod.href = `./backoffice.html?prodId=${singleProduct._id}`;

      cardBody.appendChild(h5);
      cardBody.appendChild(p);
      cardBody.appendChild(a);
      cardBody.appendChild(buttonMod);
      card.appendChild(img);
      card.appendChild(cardBody);
      col.appendChild(card);
      row.appendChild(col);
    });
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
