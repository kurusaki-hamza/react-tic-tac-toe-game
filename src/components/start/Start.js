import React from 'react';
import { StartContext } from '../../context/startContext';
import Oicon from '../icons/Oicon';
import Xicon from '../icons/Xicon';
import { BoardContext } from '../../context/boardContext';
import clickSound from '../../assets/click.mp3';

const Start = () => {
  const {activePlayer,setCpu,setActivePlayer,defficulty,setDefficulty,setScreen} = React.useContext(StartContext);
  const {setSquares} = React.useContext(BoardContext);
  const clickAudio = React.useRef();
  const clickFn = ()=>{
    clickAudio.current.play()
  }
  return (
    <div className="start">
        <div className="start_icons">
            <Xicon color="orange" size="lg" />
            <Oicon color="blue" size="lg" />
        </div>
        <div className="start_card">
      <h2>Pick Player 1st Mark</h2>
      <h4>Remember: X goes First</h4>
      <div className="start_card_players">
        <span className={`${activePlayer === "x" ? "active" : ""}`} onClick={()=>{setActivePlayer("x");setCpu("o");clickFn()}}>
          <Xicon color={activePlayer === "x" ? "dark" : "light"} size="lg" />
        </span>
        <span className={`${activePlayer === "o" ? "active" : ""}`} onClick={()=>{setActivePlayer("o");setCpu("x");clickFn()}}>
          <Oicon color={activePlayer === "o" ? "dark" : "light"} size="lg" />
        </span>
      </div>
      <div className="start_setting">
        <h2>Choose Game defficult</h2>
        <div className="start_setting_board">
          <span className={defficulty === "easy" ? "active" : ""} onClick={()=>{setDefficulty("easy");clickFn()}}>Easy</span>
          <span className={defficulty === "hard" ? "active" : ""} onClick={()=>{setDefficulty("hard");clickFn()}}>Hard</span>
        </div>
      </div>
    </div>
    <div className="start_btns">
      <button onClick={()=>{setScreen("boardScreen");setSquares(Array(9).fill(''))}}>New Game Vs Cpu</button>
    </div>
    <audio ref={clickAudio} src={clickSound} />
    </div>
  )
}

export default Start