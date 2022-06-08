import React from 'react';
import Xicon from '../icons/Xicon';
import Oicon from '../icons/Oicon';
import { BoardContext } from '../../context/boardContext';
import { StartContext } from '../../context/startContext';

const PopUpWin = (props) => {
  const {winner} = React.useContext(BoardContext);
  const {quit,nextRound,clickFn} = React.useContext(BoardContext);const {activePlayer} = React.useContext(StartContext);
  const checkLosing = (activePlayer,winner)=>{
    if(activePlayer === "x" && winner==="x") return false
    if(activePlayer === "x" && winner==="o") return true
    if(activePlayer === "o" && winner==="o") return false
    if(activePlayer === "o" && winner==="x") return true
  }
  return (
    <div className="popUpWin">
        <p>You {checkLosing(activePlayer,winner) ? "Lose" : "Win"} !</p>
        <div className="winner">
          {winner==="x" ? <Xicon size="sm"/> : <Oicon size="sm"/>} takes the round
        </div>
        <button className="quit" onClick={()=>{quit();clickFn()}}>Quit</button>
        <button className="next_round" onClick={()=>{nextRound();clickFn()}}>Next Round</button>
    </div>
  )
}

export default PopUpWin