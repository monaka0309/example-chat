import React from 'react';
import { Logger } from './framework/logging';
import './App.css';
import HelloWorld from 'example/components/pages/HelloWorld';

const App = () => {
  Logger.debug('rendering App...');
  return (
    <div>aaaa</div>
  );
};

export default App;
