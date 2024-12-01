import React from 'react';

const TodoList = ({ todos, onUpdate, onDelete }) => (
   <ul style={{ listStyle: 'none', padding: 0 }}>
       {todos.map((todo) => (
           <li key={todo._id} style={{ margin: '10px 0', padding: '10px', border: '1px solid #ddd' }}>
               <h3>{todo.title}</h3>
               <p>{todo.description}</p>
               <div>
                   <button
                       onClick={() => onUpdate(todo._id, { ...todo, status: 'completed' })}
                       style={{ marginRight: '10px' }}
                   >
                       Complete
                   </button>
                   <button onClick={() => onDelete(todo._id)}>Delete</button>
               </div>
           </li>
       ))}
   </ul>
);

export default TodoList;
