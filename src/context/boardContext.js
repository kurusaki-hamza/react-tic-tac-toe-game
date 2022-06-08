import React from "react";
import { StartContext } from './startContext';
import success from '../assets/success fanfare trumpets.mp3';
import fail from '../assets/negative beeps.mp3';
import click from '../assets/click.mp3';
import end from '../assets/endofgame.mp3';

const BoardContext = React.createContext();
const BoardProvider = props =>{
    const {activePlayer,cpuTurn,defficulty,setScreen} = React.useContext(StartContext);
    const [squares,setSquares] = React.useState(Array(9).fill(""));
    const [winner,setWinner] = React.useState("none");
    const [winnerLine,setWinnerLine] = React.useState(null);
    const [next,setNext] = React.useState("x");
    const [equalPlayers,setEqualPlayers] = React.useState(false);
    const [popUp, setPopUp] = React.useState(false);
    const [tries,setTries] = React.useState({x:0,o:0});
    const [move,setMove] = React.useState(0);

    const winAudio = React.useRef();
    const loseAudio = React.useRef();
    const clickAudio = React.useRef();
    const endAudio = React.useRef();
    const clickFn = ()=>{
        clickAudio.current.play()
    }
    const winFn = ()=>{
        winAudio.current.play()
    }
    const loseFn = ()=>{
        loseAudio.current.play()
    }
    const endFn = ()=>{
        endAudio.current.play()
    }

    const quit = ()=>{
        setSquares(Array(9).fill(""));
        setWinner("none");
        setWinnerLine(null);
        setNext("x");
        setEqualPlayers(false);
        setPopUp(false);
        setTries({x:0,o:0});
        setScreen("startScreen");
        setMove(0);
    }
    const nextRound = ()=>{
        setSquares(Array(9).fill(""));
        setWinner("none");
        setWinnerLine(null);
        setNext("x");
        setEqualPlayers(false);
        setPopUp(false);
        setMove(0);
    }
    const handleClick = (i)=>{
        const fakeSquares = [...squares];
        if(fakeSquares[i] === ""){
            fakeSquares[i] = next;
            setSquares(fakeSquares);
            setNext(next === "x" ? "o" : "x");
        } else {
            return
        };
    }
    const winningLines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    const checkWinner = (sq)=>{
        let equal;
        for(let i=0;i<winningLines.length;i++){
            const [a,b,c] = winningLines[i];
                if(sq[a] && sq[a]===sq[b] && sq[b]===sq[c] ){
                    setWinner(sq[a]);
                    if(cpuTurn!==sq[a]){
                        winFn();
                    } else {
                        loseFn();
                    }
                    setWinnerLine(winningLines[i]);
                    setTimeout(() => {
                        setPopUp(true);
                    }, 400);
                    if(sq[a]==="x"){
                        setTries({x:tries.x+1,o:tries.o})
                    } else {
                        setTries({x:tries.x,o:tries.o+1})
                    }
                    equal = false
                } else {
                    equal = true;
                }
        }
        if(equal && !squares.includes("")){
            setTimeout(() => {
                setEqualPlayers(true);
                setPopUp(true);
                endFn();
            }, 400);
        }
    }
    React.useEffect(()=>{
        let cpu = cpuTurn;
        if(next===cpu){
            if(defficulty==="easy"){
                const fakeSquares = [...squares];
                const ixes = [];
                for(let i=0;i<fakeSquares.length;i++){
                    if(fakeSquares[i]===""){
                        ixes.push(i);
                    }
                }
                ixes.sort((a,b)=>Math.random()-0.3);
                fakeSquares[ixes[Math.floor(Math.random()*ixes.length)]] = cpu;
                setTimeout(() => {
                    setSquares(fakeSquares);
                }, 300);
            } else {
                const fakeSquares = [...squares];
                if(move===0){
                    if(cpu==="o"){
                        const firstMove = squares.indexOf(activePlayer);
                        if(firstMove===0) fakeSquares[2] = cpu
                        if(firstMove===2) fakeSquares[0] = cpu
                        if(firstMove===6) fakeSquares[0] = cpu
                        if(firstMove===8) fakeSquares[2] = cpu
                        if(firstMove===4) fakeSquares[0] = cpu
                        if(firstMove===1 || firstMove===3 || firstMove===5 || firstMove===7  ) fakeSquares[2] = cpu
                        setSquares(fakeSquares);
                        setMove(1);
                    } else {
                        fakeSquares[0] = cpu;
                        setSquares(fakeSquares);
                        setMove(1);
                    }
                } else {
                    let arrsOfTwoIxes = [];
                    let arrsOfTwoEmptyIxes = [];
                    const s = [...squares];
                    for(let i=0;i<winningLines.length;i++){
                        let [a,b,c] = winningLines[i];
                        if((
                            (s[a]===cpu || s[b]===cpu || s[c]===cpu) || 
                            (s[a]===activePlayer || s[b]===activePlayer || s[c]===activePlayer)
                            ) && (
                                (s[a]!=="" && s[b]!=="") ||
                                (s[a]!=="" && s[c]!=="") ||
                                (s[b]!=="" && s[c]!=="")
                            ) && (
                                s[a]===s[b] || s[a]===s[c] || s[b]===s[c]
                            ) && (
                                s[a]==="" || s[b]==="" || s[c]===""
                            )
                        ){
                            arrsOfTwoIxes.push(winningLines[i])
                        } else if(
                            (
                                (s[a] === "" && s[b] === "" ) || 
                                (s[a] === "" && s[c] === "" ) || 
                                (s[b] === "" && s[c] === "" )
                            ) && (
                                s[a] !== "" || s[b] !== "" || s[c] !== ""
                            )
                        ){
                            arrsOfTwoEmptyIxes.push(winningLines[i])
                        }
                    }
                    console.log("arrsOfTwoIxes",arrsOfTwoIxes);
                    console.log("arrsOfTwoEmptyIxes",arrsOfTwoEmptyIxes);
                    if(arrsOfTwoIxes.length > 0){
                        let cpuTwos = null;
                        let enemyTwos = null;
                        arrsOfTwoIxes.forEach((a,i)=>{
                            if( 
                                (
                                    (s[a[0]]===cpu && s[a[1]]===cpu) || 
                                    (s[a[0]]===cpu && s[a[2]]===cpu) || 
                                    (s[a[1]]===cpu && s[a[2]]===cpu)
                                ) && (
                                    s[a[0]]==="" || s[a[1]]==="" || s[a[2]]===""
                                )
                            ){
                                cpuTwos = i;
                            } else if( 
                                (
                                    (s[a[0]]===activePlayer && s[a[1]]===activePlayer) || 
                                    (s[a[0]]===activePlayer && s[a[2]]===activePlayer) || 
                                    (s[a[1]]===activePlayer && s[a[2]]===activePlayer)
                                ) && (
                                    s[a[0]]==="" || s[a[1]]==="" || s[a[2]]===""
                                )
                            ){
                                enemyTwos = i;
                            }
                        });
                        console.log("enemyTwos",enemyTwos);
                        console.log("cpuTwos",cpuTwos);
                        if(cpuTwos >= 0 && cpuTwos !== null){
                            let cpuEmptyStr =[];
                            for (let i = 0; i < arrsOfTwoIxes[cpuTwos].length; i++) {
                                if(s[arrsOfTwoIxes[cpuTwos][i]]==="") cpuEmptyStr.push(arrsOfTwoIxes[cpuTwos][i])
                            }
                            fakeSquares[cpuEmptyStr[0]] = cpu;
                            setTimeout(() => {
                                setSquares(fakeSquares);
                            }, 300);
                        } else if (enemyTwos >= 0 && enemyTwos !== null) {
                            let enemyEmptyStr =[];
                            for (let ix = 0; ix < arrsOfTwoIxes[enemyTwos].length; ix++) {
                                if(s[arrsOfTwoIxes[enemyTwos][ix]]===""){
                                    enemyEmptyStr.push(arrsOfTwoIxes[enemyTwos][ix]);
                                    console.log(arrsOfTwoIxes[enemyTwos][ix],enemyEmptyStr);
                                }
                            }
                            fakeSquares[enemyEmptyStr[0]] = cpu;
                            setTimeout(() => {
                                setSquares(fakeSquares);
                            }, 300);
                        } 
                    } else {
                        const ixes = [];
                        for(let i=0;i<fakeSquares.length;i++){
                            if(fakeSquares[i]===""){
                                ixes.push(i);
                            }
                        }
                        console.log(ixes,Math.floor(Math.random()*ixes.length));
                        ixes.sort((a,b)=>Math.random()-0.3);
                        fakeSquares[ixes[Math.floor(Math.random()*ixes.length)]] = cpu
                        setTimeout(() => {
                            setSquares(fakeSquares);;
                        }, 300);
                    }
                }
            };
            setNext(cpu==="x"?"o":"x")
        }
        if(winner==="none" && squares.includes("x") && squares.includes("o")){
            checkWinner(squares);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[squares,next,move]);
    return (
        <BoardContext.Provider value={{squares,setSquares,popUp,handleClick,equalPlayers,winner,winnerLine,setWinnerLine,tries,quit,nextRound,next,clickFn}}>
            {props.children}
            <audio ref={clickAudio} src={click} />
            <audio ref={loseAudio} src={fail} />
            <audio ref={winAudio} src={success} />
            <audio ref={endAudio} src={end} />
        </BoardContext.Provider>
    )
}
export {BoardProvider,BoardContext}