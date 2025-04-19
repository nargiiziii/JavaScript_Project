document.addEventListener("DOMContentLoaded", () => {
  let users = JSON.parse(localStorage.getItem("users"));
  let form = document.querySelector("form");

  let username = document.querySelector("#username");
  let password = document.querySelector("#password");

  form.addEventListener("submit", login);

  function login(e) {
    e.preventDefault();

    let usernameValue = username.value.trim();
    let passwordValue = password.value.trim();
    
    let isEmail = usernameValue.includes("@");
    //emaildirse yoxlanis edirem:
    if (isEmail) {
        if (usernameValue.indexOf("@") < 1 || usernameValue.indexOf(".") < usernameValue.indexOf("@") + 1) {
            toast("please enter correct email address!!");
            return;
        } else {
            console.log("email is correct");
        }
    } else {  //email deyilse demeli username'di ve onun ucun yoxlanis edirem:
        if (usernameValue.length === 0) {  
            toast("please enter your full username");
            return;
        }
        console.log("username is correct");
    }
    
    if (passwordValue.length < 8) {
        toast("password must have at least 8 symbols");
        return;
    }

    
  

  let user = users.find((user) => user.username === usernameValue);
 //passwordu 4 defeden cox sehv yazsa userin blok olmasi ucun:
  if (user) {
    if (user.isLocked) {
      toast("too many attempts!!you are blocked for 15 minutes!!");
      return;
    }

    if (user.password === passwordValue) {
      user.isLogined = true;
      user.failedAttempts = 0;
      user.isLocked = false;
      localStorage.setItem("users", JSON.stringify(users));
      toast("user login successfully!");

      setTimeout(() => {
        window.location.href = "index.html";
      }, 4000);
    } else {

      user.failedAttempts = (user.failedAttempts || 0) + 1;

      if (user.failedAttempts >= 4) {
        user.isLocked = true;
        localStorage.setItem("users", JSON.stringify(users));

        toast("too many attempts!!you are blocked for 15 minutes!!");

        // 15 deyqeden sonra cixariram blokdan
        setTimeout(() => {
          let updatedUsers = JSON.parse(localStorage.getItem("users")) || [];
          let updatedUser = updatedUsers.find(
            (user) => user.username === usernameValue
          );
          if (updatedUser) {
            updatedUser.isLocked = false;
            updatedUser.failedAttempts = 0;
            localStorage.setItem("users", JSON.stringify(updatedUsers));
          }
        }, 15 * 60 * 1000); //15 deyqe
      } else {
        let remainingAttmp = 4 - user.failedAttempts;
        toast(`incorrect password. after ${remainingAttmp} attempts you will be blocked!!`);
        localStorage.setItem("users", JSON.stringify(users));
      }
    }
  } else {
    toast("username not found!");
  }
}
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
