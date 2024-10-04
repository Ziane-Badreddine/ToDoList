const inputInsersion = document.getElementById('inputTaskInsertion');
const buttonInsertion = document.getElementById('buttonInsertion');
const container = document.getElementById('container');
const clear = document.getElementById('clear');
const buttonTask = document.getElementById('buttonTask');
const filter = document.getElementById('filter');

let item = [];
let completed = [];

buttonInsertion.addEventListener('click', AddTask);
clear.addEventListener('click', RemoveTasks);
filter.addEventListener('input', FilterTasks);

function Div(inputInsersion, index) {
    const NewDiv = document.createElement('div');
    const NewP = document.createElement('p');
    const NewButton = document.createElement('button');
    NewDiv.classList.add('task');
    NewP.textContent = inputInsersion;
    NewP.classList.add('txt');
    NewButton.textContent = 'X';
    NewButton.classList.add('buttonTask');
    container.appendChild(NewDiv);
    NewDiv.appendChild(NewP);
    NewDiv.appendChild(NewButton);
    if (completed[index]) {
        NewP.style.textDecoration = 'line-through';
    }
}

function AddTask() {
    if (item.includes(inputInsersion.value)) {
        alert('task repete');
        inputInsersion.value = '';
        return;
    }
    if (inputInsersion.value.trim() == '') {
        alert('task vide');
        inputInsersion.value = '';
        return;
    }
    item.push(inputInsersion.value);
    completed.push(false)
    inputInsersion.value = '';
    DisplayTask(item);
}

function DisplayTask(item) {
    document.querySelectorAll('.task').forEach(value => {
        value.remove();
    })
    item.forEach((task, index) => {
        Div(task, index);
    })
    LineTask();
    RemoveTask();
}

function LineTask() {
    document.querySelectorAll('.txt').forEach((value, index) =>
        value.addEventListener('click', () => {
            completed[index] = !completed[index];
            DisplayTask(item)
        }
        )
    )
}
function RemoveTask() {
    document.querySelectorAll('.buttonTask').forEach(value =>
        value.addEventListener('click', () => {
            item.pop(value.parentElement.children[0].textContent)
            value.parentElement.remove();
        })
    )
}

function FilterTasks() {
    let itemTemp = item.filter((task) => {
        return task.startsWith(filter.value);
    })
    DisplayTask(itemTemp);
}

function RemoveTasks() {
    if (item.length > 0) {
        if (confirm('are you sure ?')) {
            document.querySelectorAll('.task').forEach(value => {
                value.remove();
            })
            item = [];
        }
    }
}

