import { getTodayInputFormat, getDisplayDate } from "./date.js";

let todos = JSON.parse(localStorage.getItem("todo_list_app")) || [];

// 2. SAVE HELPER: Writes the current todos array to localStorage as a JSON string
function saveToLocalStorage() {
  localStorage.setItem("todo_list_app", JSON.stringify(todos));
}

function initApp() {
  const content = document.querySelector("#content");
  if (!content) return;

  const toDoList = document.createElement("div");
  toDoList.innerHTML = `
    <form id="todo-form" style="margin-bottom: 20px;">
      <label for="task-date"><strong>Select Date:</strong></label><br/>
      <input type="date" id="task-date" value="${getTodayInputFormat()}" required /><br/><br/>

      <label for="task-title"><strong>Task Description:</strong></label><br/>
      <input type="text" id="task-title" placeholder="e.g. Buy groceries" required /><br/><br/>

      <button type="submit">Add Task</button>
    </form>
    <hr/>

    <h3>Your Tasks</h3>
    <div id="todo-list-container"></div>
  `;

  content.appendChild(toDoList);

  const form = document.querySelector("#todo-form");
  const dateInput = document.querySelector("#task-date");
  const titleInput = document.querySelector("#task-title");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    todos.push({
      id: Date.now(),
      title: titleInput.value,
      date: dateInput.value,
    });

    titleInput.value = "";
    saveToLocalStorage();
    updateTaskList();
  });

  updateTaskList();
}

function updateTaskList() {
  const container = document.querySelector("#todo-list-container");
  if (!container) return;

  container.innerHTML = "";

  if (todos.length === 0) {
    container.innerHTML = "<p>No tasks added yet.</p>";
    return;
  }

  todos.forEach((todo) => {
    const taskCard = document.createElement("div");
    taskCard.style.padding = "10px";
    taskCard.style.margin = "8px 0";
    taskCard.style.borderLeft = "4px solid #007bff";
    taskCard.style.backgroundColor = "#f9f9f9";
    taskCard.style.display = "flex";
    taskCard.style.justifyContent = "space-between";
    taskCard.style.alignItems = "center";

    taskCard.innerHTML = `
    <div>
      <strong>${todo.title}</strong><br/>
      <small style="color: #555;">Scheduled for: ${getDisplayDate(todo.date)}</small>
      </div>
      <button class="delete-btn" data-id="${todo.id}" style="background-color: #ff4d4d; color: white; border: none; padding: 5px 10px; cursor: pointer;">Delete</button>
    `;

    const deleteBtn = taskCard.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => deleteTask(todo.id));

    container.appendChild(taskCard);
  });
}

function deleteTask(idToDelete) {
  todos = todos.filter((todo) => todo.id !== idToDelete);
  saveToLocalStorage();
  updateTaskList();
}

// Wait for HTML to load completely before running JavaScript
document.addEventListener("DOMContentLoaded", initApp);