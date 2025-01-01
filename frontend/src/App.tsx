import React from 'react';
import { Logger } from './framework/logging';
import './App.css';
import Todo from 'example/components/pages/Todo';

const App = () => {
  Logger.debug('rendering App...');
  return (
    <Todo></Todo>
  );
};

export default App;
