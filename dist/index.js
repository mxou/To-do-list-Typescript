console.log("TS");
let tasks = [];
// Obligation de passer un string, renvoie rien
function addTask(title) {
    const newTask = {
        id: tasks.length + 1,
        title,
        done: false,
    };
    tasks.push(newTask);
    console.log(`Tâche ajoutée : ${title}`);
    renderTasks();
}
function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id); // garde toutes sauf celle avec le bon id
    renderTasks();
}
function renderTasks() {
    const ul = document.querySelector("#task_list");
    ul.innerHTML = "";
    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.className = `group bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer ${task.done ? "opacity-60" : ""}`;
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "×";
        deleteButton.className =
            "ml-3 w-6 h-6 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full flex items-center justify-center text-lg font-light transition-colors opacity-0 group-hover:opacity-100";
        deleteButton.addEventListener("click", (e) => {
            e.stopPropagation(); // ⚡ évite de déclencher le "done"
            deleteTask(task.id);
        });
        const text = document.createElement("span");
        text.textContent = `${task.id}. ${task.title}`;
        // li.textContent = `${task.id} . [${task.done ? "x" : ""}] ${task.title}`;
        if (task.done) {
            li.style.textDecoration = "line-through";
            li.style.color = "gray";
        }
        li.appendChild(text);
        li.appendChild(deleteButton);
        li.addEventListener("click", () => {
            task.done = !task.done;
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
export {};
// function listTasks(): void {
//   console.log("\n Liste des tâches : ");
//   tasks.forEach((task) => {
//     console.log(`${task.id}. [${task.done ? "x" : "v"}] . ${task.title}`);
//   });
// }
// addTask("Faire vesselle");
// addTask("Manger poisonge");
// listTasks();
//# sourceMappingURL=index.js.map