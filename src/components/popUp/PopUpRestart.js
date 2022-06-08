import React from 'react';
import { BoardContext } from '../../context/boardContext';
const PopUpRestart = () => {
  const {quit,nextRound,clickFn} = React.useContext(BoardContext);
  return (
    <div className="popUpRestart">
        <p>Restart The Game?</p>
        <button className="cancel" onClick={()=>{quit();clickFn()}}>No, Cancel</button>
        <button className="restart" onClick={()=>{nextRound();clickFn()}}>Yes, Restart</button>
    </div>
  )
}
export default PopUpRestart