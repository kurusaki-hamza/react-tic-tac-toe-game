import React from 'react';
import { BoardContext } from '../../context/boardContext';
import { StartContext } from '../../context/startContext';
import Oicon from '../icons/Oicon';
import Restart from '../icons/Restart';
import Xicon from '../icons/Xicon';
import BoardCard from './BoardCard';


const Board = () => {
    let {squares,handleClick,winnerLine,tries,nextRound,next,clickFn} = React.useContext(BoardContext);
    const {activePlayer} = React.useContext(StartContext);
  return (
    <div className="board">
        <div key="1" className="board_header">
            <div key="1" className="board_header_icons">
                <Xicon /><Oicon />
            </div>
            <div key="2" className="board_header_turn">
                {next==="x"?<Xicon color="dark" size="sm"/>:<Oicon color="dark" size="sm"/>} turn
            </div>
            <div key="3" className="board_header_restart" onClick={()=>{nextRound();clickFn()}}>
                <Restart /> 
            </div>
        </div>
        <div key="2" className="board_cards">
            {squares.map((e,ind)=>{
                if(winnerLine===null){
                    return <BoardCard user={e ? e : "none"} key={ind} active={false} index={ind} handleClick={handleClick} />
                } else {
                    if(winnerLine.includes(ind)){
                        return <BoardCard user={e ? e : "none"} key={ind} active={true} index={ind}  handleClick={handleClick}/>
                    } else {
                        return <BoardCard user={e ? e : "none"} key={ind} active={false} index={ind}  handleClick={handleClick}/>
                    }
                }
            })}
        </div>
        <div key="3" className="board_footer">
            <div key="1" className="board_footer_player">
                <h3>X {activePlayer === "x" ? "(you)" : "(cpu)"} </h3>
                <h4>{tries.x}</h4>
            </div>
            <div key="2" className="board_footer_tries">
                <h3>Tries</h3>
                <h4>{tries.x+tries.o}</h4>
            </div>
            <div key="3" className="board_footer_cpu">
                <h3>O {activePlayer === "o" ? "(you)" : "(cpu)"} </h3>
                <h4>{tries.o}</h4>
            </div>
        </div>
    </div>
  )
}

export default Board