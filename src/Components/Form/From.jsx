// import { useState, useEffect, useReducer } from 'react';
// import todoReducer from '../../todoReducer.jsx';
// export default function Form(){

//     const [item,setItem] = useState([]);
//     const [check,setItemCheck] = useState(false);
//     let nextId = 3;
//     const initialLists = [
//       {id: 0, name: 'Pray', done: false},
//       {id: 1, name: 'Watch a puppet show', done: false},
//       {id: 2, name: 'Study', done: false},
//     ];
//    const [items, dispatch] = useReducer(todoReducer, initialLists);

//   //const [items, setItems] = useState(initialLists);

//   // useEffect(() => {
//   //   items.map((im,index)=>{
//   //     <div key={index}>
//   //       {im.name}
//   //     </div>
//   //   })
//   //   const items = JSON.parse(localStorage.getItem('items'));
//   //   if (items) {
//   //     setItems(items);
//   //   }

//   // }, []);
//   const checkIt=(item)=>{
//     if(item[1]==false)
//         return <span>&#9745;</span>
//     return   <span>&#9746;</span>
//   }


//   function handleAddTask(nameIT) {
//     dispatch({
//       type: 'add',
//       id: nextId++,
//       name: nameIT,
//     });
//   }

//   function handleChangeTask(task) {
//     dispatch({
//       type: 'change',
//       task: task,
//     });
//   }

//   function handleDeleteTask(taskId) {
//     dispatch({
//       type: 'delete',
//       id: taskId,
//     });
//   }
// // const addHandler = ()=>{
// //    const itadd=[item,false];
// //     setItems([...items,itadd]);
// //     localStorage.setItem('items', JSON.stringify([...items,itadd]));
// //     setItem([]); 
// // }

// // const deleteHandler = (itemToDelete) => {
// //     const storedItems = JSON.parse(localStorage.getItem('items'));
// //     const updatedItems = storedItems.filter((item) => item[0] !== itemToDelete[0]);
// //     localStorage.setItem('items', JSON.stringify(updatedItems));
// //    setItems(updatedItems);
// //   };
// // const updateHandler = (itemToUpdate) =>{
// //     const ind = items.indexOf(itemToUpdate);
// //     console.log(ind);
// //     setItemCheck(check=>!check);
// //     items[ind]=[itemToUpdate[0],check];
// //     localStorage.setItem('items', JSON.stringify(items));
// // }
// useEffect(()=>{
//   {items.map((item, index) => ( // Add a unique key for each item in the map function
//   <div key={index}>
//     <p><button onClick={()=>updateHandler(item)}>{checkIt(item)}</button> {item.name} {item.id} <button onClick={()=>deleteHandler(item)}>delete</button></p>
//   </div>
// ))}
// },[])
// return(
//     <>
//     <label>Add todo</label>
//     <input type='text' value={item} onChange={(e)=>setItem(e.target.value)}/>
//     <button onClick={handleAddTask(item)}>Add</button>

//     </>
// )

// }


// // import { useState, useEffect } from 'react';

// // export default function Form() {
// //   const [item, setItem] = useState('');
// //   const [items, setItems] = useState([]);

// //   // Move the local storage retrieval logic to useEffect to ensure it's only called once on mount
// //   useEffect(() => {
// //     const items = JSON.parse(localStorage.getItem('items'));
// //     if (items) {
// //       setItems(items);
// //     }
// //   }, []);

// //   // Use a function reference for the onClick handler, not the result of the function call
// //   const addHandler = () => {
// //     setItems([...items, item]);
// //     localStorage.setItem('items', JSON.stringify([...items, item]));
// //     setItem(''); // Clear the input field after adding the item
// //   };

// //   return (
// //     <>
// //       <label>Add todo</label>
// //       <input type='text' value={item} onChange={(e) => setItem(e.target.value)} />
// //       <button onClick={addHandler}>Add</button>
// //       {items.map((item, index) => ( // Add a unique key for each item in the map function
// //         <div key={index}>
// //           <p>{item}</p>
// //         </div>
// //       ))}
// //     </>
// //   );
// // }


import { useState, useEffect, useReducer } from 'react';
import todoReducer from '../../todoReducer.jsx';

export default function Form() {
  const [item, setItem] = useState('');
  let id = 3;
  const [items, dispatch] = useReducer(todoReducer, [
    { id: 0, name: 'Pray', done: false },
    { id: 1, name: 'HomeWork', done: false },
    { id: 2, name: 'Study', done: false },
  ]);
   
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items'));
    if (storedItems) {
      dispatch({ type: 'set', items: storedItems });
    }
  }, []);
 
  const handleAddTask = () => {
    dispatch({
      type: 'add',
      id: id++,
      name: item,
      done: false,
    });
    setItem('');

  };

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);
  const UpdateMode = (id) => {
    if ((items[id]) && items[id].done==false)
      return <span>&#9746;</span>
    else
      return <span>&#9745;</span>
  }
  return (
    <>
      <label>Add todo </label>
      <input type='text' value={item} onChange={(e) => setItem(e.target.value)} />
      <button onClick={handleAddTask}>Add</button>
      {items.map((item) => (
        <div key={item.id}>
          <p>  <button onClick={() => dispatch({ type: 'update', done: item.done, id: item.id })}>{UpdateMode(item.id)}</button>
            {item.name}  

            <button onClick={() => dispatch({ type: 'delete', id: item.id })}>Delete</button>
          </p>
        </div>
      ))}
    </>
  );
}

