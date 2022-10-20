function activeOverlay() {
  document.querySelector("body>div").classList.toggle("overlay");
}

function showModalRegister() {
  document.querySelector(".register-modal").classList.toggle("show-modal");
}

function showModalLogin() {
  document.querySelector(".login-modal").classList.toggle("show-modal");
}

document.querySelector(".registerBtn").addEventListener("click", function () {
  showModalRegister();
  activeOverlay();

  document
    .querySelectorAll(".register-modal .form-element input")
    .forEach(function (element) {
      element.addEventListener("keyup", function (e) {
        if (e.keyCode == 13) {
          document.querySelector(".saveBtn").click();
        }
      });
    });
});

document
  .querySelector(".close-register")
  .addEventListener("click", function () {
    showModalRegister();
    activeOverlay();
    document
      .querySelectorAll(".register-modal .form-element input")
      .forEach(function (data) {
        data.value = "";
      });
  });

document.querySelector(".loginBtn").addEventListener("click", function () {
  showModalLogin();
  activeOverlay();
  document
    .querySelectorAll(".login-modal .form-element input")
    .forEach(function (element) {
      element.addEventListener("keyup", function (e) {
        if (e.keyCode == 13) {
          document.querySelector(".signinBtn").click();
        }
      });
    });
});

document.querySelector(".close-login").addEventListener("click", function () {
  showModalLogin();
  activeOverlay();
  document
    .querySelectorAll(".login-modal .form-element input")
    .forEach(function (data) {
      data.value = "";
    });
});

var userArr = [];

var User = function (name, email, password) {
  this.name = name;
  this.email = email;
  this.password = password;
};

document.querySelector(".saveBtn").addEventListener("click", function () {
  var txtNameRegister = document.querySelector("#nameRegister").value;
  var txtEmailRegister = document.querySelector("#emailRegister").value;
  var txtPhoneRegister = document.querySelector("#phoneRegister").value;
  var txtPasswordRegister = document.querySelector("#passwordRegister").value;

  if (
    txtNameRegister == "" ||
    txtEmailRegister == "" ||
    txtPhoneRegister == "" ||
    txtPasswordRegister == ""
  ) {
    alert("Ban can nhap day du thong tin!");
    return;
  }

  var user = new User(txtNameRegister, txtEmailRegister, txtPasswordRegister);
  const foundUser = userArr.find(function (data) {
    return txtEmailRegister == data.email;
  });

  if (!foundUser) {
    alert("Dang ki thanh cong");
    userArr.push(user);
    localStorage.setItem("userInfo", JSON.stringify(userArr));
  } else {
    alert("Email bi trung");
  }
  document
    .querySelectorAll(".register-modal .form-element input")
    .forEach(function (data) {
      data.value = "";
    });
  showModalRegister();
  activeOverlay();
});

document.querySelector(".signinBtn").addEventListener("click", function () {
  userArr = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : [];

  var txtEmailLogin = document.querySelector("#emailLogin").value;
  var txtPasswordLogin = document.querySelector("#passwordLogin").value;

  if (txtEmailLogin == null || txtPasswordLogin == null) {
    alert("Ban can nhap day du thong tin!");
    return;
  }

  var legitAccount = userArr.find(function (data) {
    return txtEmailLogin == data.email && txtPasswordLogin == data.password;
  });

  if (legitAccount) {
    alert("Dang nhap thanh cong!");
    document.querySelector(".userName").innerText = legitAccount.name;
    document.querySelector(".btnArea").classList.add("inactive");
    document.querySelector(".userProfile").classList.add("active");
  } else {
    alert("User hoac password khong dung");
  }

  document
    .querySelectorAll(".login-modal .form-element input")
    .forEach(function (data) {
      data.value = "";
    });

  showModalLogin();
  activeOverlay();
});
