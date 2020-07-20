const prioritySelector = document.getElementById('prioritySelector');
const textInput = document.getElementById('textInput');
const addButton = document.getElementById('addButton');
const viewSection = document.getElementById('viewSection');
var spanCount = 0;

addButton.onclick = function()
{
let task = textInput.value;
let priority = prioritySelector.value
textInput.value = '';


      if (task == "") {
        alert("Please fill in a task");
      return;
        }

const checking = document.createElement("INPUT");
checking.setAttribute("type", "checkbox");
checking.classList.add('checking');



const primaryDiv = document.createElement('div');
primaryDiv.classList.add('todoContainer');
const pDiv = document.createElement('div');
pDiv.classList.add('priority');
const dDiv = document.createElement('div');
dDiv.classList.add('todoCreatedAt');
const tDiv = document.createElement('div');
tDiv.classList.add('todoText');

primaryDiv.appendChild(checking);
primaryDiv.appendChild(pDiv);
pDiv.textContent = priority;
let date = new Date().toISOString().substr(0, 19).replace('T', ' ');
primaryDiv.appendChild(dDiv);
dDiv.textContent = date
primaryDiv.appendChild(tDiv);
tDiv.textContent = task;


viewSection.appendChild(primaryDiv);

spanCount += 1;
document.getElementById("counter").innerHTML = spanCount;


checking.onclick = function(e) {
/* viewSection.removeChild(primaryDiv); */
 primaryDiv.style.textDecoration = "line-through";

if ( checking.checked === false ) {
 primaryDiv.style.textDecoration = "none";
 }

}
}


const sort = document.getElementById('sortButton');

sort.onclick = function sortList() {
 var switching, shouldSwitch;
 var list = document.getElementById("viewSection");
  switching = true;

  while (switching) {
    switching = false;
    var item = list.getElementsByClassName("todoContainer");
    var priority = list.getElementsByClassName("priority");

    for (var i = 0; i < (priority.length - 1); i++) {
      shouldSwitch = false;
      
      if (Number(priority[i].innerHTML) < Number(priority[i + 1].innerHTML)) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      item[i].parentNode.insertBefore(item[i + 1], item[i]);
      switching = true;
    }
  }
}


function myFunction() {
    var input, filter, filteredList, filteredItem, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    filteredList = document.getElementById("viewSection");
    filteredItem = filteredList.getElementsByClassName("todoContainer");
    for (i = 0; i < filteredItem.length; i++) {
        a = filteredItem[i].getElementsByClassName("todoText")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            filteredItem[i].style.display = "";
        } else {
            filteredItem[i].style.display = "none";
        }
    }
}
