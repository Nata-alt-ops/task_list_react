import React, { useState } from "react";
import './Main.scss';

type Task = {
    id:number;
    task:string;
    completed:boolean;

}



export const Main = () =>{
    
    const [problems, setProblem] = useState<Task[]>(
        [
            {id:1,
             task:"Помыть кота",
             completed: false
            },
            {id:2,
             task:"Почесать кота",
             completed: false
            }
        ]
    )
    const DeleteTask = (id:number) =>{
       setProblem(nTask => nTask.filter(task => task.id !== id))
    }
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

    const[editTaskId, setEditTaskId] = useState<number | null>(null);
    const[editTask, setEditTask] = useState('');

    const EditTaskTitle = (task: Task) => {
        setEditTaskId(task.id);
        setEditTask(task.task)
    }
    const saveTask = () =>{
        if (editTask.trim() === '' || editTaskId === null) return;

        setProblem(prev =>
            prev.map(task =>
                task.id == editTaskId ? {...task, task:editTask.trim()}: task
            )
        );
        setEditTaskId(null)
    };
     const toggleComplete = (id: number) => {
    setProblem(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

   
    return(
        <div className="site_con">
            <div className="list_con">
                <div className="list">
                    <h1 className="list_title">Список дел</h1>
                     {problems.map(problem => (
                        <div key={problem.id} className="list_task">
                        <div className={`task_text ${problem.completed ? 'completed' : ''}`} onClick={() => toggleComplete(problem.id)}
                            style={{ cursor: 'pointer' }}>
                            {editTaskId === problem.id ? (
                            <div className="edit-input-group">
                                <input type="text" value={editTask} onChange={(e) => setEditTask(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && saveTask()}/>
                                <button onClick={saveTask}>Изменить</button>
                            </div>
                            ) : (
                            problem.task
                            )}
                        </div>
                        <div className="actions_icons">
                            <img
                            src="/edit (1).png"
                            alt="Редактировать"
                            className="change_task"
                            onClick={(e) => {
                                e.stopPropagation(); // не срабатывает toggleComplete
                                EditTaskTitle(problem);
                            }}
                            />
                            <img
                            src="/delete (1).png"
                            alt="Удалить"
                            className="delete_task"
                            onClick={(e) => {
                                e.stopPropagation(); // не срабатывает toggleComplete
                                DeleteTask(problem.id);
                            }}
                            />
                        </div>
                        </div>
                    ))}
                     {/*{problems.map(problem =>(
                        <div key={problem.id}>
                            <div className="list_task">
                                <div className="task_text">{problem.task}</div>
                                <div className="actions_icons">
                                    <img src="/edit (1).png" alt={problem.task} className="change_task" />
                                    <img src="/delete (1).png" alt={problem.task} className="delete_task" 
                                    onClick={() => DeleteTask(problem.id)}/>
                                </div>
                            </div>
                        </div>
                    ))}*/}
                  

                    <div className="new_task">
                        <h1>Новая запись</h1>
                        <div className="input_button">
                            <input placeholder="Новая запись" value={newTask}
                onChange={(e) => setNewTask(e.target.value)}></input>
                            <button onClick={addTask}>Добавить</button>
                        </div>
                    </div>

                </div>
            
        </div>
        </div>





    );
}