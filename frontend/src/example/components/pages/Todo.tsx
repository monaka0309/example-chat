import React, { useEffect, useState } from 'react';
import { Logger, useInput } from 'framework';
import './Todo.css';
import { BackendService } from 'example/backend';

type Todo = {
    id: number
    text: string
}

const Todo: React.FC = () => {
    const [todos, setTodos] = useState<String[]>([]);
    const [text, textAttributes] = useInput('');

    useEffect(() => {
        BackendService.getTodos()
            .then(response => {
                Logger.debug(response);
                setTodos(response.map((todo: Todo) => todo.text));
            });
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
                        <button type="submit">追加</button>
                    </div>
                </form>
            </div>
            <h1>hello</h1>
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



