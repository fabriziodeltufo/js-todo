// collecting info on page

let noTaskMsg = document.querySelector(".no-tasks-msg");
let inputBtn = document.querySelector("button");
let inputField = document.querySelector("input");
let taskList = document.querySelector(".task-list");

// preapro array per memorizzare le task
let tasks = [];

// mostriamo se abbiamo delle task
showTasks();

// inseriamo la task
inputBtn.addEventListener("click", function () {
  // aggiungi task
  addTask();
});

// FUNZIONI

// MOSTRA TASKS
function showTasks() {
  // screen reset
  noTaskMsg.innerText = "";
  taskList.innerText = "";

  if (tasks.length > 0) {
    tasks.forEach(function (task) {
      let template = createTaskTemplate(task);
      taskList.innerHTML += template;
    });
  } else {
    noTaskMsg.innerText = "No tasks to show at present ... ";
  }

  //   elimina task completata
  CompleteTask();
}

// AGGIUNGI TASK
function addTask() {
  // recupero il valore inpoutato
  let newTask = inputField.value.trim();

  //   se il campo non e vuoto
  if (newTask.length > 0) {
    // carico valore imputato nell array tasks
    tasks.push(newTask);

    // mostra la task
    showTasks();

    // reset input field
    inputField.value = "";
  }
}

function createTaskTemplate(task) {
  return `<li class="task-item">
            <div class="task-check">
            <img src="images/check.svg" alt="Check Icon" />
            </div>
            <div class="task-content">${task}</div>
        </li>`;
}

function CompleteTask() {
  let tasksChecked = document.querySelectorAll(".task-check");

  tasksChecked.forEach(function (check, index) {
    check.addEventListener("click", function () {
      tasks.splice(index, 1);
      showTasks();
    });
  });
}
