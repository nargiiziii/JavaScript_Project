document.addEventListener("DOMContentLoaded", () => {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let form = document.querySelector("form");

  let email = document.querySelector("#email");
  let password = document.querySelector("#password");

  form.addEventListener("submit", login);

  function login(e) {
    e.preventDefault();

    let emailValue = email.value.trim();
    let passwordValue = password.value.trim();

    if (
      !emailValue.includes("@") ||
      emailValue.indexOf("@") < 1 ||
      emailValue.indexOf(".") < emailValue.indexOf("@") + 1
    ) {
      toast("Please enter correct email address!!");
      return;
    }

    if (passwordValue.length < 8) {
      toast("Password must have at least 8 symbols");
      return;
    }

    let user = users.find((user) => user.email === emailValue);

    if (user) {
      console.log("User found:", user);

      if (user.isLocked) {
        toast("Too many attempts! You are blocked for 15 minutes!!");
        return;
      }

      if (user.password === passwordValue) {
        user.isLogined = true;
        user.failedAttempts = 0;
        user.isLocked = false;

        localStorage.setItem("users", JSON.stringify(users));
        toast("User login successfully!");

        setTimeout(() => {
          window.location.href = "index.html";
        }, 3000);
      } else {
        user.failedAttempts = (user.failedAttempts || 0) + 1;

        if (user.failedAttempts >= 4) {
          user.isLocked = true;
          localStorage.setItem("users", JSON.stringify(users));

          toast("Too many attempts! You are blocked for 15 minutes!!");


          setTimeout(() => {
            let updatedUsers = JSON.parse(localStorage.getItem("users")) || [];
            let updatedUser = updatedUsers.find(
              (user) => user.username === emailValue
            );

            if (updatedUser) {
              updatedUser.isLocked = false;
              updatedUser.failedAttempts = 0;
              localStorage.setItem("users", JSON.stringify(updatedUsers));
            }
          }, 15 * 60 * 1000);
        } else {
          let remainingAttmp = 4 - user.failedAttempts;
          toast(
            `Incorrect password. After ${remainingAttmp} attempts you will be blocked!!`
          );
          localStorage.setItem("users", JSON.stringify(users));
        }
      }
    } else {
      console.log("User not found:", emailValue);
      toast("Username not found!");
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
        "linear-gradient(to right,rgb(237, 140, 193),rgb(241, 174, 202))", 
    },
    onClick: function () {},
  }).showToast();
};
