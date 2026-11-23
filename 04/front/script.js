const API_URL = 'http://localhost:5000';

const addForm = document.getElementById('add-form');
const titleInput = document.getElementById('title-input');
const taskList = document.getElementById('task-list');
const taskTemplate = document.getElementById('task-template');
const statusEl = document.getElementById('status');

async function getTasks() {
    try {
        const response = await fetch(`${API_URL}/task`);
        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        console.error('Ошибка при получении задач:', error);
    }
}

function renderTasks(tasks) {
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const clone = taskTemplate.content.cloneNode(true);
        const li = clone.querySelector('.task');
        const checkbox = clone.querySelector('.task-check');
        const titleSpan = clone.querySelector('.task-title');
        const deleteBtn = clone.querySelector('.task-delete');

        titleSpan.textContent = task.title;
        checkbox.checked = task.done;
        if (task.done) {
            li.classList.add('done');
        }

        checkbox.addEventListener('change', () => {
            toggleTask(task, checkbox.checked);
        });

        deleteBtn.addEventListener('click', () => {
            deleteTask(task.id);
        });

        taskList.appendChild(clone);
    });
}

async function addTask(event) {
    event.preventDefault();
    const title = titleInput.value.trim();

    if (!title) return;

    try {
        const response = await fetch(`${API_URL}/task`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        });

        if (response.ok) {
            titleInput.value = '';
            getTasks();
        }
    } catch (error) {
        console.error('Ошибка при добавлении задачи:', error);
    }
}

async function toggleTask(task, done) {
    try {
        const response = await fetch(`${API_URL}/task/${task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: task.title,
                done: done
            })
        });

        if (response.ok) {
            getTasks();
        }
    } catch (error) {
        console.error('Ошибка при обновлении задачи:', error);
    }
}

async function deleteTask(id) {
    try {
        const response = await fetch(`${API_URL}/task/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            getTasks();
        }
    } catch (error) {
        console.error('Ошибка при удалении задачи:', error);
    }
}

addForm.addEventListener('submit', addTask);
getTasks();
