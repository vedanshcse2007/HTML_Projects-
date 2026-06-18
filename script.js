const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

/* Save Tasks */
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* Render Tasks */
function renderTasks() {
    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "active") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach(task => {
        const li = document.createElement("li");

        li.className = task.completed
            ? "task-item completed"
            : "task-item";

        li.dataset.id = task.id;

        li.innerHTML = `
            <span class="task-text">${task.text}</span>

            <div class="task-actions">
                <button class="complete-btn">
                    ${task.completed ? "Undo" : "Done"}
                </button>

                <button class="edit-btn">
                    Edit
                </button>

                <button class="delete-btn">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

/* Add Task */
function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();

    taskInput.value = "";
}

/* Add Button Event */
addTaskBtn.addEventListener("click", addTask);

/* Enter Key Event */
taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

/* Event Delegation */
taskList.addEventListener("click", function(e) {

    const taskItem = e.target.closest(".task-item");

    if (!taskItem) return;

    const taskId = Number(taskItem.dataset.id);

    /* Complete Task */
    if (e.target.classList.contains("complete-btn")) {

        tasks = tasks.map(task =>
            task.id === taskId
                ? { ...task, completed: !task.completed }
                : task
        );
    }

    /* Delete Task */
    if (e.target.classList.contains("delete-btn")) {

        tasks = tasks.filter(task => task.id !== taskId);
    }

    /* Edit Task */
    if (e.target.classList.contains("edit-btn")) {

        const task = tasks.find(task => task.id === taskId);

        const updatedText = prompt(
            "Edit Task:",
            task.text
        );

        if (
            updatedText !== null &&
            updatedText.trim() !== ""
        ) {
            task.text = updatedText.trim();
        }
    }

    saveTasks();
    renderTasks();
});

/* Filter Tasks */
filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        document
            .querySelector(".filter-btn.active")
            .classList.remove("active");

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        renderTasks();
    });
});

/* Initial Load */
renderTasks();