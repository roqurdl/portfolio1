const commentBox = document.querySelector(".commentBox");
const form = document.querySelector("#commentForm");

const productContainer = document.getElementById(`productCotainer`);

async function handleSubmit(e) {
  e.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const productId = productContainer.dataset.id;
  console.log(text, productId);
  const sendToDb = await fetch(`/api/products/${productId}/comment`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ text }),
  });
}

form.addEventListener(`submit`, handleSubmit);
