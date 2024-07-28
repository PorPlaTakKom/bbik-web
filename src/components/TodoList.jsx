import React, { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/todoService';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const todos = await getTodos();
            setTodos(todos);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    const handleAddTodo = async () => {
        try {
            const todo = { title: newTodo, completed: "false"};
            await createTodo(todo);
            setNewTodo('');
            fetchTodos();
        } catch (error) {
            console.error("Error creating todo:", error);
        }
    };

    const handleToggleComplete = async (id, completed) => {
        try {
            // Toggle the completed value and convert it back to a string
            const newCompleted = !JSON.parse(completed);
            const completedString = newCompleted.toString();
            
            console.log(`Toggling Todo ID ${id}: ${completed} -> ${completedString}`);
            await updateTodo(id, { completed: completedString });
            fetchTodos();
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };
    
    const handleDeleteTodo = async (id) => {
        try {
            await deleteTodo(id);
            fetchTodos();
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    return (
        <div className="flex w-screen h-screen items-center justify-center min-h-screen bg-blue-100 p-4 sm:p-6">
            <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4 sm:mb-6">To-do List</h1>
                <div className="flex flex-col sm:flex-row w-full mb-4 sm:mb-6">
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Add new to-do"
                        className="flex-grow p-3 sm:p-4 rounded-t-lg sm:rounded-l-lg sm:rounded-t-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleAddTodo}
                        className="bg-blue-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-b-lg sm:rounded-r-lg sm:rounded-b-none hover:bg-blue-600 transition-colors duration-300"
                    >
                        Add
                    </button>
                </div>
                <ul className="w-full space-y-3 sm:space-y-4">
                    {todos.map((todo) => (
                        <li key={todo.id} className={`flex justify-between items-center p-3 sm:p-4 ${todo.completed === "true" ? "bg-green-50" : "bg-red-50"} rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300`}>
                            <span
                                className={`flex-1 cursor-pointer ${todo.completed === "true" ? 'line-through text-gray-500' : ''}`}
                                onClick={() => handleToggleComplete(todo.id, todo.completed)}
                            >
                                {todo.title}
                            </span>
                            <button
                                onClick={() => handleDeleteTodo(todo.id)}
                                className="bg-red-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded hover:bg-red-600 transition-colors duration-300"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
    
};

export default TodoList;
