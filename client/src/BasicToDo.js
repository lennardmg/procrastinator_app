import React, { useState, useRef, useEffect } from 'react'
import BasicToDoList from './BasicToDoList';
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "basicToDo.toDos"

export default function BasicToDo() {
    const [toDos, setToDos] = useState([]);
    const toDoNameRef = useRef();

    useEffect(() => {
        const storedToDos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storedToDos) {setToDos(storedToDos)}
     }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(toDos))
    }, [toDos])


    const addToDo = () => {
        const name = toDoNameRef.current.value
        if (name.trim() === "") {return}

        console.log("name: ", name);

        setToDos(previousToDos => {
            return [...previousToDos, {
                id: uuidv4(),
                name,
                completed: false,
                deleted: false
            }]
        })

        toDoNameRef.current.value = null;

    }


    const toggleToDo = (id) => {
        const newToDos = [...toDos];
        const toDo = newToDos.find(toDo => toDo.id === id);
        toDo.completed = !toDo.completed;
        setToDos(newToDos);

    }

    const clearToDo = () => {
        const newToDos = toDos.filter(toDo => !toDo.completed);
        setToDos(newToDos);
    }

  return (
      <>
          <input type="text" ref={toDoNameRef}></input>
          <button onClick={addToDo}> Add ToDo </button>
          <button onClick={clearToDo}> Clear ToDo </button>
          <div> {toDos.filter(toDo => !toDo.completed).length} left to do </div>
          <br></br>
          <BasicToDoList toDos={toDos} toggleToDo={toggleToDo}/>
      </>
  );
}
