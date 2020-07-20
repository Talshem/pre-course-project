

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

var attr = document.createAttribute('draggable');
attr.value = 'true';
const primaryDiv = document.createElement('div');
primaryDiv.classList.add('todoContainer', 'draggable');
primaryDiv.setAttributeNode(attr);



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
addEventsDragAndDrop(primaryDiv);


spanCount ++;
document.getElementById("counter").innerHTML = spanCount;


checking.onclick = function(){
var marking = tDiv;

   if ( checking.checked ) {
 marking.style.textDecoration = "line-through";
 marking.style.backgroundColor = '#4CAF50';
 spanCount --;
 document.getElementById("counter").innerHTML = spanCount;
   }

else {
 marking.style.textDecoration = null;
 marking.style.backgroundColor = null;
 spanCount ++;
 document.getElementById("counter").innerHTML = spanCount;
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
    var someItem = list.getElementsByClassName("todoContainer");
    var priority = list.getElementsByClassName("priority");

    for (var i = 0; i < (priority.length - 1); i++) {
      shouldSwitch = false;
      
      if (Number(priority[i].innerHTML) < Number(priority[i + 1].innerHTML)) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      someItem[i].parentNode.insertBefore(someItem[i + 1], someItem[i]);
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




function dragStart(e) {
  this.style.opacity = '0.4';
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
};
 
function dragEnter(e) {
  this.classList.add('over');
}
 
function dragLeave(e) {
  e.stopPropagation();
  this.classList.remove('over');
}
 
function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  return false;
}
 
function dragDrop(e) {
  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }
  return false;
}
 
function dragEnd(e) {
  var listItens = document.querySelectorAll('.draggable');
  [].forEach.call(listItens, function(item) {
    item.classList.remove('over');
  });
  this.style.opacity = '1';
}


function addEventsDragAndDrop(el) {

  el.addEventListener('dragstart', dragStart, false);
  el.addEventListener('dragenter', dragEnter, false);
  el.addEventListener('dragover', dragOver, false);
  el.addEventListener('dragleave', dragLeave, false);
  el.addEventListener('drop', dragDrop, false);
  el.addEventListener('dragend', dragEnd, false);

}
 
var listItens = document.querySelectorAll('.draggable');
[].forEach.call(listItens, function(item) {
  addEventsDragAndDrop(item);
});

