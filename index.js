// get date and displaying
const date = document.getElementById("date");

var options = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
};
const today = new Date();
date.innerHTML = today.toLocaleDateString("en-US", options);

// To do List
const input = document.getElementById("input");
const list = document.getElementById("list");
const submit = document.getElementById("submit");

const check = "fa-check-circle";
const uncheck = "fa-circle";
const line_through = "lineThrough";

// Variables
let LIST, id;

// get iten from locakstorage
let data = localStorage.getItem("TODO");

// check if datea is not empty
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length; // set the id to the last one in the list
  loadList(LIST); // load the list to the user interface
} else {
  LIST = [];
  id = 0;
}

//load items to the user's interface
function loadList(array) {
  array.forEach(function (item) {
    addTodo(item.name, item.id, item.done, item.trash);
  });
}

// display UI
function addTodo(todo, id, done, trash) {
  if (trash) {
    return;
  }

  const Done = done ? check : uncheck;
  const Line = done ? line_through : "";

  const item = `<li class="item">
                <i class="far ${Done}" job="complete" id="${id}"></i>
                <span class="text ${Line}">${todo}</span>
                <i class="far fa-trash-alt delete" job="delete" id="${id}"></i>
                </li>`;

  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
}

// When Submit
submit.addEventListener("click", function (event) {
  const toDo = input.value;

  if (toDo !== "") {
    addTodo(toDo, id, false, false);

    LIST.push({
      name: toDo,
      id: id,
      done: false,
      trash: false,
    });

    // add iten from locakstorage ( this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
    id++;
  }

  input.value = "";
});

//complete to do
function completeTodo(element) {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(line_through);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeTodo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

// target the items created dynamically
list.addEventListener("click", function (event) {
  const element = event.target; // return the clicked element inside list
  const elementJob = element.attributes.job.value; // complete or delete

  if (elementJob == "complete") {
    completeTodo(element);
  } else if (elementJob == "delete") {
    removeTodo(element);
  }

  // add iten from locakstorage ( this code must be added where the LIST array is updated)
  localStorage.setItem("TODO", JSON.stringify(LIST));
});
