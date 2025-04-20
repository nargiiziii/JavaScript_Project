document.addEventListener("DOMContentLoaded", async () => {
    let Url = new URLSearchParams(location.search);
    let prodContainer = document.querySelector(".product-container");
    let id = Url.get("id");
    
  
    let products = (await axios("http://localhost:3000/products")).data;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let loginedUser = users.find((user) => user.isLogined == true);
    let userIndex = users.findIndex((user) => user.id == loginedUser?.id);
  
    fetch(`http://localhost:3000/products/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Product not found!!");
      }
      return response.json();
    })
      .then((data) => {
        let allImgs = document.querySelectorAll(".small-imgs img");
        let bigImg = document.querySelector(".big-img img");
  
        //slider balaca sekiller ucun 
        allImgs.forEach((img) => {
          img.src = data.image;
          img.addEventListener("click", () => {
            bigImg.src = img.src;
            console.log("Balaca sekil deyisdirildi!!");
          });
        });
  
        if (data.image) {
          bigImg.src = data.image;
        }
  
        let title = document.querySelector(".title");
        title.textContent = data.title;
  
        let price = document.querySelector(".red");
        price.textContent = `2-9 pieces US $$${data.price}`;
  
        let addToCart = document.querySelector(".cart");
        addToCart.addEventListener("click", () => addBasket(data.id));

        let heartIcon = document.querySelector(".wishlist-icon");

        if (loginedUser && loginedUser.wishlist.some((item) => item.id === data.id)) {
          heartIcon.classList.add("fa-solid");
          heartIcon.classList.remove("fa-regular");
        }
        
        heartIcon.addEventListener("click", (e) => {
          e.stopPropagation();
          toggleUserWishlist(data.id, heartIcon);
        });

        let desc = document.querySelector(".desc-text");
        desc.textContent = data.description;
        
  
        function addBasket(productId) {
  
          let existingProd = loginedUser.basket.find((prod) => prod.id == productId);
  
          if (!existingProd) {
            let product = products.find((productItem) => productItem.id == productId);
            loginedUser.basket.push({ ...product, count: 1 });
          } else {
            existingProd.count++;
          }
  
          users[userIndex].basket = loginedUser.basket;
          localStorage.setItem("users", JSON.stringify(users));
          toast("Product added to basket!");
          basketCount();
        }
  
        function basketCount() {
          let result = loginedUser.basket.reduce(
            (acc, product) => acc + product.count,
            0
          );
  
          let countItem = document.querySelector(".basketIcon sup");
          countItem.textContent = result;
        }
  
        basketCount();

        
        function toggleUserWishlist(productId, heartIcon) {

          
            let isInWishlist = loginedUser.wishlist.some((item) => item.id === productId);
          
            if (isInWishlist) {

              let index = loginedUser.wishlist.findIndex((product) => product.id == productId);
              loginedUser.wishlist.splice(index, 1);
          
              heartIcon.classList.remove("fa-solid", "red");
              heartIcon.classList.add("fa-regular");
          
              toast("Product removed from wishlist");
            } else {

              let product = products.find((productItem) => productItem.id == productId);
              loginedUser.wishlist.push(product);
          
              heartIcon.classList.add("fa-solid", "red");
              heartIcon.classList.remove("fa-regular");
          
              toast("Product added to wishlist");
            }
          
            users[userIndex].wishlist = loginedUser.wishlist;
            localStorage.setItem("users", JSON.stringify(users));
          }
          

      })
      .catch((error) => {
        console.log("Product not found, error: " + error.message);
        let errorMsg = document.createElement("p");
        errorMsg.textContent = "Product not found";
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
        background: "linear-gradient(to right, rgb(5, 125, 162), rgb(110, 185, 208))",
      },
    }).showToast();
  };
  