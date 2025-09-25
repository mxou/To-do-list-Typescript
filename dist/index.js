var _a, _b, _c, _d;
console.log("TS");
let tasks = [];
let currentFilter = "all";
function updateFilterUI() {
    var _a, _b, _c, _d, _e, _f;
    (_a = document.querySelector("#filter_all")) === null || _a === void 0 ? void 0 : _a.classList.remove("bg-gray-500");
    (_b = document.querySelector("#filter_done")) === null || _b === void 0 ? void 0 : _b.classList.remove("bg-green-500");
    (_c = document.querySelector("#filter_undone")) === null || _c === void 0 ? void 0 : _c.classList.remove("bg-red-500");
    if (currentFilter === "all") {
        (_d = document.querySelector("#filter_all")) === null || _d === void 0 ? void 0 : _d.classList.add("bg-gray-500");
    }
    else if (currentFilter === "done") {
        (_e = document.querySelector("#filter_done")) === null || _e === void 0 ? void 0 : _e.classList.add("bg-green-500");
    }
    else {
        (_f = document.querySelector("#filter_undone")) === null || _f === void 0 ? void 0 : _f.classList.add("bg-red-500");
    }
}
loadTasks();
renderTasks();
// Obligation de passer un string, renvoie rien
function addTask(title) {
    const newTask = {
        id: tasks.length + 1,
        title,
        done: false,
    };
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    saveTasks();
    renderTasks();
}
(_a = document.querySelector("#nuke_button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    if (window.confirm("Voulez vous tout supprimer ?")) {
        tasks = [];
        saveTasks();
        renderTasks();
    }
});
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
    const saved = localStorage.getItem("tasks");
    if (saved) {
        tasks = JSON.parse(saved);
    }
}
function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id); // garde toutes sauf celle avec le bon id
    saveTasks();
    renderTasks();
}
function editTask(task) {
    const newTitle = prompt("Nouveau nom de tâche", task.title);
    if (newTitle && newTitle.trim() !== "") {
        task.title = newTitle.trim();
        saveTasks();
        renderTasks();
    }
}
function renderTasks() {
    const saved = localStorage.getItem("tasks");
    if (saved) {
        tasks = JSON.parse(saved);
    }
    const p = document.querySelector("#task_remain");
    // Compter uniquement les tâches non faites
    const taskRemain = tasks.filter((task) => !task.done).length;
    p.innerHTML = taskRemain > 0 ? `Tâches restantes : ${taskRemain}` : "Aucune tâche restante";
    const ul = document.querySelector("#task_list");
    ul.innerHTML = "";
    let filteredTasks = tasks;
    if (currentFilter === "done") {
        filteredTasks = tasks.filter((task) => task.done);
    }
    else if (currentFilter === "undone") {
        filteredTasks = tasks.filter((task) => !task.done);
    }
    filteredTasks.forEach((task) => {
        const li = document.createElement("li");
        li.className = `group bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-evenly hover:shadow-md transition-shadow cursor-pointer ${task.done ? "opacity-60" : ""}`;
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "X";
        deleteButton.className =
            "text-white text-base rounded-md cursor-pointer px-2 bg-red-400 hover:text-red-50 hover:bg-red-500 flex items-center justify-center font-light ";
        deleteButton.addEventListener("click", (e) => {
            e.stopPropagation(); // ⚡ évite de déclencher le "done"
            deleteTask(task.id);
        });
        const editButton = document.createElement("button");
        editButton.innerHTML = "Editer";
        editButton.className = "text-white text-base rounded-md cursor-pointer px-2 bg-orange-500 hover:bg-orange-600 flex items-center justify-center font-light ";
        editButton.addEventListener("click", (e) => {
            e.stopPropagation(); // ⚡ évite de déclencher le "done"
            editTask(task);
        });
        const text = document.createElement("span");
        text.textContent = `${task.id}. ${task.title}`;
        text.className = ` text-gray-800 ${task.done ? "line-through text-gray-500" : ""}`;
        // li.textContent = `${task.id} . [${task.done ? "x" : ""}] ${task.title}`;
        if (task.done) {
            li.style.textDecoration = "line-through";
            li.style.color = "gray";
            deleteButton.disabled = true;
            editButton.disabled = true;
        }
        li.appendChild(text);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        li.addEventListener("click", () => {
            task.done = !task.done;
            saveTasks();
            renderTasks();
        });
        ul.appendChild(li);
    });
}
const addBtn = document.querySelector("#add_button");
const taskInput = document.querySelector("#task_input");
addBtn.addEventListener("click", () => {
    console.log("click btn");
    const title = taskInput.value.trim();
    if (title) {
        addTask(title);
        taskInput.value = "";
    }
});
(_b = document.querySelector("#filter_all")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    currentFilter = "all";
    updateFilterUI();
    renderTasks();
});
(_c = document.querySelector("#filter_done")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    currentFilter = "done";
    updateFilterUI();
    renderTasks();
});
(_d = document.querySelector("#filter_undone")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
    currentFilter = "undone";
    updateFilterUI();
    renderTasks();
});
export {};
//# sourceMappingURL=index.js.map