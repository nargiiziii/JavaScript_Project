document.addEventListener("DOMContentLoaded", async () => {
  let Url = new URLSearchParams(location.search);
  let prodContainer = document.querySelector(".product-container");
  let id = Url.get("id");

  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((response) => response.json())
    .then((data) => {
      let main = document.querySelector("main");

      let leftSide = document.querySelector("left-side");

      // small-imgs
      let smallImg = document.createElement("div");
      smallImg.classList.add = "small-img";

      let smallImgProd = document.createElement("img");
      smallImgProd.src = data.image;

      let imgDiv = document.createElement("div");
      imgDiv.classList.add = "img";

      imgDiv.append(smallImgProd, smallImgProd, smallImgProd, smallImgProd);
      smallImg.append(imgDiv);

      // big-img
      let bigImg = document.createElement("div");
      bigImg.classList.add("big-img");

      let posText = document.createElement("div");
      posText.classList.add("left-pos-text");

      let wishlistIcon = document.createElement("div");
      wishlistIcon.classList.add("wishlist-icon");

      let heartIcon = document.createElement("i");
      heartIcon.className = "fa-solid fa-heart fa-lg";

      wishlistIcon.appendChild(heartIcon);

      let bigImgProd = document.createElement("img");
      bigImgProd.src = data.image;

      bigImg.append(posText, wishlistIcon, bigImgProd);

      leftSide.append(smallImg, bigImg);

      // right side

      let rightSide = document.querySelector("right-side");

      let title = document.createElement("h2");
      title.classList.add("title");

      // rating
      let rating = document.createElement("div");
      rating.classList.add("rating");

      let stars = document.createElement("div");
      stars.classList.add("stars");

      let reviews = document.createElement(div);
      reviews.classList.add("reviews");

      rating.append(stars, reviews);

      // prices
      let prices = document.createElement("div");
      prices.classList.add("prices");

      let price = document.createElement("div");
      price.classList.add("price");

      let redPrice = document.createElement("div");
      redPrice.className("price red");

      prices.append(price, price, redPrice, price);

      // size color
      const sizeColor = document.createElement("div");
      sizeColor.className = "size-color";

      // sizes
      const sizes = document.createElement("div");
      sizes.className = "sizes";

      const sizeXS = document.createElement("div");
      sizeXS.className = "size";
      sizeXS.textContent = "XS";

      const sizeS = document.createElement("div");
      sizeS.className = "size";
      sizeS.textContent = "S";

      const sizeM = document.createElement("div");
      sizeM.className = "size";
      sizeM.textContent = "M";

      sizes.appendChild(sizeXS);
      sizes.appendChild(sizeS);
      sizes.appendChild(sizeM);

      // colors
      const colors = document.createElement("div");
      colors.className = "colors";

      const colorOrange = document.createElement("div");
      colorOrange.className = "orange";
      colorOrange.textContent = ".";

      const colorBlue = document.createElement("div");
      colorBlue.className = "blue";
      colorBlue.textContent = ".";

      const colorGreen = document.createElement("div");
      colorGreen.className = "green";
      colorGreen.textContent = ".";

      const colorPink = document.createElement("div");
      colorPink.className = "pink";
      colorPink.textContent = ".";

      colors.appendChild(colorOrange);
      colors.appendChild(colorBlue);
      colors.appendChild(colorGreen);
      colors.appendChild(colorPink);

      sizeColor.appendChild(sizes);
      sizeColor.appendChild(colors);

      // buttons
      const buttonsContainer = document.createElement("div");
      buttonsContainer.className = "buttons";

      const cartButton = document.createElement("button");
      cartButton.className = "cart";
      cartButton.textContent = "Add to cart";

      const paymentButton = document.createElement("button");
      paymentButton.className = "payment";
      paymentButton.textContent = "Cash payment";

      buttonsContainer.appendChild(cartButton);
      buttonsContainer.appendChild(paymentButton);


        rightSide.append(title, rating, prices, sizeColor, buttonsContainer)


        main.append(leftSide, rightSide);

        let body = document.querySelector(body);
        body.appendChild(main)




    //   // product-image
    //   let productImageDiv = document.createElement("div");
    //   productImageDiv.className = "product-image";

    //   let img = document.createElement("img");
    //   img.src = data.image;
    //   img.className = "img";

    //   productImageDiv.appendChild(img);

    //   // product-info
    //   let productInfoDiv = document.createElement("div");
    //   productInfoDiv.className = "product-info";

    //   let productDetailsDiv = document.createElement("div");
    //   productDetailsDiv.className = "product-details";

    //   let title = document.createElement("h4");
    //   title.className = "product-title";
    //   title.textContent = data.title;

    //   let category = document.createElement("p");
    //   category.className = "product-category";
    //   category.textContent = `Category: ${data.category}`;

    //   let price = document.createElement("p");
    //   price.className = "product-price";
    //   price.id = "product-price";

    //   let desc = document.createElement("p");
    //   desc.className = "product-desc";
    //   desc.textContent = data.description;

    //   productDetailsDiv.append(title, category, price, desc);

    //   // rating
    //   let ratingDiv = document.createElement("div");
    //   ratingDiv.className = "product-rating";

    //   let rateSpan = document.createElement("span");
    //   rateSpan.textContent = `*${data.rating.rate}`;

    //   let countSpan = document.createElement("span");
    //   countSpan.className = "prod-count";
    //   countSpan.textContent = `(${data.rating.count} reviews)`;

    //   ratingDiv.append(rateSpan, countSpan);

    //   // quantity-selector
    //   let quantityDiv = document.createElement("div");
    //   quantityDiv.className = "quantity-selector";

    //   let minusBtn = document.createElement("button");
    //   minusBtn.className = "btn-minus";
    //   minusBtn.textContent = "-";

    //   let quantityInput = document.createElement("input");
    //   quantityInput.type = "number";
    //   quantityInput.min = "1";
    //   quantityInput.id = "quantity-input";
    //   quantityInput.value = "1";

    //   let plusBtn = document.createElement("button");
    //   plusBtn.className = "btn-plus";
    //   plusBtn.textContent = "+";

    //   quantityDiv.append(minusBtn, quantityInput, plusBtn);

    //   // add to cart button
    //   let addToCartBtn = document.createElement("button");
    //   addToCartBtn.className = "btn btn-danger add-to-cart";
    //   addToCartBtn.textContent = "Add to cart";

    //   productInfoDiv.append(
    //     productDetailsDiv,
    //     ratingDiv,
    //     quantityDiv,
    //     addToCartBtn
    //   );
    //   prodContainer.append(productImageDiv, productInfoDiv);

    //   // Basket & Quantity Logic
    //   let users = JSON.parse(localStorage.getItem("users")) || [];
    //   let userIndex = users.findIndex((user) => user.isLogined === true);
    //   let loginedUser = users[userIndex];
    //   let basket = loginedUser.basket || [];

    //   let existProduct = basket.find((product) => product.id == id);
    //   let count = (existProduct && existProduct.count) || 1;

    //   quantityInput.value = count;
    //   updatePrice();

    //   function updatePrice() {
    //     price.textContent = "$" + (data.price * count).toFixed(2);
    //   }

    //   minusBtn.addEventListener("click", () => {
    //     if (count > 1) {
    //       count--;
    //       quantityInput.value = count;
    //       updateBasket();
    //     }
    //   });

    //   plusBtn.addEventListener("click", () => {
    //     count++;
    //     quantityInput.value = count;
    //     updateBasket();
    //   });

    //   quantityInput.addEventListener("input", () => {
    //     let value = Number(quantityInput.value);
    //     if (!isNaN(value) && value >= 1) {
    //       count = value;
    //       updateBasket();
    //     } else {
    //       quantityInput.value = 1;
    //       count = 1;
    //       updateBasket();
    //     }
    //   });

    //   function updateBasket() {
    //     updatePrice();
    //     if (existProduct) {
    //       existProduct.count = count;
    //     } else {
    //       let productToAdd = { ...data, count };
    //       basket.push(productToAdd);
    //       existProduct = productToAdd;
    //     }
    //     users[userIndex].basket = basket;
    //     localStorage.setItem("users", JSON.stringify(users));
    //   }

    //   addToCartBtn.addEventListener("click", () => {
    //     if (!existProduct) {
    //       let productToAdd = { ...data, count };
    //       basket.push(productToAdd);
    //       toast("Product added to cart!");
    //     } else {
    //       existProduct.count = count;
    //     }
    //     users[userIndex].basket = basket;
    //     localStorage.setItem("users", JSON.stringify(users));
    //   });
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
