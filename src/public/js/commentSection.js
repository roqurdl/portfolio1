const commentBox = document.querySelector(".commentBox");
const form = document.querySelector("#commentForm");
const textarea = form.querySelector("textarea");
const deleteBtn = document.querySelectorAll(".deleteBtn");

const productContainer = document.getElementById(`productCotainer`);

function addComment(text, id) {
  const productComments = document.querySelector(`.commentView_product`);
  const newComment = document.createElement(`li`);
  newComment.dataset.id = id;
  newComment.className = `product_comment`;
  const icon = document.createElement(`i`);
  const span = document.createElement(`span`);
  const XBtn = document.createElement(`span`);
  span.innerText = ` ${text}`;
  XBtn.innerText = "❌";
  XBtn.className = `deleteBtn`;
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(XBtn);
  productComments.prepend(newComment);
}

const handleSubmit = async (e) => {
  e.preventDefault();
  const text = textarea.value;
  const productId = productContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/products/${productId}/comment`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ text }),
  });
  textarea.value = "";
  if (response.status === 201) {
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

form.addEventListener(`submit`, handleSubmit);

const handleDelete = async (event) => {
  const comment = event.target.parentNode;
  const commentId = comment.dataset.id;
  const productId = productContainer.dataset.id;
  comment.remove(event);
  await fetch(`/api/comments/${commentId}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId,
    }),
  });
};

deleteBtn.forEach((btn) => {
  btn.addEventListener("click", handleDelete);
});
