import React from 'react';
import Start from './components/start/Start';
import Board from './components/board/Board';
import PopUp from './components/popUp/PopUp';
import { StartContext } from './context/startContext';
import { BoardContext } from './context/boardContext';

function App() {
  const {screen} = React.useContext(StartContext);
  const {popUp} = React.useContext(BoardContext);
  return (
    <div className="App">
      <div className="container">
        {screen === "startScreen" ? <Start /> : <Board />}
        {popUp && <PopUp />}
      </div>
    </div>
  );
}

export default App;
