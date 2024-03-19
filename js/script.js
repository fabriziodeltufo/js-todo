// APP LOGIC
// collecting info on page

let noTaskMsg = document.querySelector(".no-tasks-msg");
let inputBtn = document.querySelector("button");
let inputField = document.querySelector("input");
let taskList = document.querySelector(".task-list");

// setting the key for local storage
let STORAGE_KEY = "__fdt_todo__";

// create the array for the tasks
let tasks = [];

// recover the tasks stored in local storage
let storage = localStorage.getItem(STORAGE_KEY);

// if there are tasks , update the array
if (storage) {
  tasks = JSON.parse(storage);
}

// show the tasks
showTasks();

// add the tasks in the array
inputBtn.addEventListener("click", function () {
  addTask();
});

// FUNCTIONS

// show tasks
function showTasks() {
  // screen reset
  noTaskMsg.innerText = "";
  taskList.innerText = "";

  // if there is at least one character task
  if (tasks.length > 0) {
    // check in array the tasks, use the template to create a task in the app
    tasks.forEach(function (task) {
      let template = createTaskTemplate(task);
      taskList.innerHTML += template;
    });
  } else {
    noTaskMsg.innerText = "No tasks to show at present ... ";
  }

  //   delete task
  CompleteTask();
}

// add task
function addTask() {
  // take the value from input as new task
  let newTask = inputField.value.trim();

  //  if there is at least one char of the tast
  if (newTask.length > 0) {
    // store the value in input in the tasks array
    tasks.push(newTask);

    // update local storage with new value
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

    // show the tasks
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

      // after deleting the task, update loacl storage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

      showTasks();
    });
  });
}
