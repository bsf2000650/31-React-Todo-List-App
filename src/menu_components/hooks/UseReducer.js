import React, {useReducer, useState} from 'react'
import './style.css';

const reducer = (state, action) => {
    if(action.type === 'INCREMENT'){
        state = state + 1;
    }

    if(state > 0 && action.type === 'DECREMENT'){
        state = state - 1;
    }
    
    return state;
};

const UseReducer = () => {

    // const [myNum, setMyNum] = useState(0);

    const initialData = 10;

    const [state, dispatch] = useReducer(reducer, initialData);

  return (
    <>
        <div className='center_div'>
            <p>{state}</p>
            <div className='button2' onClick={() => dispatch ({type: 'INCREMENT'})}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                INCREMENT
            </div>
            <div className='button2' onClick={() => dispatch ({type: 'DECREMENT'})}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                DECREMENT
            </div>
        </div>
    </>
  )
}

export default UseReducer;
