document.addEventListener("DOMContentLoaded", () => {

    let form = document.querySelector("form");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let name = document.querySelector("#name");
    let username = document.querySelector("#username");
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");
    let confirmpassword = document.querySelector("#confirmpassword");


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


        // username yoxlanisi
        let usernameValue = username.value.trim();  

        if (usernameValue.length < 3) {
            toast("Username must have more than 3 characters");
            return;  
        } else if (usernameValue.length > 20) {
            toast("Username must have less than 20 characters");
            return;  
        }
        //ozum herf ve simvollari verirem ki icinnen yoxlanis elesin her simvolu
        let permittedSymb = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-"; 
        
        if (usernameValue.split("").every(char => permittedSymb.includes(char))) {
            console.log("username is correct");
        } else {
            toast("username can contain only letters,numbers, _ or -");
            return;  
        }


        // email yoxlanisi

        let emailValue = email.value.trim();

        if (
            emailValue.includes("@") &&         
            emailValue.includes(".") &&         
            emailValue.endsWith(".com") &&     
            emailValue.indexOf("@") > 0 &&      
            emailValue.indexOf(".") > emailValue.indexOf("@") + 1 //noqteden sonra @ olmalidi deye
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
        
    

        // password ve testiq passwordu eyni olmamasi yoxlanisi

        if (passwordValue !== confirmpassword.value.trim()) {
            toast("password and confirm password should be same!!");
            return;
        }


        

        let uniqueUser = users.some(
            (user) => user.username == usernameValue || user.email == emailValue
        );

        let id = uuidv4();

        if (!uniqueUser) {
            let newUser = {
              name: name.value,
              username: usernameValue,
              email: emailValue,
              password: passwordValue,
              isLogined: false,
              failedAttempts: 0, //password ucun attemptlerin sayi(cox olsa bloklanacaq)
              isLocked: false,  //bloklanmis olub olmamasini burda saxlayacam
              id,
              wishlist: [],
              basket: [],
            };
          

            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));
            toast("register successfully!!");
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        } else {
            toast("user already exists!");
        }

    }

    let toast = (text) => {
        Toastify({
            text: `${text}`,
            duration: 3000,
            position: "left", 
            stopOnFocus: true, 
            style: {
                background: "linear-gradient(to right, rgb(5, 125, 162),rgb(110, 185, 208))",
            },
            onClick: function() {} 
        }).showToast();
    }

});
