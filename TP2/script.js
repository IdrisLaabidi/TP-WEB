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

let todoList = [
    new TodoItem("Buy groceries", "2023-10-01", "High"),
    new TodoItem("Walk the dog", "2023-10-02", "Medium"),
    new TodoItem("Read a book", "2023-10-03", "Low")
];

const taskListElement = document.getElementById("task-list");
for(let task of todoList) {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.textContent = `${task.title} - Due: ${task.dueDate} - Priority: ${task.priority}`;
    taskListElement.appendChild(listItem);
}

function addTask(event) {
    event.preventDefault(); // prevent form refresh

    // Get form values
    const title = document.getElementById("taskInput").value.trim();
    const dueDate = document.getElementById("dueDate").value;
    const priority = document.getElementById("prioritySelect").value;

    if (!title || !priority) {
        alert("Please enter a task title and select a priority.");
        return;
    }

    // Create new TodoItem
    const newTask = new TodoItem(title, dueDate, priority);

    // Add to todoList
    todoList.push(newTask);

    // Create and append new list item
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.textContent = `${newTask.title} - Due: ${newTask.dueDate || "No date"} - Priority: ${newTask.priority}`;
    taskListElement.appendChild(listItem);

    // Reset form
    document.querySelector("form").reset();
}

function toggleTheme() {
    const htmlElement = document.documentElement;
    const themeIcon = document.getElementById("theme-icon");
    const isDark = htmlElement.getAttribute("data-bs-theme") === "dark";
    htmlElement.setAttribute("data-bs-theme", isDark ? "light" : "dark");
    themeIcon.className = isDark ? "bi bi-moon-stars-fill" : "bi bi-sun-fill";

}
