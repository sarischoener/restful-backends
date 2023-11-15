"use strict";

/*
 TODO APP with API
*/

// Variablen bauen
const newToDoInput = document.getElementById("nameField");
const addToDoBtn = document.getElementById("add");

const removeBtn = document.getElementById("remove");

const selectInputAll = document.getElementById("selectInputAll");
const selectInputDone = document.getElementById("selectInputDone");
const selectInputOpen = document.getElementById("selectInputOpen");

const ulList = document.getElementById("ulList");

// RenderTodos === GET
function renderTodos() {
  ulList.innerHTML = "";
  //Todos aus Api holen(fetchen)
  fetch("http://localhost:4730/todos")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((todosJsonData) => {
      console.log(todosJsonData);
      for (let todo of todosJsonData) {
        const newLi = document.createElement("li");
        // Checkbox bauen
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.done;
        // description der Todos bauen
        const todoText = document.createElement("lable");
        todoText.innerHTML = todo.description;
        // todoList, Checkbox und Text hinzufügen
        ulList.appendChild(newLi);
        newLi.appendChild(checkbox);
        newLi.append(todoText);
        // line-through muss hier auch schon passieren!
        if (todo.done === true) {
          todoText.style.textDecoration = "line-through";
        }
        checkbox.addEventListener("change", (event) => {
          console.log(event.target.checked);
          updateTodo(todo.id, event.target.checked).then(renderTodos);
        });
      }
    });
}
renderTodos();

// Add NewTodo === POST
addToDoBtn.addEventListener("click", () => {
  console.log("click");
  const newTodo = { description: newToDoInput.value, done: false };
  if (newToDoInput.value.length < 4) {
    console.warn("Too short! Insert more then two letters!");
  } else {
    fetch("http://localhost:4730/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((newTodoFromApi) => {
        console.log(newTodoFromApi);
        renderTodos();
      });
  }
});

// Todo updaten === PUT bzw. PATCH!!
function updateTodo(id, done) {
  const updatedTodo = { done: done };
  fetch(`http://localhost:4730/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(updatedTodo),
  })
    .then((response) => response.json())
    .then((updatedTodoFromApi) => {
      console.log(updatedTodoFromApi);
    });
}
