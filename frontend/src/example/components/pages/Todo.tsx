import React, { useEffect, useState } from 'react';
import { Logger, stringField, useDownloader, useInput, useValidation } from 'framework';
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

    const postTodo = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        BackendService.postTodo(text)
            .then(() => setTodos([...todos, text]));
    };

    const download = useDownloader();

    const downloadFile = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { fileKey } = await BackendService.createFile();
        const fileData = await BackendService.downloadFile(fileKey);
        download(fileData, '${Data.now()}.csv');
    };

    const [downloadUrl, setDownloadUrl] = useState<string>('');

    const createFile = async (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        const { fileKey } = await BackendService.createFile();
        setDownloadUrl('http://localhost:9080/api/files/${fileKey}');
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
            <form className='form' onSubmit={downloadFile}>
                <div className='download_button_field'>
                    <button type='submit'>ダウンロード</button>
                </div>
            </form>
            <form className='form' onSubmit={createFile}>
                <div className='download_button_field'>
                    <button type='submit'>ファイル作成</button>
                </div>
            </form>
            { downloadUrl && <a href={downloadUrl}>ダウンロード</a> }
        </div>
    );
};

export default Todo;



