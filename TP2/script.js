class TodoItem {
    constructor(title, dueDate, priority) {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }

    markAsCompleted() {
        this.completed = true;
    }
}

let todoList = [];

// Elements
const taskListElement = document.getElementById("task-list");
const completedCountElement = document.getElementById("completed-count");
const pendingCountElement = document.getElementById("pending-count");
const searchInput = document.getElementById("searchTask");

// ---- Persistence ----
function saveTasks() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function loadTasks() {
    const saved = localStorage.getItem("todoList");
    if (saved) {
        todoList = JSON.parse(saved).map(
            t => Object.assign(new TodoItem(t.title, t.dueDate, t.priority), { completed: t.completed })
        );
    }
    renderTasks();
}

// ---- Rendering ----
function renderTasks(filter = "") {
    taskListElement.innerHTML = "";
    let completed = 0;
    let pending = 0;

    todoList.forEach((task, index) => {
        if (filter && !task.title.toLowerCase().includes(filter.toLowerCase())) {
            return;
        }
        taskListElement.appendChild(createTaskElement(task, index));
        if (task.completed) {
            completed++;
        } else {
            pending++;
        }
    });

    completedCountElement.textContent = completed;
    pendingCountElement.textContent = pending;
}

function createTaskElement(task, index) {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.id = `task-${index}`;

    listItem.innerHTML = `
        <div class="d-flex align-items-center justify-content-between">
            <p class="self-align-center ${task.completed ? 'text-decoration-line-through text-muted' : ''}">
                ${task.title} - Due: ${task.dueDate || "No date"} - Priority: ${task.priority}
            </p>
            <div class="d-flex justify-content-end align-items-center">
                <button class="btn btn-sm btn-success me-2" onclick="completeTask(${index})" ${task.completed ? 'disabled' : ''}>
                    <i class="bi bi-check-lg"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>`;
    return listItem;
}

// ---- CRUD ----
function addTask(event) {
    event.preventDefault();
    const title = document.getElementById("taskInput").value.trim();
    const dueDate = document.getElementById("dueDate").value;
    const priority = document.getElementById("prioritySelect").value;

    if (!title || !priority) {
        alert("Please enter a task title and select a priority.");
        return;
    }

    const newTask = new TodoItem(title, dueDate, priority);
    todoList.push(newTask);
    saveTasks();
    renderTasks();
    document.querySelector("form").reset();
}

function deleteTask(index) {
    todoList.splice(index, 1);
    saveTasks();
    renderTasks();
}

function completeTask(index) {
    todoList[index].markAsCompleted();
    saveTasks();
    renderTasks();
}

function deleteAllTasks() {
    if (confirm("Are you sure you want to delete all tasks?")) {
        todoList = [];
        saveTasks();
        renderTasks();
    }
}

searchInput.addEventListener("input", () => {
    renderTasks(searchInput.value);
});

loadTasks();
