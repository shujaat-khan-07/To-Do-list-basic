
let pendingTasks = [];
let completedTasks = [];


function addTask() {
    const taskInput = document.getElementById("taskInput").value;
    if (taskInput.trim() === "") return; 

    const timestamp = new Date().toLocaleString();
    const task = { id: Date.now(), text: taskInput, dateAdded: timestamp };

    pendingTasks.push(task);
    document.getElementById("taskInput").value = ""; 
    renderTasks();
}


function renderTasks() {
    const pendingList = document.getElementById("pendingTasks");
    const completedList = document.getElementById("completedTasks");

   
    pendingList.innerHTML = "";
    completedList.innerHTML = "";

 
    pendingTasks.forEach(task => {
        const taskItem = createTaskElement(task, false);
        pendingList.appendChild(taskItem);
    });

  
    completedTasks.forEach(task => {
        const taskItem = createTaskElement(task, true);
        completedList.appendChild(taskItem);
    });
}


function createTaskElement(task, isCompleted) {
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
        ${task.text} <span>(${task.dateAdded})</span>
    `;

    if (!isCompleted) {
        const completeButton = document.createElement("button");
        completeButton.className = "complete-button";
        completeButton.textContent = "Complete";
        completeButton.onclick = () => markComplete(task.id);
        taskItem.appendChild(completeButton);
    }

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = () => editTask(task.id, isCompleted);
    taskItem.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteTask(task.id, isCompleted);
    taskItem.appendChild(deleteButton);

    return taskItem;
}


function markComplete(taskId) {
    const taskIndex = pendingTasks.findIndex(task => task.id === taskId);
    if (taskIndex > -1) {
        const task = pendingTasks.splice(taskIndex, 1)[0];
        task.dateCompleted = new Date().toLocaleString(); 
        completedTasks.push(task);
        renderTasks();
    }
}


function deleteTask(taskId, isCompleted) {
    if (isCompleted) {
        completedTasks = completedTasks.filter(task => task.id !== taskId);
    } else {
        pendingTasks = pendingTasks.filter(task => task.id !== taskId);
    }
    renderTasks();
}


function editTask(taskId, isCompleted) {
    const tasks = isCompleted ? completedTasks : pendingTasks;
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex > -1) {
        const newText = prompt("Edit Task:", tasks[taskIndex].text);
        if (newText !== null) {
            tasks[taskIndex].text = newText.trim() || tasks[taskIndex].text;
            renderTasks();
        }
    }
}
