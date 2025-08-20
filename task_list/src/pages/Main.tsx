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
    return(
        <div className="site_con">
            <div className="list_con">
                <div className="list">
                    <h1 className="list_title">Список дел</h1>
                    {problems.map(problem =>(
                        <div key={problem.id}>
                            <div className="list_task">{problem.task}</div>
                        </div>
                    ))}

                </div>
            </div>
        </div>

    );
}