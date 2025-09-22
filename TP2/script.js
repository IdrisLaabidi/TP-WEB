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
todoList.forEach((task, index) => {
    taskListElement.appendChild(createTaskElement(task, index));
});

function toggleTheme() {
    const htmlElement = document.documentElement;
    const themeIcon = document.getElementById("theme-icon");
    const isDark = htmlElement.getAttribute("data-bs-theme") === "dark";
    htmlElement.setAttribute("data-bs-theme", isDark ? "light" : "dark");
    themeIcon.className = isDark ? "bi bi-moon-stars-fill" : "bi bi-sun-fill";

}

function createTaskElement(task, index) {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.id = `task-${index}`;
    listItem.innerHTML = `<div class="d-flex align-items-center justify-content-between">
        <p class="self-align-center">${task.title} - Due: ${task.dueDate || "No date"} - Priority: ${task.priority}</p>
        <div class="d-flex justify-content-end align-items-center">
            <button class="btn btn-sm btn-success me-2" onclick="completeTask(${index})" ${task.completed ? 'disabled' : ''}><i class="bi bi-check-lg"></i></button>
            <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})"><i class="bi bi-trash"></i></button>
        </div>
    </div>`;
    return listItem;
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
    taskListElement.appendChild(createTaskElement(newTask));

    // Reset form
    document.querySelector("form").reset();
}

function deleteTask(index) {
    console.log("Delete task at index:", index);    
    taskListElement.removeChild(document.getElementById(`task-${index}`));
    todoList.splice(index, 1);
}

function completeTask(index) {
    console.log("Complete task at index:", index);  
    todoList[index].markAsCompleted();
    const taskElement = document.getElementById(`task-${index}`);
    taskElement.style.textDecoration = 'line-through';
    taskElement.style.opacity = '0.6';
    taskElement.querySelector("button.btn-success").disabled = true;
}
