var stripe = Stripe(
  "pk_test_51HuKlfFCT2X6vvt5bCs7YszMcgY1yLmre6XKI4Z1b3HPnzcanlaGlKf7EEcHwz15nh0I72i8hppUvr1ulfxDR5kW00FDWyptJO"
);

var orderBtn = document.getElementById("order-btn");
orderBtn.addEventListener("click", function () {
  stripe.redirectToCheckout({
    sessionId: "#{sessionId}",
  });
});
