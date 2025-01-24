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
      card.classList.add("card");

      const img = document.createElement("img");
      img.classList.add("card-img-top");
      img.alt = singleProduct.name;
      img.src = singleProduct.imageUrl;

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const h5 = document.createElement("h5");
      h5.classList.add("card-title");
      h5.innerText = singleProduct.name;

      const p = document.createElement("p");
      p.classList.add("card-text");
      p.innerText = singleProduct.price + " € ";

      const a = document.createElement("a");
      a.classList.add("ink-opacity-50");
      a.href = "./details.html";
      a.innerText = "Dettagli";

      const buttonMod = document.createElement("button");
      buttonMod.classList.add("btn", "btn-primary", "w-100", "my-2");
      buttonMod.innerText = "Modifica";

      const buttonDlt = document.createElement("button");
      buttonDlt.classList.add("btn", "btn-danger", "w-100", "my-2");
      buttonDlt.innerText = "Cancella";

      cardBody.appendChild(h5);
      cardBody.appendChild(p);
      cardBody.appendChild(a);
      cardBody.appendChild(buttonMod);
      cardBody.appendChild(buttonDlt);
      card.appendChild(img);
      card.appendChild(cardBody);
      col.appendChild(card);
      row.appendChild(col);
    });
  })
  .catch((err) => console.dir(err));
