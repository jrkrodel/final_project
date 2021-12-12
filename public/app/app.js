var cartItems = 0;
var loggedIn = false;
var total = 0;
var modalOnScreen = false;

function initFirebase() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      firebase
        .auth()
        .currentUser.updateProfile({
          displayName: fName,
        })
        .then(() => {
          updateSiteWithInfo();
        });
    } else {
      $("#login-button").css("display", "block");
      $("#signup-button").css("display", "block");
    }
  });
}

function initLoginListeners() {
  $("#firebase-login").click(function (e) {
    e.preventDefault();
    displayModal("Logging in...");
    let email = $("#login-email").val();
    let password = $("#login-password").val();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
        $("#login-email").val("");
        $("#login-password").val("");
        $(".login-form-container").html("");
        $(".login-form-container").append(`<h1 id="displayName"></h1>
        <button id="firebase-signout" class="signin-button">Signout</button>`);
        $(".cover").css("display", "none");
        $(".login-form").css("display", "none");
        loggedIn = true;
        displayModal("Logged In");
        $("#login-button").css("display", "none");
        $("#signup-button").css("display", "none");
        logOutListener();
        updateSiteWithInfo();
      })
      .catch((error) => {
        var errorCode = error.code;

        if (errorCode == "auth/user-not-found") {
          displayModal("No user found");
        } else if (errorCode) {
          displayModal("Invalid Log In, Please try Again");
        }
        console.log(error);
      });
  });

  //Signup with an account
  $("#firebase-signup").click(function (e) {
    displayModal("Creating account...");
    e.preventDefault();
    fName = $("#fName").val();
    lName = $("#lName").val();
    let email = $("#email").val();
    let password = $("#password").val();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
        $("#fName").val("");
        $("#lName").val("");
        $("#email").val("");
        $("#password").val("");
        $(".login-form-container").html("");
        $(".login-form-container").append(`<h1 id="displayName"></h1>
        <button id="firebase-signout" class="signin-button">Signout</button>`);
        $(".cover").css("display", "none");
        $(".login-form").css("display", "none");
        loggedIn = true;
        displayModal("Signed up and<br>logged in");
        $("#login-button").css("display", "none");
        $("#signup-button").css("display", "none");
        logOutListener();
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
        if (errorCode == "auth/invalid-email") {
          displayModal("Invalid Email, please try again");
        } else if (errorCode == "auth/weak-password") {
          displayModal("Password too short<br> Must be 6 or more digits");
        } else if (errorCode == "auth/email-already-in-use") {
          displayModal("Email already in use");
        } else {
          displayModal("Invalid Log In, Please try Again");
        }
        // ..
      });
  });
}

function logOutListener() {
  $("#firebase-signout").click(function (e) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        if (window.location.hash == "#/cart") {
          console.log("test");
          window.location.hash = "#/coffeemakers";
        }
        $(".cover").css("display", "none");
        $(".login-form").css("display", "none");
        displayModal("Signed Out");
        cartItems = 0;
        total = 0;
        loggedIn = false;
        $("#login-button").css("display", "block");
        $("#signup-button").css("display", "block");
        $(".login-form-container").html("");
        $("#signup-button").removeClass("selected");
        $("#login-button").addClass("selected");
        $(".login-form-container")
          .append(`<input id="login-email" type="text" placeholder="Email" />
          <input id="login-password" type="password" placeholder="Password" />
          <button id="firebase-login" class="signin-button">Signin</button>`);
        initLoginListeners();
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

function scrollToTop() {
  $("body").scrollTop(0);
}

loadCoffeeMakers = function () {
  MODEL.loadCoffeeMakersData();
};

loadCart = function () {
  MODEL.loadCartData(total, cartItems);
};

function loadLoginForm() {
  if (loggedIn == false) {
    $("#login-button").click(function () {
      $(".login-form-container").html("");
      $("#signup-button").removeClass("selected");
      $("#login-button").addClass("selected");
      $(
        ".login-form-container"
      ).append(`<input id="login-email" type="text" placeholder="Email" />
    <input id="login-password" type="password" placeholder="Password" />
    <button id="firebase-login" class="signin-button">SIGN IN</button>`);
      initLoginListeners();
    });
    $("#signup-button").click(function () {
      $(".login-form-container").html("");
      $("#login-button").removeClass("selected");
      $("#signup-button").addClass("selected");
      $(
        ".login-form-container"
      ).append(`<input id="fName" type="text" placeholder="First Name" />
    <input id="lName" type="text" placeholder="Last Name" />
    <input id="email" type="text" placeholder="Email" />
    <input id="password" type="password" placeholder="Password" />
    <button id="firebase-signup" class="signin-button">CREATE AN ACCOUNT</button>`);
      initLoginListeners();
    });
  }
}

function emptyCart() {
  displayModal("Thank you for<br>Shopping with Us!");
  MODEL.cart.length = 0;
  cartItems = 0;
  total = 0;
  $(".coffeemakers-container").html("");
  checkForEmptyCart();
  $(".checkout").addClass("no-display");
  $(".coffeemakers-total").html("");
  loadCart();
}

function addToCart(index) {
  if (loggedIn == true) {
    $.getJSON("data/data.json", function (data) {
      MODEL.cart.push(data.COFFEE_MAKERS[index]);
    });
    cartItems++;
    checkForEmptyCart();
    displayModal(`Added to Cart! (Total Items: ${cartItems})`);
  } else {
    displayModal(
      "Please Sign in to add to Cart. Click the <i class='far fa-user'></i> icon"
    );
  }
}

function removeFromCart(index) {
  total = 0;
  cartItems--;
  displayModal(`Item removed from cart (Total Items: ${cartItems})`);
  $(".cart-container").html(
    "<h1>Regular Purchases</h1>" +
      "<p>These items will be processed today and shipped right away</p>"
  );
  $(".coffeemakers-total").html("");
  checkForEmptyCart();
  MODEL.cart.splice(index, 1);
  loadCart();
}

function closeDropDown(event) {
  $(".links").css("display", "none");
  $(".header").css("position", "relative");
  $("html, body").css({
    overflow: "auto",
    height: "auto",
  });
  event.stopPropagation();
}

function initListeners() {
  $(window).on("hashchange", route);
  $(".login").click(function () {
    $(".links").css("display", "none");
    $(".cover").css("display", "block");
    $(".login-form").css("display", "flex");
  });
  $(".login-form-close").click(function (event) {
    $(".cover").css("display", "none");
    $(".login-form").css("display", "none");
    event.stopPropagation();
  });
  $(".dropdown-nav i").click(function () {
    $(".links").css("display", "flex");
    // $(".header").css("position", "fixed");
    $("html, body").css({
      overflow: "hidden",
      height: "100%",
    });
  });
  $("#close-nav").click(function (event) {
    closeDropDown(event);
  });
  $(".links").click(function (event) {
    closeDropDown(event);
  });
  $(".right-side a").click(function (event) {
    if (loggedIn == false) {
      event.preventDefault();
      displayModal(
        "Please Sign in to Access Cart. Click the <i class='far fa-user'></i> icon"
      );
    }
  });
  route();
}

function updateSiteWithInfo() {
  let user = firebase.auth().currentUser;
  $("#displayName").html("Welcome " + user.displayName);
}

function checkSize() {
  $(window).resize(function () {
    let screen = document.body.clientWidth;
    if (screen > 1000) {
      $(".links").css("display", "none");
      $(".header").css("position", "relative");
      $("html, body").css({
        overflow: "auto",
        height: "auto",
      });
    }
  });
}

function route() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#/", "");
  if (pageID == "") {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    MODEL.changePage("coffeemakers");
  } else if (pageID == "cart") {
    if (loggedIn == true) {
      MODEL.changePage(pageID, loadCart);
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    } else {
      // window.location.hash = "#";
      window.location.hash = "#/coffeemakers";
      displayModal(
        "Please Sign in to access your Cart. Click the <i class='far fa-user'></i> icon"
      );
    }
  } else if (pageID == "coffeemakers") {
    MODEL.changePage(pageID, loadCoffeeMakers);
  }
}

function displayModal(message) {
  $(".message h1").html(message);
  if (modalOnScreen == false) {
    modalOnScreen = true;
    $(".modal").css("display", "flex");
    gsap.to($(".modal"), {
      opacity: 1,
      bottom: 50,
      duration: 2,
      ease: "expo",
      onComplete: addModalListener,
    });
  }
}

function addModalListener() {
  gsap.to($(".modal"), {
    opacity: 0,
    duration: 1,
    bottom: 0,
    ease: "sine",
    onComplete: (modalOnScreen = false),
  });
  $(".modal").click(function (e) {
    gsap.to($(".modal"), {
      opacity: 0,
      duration: 1,
      bottom: 0,
      ease: "sine",
    });
  });
}

function checkForEmptyCart() {
  if (cartItems == 0) {
    $("#items").css("display", "none");
  } else {
    $("#items").css("display", "flex");
    $("#items").html(cartItems);
  }
}

$(document).ready(function () {
  try {
    let app = firebase.app();
    gsap.set($(".modal"), { opacity: 0 });
    checkForEmptyCart();
    initListeners();
    initFirebase();
    initLoginListeners();
    loadLoginForm();
    checkSize();
  } catch {
    console.error();
  }
});
