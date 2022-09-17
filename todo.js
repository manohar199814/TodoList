let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');

function renderList () {
    taskList.innerHTML = '';
    for(let i = 0;i<tasks.length;i++) {
        let element = document.createElement('li');
        element.innerHTML = `
            <input type="checkbox" id=${tasks[i].id} data-id=${tasks[i].id} ${tasks[i].done ? 'checked' : ''} class="custom-checkbox">
            <label for=${tasks[i].id}>${tasks[i].text}</label>
            <img src='trash.svg' class="delete" data-id=${tasks[i].id} />
        `;
        taskList.append(element);
    }

    tasksCounter.innerHTML = tasks.length;
}

function toggleTask (taskId) {

    const task = tasks.filter((task) => task.id === taskId)

    if(task.length > 0 ) {
        const currentTask = task[0];
        currentTask.done = !currentTask.done;
        renderList();
        showNotification('Task toggled successfully');
        return;
    }

    showNotification('task not toggled')
}

function deleteTask (taskId) {
    const newTasks = tasks.filter(task => task.id !== taskId )

    tasks = newTasks;
    renderList();
    showNotification('Task deleted successfully')
}

function addTask (task) {
    if(task) {
        tasks.push(task);
        renderList();
        showNotification('Task added successfully')
        return;
    }

    showNotification('Task not added') 
}

function showNotification(text) {
    alert(text);
}

function handleInputKeyPress(e) {
    if(e.key === 'Enter') {
        const text = e.target.value;

        if(!text) {
            showNotification('Task text can not be empty');
            return;
        }

        const task = {
            text,
            id: Date.now().toString(),
            done:false
        }

        e.target.value = "";
        addTask(task);
    }
}
function handleClickEvents(e) {
    if(e.target.className === 'custom-checkbox'){
        toggleTask(e.target.dataset.id);
    }else 
    if(e.target.className === 'delete') {
        const deleteId = e.target.dataset.id;
        deleteTask(deleteId);
    }
}

document.addEventListener('click',handleClickEvents);
addTaskInput.addEventListener('keyup',handleInputKeyPress);