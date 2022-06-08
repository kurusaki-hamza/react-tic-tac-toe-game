import React from 'react'
import { BoardContext } from '../../context/boardContext'
import Oicon from '../icons/Oicon'
import Xicon from '../icons/Xicon'

const BoardCard = ({user,active,index}) => {
  const {handleClick,clickFn} = React.useContext(BoardContext);
  return (
    <div className={`board_card 
      ${active && user==="x" && "bg-orange icon-dark"} 
      ${active && user==="o" && "bg-blue icon-dark"} 
      ${active===false && user==="x" && "bg-dark icon-orange"} 
      ${active===false && user==="o" && "bg-dark icon-blue"}
      ${active===false && user==="none" && "bg-dark"}
      `} onClick={()=>{handleClick(index);clickFn()}}>
        {user==="x" ? <Xicon color="orange" size="lg"/> : ""}
        {user==="o" ? <Oicon color="blue" size="lg"/> : ""}
    </div>
  )
}

export default BoardCard