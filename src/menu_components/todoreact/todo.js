import React, { useEffect, useState } from 'react';
import './style.css';


// get the Local Storage Data Back

const getLocalData = () => {
    const lists = localStorage.getItem('mytodolist');
    if(lists){
        return JSON.parse(lists);
    }
    else{
        return [];
    }
}

const Todo = () => {

    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState('');
    const [toggleButton, setToggleButton] = useState(false);

    // add the items function

    const addItem = () => {
        if(!inputData)
            alert('Please fill the data');
        
        else if(inputData && toggleButton){
            setItems(
                items.map((currElem) => {
                    if(currElem.id === isEditItem){
                        return {...currElem, name : inputData};
                    }
                    return currElem;
                })
            );
            setInputData([]);
            setIsEditItem(null);
            setToggleButton(false);
        }

        else{
            const myNewInputData = {
                id : new Date().getTime().toString(),
                name : inputData,
            }
            setItems([...items, myNewInputData]);
            setInputData('');
        } 
    };

    // edit items

    const editItem = (index) => {
        const item_todo_edited = items.find((currElem) => {
            return currElem.id === index;
        });
        setInputData(item_todo_edited.name);
        setIsEditItem(index);
        setToggleButton(true);
    }

    // deleting items

    const deleteItem = (index) => {
        const updateItem = items.filter((currElem) => {
            return currElem.id !== index;
        });
        setItems(updateItem);
    }

    // Remove All Elements

    const removeAll = () => {
        setItems([]);
    }

    // --------------------------------------------------

    // Adding Local Storage

    useEffect(() => {
        localStorage.setItem('mytodolist', JSON.stringify(items))
    },[items]);


  return (
    <>
        <div className='main-div'>
            <div className='child-div'>
                <figure>
                    <img style={{borderRadius: '10px'}} src="./images/todo.png" alt="todologo" />
                    <figcaption>Add Your List Here ✌</figcaption>
                </figure>
                <div className='addItems'>
                    <input type="text"
                    placeholder='✍ Add Items'
                    className='form-control'
                    value={inputData}
                    onChange={(event) => setInputData(event.target.value)}
                     />
                     {toggleButton ? <i className="far fa-edit add-btn" onClick={addItem}></i> : <i className="fa fa-plus add-btn" onClick={addItem}></i>}
                     
                </div>

                {/* show out items */}

                <div className='showItems'>

                    {items.map((currElem) => {

                        return (
                            <div className='eachItem' key={currElem.id}>
                        <h3>{currElem.name}</h3>
                        <div className='todo-btn'>
                        <i className="far fa-edit add-btn" onClick={() => editItem(currElem.id)}></i>
                        <i className="far fa-trash-alt add-btn" onClick={() => {deleteItem(currElem.id)}}></i>
                        </div>
                    </div>
                        )
                    })}
                </div>

                {/* Remove All Button */}

                <div className='showItems'>
                    <button className='btn effect04' data-sm-link-text='Remove All' onClick={removeAll}>
                        <span>CHECK LIST</span>
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Todo
