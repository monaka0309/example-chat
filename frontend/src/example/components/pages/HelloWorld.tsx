import React, {useEffect, useState} from 'react';
import { Logger } from 'framework/logging';
import { BackendService } from 'example/backend';

const HelloWorld: React.FC = () => {
    const [text, setText] = useState<String>('');

    useEffect(() => {
        BackendService.getHelloWorld()
        .then(response => {
            Logger.debug(response);
            setText(response.text);
        });
    }, []);

    return (
        <div>{text}</div>
    );
};

export default HelloWorld;