const commentBox = document.querySelector(".commentBox");
const form = document.querySelector("#commentForm");
const textarea = form.querySelector("textarea");

const productContainer = document.getElementById(`productCotainer`);

const handleSubmit = async (e) => {
  e.preventDefault();
  const text = textarea.value;
  const productId = productContainer.dataset.id;
  if (text === "") {
    return;
  }
  await fetch(`/api/products/${productId}/comment`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ text }),
  });
  textarea.value = "";
};

form.addEventListener(`submit`, handleSubmit);
