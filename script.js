const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");

/* cargar tareas */
loadTasks();

/* añadir tarea */
input.addEventListener("keypress", e => {
  if (e.key === "Enter" && input.value.trim() !== "") {
    addTask(input.value, false);
    input.value = "";
    saveTasks();
  }
});

/* crear tarea */
function addTask(text, completed) {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");

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

  li.onclick = () => {
    li.classList.toggle("completed");
    saveTasks();
  };

  del.onclick = e => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  };

  list.appendChild(li);
}

/* guardar */
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector(".text").textContent,
      completed: li.classList.contains("completed")
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* cargar */
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTask(task.text, task.completed));
}
