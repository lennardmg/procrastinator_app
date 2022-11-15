import React from 'react'

export default function BasicToDoListItems({ toDos, toggleToDo, deleteToDo }) {

    const handleToDoClick = (id) => {
        toggleToDo(id)
    }

    const handleDeleteClick = (id) => {
        deleteToDo(id);
    };

  return (
      <>
          {toDos.map((toDo) =>
              toDo.completed ? (
                  <div key={toDo.id} className="basicToDo">
                      <del> {toDo.basictodo_name} </del>
                      <p>
                        <span onClick={() => handleToDoClick(toDo.id)}> 🔂 </span>
                        <span onClick={() => handleDeleteClick(toDo.id)}> ❌ </span>
                      </p>
                  </div>
              ) : (
                  <div key={toDo.id} className="basicToDo">
                      {toDo.basictodo_name}
                      <p>
                        <span onClick={() => handleToDoClick(toDo.id)}> ✔️ </span>
                        <span onClick={() => handleDeleteClick(toDo.id)}> ❌ </span>
                      </p>
                  </div>
              )
          )}
      </>
  );
}
