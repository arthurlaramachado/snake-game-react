import React, { useEffect, useState, createRef } from 'react';
import './Index.css'

function Board() {
    const [canvas, setCanvas] = useState(createRef());
    const [ctx, setCtx] = useState(null);
    const [gameStart, setGameStart] = useState(false);
    const [timer, setTimer] = useState(0);
    /* const [playerOnChange, setPlayerOnChange] = player.snakeBody.concat({posX: lastOnArray.posX, posY: lastOnArray.posY}); */
    const [player, setPlayer] = useState({
        snakeBody: [{posX:0, posY:0,}, {posX:1, posY:0,}, {posX:2, posY:0,}],
        nickname: "Random",
        points: 0,
    });

    const [direction, setDirection] = useState("ArrowRight");

    useEffect(() => {
        setCtx(canvas.current.getContext('2d'));
    }, []);

    //render page for the first time
    useEffect(() => {
        if (ctx != null){
            drawFrame();
        }
    }, [ctx]);

    useEffect(() => {
        if(gameStart){
            setTimeout(
                () => {
                    handleChangePlayerState();
                    drawFrame();
                    setTimer(timer+0.2);
                },
            200);
        }
    }, [gameStart, timer])

    async function handleChangePlayerState(event) {
        if(event){
            setDirection(event.key);
        }else {
            const newBody = await attBody();

            setPlayer({
                snakeBody: newBody,
                nickname: "Random",
                points: 0,
            });
        }

    }

    function attBody() {
        let lasOnBody = player.snakeBody[player.snakeBody.length-1];
        let newBody = player.snakeBody;
        newBody.shift();

        switch(direction) {
            case "ArrowUp":
                    newBody.push({posX:lasOnBody.posX, posY: lasOnBody.posY-1});
                break;
            case "ArrowDown":
                    newBody.push({posX:lasOnBody.posX, posY: lasOnBody.posY+1});
                break;
            case "ArrowRight":
                    newBody.push({posX:lasOnBody.posX+1, posY: lasOnBody.posY});
                break;
            case "ArrowLeft":
                    newBody.push({posX:lasOnBody.posX-1, posY: lasOnBody.posY});
                break;
        }

        return newBody;
    }

    function handleKeyPressed(event) {
        if(event.key === "Enter"){
            setGameStart(true)
        } else if (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "ArrowRight" || event.key === "ArrowLeft" ){
            handleChangePlayerState(event);
        }
    }

    function drawFrame(){
        ctx.clearRect(0, 0, 20, 20);
        for (let i = 0; i < player.snakeBody.length; i++){
            ctx.fillRect(player.snakeBody[i].posX, player.snakeBody[i].posY, 1, 1);
        }
    }

    return (
        <>
            <div>
                <canvas tabIndex="0" height="20" width="20" ref={canvas} onKeyDown={handleKeyPressed}/> 
            </div>
        </>
    )
}

export default Board;