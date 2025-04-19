document.addEventListener("DOMContentLoaded", async () => {
  let products = (await axios("http://localhost:3000/products")).data;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let loginedUser = users.find((user) => user.isLogined == true);

  let userIndex = users.findIndex((user) => user.id == loginedUser?.id);

  let userBtn = document.querySelector(".username");
  userBtn.textContent = loginedUser?.username;

  let register = document.querySelector(".register");

  let logout = document.querySelector(".logout");

  let wishlistLink = document.querySelector(".wishlistIcon");

  let basketLink = document.querySelector(".basketIcon");

  function updateUserStatus() {
    if (loginedUser) {
      register.style.display = "none";
      logout.style.display = "block";
    } else {
      register.style.display = "block";
      logout.style.display = "none";
    }
  }

  let logoutUserFunc = () => {
    loginedUser.isLogined = false;
    // logout etdikden sonra localstorageden wishlisti sifirlayiram
    loginedUser.wishlist = [];

    localStorage.setItem("users", JSON.stringify(users));

    loginedUser = null; //bunu null eledim ki wishliste kecid ede bilmesin, user cixis etdikden sonra login melumati sifirlansin

    register.style.display = "block";
    logout.style.display = "none";

    userBtn.textContent = "";

    toast("user logged out!!");

    let cards = document.querySelector(".cards");

    //logout etdikden sonra UI'dan heart'lari silmek ucun bele if bloku yazdim:
    if (cards) {
      cards.innerHTML = "";
      createUserCard();
    }
  };

  logout.addEventListener("click", logoutUserFunc);

  // login olmayanda wishlist seyfesine kecmek olmasin deye:
  if (wishlistLink) {
    wishlistLink.addEventListener("click", (e) => {
      if (!loginedUser) {
        e.preventDefault();
        toast("before entering the wishlist,you should log in!!");
        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
      }
    });
  }

  // login olmayanda basket seyfesine kecmek olmasin deye:
  if (basketLink) {
    basketLink.addEventListener("click", (e) => {
      if (!loginedUser) {
        e.preventDefault();
        toast("before entering the basket,you should log in!!");
        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
      }
    });
  }

  function createUserCard() {
    const cards = document.querySelector(".cards");

    if (!cards) return; // Если элемента .cards нет — просто выходим
  
    cards.innerHTML = "";

    products.forEach((product) => {
      const card = document.createElement("div");
      card.className = "card";
      card.style.cursor = "pointer";

      card.addEventListener("click", () => {
        window.location.href = `product_detail.html?id=${product.id}`;
      });      

      const newBadge = document.createElement("div");
      newBadge.className = "left-pos-text";
      newBadge.textContent = "New";
      card.appendChild(newBadge);

      const heartIcon = document.createElement("i");
      heartIcon.className = "card-heart fa-heart fa-lg";

      if (
        loginedUser &&
        loginedUser.wishlist.some((item) => item.id === product.id)
      ) {
        heartIcon.classList.add("fa-solid");
      } else {
        heartIcon.classList.add("fa-regular");
      }

      heartIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleUserWishlist(product.id, heartIcon);
      });

      const wishlistDiv = document.createElement("div");
      wishlistDiv.className = "wishlist-icon";
      wishlistDiv.appendChild(heartIcon);

      const cardImage = document.createElement("div");
      cardImage.className = "card-image";

      const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.title;
      cardImage.appendChild(img);

      const cardContent = document.createElement("div");
      cardContent.className = "card-content";

      const productRate = document.createElement("p");
      productRate.className = "product-rate";
      productRate.innerHTML = `<i class="fa-solid fa-star fa-sm"></i> ${product.rating.rate}`;

      const cardTitle = document.createElement("p");
      cardTitle.className = "card-title";
      cardTitle.textContent = product.title.slice(0, 45) + "...";

      const cardFooter = document.createElement("div");
      cardFooter.className = "card-footer";

      const cardPrice = document.createElement("span");
      cardPrice.className = "card-price";
      cardPrice.textContent = `$${product.price}`;

      const priceFrom = document.createElement("div");
      priceFrom.className = "card-price-from";
      priceFrom.textContent = `From $${(product.price * 2.6).toFixed(2)}`; // просто пример

      cardFooter.append(cardPrice, priceFrom);

      const addBtn = document.createElement("button");
      addBtn.className = "btn";
      addBtn.textContent = "Add to cart";
      addBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!loginedUser) {
          toast("login first before adding the basket!!");
        } else {
          addBasket(product.id);
        }
      });

      cardContent.append(productRate, cardTitle, cardFooter);
      card.append(wishlistDiv, cardImage, cardContent, addBtn);

      cards.appendChild(card);
    });
  }

  function toggleUserWishlist(productId, heartIcon) {
    if (!loginedUser) {
      toast("you should login first before entering the wishlist!!");
      setTimeout(() => {
        window.location.href = "login.html";
      }, 3000);
    }

    let currentProduct = loginedUser.wishlist.some(
      (item) => item.id === productId
    );

    if (currentProduct) {
      let currentProductIndex = loginedUser.wishlist.findIndex(
        (product) => product.id == productId
      );

      loginedUser.wishlist.splice(currentProductIndex, 1); //wishlistde bu product olarsa onu silirem

      users[userIndex].wishlist = loginedUser.wishlist;
      localStorage.setItem("users", JSON.stringify(users));

      heartIcon.classList.remove("fa-solid");
      heartIcon.classList.add("fa-regular");

      toast("product removed from wishlist");
    } else {
      let addProduct = products.find((product) => product.id == productId);

      loginedUser.wishlist.push(addProduct); //wishlistde product yoxdusa onu elave edirem wishlist arrayin icine

      users[userIndex] = loginedUser;
      localStorage.setItem("users", JSON.stringify(users));

      heartIcon.classList.add("fa-solid");
      heartIcon.classList.remove("fa-regular");

      toast("product added to wishlist");
    }
  }

  function addBasket(productId) {
    if (!loginedUser) {
      toast("you should login first before entering the basket!!");
      setTimeout(() => {
        window.location.href = "login.html";
      }, 3000);
    }

    let existingProd = loginedUser.basket.find((prod) => prod.id == productId);

    if (!existingProd) {
      let product = products.find((productItem) => productItem.id == productId);
      loginedUser.basket.push({ ...product, count: 1 });
    } else {
      existingProd.count++;
    }

    users[userIndex].basket = loginedUser.basket;
    localStorage.setItem("users", JSON.stringify(users));
    toast("product added to basket!!");
    basketCount();
  }

    function basketCount(){
      let result = loginedUser.basket.reduce(
        (acc, product) => acc + product.count,
      0);

      let countItem = document.querySelector(".basketIcon sup");
      countItem.textContent = result
    }
    basketCount();

  createUserCard();
  updateUserStatus();
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
