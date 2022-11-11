import React from 'react'

export default function BasicToDoList({ toDos, toggleToDo }) {

    const handleToDoClick = () => {
        toggleToDo(toDos.id)
    }

  return (
    <ul className="basicToDoList">
            {toDos.map((toDo) => (
                <li
                    key={toDo.id}
                    className="basicToDo"
                >
                    {toDo.name}
                    <input type="checkbox" checked={toDo.completed} onChange={handleToDoClick}></input>
                </li>
            ))}
    </ul>
  );
}
