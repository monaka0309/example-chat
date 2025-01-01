import React, { useEffect, useState } from "react";
import { useInput } from "framework";
import './Todo.css';

const Todo: React.FC = () => {
    const [todos, setTodos] = useState<String[]>([]);
    const [text, textAttributes] = useInput('');

    useEffect(() => {
        setTodos([ '洗濯物を干す', '部屋を掃除する' ]);
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setTodos([...todos, text]);
    };


    return (
        <div className="content">
            <div className="form_field">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="input_field">
                        <input type="text" {...textAttributes} placeholder="やることを入力してください"></input>
                    </div>
                    <div className="button_field">
                        <button type="button">追加</button>
                    </div>
                </form>
            </div>
            <ul className="list">
                {todos.map((todo, index) =>
                <li className="item" key={index}>
                    <div className="todo">
                        <span>{todo}</span>
                    </div>
                </li>
            )}
            </ul>
        </div>
    );
};

export default Todo;



