import React from 'react';
import PopUpWin from './PopUpWin';
import PopUpRestart from './PopUpRestart';
import {BoardContext} from "../../context/boardContext";

const PopUp = (props) => {
  const {equalPlayers} = React.useContext(BoardContext);
  return (
    <div className="popUp">
      {
        equalPlayers ? <PopUpRestart /> : <PopUpWin />
      }
    </div>
  )
}

export default PopUp