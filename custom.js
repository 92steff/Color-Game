var numSquares = 6;
var colorDisplay = document.getElementById('colorDisplay');
var colors = generateRandomColors(numSquares);
var displayMsg = document.getElementById('displayMsg');
var pickedColor = pickColor();
var btnEasy = document.getElementById('easy');
var btnHard = document.getElementById('hard');
var squares = document.querySelectorAll('.square');
var h1 = document.querySelector('h1');
var modeBtns = document.querySelectorAll('.mode');
var resetBtn = document.getElementById('reset');
var container = document.getElementById('container');
var minusPts = document.querySelectorAll('.minusPts');
var playerPts = document.getElementById('playerPts');
var ptsWon = document.getElementById('ptsWon');
var points = 0;
var misses = 0;
var credit = 20;
var won = 30;

var player = capFirstLetter(prompt("Enter your name"));

if (player === '') {
    player = 'Douche';
}

playerPts.textContent = player + "\'s points: " + points;

colorDisplay.textContent = pickedColor;

function generateRandomColors(num) {
    var arr = [];
    for (var i=0; i<num; i++) {
        arr.push(randomColor());
    }
    return arr;
}

function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

function pickColor() {
    var random = Math.floor(Math.random() * numSquares);
    return colors[random];
}

for (var i=0; i< squares.length; i++) {
    
    showBlocks();
    let number = i;
    won = credit;
    setTimeout(function() {
        minusPts[number].style.display = 'block';
    },600);
    squares[i].addEventListener('click', function() {
        
        var clickedColor = this.style.background;
        
        if(clickedColor === pickedColor) {
            
            displayMsg.textContent = 'Correct!';
            
                for (var i=0;i<squares.length; i++) {
                    minusPts[i].style.display = 'block';
                    squares[i].style.visibility = 'visible';
                }
            
            changeColor(squares);
            h1.style.background = clickedColor;
            if (misses >= credit) {
                points += 0;
            }else {
                points += credit - misses;
            }
            points +=won;
            playerPts.textContent = player + "\'s points: " + points;
            
            ptsWon.style.display = 'block';
            
            if (won < 0) {
                ptsWon.textContent = won + 'pts';
            }else {
                ptsWon.textContent = '+' + won + 'pts';
            }
            
            setTimeout(function(){
                ptsWon.style.display = 'none';
                reset();
            }, 1000);
        }
        
        else {
            displayMsg.textContent = 'Try again!';
            
            setTimeout(function() {
                displayMsg.textContent = '';
            }, 800);
            
            this.style.visibility = 'hidden';
            
            
            misses += 10;
            won -= 10;
        
            
            setTimeout(function() {
                minusPts[number].style.display = 'none';
                playerPts.textContent = player + "\'s points: " + points;
            }, 800);
        }
    });
}

for (var i=0; i<modeBtns.length; i++) {
    
    modeBtns[i].addEventListener('click', function() {
        
        modeBtns[0].classList.remove('selected');
        modeBtns[1].classList.remove('selected');
        modeBtns[2].classList.remove('selected');
        this.classList.add('selected');
        
        if (this.textContent === 'Easy') {
            numSquares = 3;
            credit = 10;
        }
        else if (this.textContent === 'Medium') {
            numSquares = 6;
            credit = 20;
        }
        else {
            numSquares = 9;
            credit = 30;
        }

        reset();
    }) 
}

resetBtn.addEventListener('click', function(){
    reset();
})

function size() {
        for (var i=0; i<squares.length; i++) {
         if (numSquares !== 9) {
            squares[i].style.width = '200px';
            squares[i].style.height = '200px';
            squares[i].style.margin = '10px';
            container.style.paddingLeft = '0';
        }else {
            squares[i].style.width = '160px';
            squares[i].style.height = '160px';
            squares[i].style.margin = '10px';
            container.style.paddingLeft = '100px';
        }
    }
}

function reset() {
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    displayMsg.textContent = '';

    showBlocks();
    
    size();
    misses = 0;
    won = credit;
    h1.style.background = 'steelblue';
}

function changeColor(square) {
    for (var i=0; i<squares.length; i++) {
        square[i].style.background = pickedColor;
    }
}

function capFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function showBlocks() {
    
    for (var i=0; i< squares.length; i++) {
        squares[i].style.background = colors[i];
            if (colors[i]) {
                squares[i].style.display = 'block';
                squares[i].style.visibility = 'visible';
            }else {
                squares[i].style.display = 'none';
         } 
    }
}

