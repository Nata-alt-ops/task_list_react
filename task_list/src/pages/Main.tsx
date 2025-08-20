import React, { useState } from "react";
import './Main.scss';

type Task = {
    id:number;
    task:string;
}

export const Main = () =>{
    
    const [problems, setProblem] = useState<Task[]>(
        [
            {id:1,
             task:"Помыть кота"
            }
        ]
    )
    const DeleteTask = (id:number) =>{
       setProblem(nTask => nTask.filter(task => task.id !== id))
    }

   
    return(
        <div className="site_con">
            <div className="list_con">
                <div className="list">
                    <h1 className="list_title">Список дел</h1>
                    {problems.map(problem =>(
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
                    ))}

                    <div className="new_task">
                        <h1>Новая запись</h1>
                        <div className="input_button">
                            <input placeholder="Новая запись"></input>
                            <button>Добавить</button>
                        </div>
                    </div>

                </div>
            </div>














































































        </div>

    );
}