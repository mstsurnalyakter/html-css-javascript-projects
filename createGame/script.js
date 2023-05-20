 
    const play = document.querySelector('.play');
    const scoreElemnt = document.querySelector(".score");
    const highestScoreElement = document.querySelector(".high-score");
    const controls = document.querySelectorAll(".controls i");

    let gameOver = false;

    let foodX , foodY ;
    let snakeX = 5, snakeY = 10;
    let snakeBody = [];
    let velocityX = 0, velocityY = 0;
    let setIntervalId;
    let score = 0;

    //getting high score from the local storage
    let highestScore = localStorage.getItem("high-score") || 0;
    highestScoreElement.innerText = `Highest Score : ${highestScore}`;

    const changeFood = () => {
        //passing a random number 0 - 30 value as food position
        foodX = Math.floor(Math.random()*30) + 1;
        foodY = Math.floor(Math.random()*30) + 1;
    }

    const handleGameOver = () =>{
      //clearing velocity value based on key press
      clearInterval(setIntervalId);
      alert("Game Over ! Press Ok to replay....");
      location.reload();
    }


    const changeDirection = (e) => {

        //changing velocity value based on key press

         if (e.key === "ArrowUp" && velocityY != 1) {
            velocityX = 0;
            velocityY = -1;
         }  else if (e.key === "ArrowDown" && velocityY != -1) {
            velocityX = 0;
            velocityY = 1;
         }  else if (e.key === "ArrowLeft" && velocityX != 1) {
            velocityX = -1;
            velocityY = 0;
         }  else if (e.key === "ArrowRight" && velocityX != -1) {
            velocityX = 1;
            velocityY = 0;
         } 
         // initGame();
    }

    controls.forEach(key =>{
      //calling changeDirection on each key click and passing key dataset value as an object
      key.addEventListener("click", () => changeDirection({key : key.dataset.key}));
    });

    const initGame = () => {

      if (gameOver) return handleGameOver();
        let htmlMarkup = `<section class="food" style="grid-area: ${foodY}/${foodX}"></section>`;

        // checking if the snake's hit the food
        if (snakeX===foodX && snakeY === foodY) {
         changeFood();
         snakeBody.push([foodX , foodY]); //pushing food position to snake body array 
         score++;//increment score by 1

         highestScore = score >= highestScore ? score : highestScore;
         localStorage.setItem("high-score", highestScore);
         scoreElemnt.innerText = `Gain Score : ${score}`;
         highestScoreElement.innerText = `Highest Score : ${highestScore}`;
        } 


        for(let i= snakeBody.length - 1; i>0 ; i--){
         //shifting forward the value of the elements in the snake body by one
         snakeBody[i] = snakeBody[i - 1];
        }

        snakeBody[0] = [snakeX, snakeY];//Setting first element of snake body to current snake position

        //Updating the snak's head position based on the current velocity
        snakeX += velocityX;
        snakeY += velocityY;

        //checking if the snake's head is out of wall, if so setting gameOver to thrue
        if (snakeX <=0 || snakeX >30 || snakeY <=0 || snakeY >30) {
         gameOver = true;
        }

        for (let i = 0; i< snakeBody.length; i++) {
         //adding a section for each part of the snake's body
         htmlMarkup += `<section class="head" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}"></section>`;
         
         //checking if the snake head hit the body , if so set gameOver to true
         if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] == snakeBody[i][0]) {
            gameOver = true;
         }

        }

        
        play.innerHTML = htmlMarkup;
    }

    changeFood();

    setIntervalId = setInterval(initGame,225)

    initGame();

    document.addEventListener("keydown", changeDirection);