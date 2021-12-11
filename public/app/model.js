var MODEL = (function () {
  var _cart = [];

  var _changePage = function (page, callback) {
    if (page == "") {
      $.get(`pages/home/home.html`, function (data) {
        $("#app").html(data);
        if (callback) {
          callback();
        }
      });
    } else {
      $.get(`pages/${page}/${page}.html`, function (data) {
        $("#app").html(data);
        if (callback) {
          callback();
        }
      });
    }
  };

  var _loadCartData = function (total, items) {
    if (_cart.length == 0) {
      $(".cart-content").html(
        "<p class='no-items'>0 items</p>" +
          `<h1 class='no-items-header'>You don't have any items in your shopping cart</h1>`
      );
      $(".cart-content").css("flex-direction", "column");
      $(".cart-content").css("align-items", "center");
      $(".cart-content").css("justify-content", "flex-start");
    } else if (_cart.length > 0) {
      $(".checkout").removeClass("no-display");
      for (i = 0; i < _cart.length; i++) {
        let price = Number(_cart[i].price);
        total += price;
        $(".cart-container").append(`
          <div class="cart-item">
            <div id="coffee-image-${i}" class="cart-item-image"></div>
            <div class="cart-item-info">
              <p>${_cart[i].name}</p>
            </div>
            <div class="cart-item-price"><p>${_cart[i].price}</p></div>
            <div onclick="removeFromCart(${i})" class="cart-item-delete"><i class="fas fa-times"></i></div>
          </div>
        `);

        $("#coffee-image-" + i).css("background-image", `${_cart[i].image}`);
      }
      let displayNumber = Number.parseFloat(total).toFixed(2);
      $(".cart-summary-subtotal").html(`<p>Subtotal (${items} Items)</p>
      <p>$${displayNumber}</p>`);
      $(".order-total").html(`  <h1>Order Total:</h1>
      <p>$${displayNumber}</p>`);
    }
  };

  var _loadCoffeeMakersData = function () {
    $.getJSON("data/data.json", function (data) {
      $.each(data.COFFEE_MAKERS, function (index, coffeemaker) {
        $(".coffeemakers-container").append(`
        <div class="coffeemaker-card">
        <div class="coffee-image" id="coffee-image-${index}"></div>
        <div class="coffee-info">
        <div class="title">
          <h1>${coffeemaker.name}</h1>
          </div>
          <p><sup>$</sup>${coffeemaker.price}</p>
          <button onclick="addToCart(${index})">BUY NOW</button>
        </div>
      </div>
            `);
        $("#coffee-image-" + index).css(
          "background-image",
          `${coffeemaker.image}`
        );
      });
    });
  };

  return {
    changePage: _changePage,
    cart: _cart,
    loadCartData: _loadCartData,
    loadCoffeeMakersData: _loadCoffeeMakersData,
  };
})();
