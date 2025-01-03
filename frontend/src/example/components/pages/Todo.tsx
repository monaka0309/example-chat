import React, { useEffect, useState } from 'react';
import { Logger, useInput, useValidation } from 'framework';
import './Todo.css';
import { BackendService } from 'example/backend';
import { ValidationError } from '../basics';

type Todo = {
    id: number
    text: string
}

const Todo: React.FC = () => {
    const [todos, setTodos] = useState<String[]>([]);
    const [text, textAttributes] = useInput('');
    const { error, handleSubmit } = useValidation<{text: string}>({
        text: stringField()
            .required('やることは必須です。')
            .maxLength(20, 'やることは20字以内で入力してください。'),
    })

    useEffect(() => {
        BackendService.getTodos()
            .then(response => {
                Logger.debug(response);
                setTodos(response.map((todo: Todo) => todo.text));
            });
    }, []);

    const postTodo = (event: React.FormEvent<HTMLHormElement>) => {
        event.preventDefault();
        BackendService.postTodo(text)
            .then(() => setTodos([...todos, text]));
    };


    return (
        <div className="content">
            <div className="form_field">
                <form className="form" onSubmit={handleSubmit({text}, postTodo)}>
                    <div className="input_field">
                        <input type="text" {...textAttributes} placeholder="やることを入力してください"></input>
                        <ValidationError message={error.text} ></ValidationError>
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



