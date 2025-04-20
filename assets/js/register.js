document.addEventListener("DOMContentLoaded", () => {

    let form = document.querySelector("form");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let email = document.querySelector("#email");
    let password = document.querySelector("#password");


    // password ui terefden yoxlanis hissesi

    let checkPass = document.querySelector(".password-check");
    password.addEventListener("input", () => {
        let value = password.value.trim();

        let haveUppercase = value !== value.toLowerCase();
        let haveLowercase = value !== value.toUpperCase();
        let haveDigit = value.split("").some(char => "0123456789".includes(char));  
        let haveSpecial = value.split("").some(char => "@#$%&".includes(char));    
        let isLong = value.length >= 8;


        if (
            haveUppercase &&
            haveLowercase &&
            haveDigit &&
            haveSpecial &&
            isLong
        ) {
            checkPass.textContent = "perfect";
            checkPass.style.color = "green";
        } else {
            checkPass.textContent = "too weak";
            checkPass.style.color = "red";
        }
    });

    

    form.addEventListener("submit", register);

    function register(e) {
        e.preventDefault();

        // email yoxlanisi

        let emailValue = email.value.trim();

        if (
            emailValue.includes("@") &&         
            emailValue.includes(".") &&         
            emailValue.endsWith(".com") &&     
            emailValue.indexOf("@") > 0 &&      
            emailValue.indexOf(".") > emailValue.indexOf("@") + 1 
        ) {
            console.log("email is correct");
        } else {
            toast("email must have correct format (user@example.com)");
            return;
        }
        


        // password yoxlanisi

        let passwordValue = password.value.trim();

        let haveUppercase = passwordValue !== passwordValue.toLowerCase();
        let haveLowercase = passwordValue !== passwordValue.toUpperCase();
        let haveDigit = passwordValue.split("").some(char => "0123456789".includes(char));
        let haveSpecial = passwordValue.split("").some(char => "@#$%&".includes(char));
        let isLong = passwordValue.length >= 8;
        
        if (
            haveUppercase &&
            haveLowercase &&
            haveDigit &&
            haveSpecial &&
            isLong
        ) {
            console.log("password is correct");
        } else {
            toast("password must have correct format (example: nN1#nN1#)");
            return;
        }
        
    
        let uniqueUser = users.some(
            (user) => user.email == emailValue
        );

        let id = uuidv4();

        if (!uniqueUser) {
            let newUser = {
              email: emailValue,
              password: passwordValue,
              isLogined: false,
              failedAttempts: 0, 
              isLocked: false,  
              id,
              wishlist: [],
              basket: [],
            };
          
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));
            
            fetch("http://localhost:3000/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(newUser)
            })
            .then(() => {
                toast("register successfully!!");
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 2000);
            })
            .catch(() => {
                toast("error: can not save user in db.json");
            });
            
        } else {
            toast("user already exists!");
        }

    }

    let toast = (text) => {
        Toastify({
          text: `${text}`,
          duration: 2000,
          position: "left",
          stopOnFocus: true,
          style: {
            background:
              "linear-gradient(to right,rgb(237, 140, 193),rgb(241, 174, 202))", 
          },
          onClick: function () {},
        }).showToast();
      };
      

});
