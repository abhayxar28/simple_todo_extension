document.addEventListener('DOMContentLoaded',()=>{
    const todoInput = document.getElementById('todo-input');
    const addtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list')

    chrome.storage.sync.get(['todos'], (result)=>{
        const todos = result.todos;
        todos.forEach(task => addTask(task)); 
    })

    addtn.addEventListener('click', ()=>{
        const task = todoInput.value
        if(task){
            addTask(task);
            saveTask(task);
            todoInput.value = '';
        }
    })

    function saveTask(task){
        chrome.storage.sync.get(['todos'],(result)=>{
            const todos = result.todos || [];
            todos.push(task);
            chrome.storage.sync.set({todos});
        })
    }

    function addTask(task){
        const li = document.createElement('li');
        li.textContent = task;

        //Remove task on click
        li.addEventListener('click', ()=>{
            li.remove();
            removeTask(task);
        })
        todoList.appendChild(li);
    }

    function removeTask(taskToRemove){
        chrome.storage.sync.get(['todos'],(result)=>{
            const todos = result.todos || [];
            const updateTodos = todos.filter(task => task !==taskToRemove);
            chrome.storage.sync.set({todos: updateTodos});
        })
    }

})