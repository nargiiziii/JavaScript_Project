
document.addEventListener("DOMContentLoaded", ()=> {

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let loginedUser = users.find((user) => user.isLogined == true);

    let userWishlist =  loginedUser.wishlist;
    console.log(userWishlist);

    function createWislistItem(){


        userWishlist.forEach(item => {
        
            let wishlistItem = document.createElement("div");
            wishlistItem.classList.add("wishlist-item");
    
            let image = document.createElement("div");
            image.classList.add("image");
    
            let img = document.createElement("img");
            img.src = `${item.image}`;
    
            let title = document.createElement("h3");
            title.classList.add("title");
            title.textContent = `${item.title.slice(0, 10)}. . .`
    
            let category = document.createElement("p");
            category.classList.add("category");
    
            let price = document.createElement("p");
            price.classList.add("price");
    
            let removeBtn = document.createElement("button");
            removeBtn.classList.add("btn", "btn-danger");
            removeBtn.textContent= "remove";

            removeBtn.addEventListener("click", () => {
                removeProduct(item.id);
            });

            image.appendChild(img);
            wishlistItem.append(image,title,category,price,removeBtn);

            let wishlist = document.querySelector(".wishlist");
            wishlist.appendChild(wishlistItem)

        });

    }


    function removeProduct(productId){
        let userIndex = users.findIndex((user) => user.id == productId);

        let productIndex = loginedUser.wishlist.findIndex(
            (product) => product.id == productId
        );

        if (productIndex != -1) {
            loginedUser.wishlist.splice(productIndex, 1);
            users[userIndex] = loginedUser;
            localStorage.setItem("users", JSON.stringify(users));
            toast("product removed from wishlist!!");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }

    createWislistItem();


});


let toast = (text) => {
    Toastify({
        text: `${text}`,
        duration: 1000,
        position: "left", 
        stopOnFocus: true, 
        style: {
            background: "linear-gradient(to right, rgb(5, 125, 162),rgb(110, 185, 208))",
        },
        onClick: function() {} 
    }).showToast();
}