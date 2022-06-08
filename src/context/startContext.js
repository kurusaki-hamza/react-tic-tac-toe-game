import React from "react";
const StartContext = React.createContext();
function StartProvider(props){
    const [activePlayer,setActivePlayer] = React.useState("x");
    const [cpuTurn,setCpu] = React.useState("o");
    const [defficulty,setDefficulty] = React.useState("easy");
    const [screen,setScreen] = React.useState("startScreen");
    React.useEffect(()=>{},[activePlayer,screen,defficulty,cpuTurn]);
    return (
        <StartContext.Provider value={{activePlayer,setActivePlayer,defficulty,setDefficulty,screen,cpuTurn,setCpu,setScreen}}>
            {props.children}
        </StartContext.Provider>
    )
}
export {StartProvider,StartContext}