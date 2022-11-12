const commentBox = document.querySelector(".commentBox");
const form = document.querySelector("#commentForm");
const textarea = form.querySelector("textarea");
const deleteBtn = document.querySelectorAll(".deleteBtn");

const liveContainer = document.getElementById(`liveContainer`);

function addComment(text, id) {
  const liveComments = document.querySelector(`.commentView_live`);
  const newComment = document.createElement(`li`);
  newComment.dataset.id = id;
  newComment.className = `live_comment`;
  const icon = document.createElement(`i`);
  const span = document.createElement(`span`);
  const XBtn = document.createElement(`span`);
  span.innerText = ` ${text}`;
  XBtn.innerText = "❌";
  XBtn.className = `deleteBtn`;
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(XBtn);
  liveComments.prepend(newComment);
}

const handleSubmit = async (e) => {
  e.preventDefault();
  const text = textarea.value;
  const liveId = liveContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/lives/${liveId}/comment`, {
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
  const liveId = liveContainer.dataset.id;
  comment.remove(event);
  await fetch(`/api/liveComments/${commentId}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      liveId,
    }),
  });
};

deleteBtn.forEach((btn) => {
  btn.addEventListener("click", handleDelete);
});
