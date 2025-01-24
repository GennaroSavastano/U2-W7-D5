const URL = "https://striveschool-api.herokuapp.com/api/product/";

fetch("https://striveschool-api.herokuapp.com/api/product/679369e7b7470100158b2b79", {
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
    <h5> detailPrd.name </h5>
          <img src= "detailPrd.imageUrl" alt="detailPrd.name" />
          <p>detailPrd.brand</p>
          <p>detailPrd.description</p>
          <p>detailPrd.price</p>`;
  })
  .catch((err) => console.log(err));
