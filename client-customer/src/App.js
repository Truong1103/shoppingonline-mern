import './App.css';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import MyProvider from './contexts/MyProvider';
import Main from './components/MainComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends Component {
  render() {
    return (
      <MyProvider>
        <BrowserRouter >
          <Main />
        </BrowserRouter>
      </MyProvider>
    );
  }
}
export default App;