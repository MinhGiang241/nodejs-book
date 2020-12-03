const deleteProduct = (btn) => {
  const prodId = btn.parentNode.querySelector("[name=id]").value;
  const csrf = btn.parentNode.querySelector("[name=_csrf").value;
  const productElement = btn.closest("article");

  fetch(`/admin/product/${prodId}`, {
    method: "DELETE",
    headers: { "csrf-token": csrf },
  })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      console.log(data);
      productElement.remove(); // not support for IE using "parentNode.removeChild(productElement) instead"
    })
    .catch((err) => console.log("error", err));
};
