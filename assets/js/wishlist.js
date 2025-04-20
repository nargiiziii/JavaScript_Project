document.addEventListener("DOMContentLoaded",async () => {
    let products = (await axios("http://localhost:3000/products")).data;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let loginedUser = users.find((user) => user.isLogined === true);

    if (!loginedUser || !loginedUser.wishlist) return;

    let userWishlist = loginedUser.wishlist;
  
    let userIndex = users.findIndex((user) => user.id == loginedUser.id);
  
    let wishlistContainer = document.querySelector(".wishlist");
    wishlistContainer.innerHTML = ""; 

    userWishlist.forEach((item) => {
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("wishlist-item");

        //image 
        let imageDiv = document.createElement("div");
        imageDiv.classList.add("image");

        let removeBtn = document.createElement("div");
        removeBtn.classList.add("btn-remove");
        removeBtn.textContent = "+";
        removeBtn.addEventListener("click", () => {
            removeProduct(item.id);
        });

        let discount = document.createElement("p");
        discount.classList.add("red-prq");
        discount.textContent = "30% off";

        let img = document.createElement("img");
        img.src = item.image;
        img.alt = "Product Image";

        imageDiv.appendChild(removeBtn);
        imageDiv.appendChild(discount);
        imageDiv.appendChild(img);

        //stars
        let stars = document.createElement("p");
        stars.classList.add("stars");
        stars.textContent = "*";

        //title
        let title = document.createElement("h3");
        title.classList.add("title");
        title.textContent = item.title.length > 10 ? item.title.slice(0, 10) + "..." : item.title;

        //price
        let priceArea = document.createElement("div");
        priceArea.classList.add("price-area")

        let price = document.createElement("p");
        price.classList.add("price");
        price.textContent = `$${item.price}`;

        let priceFrom = document.createElement("p");
        priceFrom.classList.add("price-from");
        priceFrom.textContent = "From $340.00";

        priceArea.append(price, priceFrom)

        let addBtn = document.createElement("button");
        addBtn.classList.add("btn-add");
        addBtn.textContent = "Add to cart";
        addBtn.addEventListener("click", () => addBasket(item.id))

        itemDiv.appendChild(imageDiv);
        itemDiv.appendChild(stars);
        itemDiv.appendChild(title);
        itemDiv.appendChild(priceArea);
        itemDiv.appendChild(addBtn);

        wishlistContainer.appendChild(itemDiv);
    });

    function removeProduct(productId) {
        let productIndex = loginedUser.wishlist.findIndex((product) => product.id === productId);
    
        if (productIndex !== -1) {
            loginedUser.wishlist.splice(productIndex, 1);
            users[userIndex] = loginedUser;
            localStorage.setItem("users", JSON.stringify(users));
            toast("Product removed from wishlist!");
    
            wishlistContainer.removeChild(wishlistContainer.children[productIndex]);
        }
    }
    

    function addBasket(productId) {
        let existingProd = loginedUser.basket.find((prod) => prod.id == productId);
    
        if (!existingProd) {
            let product = products.find((productItem) => productItem.id == productId);
            loginedUser.basket.push({ ...product, count: 1 });
        } else {
            existingProd.count++;
        }
    
        users[userIndex] = loginedUser;
        localStorage.setItem("users", JSON.stringify(users));
        toast("Product added to basket!");
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

});

let toast = (text) => {
    Toastify({
        text: `${text}`,
        duration: 1000,
        position: "left",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, rgb(5, 125, 162), rgb(110, 185, 208))",
        },
        onClick: function () {},
    }).showToast();
};
