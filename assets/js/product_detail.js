document.addEventListener("DOMContentLoaded", async () => {
  let Url = new URLSearchParams(location.search);
  let prodContainer = document.querySelector(".product-container");
  let id = Url.get("id");

  fetch(`http://localhost:3000/products/${id}`)
    .then((response) => response.json())
    .then((data) => {
      let allImgs = document.querySelectorAll(".small-imgs img");
      let bigImg = document.querySelector(".big-img img");

      // slider ucun:
      allImgs.forEach((img) => {
        img.src = data.image;

        img.addEventListener("click", () => {
          console.log("balaca sekile click edildii");
          bigImg.src = img.src;
        });
      });

      if (data.image) {
        bigImg.src = data.image;
      }

      let title = document.querySelector(".title");
      title.textContent = data.title;

      let price = document.querySelector(".red");
      price.textContent = `2-9 pieces US $$${data.price}`;
    })
    .catch((error) => {
      console.log("data tapilmadi, xeta: " + error);
      let errorMsg = document.createElement("p");
      errorMsg.textContent = "mehsul tapilmadi";
      prodContainer.appendChild(errorMsg);
    });
});

let toast = (text) => {
  Toastify({
    text: `${text}`,
    duration: 3000,
    position: "left",
    stopOnFocus: true,
    style: {
      background:
        "linear-gradient(to right, rgb(5, 125, 162),rgb(110, 185, 208))",
    },
    onClick: function () {},
  }).showToast();
};
