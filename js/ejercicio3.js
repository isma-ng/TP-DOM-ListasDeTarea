  document.addEventListener('DOMContentLoaded', function() {
            const taskInput = document.getElementById('taskInput');
            const addTaskBtn = document.getElementById('addTaskBtn');
            const taskList = document.getElementById('taskList');
            
            loadTasks();
            
            addTaskBtn.addEventListener('click', addTask);
            

            taskInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    addTask();
                }
            });
            
            function addTask() {
                const taskText = taskInput.value.trim();
                
                if (taskText === '') {
                    alert('Por favor ingresa una tarea válida');
                    return;
                }
                
                const taskItem = document.createElement('div');
                taskItem.className = 'task-item';
                taskItem.innerHTML = `
                    <span class="task-text">${taskText}</span>
                    <button class="btn btn-danger btn-sm delete-btn">Eliminar</button>
                `;
                
                if (taskList.querySelector('.empty-list')) {
                    taskList.innerHTML = '';
                }
                taskList.appendChild(taskItem);
                
                saveTasks();
                
                taskInput.value = '';
                taskInput.focus();
                
                taskItem.querySelector('.delete-btn').addEventListener('click', function() {
                    taskItem.remove();
                    if (taskList.children.length === 0) {
                        taskList.innerHTML = '<div class="empty-list">No hay tareas pendientes</div>';
                    }
                    saveTasks();
                });
            }
            
            function saveTasks() {
                const tasks = [];
                document.querySelectorAll('.task-item .task-text').forEach(task => {
                    tasks.push(task.textContent);
                });
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
            
            function loadTasks() {
                const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
                
                if (savedTasks.length > 0) {
                    taskList.innerHTML = '';
                    
                    savedTasks.forEach(taskText => {
                        const taskItem = document.createElement('div');
                        taskItem.className = 'task-item';
                        taskItem.innerHTML = `
                            <span class="task-text">${taskText}</span>
                            <button class="btn btn-danger btn-sm delete-btn">Eliminar</button>
                        `;
                        taskList.appendChild(taskItem);
                        
                        taskItem.querySelector('.delete-btn').addEventListener('click', function() {
                            taskItem.remove();
                            if (taskList.children.length === 0) {
                                taskList.innerHTML = '<div class="empty-list">No hay tareas pendientes</div>';
                            }
                            saveTasks();
                        });
                    });
                }
            }
        });
