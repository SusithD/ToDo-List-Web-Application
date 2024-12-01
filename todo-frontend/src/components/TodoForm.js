import React, { useState } from 'react';

const TodoForm = ({ onAdd }) => {
   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');

   const handleSubmit = (e) => {
       e.preventDefault();
       onAdd({ title, description });
       setTitle('');
       setDescription('');
   };

   return (
       <form onSubmit={handleSubmit} style={{ margin: '20px' }}>
           <input
               type="text"
               placeholder="Title"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               required
               style={{ marginRight: '10px', padding: '5px' }}
           />
           <input
               type="text"
               placeholder="Description"
               value={description}
               onChange={(e) => setDescription(e.target.value)}
               style={{ marginRight: '10px', padding: '5px' }}
           />
           <button type="submit" style={{ padding: '5px 10px' }}>Add Task</button>
       </form>
   );
};

export default TodoForm;
