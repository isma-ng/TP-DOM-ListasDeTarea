  document.addEventListener('DOMContentLoaded', function() {
            const taskInput = document.getElementById('taskInput');
            const addTaskBtn = document.getElementById('addTaskBtn');
            const taskList = document.getElementById('taskList');
            
            // Cargar tareas desde localStorage al iniciar
            loadTasks();
            
            // Agregar tarea al hacer clic en el botón
            addTaskBtn.addEventListener('click', addTask);
            
            // Agregar tarea al presionar Enter
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
                
                // Crear elemento de tarea
                const taskItem = document.createElement('div');
                taskItem.className = 'task-item';
                taskItem.innerHTML = `
                    <span class="task-text">${taskText}</span>
                    <button class="btn btn-danger btn-sm delete-btn">Eliminar</button>
                `;
                
                // Agregar a la lista
                if (taskList.querySelector('.empty-list')) {
                    taskList.innerHTML = '';
                }
                taskList.appendChild(taskItem);
                
                // Guardar en localStorage
                saveTasks();
                
                // Limpiar input y enfocar
                taskInput.value = '';
                taskInput.focus();
                
                // Agregar evento al botón eliminar
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
                        
                        // Agregar evento al botón eliminar
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