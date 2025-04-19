document.addEventListener("DOMContentLoaded", () => {
  let users = JSON.parse(localStorage.getItem("users"));

  let currentUser = users.find((user) => user.isLogined === true);

  let userIndex = users.findIndex((user) => user.id == currentUser.id);

  let basket = currentUser.basket;

  function createBasketItem() {
    const main = document.querySelector("main");

    //Right side
    const rightSide = document.createElement("div");
    rightSide.className = "right-side";

    const grayArea = document.createElement("div");
    grayArea.className = "gray-area";

    const applyArea = document.createElement("div");
    applyArea.className = "apply-area";

    const subtotal = document.createElement("p");
    subtotal.className = "subtotal";

    const shipping = document.createElement("p");
    shipping.textContent = "Shipping changes: Free";

    const total = document.createElement("p");

    applyArea.append(subtotal, shipping, total);

    const inputArea = document.createElement("div");
    inputArea.className = "input-area";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Discount promo code";

    const applyBtn = document.createElement("button");
    applyBtn.textContent = "Apply";

    inputArea.append(input, applyBtn);
    grayArea.append(applyArea, inputArea);

    const buttons = document.createElement("div");
    buttons.className = "buttons";

    const cartBtn = document.createElement("button");
    cartBtn.className = "cart";
    cartBtn.textContent = "Confirm cart";

    cartBtn.addEventListener("click", () => {
      if (basket.length === 0) {
        toast("cart is empty");
      } else {
        toast("cart confirmed");
      }
    });

    const paymentBtn = document.createElement("button");
    paymentBtn.className = "payment";
    paymentBtn.textContent = "Cash payment";

    const clearBtn = document.createElement("button");
    clearBtn.className = "clear-cart";
    clearBtn.textContent = "Clear cart";

    clearBtn.addEventListener("click", () => {
        basket = [];
        currentUser.basket = [];
        users[userIndex] = currentUser;
        localStorage.setItem("users", JSON.stringify(users));
        updateBasketDisplay();
        toast("cart cleared!!");
      });
      

    buttons.append(cartBtn, paymentBtn, clearBtn);
    rightSide.append(grayArea, buttons);

    //Left side
    const leftSide = document.createElement("div");
    leftSide.className = "left-side";

    const cards = document.createElement("div");
    cards.className = "cards";

    basket.forEach((product) => {
      const card = document.createElement("div");
      card.className = "card";

      const img = document.createElement("img");
      img.src = product.image;
      card.appendChild(img);

      // card-info
      const cardInfo = document.createElement("div");
      cardInfo.className = "card-info";

      const leftInfo = document.createElement("div");
      leftInfo.className = "left-info";

      const title = document.createElement("h3");
      title.className = "title";
      title.textContent = product.title;

      const prodInfo = document.createElement("p");
      prodInfo.className = "prod-info";
      prodInfo.textContent = "Size: XS Color: Grey";

      const deliver = document.createElement("p");
      deliver.className = "deliver";
      deliver.textContent = "Delivery: 25-32 days";

      const quality = document.createElement("p");
      quality.className = "quality";
      quality.textContent = "Quality";

      const price = document.createElement("div");
      price.className = "price";
      price.textContent = `US $${(product.count * product.price).toFixed(2)}`;

      // Count area
      const countArea = document.createElement("div");
      countArea.className = "count-area";

      const minusBtn = document.createElement("button");
      minusBtn.className = "minus-btn";
      minusBtn.textContent = "-";
      minusBtn.disabled = true;

      minusBtn.addEventListener("click", () => {
        decrement(product.id, count, minusBtn, price, subtotal, total);
        updateTotals(subtotal, total);
      });

      const count = document.createElement("p");
      count.className = "count";
      count.textContent = product.count;
      price.textContent = `$${(product.count * product.price).toFixed(2)}`;
      if (product.count > 1) {
        minusBtn.disabled = false;
      }

      const plusBtn = document.createElement("button");
      plusBtn.className = "plus-btn";
      plusBtn.textContent = "+";

      plusBtn.addEventListener("click", () => {
        increment(product.id, count, minusBtn, price, subtotal, total);
        updateTotals(subtotal, total);
      });

      countArea.append(minusBtn, count, plusBtn);

      leftInfo.append(title, prodInfo, deliver, quality, countArea);

      const rightInfo = document.createElement("div");
      rightInfo.className = "right-info";

      const wishRem = document.createElement("div");
      wishRem.className = "wish-rem";

      const wishlistArea = document.createElement("div");
      wishlistArea.className = "wishlist-area";
      wishlistArea.style.display = "flex";
      wishlistArea.style.gap = "5px";

      const wishlist = document.createElement("div");
      wishlist.className = "wishlist";
      wishlist.textContent = "Favorite";

      const heartIcon = document.createElement("i");
      heartIcon.className = "fa-regular fa-heart";

      wishlistArea.append(heartIcon, wishlist);
      wishlistArea.style.cursor = "pointer";

      wishlistArea.addEventListener("click", () => {
        toggleWishlist(product, heartIcon);
      });

      const remove = document.createElement("div");
      remove.className = "remove";
      remove.textContent = "Remove";

      remove.addEventListener("click", () => {
        removeProduct(product.id);
      });

      wishRem.append(wishlistArea, remove);
      rightInfo.append(price, wishRem);
      cardInfo.append(leftInfo, rightInfo);
      card.appendChild(cardInfo);
      cards.appendChild(card);
    });

    leftSide.appendChild(cards);

    main.append(leftSide, rightSide);
    updateTotals(subtotal, total);
  }

  function removeProduct(productId) {
    let users = JSON.parse(localStorage.getItem("users"));
    let currentUser = users.find((user) => user.isLogined === true);

    if (currentUser && currentUser.basket) {
      const updatedBasket = currentUser.basket.filter(
        (product) => product.id !== productId
      );

      if (updatedBasket.length !== currentUser.basket.length) {
        console.log("product silindi, basketi yenilendi.");

        currentUser.basket = updatedBasket;
        localStorage.setItem("users", JSON.stringify(users));

        basket = updatedBasket;

        updateBasketDisplay();
      } else {
        console.log("product tapilmadi.");
      }
    }
  }

  function updateBasketDisplay() {
    const main = document.querySelector("main");

    main.innerHTML = "";

    createBasketItem();
  }

  function toggleWishlist(product, heartIcon) {
    let users = JSON.parse(localStorage.getItem("users"));
    let currentUser = users.find((user) => user.isLogined === true);

    if (!currentUser) return;

    const wishlistIndex = currentUser.wishlist.findIndex(
      (item) => item.id === product.id
    );

    if (wishlistIndex === -1) {
      currentUser.wishlist.push(product);
      heartIcon.classList.remove("fa-regular", "fa-heart");
      heartIcon.classList.add("fa-solid", "fa-heart");
      heartIcon.style.color = "red";
      toast("Added to wishlist");
    } else {
      currentUser.wishlist.splice(wishlistIndex, 1);
      heartIcon.classList.remove("fa-solid", "fa-heart");
      heartIcon.classList.add("fa-regular", "fa-heart");
      heartIcon.style.color = "black";
      toast("Removed from wishlist");
    }

    localStorage.setItem("users", JSON.stringify(users));
  }

  function increment(
    productId,
    countElem,
    minusBtnElem,
    priceElem,
    subtotal,
    total
  ) {
    let product = basket.find((p) => p.id === productId);
    if (product) {
      product.count++;
      countElem.textContent = product.count;
      priceElem.textContent = `$${(product.count * product.price).toFixed(2)}`;
      minusBtnElem.disabled = product.count <= 1;

      currentUser.basket = basket;
      users = users.map((user) =>
        user.id === currentUser.id ? currentUser : user
      );
      localStorage.setItem("users", JSON.stringify(users));

      updateTotals(subtotal, total); 
    }
  }

  function decrement(
    productId,
    countElem,
    minusBtnElem,
    priceElem,
    subtotal,
    total
  ) {
    let product = basket.find((p) => p.id === productId);
    if (product && product.count > 1) {
      product.count--;
      countElem.textContent = product.count;
      priceElem.textContent = `$${(product.count * product.price).toFixed(2)}`;
      minusBtnElem.disabled = product.count <= 1;

      currentUser.basket = basket;
      users = users.map((user) =>
        user.id === currentUser.id ? currentUser : user
      );
      localStorage.setItem("users", JSON.stringify(users));

      updateTotals(subtotal, total); 
    }
  }

  function updateTotals(subtotal, total) {
    let subtotalValue = 0;

    basket.forEach((product) => {
      subtotalValue += product.price * product.count;
    });

    const subtotalText = `Your subtotal: US $${subtotalValue.toFixed(2)}`;
    const totalText = `<strong>Total: US $${subtotalValue.toFixed(2)}</strong>`; // Если доставка бесплатная

    subtotal.textContent = subtotalText;
    total.innerHTML = totalText;
  }

  createBasketItem();
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
