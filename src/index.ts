type Task = {
  id: number;
  title: string;
  done: boolean;
};

let tasks: Task[] = [];

type Filter = "all" | "done" | "undone";
let currentFilter: Filter = "all";

function updateFilterUI(): void {
  document.querySelector("#filter_all")?.classList.remove("bg-gray-500");
  document.querySelector("#filter_done")?.classList.remove("bg-green-500");
  document.querySelector("#filter_undone")?.classList.remove("bg-red-500");

  if (currentFilter === "all") {
    document.querySelector("#filter_all")?.classList.add("bg-gray-500");
  } else if (currentFilter === "done") {
    document.querySelector("#filter_done")?.classList.add("bg-green-500");
  } else {
    document.querySelector("#filter_undone")?.classList.add("bg-red-500");
  }
}

loadTasks();
renderTasks();

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
  tasks = tasks.filter((task) => task.id !== id);
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

  const taskRemain = tasks.filter((task) => !task.done).length;
  p.innerHTML = taskRemain > 0 ? `Tâches restantes : ${taskRemain}` : "Aucune tâche restante";
  const ul = document.querySelector("#task_list") as HTMLUListElement;
  ul.innerHTML = "";

  let filteredTasks: Task[] = tasks;
  if (currentFilter === "done") {
    filteredTasks = tasks.filter((task) => task.done);
  } else if (currentFilter === "undone") {
    filteredTasks = tasks.filter((task) => !task.done);
  }

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = `group bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-evenly hover:shadow-md transition-shadow cursor-pointer ${
      task.done ? "opacity-60" : ""
    }`;

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "X";
    deleteButton.className =
      "text-white text-base rounded-md cursor-pointer px-2 bg-red-400 hover:text-red-50 hover:bg-red-500 flex items-center justify-center font-light ";
    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteTask(task.id);
    });

    const editButton = document.createElement("button");
    editButton.innerHTML = "Editer";
    editButton.className = "text-white text-base rounded-md cursor-pointer px-2 bg-orange-500 hover:bg-orange-600 flex items-center justify-center font-light ";
    editButton.addEventListener("click", (e) => {
      e.stopPropagation();
      editTask(task);
    });
    const text = document.createElement("span");
    text.textContent = `${task.id}. ${task.title}`;
    text.className = ` text-gray-800 ${task.done ? "line-through text-gray-500" : ""}`;

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

document.querySelector("#filter_all")?.addEventListener("click", () => {
  currentFilter = "all";
  updateFilterUI();
  renderTasks();
});
document.querySelector("#filter_done")?.addEventListener("click", () => {
  currentFilter = "done";
  updateFilterUI();
  renderTasks();
});
document.querySelector("#filter_undone")?.addEventListener("click", () => {
  currentFilter = "undone";
  updateFilterUI();
  renderTasks();
});
