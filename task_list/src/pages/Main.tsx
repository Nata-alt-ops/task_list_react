import React, { useEffect, useState } from "react";
import './Main.scss';

type Task = {
    id:number;
    task:string;
    completed:boolean;

}
export const Main = () =>{
    /*Список задач (для проверки как отображается несколько задач)*/
    const [problems, setProblem] = useState<Task[]>(
        [
            {id:1,
             task:"Помыть кота",
             completed: false //Статус задачи false - активная, true - неактивная
            },
            {id:2,
             task:"Почесать кота",
             completed: true
            }
        ]
    )
    /*Удаление задачи*/
    const DeleteTask = (id:number) =>{
       setProblem(nTask => nTask.filter(task => task.id !== id))
    }

    /*Добавление новой задачи*/
    const [newTask, setNewTask] = useState('');
    const addTask = () => {
        if (newTask.trim() === '') return;

        const newtask: Task = {
            id: problems.length > 0 ? Math.max(...problems.map(u => u.id))+1:1,
            task:newTask.trim(),
            completed:false
        };
        setProblem([...problems, newtask]);
        setNewTask('')

    };

    /*Редактирование задачи*/
    const[editTaskId, setEditTaskId] = useState<number | null>(null);
    const[editTask, setEditTask] = useState('');
    
    const EditTaskTitle = (task: Task) => {
        setEditTaskId(task.id);
        setEditTask(task.task)
    }

    /*Сохранение изменений */
    const saveTask = () =>{
        if (editTask.trim() === '' || editTaskId === null) return;

        setProblem(prev =>
            prev.map(task =>
                task.id === editTaskId ? {...task, task:editTask.trim()}: task
            )
        );
        setEditTaskId(null)
    };

    /*Переключения статуса задачи*/
     const toggleComplete = (id: number) => {
    setProblem(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  /*Смена темы приложения*/ 
  const[changeTheme, setChangeTheme] = useState(false);
  useEffect(() =>{
    if (changeTheme){
        document.body.classList.add('dark_theme');
    } else {
        document.body.classList.remove('dark_theme');
    }
  }, [changeTheme]);
  const[filter, setFilter] = useState<'all'| 'active' |'completed'>('all');

  /*Фильтрация задач на все, активные и неактивные */
  const TaskFilter = problems.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  /*Перетаскивание задач*/
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

    const handleDragStart = (id: number) => {
        setDraggedItem(id); //запоминает какой элемент перетаскивается 
    };

    const handleDragOver = (e: any) => {
        e.preventDefault(); //разрешаем бросать элементы
    };

    const handleDrop = (e: any, targetId: number) => {
        e.preventDefault();
        
        if (draggedItem === null || draggedItem === targetId) return;

        const newTasks = [...problems];
        const draggedIndex = newTasks.findIndex(task => task.id === draggedItem);
        const targetIndex = newTasks.findIndex(task => task.id === targetId);

        if (draggedIndex === -1 || targetIndex === -1) return;

        const [movedItem] = newTasks.splice(draggedIndex, 1);
        newTasks.splice(targetIndex, 0, movedItem);

        setProblem(newTasks);
        setDraggedItem(null);
    };

    return(
        <div className="site_con">
            <div className="list_con">
                <div className="list">
                    <div className="title_light_dark">
                    <h1 className="list_title">Список дел</h1>
                    <div className="light_dark">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256" className={`theme_icon ${!changeTheme ? 'active': ''}`} onClick={() => setChangeTheme(false)}>
                            <path d="M124,40V16a4,4,0,0,1,8,0V40a4,4,0,0,1-8,0Zm64,88a60,60,0,1,1-60-60A60.07,60.07,0,0,1,188,128Zm-8,0a52,52,0,1,0-52,52A52.06,52.06,0,0,0,180,128ZM61.17,66.83a4,4,0,0,0,5.66-5.66l-16-16a4,4,0,0,0-5.66,5.66Zm0,122.34-16,16a4,4,0,0,0,5.66,5.66l16-16a4,4,0,0,0-5.66-5.66ZM192,68a4,4,0,0,0,2.83-1.17l16-16a4,4,0,1,0-5.66-5.66l-16,16A4,4,0,0,0,192,68Zm2.83,121.17a4,4,0,0,0-5.66,5.66l16,16a4,4,0,0,0,5.66-5.66ZM40,124H16a4,4,0,0,0,0,8H40a4,4,0,0,0,0-8Zm88,88a4,4,0,0,0-4,4v24a4,4,0,0,0,8,0V216A4,4,0,0,0,128,212Zm112-88H216a4,4,0,0,0,0,8h24a4,4,0,0,0,0-8Z" className="sun" fill={!changeTheme ? '#ffd700' : '#000000ff'} ></path></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256" className={`theme-icon ${changeTheme ? 'active' : ''}`} onClick={() => setChangeTheme(true)}>
                            <path d="M230.72,145.06a4,4,0,0,0-4-1A92.08,92.08,0,0,1,111.94,29.27a4,4,0,0,0-5-5A100.78,100.78,0,0,0,56.08,59.88a100,100,0,0,0,140,140,100.78,100.78,0,0,0,35.59-50.87A4,4,0,0,0,230.72,145.06ZM191.3,193.53A92,92,0,0,1,62.47,64.7a93,93,0,0,1,39.88-30.35,100.09,100.09,0,0,0,119.3,119.3A93,93,0,0,1,191.3,193.53Z" className="moon" fill={changeTheme ? "#ffffffff" : "#000000ff"}></path></svg>
                        </div>
                        </div>

                    <div className="new_task">
                        <div className="input_button">
                            <input type = 'text' placeholder="Добавь новую задачу" value={newTask} onChange={(e) => setNewTask(e.target.value)}></input>
                            <button onClick={addTask}>+</button>
                        </div>
                    </div>

                    <div className="filters">
                        <button className={`filter ${filter === 'all' ? 'active': ''}`}
                        onClick={() => setFilter('all')}>Все ({problems.length})</button>
                         <button className={`filter ${filter === 'active' ? 'active': ''}`}

                        onClick={() => setFilter('active')}>Активные ({problems.filter(t => !t.completed).length})</button>
                         <button className={`filter ${filter === 'completed' ? 'active': ''}`}

                        onClick={() => setFilter('completed')}>Выполненые ({problems.filter(t => t.completed).length})</button>
                    </div>

                     {TaskFilter.map(problem => (
                        <div key={problem.id} className="list_task" onDragOver={(e) => {
                            e.preventDefault();
                        }}
                        onDrop={(e) => { e.preventDefault(); handleDrop(e, problem.id);
                        }}
                        style={{ opacity: draggedItem === problem.id ? 0.5 : 1}}>

                        <div className="drag-handle"
                            draggable="true"
                            onDragStart={() => handleDragStart(problem.id)}
                            onDragOver={(e) => {e.preventDefault();}}
                            onDrop={(e) => {e.stopPropagation(); handleDrop(e, problem.id);}}
                            style={{ cursor: 'grab' }} >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="8" cy="6" r="1.5"></circle>
                                <circle cx="8" cy="12" r="1.5"></circle>
                                <circle cx="8" cy="18" r="1.5"></circle>
                                <circle cx="16" cy="6" r="1.5"></circle>
                                <circle cx="16" cy="12" r="1.5"></circle>
                                <circle cx="16" cy="18" r="1.5"></circle>
                            </svg>
                        </div>
                        <div className={`task_text ${problem.completed && editTaskId !== problem.id ? 'completed' : ''}`} onClick={() => toggleComplete(problem.id)}
                            style={{ cursor: 'pointer' }}>
                            {editTaskId === problem.id ? (
                            <div className="edit-input-group">
                                <input type="text" value={editTask} onChange={(e) => setEditTask(e.target.value)}
                                onKeyDown={(e) =>{
                                    if (e.key === 'Enter'){
                                        e.preventDefault();
                                        e.stopPropagation();
                                        saveTask();}}}/>
                                <button onClick={(e) => {e.stopPropagation(); saveTask();}}>Изменить</button>
                            </div>) : ( problem.task )}
                        </div>
                        <div className="actions_icons">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                            className="change_task"
                            onClick={(e) => {e.stopPropagation(); EditTaskTitle(problem);}}>
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="delete_task"
                            onClick={(e) => {e.stopPropagation(); DeleteTask(problem.id);}}>
                            <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}