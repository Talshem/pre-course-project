

const prioritySelector = document.getElementById('prioritySelector');
const textInput = document.getElementById('textInput');
const addButton = document.getElementById('addButton');
const viewSection = document.getElementById('viewSection');
const resetButton = document.getElementById('resetButton')

var spanCount = 0;
var j = 1;

addButton.onclick = function()
{
var task = textInput.value;
var priority = prioritySelector.value
textInput.value = '';


      if (task == "") {
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
pDiv.classList.add('todoPriority');
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
localStorage.setItem(dDiv.textContent, tDiv.textContent);

addEventsDragAndDrop(primaryDiv);
checking.addEventListener('click', taskFinished);

spanCount ++;
document.getElementById("counter").innerHTML = spanCount;
}

function taskFinished(){
  var r = confirm("Did you finish this task?");
  if (r == true) 
  {
this.parentNode.lastElementChild.style.backgroundColor = '#4CAf99';
this.parentNode.children[1].style.color = "rgb(76, 175, 153, 0)";
this.parentNode.lastElementChild.style.textDecoration = "line-through";
this.parentNode.children[1].innerHTML = '0';
this.parentNode.lastElementChild.style.borderRadius = "5px" ;
this.parentNode.lastElementChild.style.opacity = "0.75" ;
spanCount --;
document.getElementById("counter").innerHTML = spanCount;
this.remove();
  }
        else {
  this.checked = false;
}
}

resetButton.onclick = function resetList(){
  var res = confirm("This action will delete all your tasks. Confirm to proceed.");
  if (res == true) {
var node= document.getElementById("viewSection");
while (node.firstChild) {
    node.removeChild(node.firstChild);
    spanCount = 0;
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
    var priority = list.getElementsByClassName("todoPriority");

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

    this.firstElementChild.addEventListener('click', taskFinished);
};
 
function dragEnter(e) {
  this.classList.add('over');

    this.firstElementChild.addEventListener('click', taskFinished);
}
 
function dragLeave(e) {
  e.stopPropagation();
  this.classList.remove('over');

    this.firstElementChild.addEventListener('click', taskFinished);
}
 
function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';

this.firstElementChild.addEventListener('click', taskFinished);
  return false;
}
 
function dragDrop(e) {
  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
    this.firstElementChild.addEventListener('click', taskFinished);
  }
  return false;
}
 
function dragEnd(e) {
  var listItens = document.querySelectorAll('.draggable');
  [].forEach.call(listItens, function(item) {
    item.classList.remove('over');
  });
  this.style.opacity = '1';
  this.firstElementChild.addEventListener('click', taskFinished);
}
 

function deleteItem(ev) {
  var elem = this;

  
  ev.preventDefault();
  var pos = 1;
  var id = setInterval(frame, 50);
  function frame() {
      elem.style.opacity = pos; 
      pos -= 0.1; 
      if ( pos <= -0.5){
       elem.remove();  
      }
    }
      if (elem.children[3]){
      elem.children[0].remove();
       spanCount --;
}
 document.getElementById("counter").innerHTML = spanCount;
}

function addEventsDragAndDrop(el) {

  el.addEventListener('dragstart', dragStart, false);
  el.addEventListener('dragenter', dragEnter, false);
  el.addEventListener('dragover', dragOver, false);
  el.addEventListener('dragleave', dragLeave, false);
  el.addEventListener('drop', dragDrop, false);
  el.addEventListener('dragend', dragEnd, false);
  el.addEventListener('contextmenu', deleteItem, false);

}
 
var listItens = document.querySelectorAll('.draggable');
[].forEach.call(listItens, function(item) {
  addEventsDragAndDrop(item);
});

