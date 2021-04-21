"use strict";
const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
let items = JSON.parse(localStorage.getItem("items")) || [];
const button = document.querySelector(".button");
const ucheck = document.querySelector(".uncheck");
const check = document.querySelector(".check");

function addItem(e) {
  e.preventDefault();
  const text = this.querySelector("[name=item]").value;
  const item = {
    text: text,
    done: "false",
  };
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
  this.reset();
}
function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
    <li>
    <input type="checkbox" data-index=${i} id="item${i}" ${
        plate.done ? "checked" : ""
      }/>
    <label for="item${i}">${plate.text}</label>
    </li>
    `;
    })
    .join("");
}
function toggleDone(e) {
  if (!e.target.matches("input")) return; //skip this unless it's an input}
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}
addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
populateList(items, itemsList);

//Function to clear all the items
function resetButton() {
  localStorage.clear();
  items = [];
  populateList(items, itemsList);
}
function uncheck() {
  items.forEach((item) => (item.done = false));
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}
function checkAll() {
  items.forEach((item) => (item.done = true));
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}
ucheck.addEventListener("click", uncheck);
check.addEventListener("click", checkAll);

button.addEventListener("click", resetButton);
