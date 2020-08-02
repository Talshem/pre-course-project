
const prioritySelector = document.getElementById('prioritySelector');
const textInput = document.getElementById('textInput');
const addButton = document.getElementById('addButton');
const viewSection = document.getElementById('viewSection');
const resetButton = document.getElementById('resetButton');

  if ( localStorage.length == 0 ){
localStorage.setItem('j', 1);
}

var j = localStorage.getItem('j');
var spanCount = 0;
var jval = 1;

textInput.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
addButton.click();
  }
});

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
const closeButton = document.createElement('span');
closeButton.classList.add('close');


primaryDiv.appendChild(checking);
primaryDiv.appendChild(pDiv);
pDiv.textContent = priority;
let date = new Date().toISOString().substr(0, 19).replace('T', ' ');
primaryDiv.appendChild(dDiv);
dDiv.textContent = date
primaryDiv.appendChild(tDiv);
tDiv.textContent = task;
primaryDiv.appendChild(closeButton);
closeButton.innerHTML = "&times;";

closeButton.addEventListener('click', deleteItem, false);


var divOpacity = 0;
viewSection.appendChild(primaryDiv);
primaryDiv.style.opacity = '0';
primaryDiv.firstChild.style.opacity = '1';

setInterval(show, 20);
function show(){
if (divOpacity <= 1){
primaryDiv.style.opacity = divOpacity; 
      divOpacity += 0.1; 
}}


localStorage.setItem('pmemory' + j, pDiv.textContent);
localStorage.setItem('dmemory' + j, dDiv.textContent);
localStorage.setItem('tmemory' + j, tDiv.textContent);

primaryDiv.setAttribute("id", "task" + j);

j++;
localStorage.setItem('j', j);

addEventsDragAndDrop(primaryDiv);
checking.addEventListener('click', taskFinished);

spanCount ++;
document.getElementById("counter").innerHTML = spanCount;
}






function taskFinished(){

var greenOpacity = 0;
this.parentNode.children[3].style.opacity = '0';
var x = this.parentNode.children[3];

setInterval(greenBar, 35);
function greenBar(){
  if (greenOpacity < 0.75){
greenOpacity += 0.05;
x.style.opacity = greenOpacity;
}}


this.parentNode.children[3].style.backgroundColor = '#4CAf99';
this.parentNode.children[1].style.color = "rgb(76, 175, 153, 0)";
this.parentNode.children[3].style.textDecoration = "line-through";

this.parentNode.children[1].innerHTML = '0';
var findNumeral = this.parentNode.id.replace('task', '');
localStorage.setItem('pmemory' + findNumeral, '0');

this.parentNode.children[2].style.margin = '0px 17px 0px 17px';
this.parentNode.children[3].style.borderRadius = "5px" ;
spanCount --;
document.getElementById("counter").innerHTML = spanCount;
this.remove();

const closeButton = document.createElement('span');
closeButton.classList.add('close');
primaryDiv.appendChild(closeButton);
closeButton.addEventListener('click', deleteItem, false);

}



resetButton.onclick = function resetList(){
  var res = confirm("This action will delete all your tasks. Confirm to proceed.");
  if (res == true) {

var node= document.getElementById("viewSection");
jval = 1;

     function opaqRemove() {
if (node.firstChild)
{
    node.removeChild(node.firstChild);
}
else
{
clearInterval(resetInterval);
}

if ( spanCount > 0)
{
spanCount --;
document.getElementById("counter").innerHTML = spanCount;

}
j = 1;
localStorage.clear();
}}

var resetInterval = setInterval(opaqRemove, 50);

  }
  
const sort = document.getElementById('sortButton');


sort.onclick = sortList;


function sortList() {
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
  var kill = this.parentNode;
  var pos = 0.75;

var memoryDelete = kill.id.replace('task', '');
localStorage.removeItem('tmemory' + memoryDelete);
localStorage.removeItem('dmemory' + memoryDelete);
localStorage.removeItem('pmemory' + memoryDelete);

 setInterval(frame, 35);
  function frame() {
    
      if ( pos <= 0){
       kill.remove();  
      }

pos -= 0.05;
kill.style.opacity = pos;
kill.children[0].style.opacity = pos;
kill.children[1].style.opacity = pos;
kill.children[2].style.opacity = pos;
}

      if (kill.children[4]){
      kill.children[0].remove();
      kill.style.opacity = pos;
      kill.children[0].style.margin = '0px 0px 0px 37px';
      kill.children[1].style.margin = '0px 15px 0px 15px';
      kill.children[2].style.margin = '0px 15px 0px 15px';
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

}
 
var listItens = document.querySelectorAll('.draggable');
[].forEach.call(listItens, function(item) {
  addEventsDragAndDrop(item);
});

  var jval = 1;

onpageshow = function loadingHistory(){
  while (jval < j ){


const primaryDiv = document.createElement('div');
const pDiv = document.createElement('div');
pDiv.classList.add('todoPriority');
const dDiv = document.createElement('div');
dDiv.classList.add('todoCreatedAt');
const tDiv = document.createElement('div');
tDiv.classList.add('todoText');
const closeButton = document.createElement('span');
closeButton.classList.add('close');
const checking = document.createElement("INPUT");
checking.setAttribute("type", "checkbox");
checking.classList.add('checking');


primaryDiv.appendChild(pDiv);
pDiv.textContent = localStorage.getItem('pmemory' + jval);
primaryDiv.appendChild(dDiv);
dDiv.textContent = localStorage.getItem('dmemory' + jval);
primaryDiv.appendChild(tDiv);
tDiv.textContent = localStorage.getItem('tmemory' + jval);
primaryDiv.appendChild(closeButton);
closeButton.innerHTML = "&times;";
closeButton.addEventListener('click', deleteItem, false);


primaryDiv.classList.add('todoContainer', 'draggable');
var attr = document.createAttribute('draggable');
primaryDiv.setAttributeNode(attr);
attr.value = true;

if (pDiv.textContent != '')
{
viewSection.appendChild(primaryDiv);
primaryDiv.setAttribute("id", "task" + jval);
primaryDiv.children[2].style.borderRadius = "5px";
}

if (Number(pDiv.innerHTML) == 0)
{
primaryDiv.children[2].style.backgroundColor = '#4CAf99';
primaryDiv.children[0].style.color = "rgb(76, 175, 153, 0)";
primaryDiv.children[2].style.textDecoration = "line-through";
primaryDiv.children[1].style.margin = '0px 17px 0px 17px';
primaryDiv.children[2].style.opacity = '0.75';
}

if (Number(pDiv.innerHTML) > 0 ){
primaryDiv.prepend(checking);
checking.addEventListener('click', taskFinished);
  spanCount ++;
  document.getElementById("counter").innerHTML = spanCount;
}



addEventsDragAndDrop(primaryDiv);
jval++;
  
}

sortList();

}
