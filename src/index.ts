console.log("TS");

// FEATURES A RAJOUTER :
// 1/ Filtrage

// 4/ Dark mode

// Définition d'une task

type Task = {
  id: number;
  title: string;
  done: boolean;
};

let tasks: Task[] = [];

loadTasks();
renderTasks();

// Obligation de passer un string, renvoie rien
function addTask(title: string): void {
  const newTask: Task = {
    id: tasks.length + 1,
    title,
    done: false,
  };
  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  saveTasks();
  renderTasks();
}

document.querySelector("#nuke_button")?.addEventListener("click", () => {
  if (window.confirm("Voulez vous tout supprimer ?")) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
});

function saveTasks(): void {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(): void {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    tasks = JSON.parse(saved);
  }
}

function deleteTask(id: number): void {
  tasks = tasks.filter((task) => task.id !== id); // garde toutes sauf celle avec le bon id
  saveTasks();
  renderTasks();
}

function editTask(task: Task): void {
  const newTitle = prompt("Nouveau nom de tâche", task.title);
  if (newTitle && newTitle.trim() !== "") {
    task.title = newTitle.trim();
    saveTasks();
    renderTasks();
  }
}

function renderTasks(): void {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    tasks = JSON.parse(saved);
  }
  const p = document.querySelector("#task_remain") as HTMLParagraphElement;
  // Compter uniquement les tâches non faites
  const taskRemain = tasks.filter((task) => !task.done).length;
  p.innerHTML = taskRemain > 0 ? `Tâches restantes : ${taskRemain}` : "Aucune tâche restante";
  const ul = document.querySelector("#task_list") as HTMLUListElement;
  ul.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = `group bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-evenly hover:shadow-md transition-shadow cursor-pointer ${
      task.done ? "opacity-60" : ""
    }`;

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Supprimer";
    deleteButton.className = "text-white text-base rounded-md cursor-pointer px-2 bg-red-400 hover:text-red-50 flex items-center justify-center font-light ";
    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation(); // ⚡ évite de déclencher le "done"
      deleteTask(task.id);
    });

    const editButton = document.createElement("button");
    editButton.innerHTML = "Editer";
    editButton.className = "text-white text-base rounded-md cursor-pointer px-2 bg-red-400 hover:text-red-50 flex items-center justify-center font-light ";
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

const addBtn = document.querySelector("#add_button") as HTMLButtonElement;
const taskInput = document.querySelector("#task_input") as HTMLInputElement;

addBtn.addEventListener("click", () => {
  console.log("click btn");
  const title = taskInput.value.trim();
  if (title) {
    addTask(title);
    taskInput.value = "";
  }
});

// function listTasks(): void {
//   console.log("\n Liste des tâches : ");
//   tasks.forEach((task) => {
//     console.log(`${task.id}. [${task.done ? "x" : "v"}] . ${task.title}`);
//   });
// }

// addTask("Faire vesselle");
// addTask("Manger poisonge");
// listTasks();
