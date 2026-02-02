const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");

input.addEventListener("keypress", e => {
  if (e.key === "Enter" && input.value.trim() !== "") {
    createTask(input.value);
    input.value = "";
  }
});

function createTask(text) {
  const li = document.createElement("li");

  const checkbox = document.createElement("div");
  checkbox.className = "checkbox";

  const span = document.createElement("span");
  span.className = "text";
  span.textContent = text;

  const del = document.createElement("span");
  del.className = "delete";
  del.textContent = "✕";

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(del);

  li.onclick = () => li.classList.toggle("completed");

  del.onclick = e => {
    e.stopPropagation();
    li.remove();
  };

  list.appendChild(li);
}
