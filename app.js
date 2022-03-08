//For Snake
document.addEventListener('DOMContentLoaded', () => {  
    const squares2 = document.querySelectorAll('.grid2 div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 10;
    let currentIndex = 0; 
    let appleIndex = 0; 
    let currentSnake = [2,1,0] //2 is head and 0 is tail

    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0

    //Starting and restarting the game
    function startGame() {
        currentSnake.forEach(index => squares2[index].classList.remove('snake'))
        squares2[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares2[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
      }

    function moveOutcomes() {
        //Snake hitting border and itself
        if (
            (currentSnake[0] + width >= (width*width) && direction === width) || //hits bottom
            (currentSnake[0] % width === width -1 && direction === 1) || //hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || //hits left wall
            (currentSnake[0] - width < 0 && direction === -width) || //hits top
            squares2[currentSnake[0] + direction].classList.contains('snake') //hits itself
        ) {
            clearInterval(interval)
        }

        const tail = currentSnake.pop()
        squares2[tail].classList.remove('snake') //removes class of snake from tail
        currentSnake.unshift(currentSnake[0] + direction) //Gives direction to head of array

        if (squares2[currentSnake[0]].classList.contains('apple')) {
            squares2[currentSnake[0]].classList.remove('apple')
            squares2[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }
        squares2[currentSnake[0]].classList.add('snake')

    }

    function randomApple() {
        do{
          appleIndex = Math.floor(Math.random() * squares2.length)
        } while(squares2[appleIndex].classList.contains('snake')) 
        squares2[appleIndex].classList.add('apple')
      }


    //Assigning functions to key codes
    function control(e) {
        squares2[currentIndex].classList.remove('snake') //Moving the class based on the index

        if (e.keyCode === 68) { //d
            direction = 1
        } else if (e.keyCode === 87) { //w
            direction = -width
        } else if (e.keyCode === 65) { //a
            direction = -1
        } else if (e.keyCode === 83) { //s
            direction = +width
        }
    }

    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)

    //---------------------------------------------------------------------------------------

    const squares = document.querySelectorAll('.grid div')
    const result = document.querySelector('#result')
    const displayCurrentPlayer = document.querySelector('#current-player')
    let currentPlayer = 1
  
    const winningArrays = [ //Copied these from her repo
      [0, 1, 2, 3],
      [41, 40, 39, 38],
      [7, 8, 9, 10],
      [34, 33, 32, 31],
      [14, 15, 16, 17],
      [27, 26, 25, 24],
      [21, 22, 23, 24],
      [20, 19, 18, 17],
      [28, 29, 30, 31],
      [13, 12, 11, 10],
      [35, 36, 37, 38],
      [6, 5, 4, 3],
      [0, 7, 14, 21],
      [41, 34, 27, 20],
      [1, 8, 15, 22],
      [40, 33, 26, 19],
      [2, 9, 16, 23],
      [39, 32, 25, 18],
      [3, 10, 17, 24],
      [38, 31, 24, 17],
      [4, 11, 18, 25],
      [37, 30, 23, 16],
      [5, 12, 19, 26],
      [36, 29, 22, 15],
      [6, 13, 20, 27],
      [35, 28, 21, 14],
      [0, 8, 16, 24],
      [41, 33, 25, 17],
      [7, 15, 23, 31],
      [34, 26, 18, 10],
      [14, 22, 30, 38],
      [27, 19, 11, 3],
      [35, 29, 23, 17],
      [6, 12, 18, 24],
      [28, 22, 16, 10],
      [13, 19, 25, 31],
      [21, 15, 9, 3],
      [20, 26, 32, 38],
      [36, 30, 24, 18],
      [5, 11, 17, 23],
      [37, 31, 25, 19],
      [4, 10, 16, 22],
      [2, 10, 18, 26],
      [39, 31, 23, 15],
      [1, 9, 17, 25],
      [40, 32, 24, 16],
      [9, 17, 25, 33],
      [8, 16, 24, 32],
      [11, 17, 23, 29],
      [12, 18, 24, 30],
      [1, 2, 3, 4],
      [5, 4, 3, 2],
      [8, 9, 10, 11],
      [12, 11, 10, 9],
      [15, 16, 17, 18],
      [19, 18, 17, 16],
      [22, 23, 24, 25],
      [26, 25, 24, 23],
      [29, 30, 31, 32],
      [33, 32, 31, 30],
      [36, 37, 38, 39],
      [40, 39, 38, 37],
      [7, 14, 21, 28],
      [8, 15, 22, 29],
      [9, 16, 23, 30],
      [10, 17, 24, 31],
      [11, 18, 25, 32],
      [12, 19, 26, 33],
      [13, 20, 27, 34],
    ]
  
    
    for (let i = 0; i < squares.length; i++) { //Loops over each square 
      squares[i].onclick = () => { //Detects when the square is clicked
 
        if (squares[i + 7].classList.contains('taken') &&!squares[i].classList.contains('taken')) { //checks if the square below is taken

          if (currentPlayer == 1) {
            squares[i].classList.add('taken')
            squares[i].classList.add('player-one')
            currentPlayer = 2
            displayCurrentPlayer.innerHTML = currentPlayer
            
          } else if (currentPlayer == 2){
            squares[i].classList.add('taken')
            squares[i].classList.add('player-two')
            currentPlayer = 1
            displayCurrentPlayer.innerHTML = currentPlayer    
          } 

        } else alert('Invalid tile location')
        checkBoard() //Couldn't get the squares event listener working, so added this from her repo to fix it.
      }
    }

    
    function checkBoard() { //Checks if either player has won

        for (let y = 0; y < winningArrays.length; y++) {
          const square1 = squares[winningArrays[y][0]]
          const square2 = squares[winningArrays[y][1]]
          const square3 = squares[winningArrays[y][2]]
          const square4 = squares[winningArrays[y][3]]
    
          if (
            square1.classList.contains('player-one') &&
            square2.classList.contains('player-one') &&
            square3.classList.contains('player-one') &&
            square4.classList.contains('player-one')
          ) {
            result.innerHTML = 'Player One Wins!'
          }
  
          if (
            square1.classList.contains('player-two') &&
            square2.classList.contains('player-two') &&
            square3.classList.contains('player-two') &&
            square4.classList.contains('player-two')
          ) {
            result.innerHTML = 'Player Two Wins!'
          }
  
        }
      }


      squares.forEach(square => square.addEventListener('click', checkBoard))





    //To handle resetting the connect 4 board
    const refreshBtn = document.getElementById('refresh')
    refreshBtn.addEventListener('click', refresh)

    function refresh() {
        window.location.reload();
    }

})




