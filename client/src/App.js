import React, { Component } from 'react';
import Main from './components/Main'
import Results from './components/Results'
import Search from './components/Search'


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <Main />
          <Search />
          <Results />
        </div>
      </div>
    );
  }
}

export default App;
