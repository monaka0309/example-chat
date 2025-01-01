import React from "react";
import './Todo.css';

const Todo: React.FC = () => {
    return (
        <div className="content">
            <div className="form_field">
                <form className="form">
                    <div className="input_field">
                        <input type="text" placeholder="やることを入力してください"></input>
                    </div>
                    <div className="button_field">
                        <button type="button">追加</button>
                    </div>
                </form>
            </div>
            <ul className="list">
                <li className="item">
                    <div className="todo">
                        <span>洗濯物を干す</span>
                    </div>
                </li>
                <li className="item">
                    <div className="todo">
                        <span>部屋を掃除する</span>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Todo;



