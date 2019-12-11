import React from 'react';
import './App.css';
import TableData from '../components/table';


class App extends React.Component {

  constructor(){
    super();
    this.state = {
      data: null
    }
  }

  render() {
    return(
      <div className="App">
        <h1>Hello World</h1>
        <TableData />
      </div>
    );
  };
}

export default App;
