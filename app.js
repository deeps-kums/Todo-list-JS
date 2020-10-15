//Define UI vars
const form=document.querySelector('#task-form');
const taskList=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');
const taskInput=document.querySelector('#task');

//Load all event listeners
loadEventListeners();

function loadEventListeners(){
    //DOM load event
    document.addEventListener('DOMContentLoaded',getTasks); 
    //Add task event
    form.addEventListener('submit',addTask);
    //Remove task event
    taskList.addEventListener('click',removeTask);
    //Clear all lists
    clearBtn.addEventListener('click',clearAll);
    //Filter tasks
    filter.addEventListener('keyup',filterText);
}

//Get tasks from LS
function getTasks(){
    let tasks;
        if(localStorage.getItem('tasks')=== null){
         tasks=[];
         }else{
         tasks=JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.forEach(function(task){
            //Create element li
            const li=document.createElement('li');
            //Add class
             li.className='collection-item';
            //Create text node and append to li
            li.appendChild(document.createTextNode(task));
            //create new link element
            const link=document.createElement('a');
            //Add class
            link.className='delete-item secondary-content';
            link.innerHTML='<i class="fa fa-remove"></i>';
            li.appendChild(link);
            //Append li to ul
            taskList.appendChild(li);
        });
}

function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }
    //Create element li
    const li=document.createElement('li');
    //Add class
    li.className='collection-item';
    //Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element
    const link=document.createElement('a');
    //Add class
    link.className='delete-item secondary-content';
    link.innerHTML='<i class="fa fa-remove"></i>';
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);
    //console.log(li);
    //store task in local storage
    storeTaskInLocalStorage(taskInput.value);
    //Clear input
    taskInput.value='';
    e.preventDefault();
}

     function storeTaskInLocalStorage(task){
        let tasks;
        if(localStorage.getItem('tasks')=== null){
         tasks=[];
         }else{
         tasks=JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.push(task);
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
        e.target.parentElement.parentElement.remove();
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    //console.log(e.target);
    }
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem){
    //console.log(taskItem);
    let tasks;
        if(localStorage.getItem('tasks')=== null){
         tasks=[];
         }else{
         tasks=JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.forEach(function(task,index){
            if(taskItem.textContent === task){
                tasks.splice(index,1);
            }
        });
        localStorage.setItem('tasks',JSON.stringify(tasks));
}

function clearAll(e){
    //Slower
    //taskList.innerHTML='';
    //console.log(e.target);
    //Faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    //Clear from LS
    clearTasksFromlocalStorage();
}

function clearTasksFromlocalStorage(){
    localStorage.clear();
}

function filterText(e){
    const text=e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item=task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1)
            task.style.display='block';
        else
            task.style.display='none';
    });
}