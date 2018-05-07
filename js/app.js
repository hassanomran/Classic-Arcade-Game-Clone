
var BLOCK_WIDTH = 101,
    BLOCK_HEIGHT = 83,
    NUM_ROWS = 6,
    NUM_COLS = 5,
    MIN_SPEED = Math.ceil(80),
    MAX_SPEED = Math.floor(600),
    score = 0,
    SAFE_DISTANCE = BLOCK_WIDTH/2;


/*
    player must avoid Enemies 
 */
var Enemy = function (row) {
    
    this.row = row;

    this.x = (-BLOCK_WIDTH) - Math.floor(Math.random() * 360);


    
    this.speed = MIN_SPEED + Math.floor(Math.random() * (MAX_SPEED - MIN_SPEED));

    
    this.sprite = 'images/enemy-bug.png';
};

/*
    Update the enemy's position
 */

Enemy.prototype.update = function (dt) {
    
    if (this.x < NUM_ROWS * BLOCK_WIDTH) {
        this.x += this.speed * dt;
    } else {
        this.x = (-BLOCK_WIDTH) - Math.floor(Math.random() * 400);
        this.speed = MIN_SPEED + Math.floor(Math.random() * (MAX_SPEED - MIN_SPEED));
    }
};

/*
    Draw the enemy on the screen
 */

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, (this.row-1) * (BLOCK_HEIGHT - 13));
};

/*
  define the Player class
 
 */

var Player = function () {
    // initial position of the player on the grid
    this.col = 3;
    this.row = 5;
    this.moveDistanceX = BLOCK_WIDTH;
    this.moveDistanceY = 161 - BLOCK_HEIGHT;

    
    this.x = (this.col - 1) * this.moveDistanceX;
    this.y = (this.row - 1) * this.moveDistanceY;

    this.sprite = 'images/char-boy.png';
};

/*
     define Player update function
*/

Player.prototype.update = function (key) {
    
    if (key === 'left' && this.col > 1) {
        this.col--;
        this.x = (this.col - 1) * this.moveDistanceX;
    } else if (key === 'up' && this.row >= 1) {
        this.row--;
        this.y = (this.row - 1) * this.moveDistanceY;
    } else if (key === 'right' && this.col < NUM_COLS) {
        this.col++;
        this.x = (this.col - 1) * this.moveDistanceX;
    } else if (key === 'down' && this.row < NUM_ROWS) {
        this.row++;
        this.y = (this.row - 1) * this.moveDistanceY;
    } else if (this.row === 1) {
        updateScore(this);
        this.reset();
    }
};

/*
    reset the position of te player when win or fail
*/

Player.prototype.reset = function () {

    this.row = 5;
    this.col = 3;

    this.x = (this.col - 1) * this.moveDistanceX;
    this.y = (this.row - 1) * this.moveDistanceY;
};

/*
     render Player on the canvas
*/

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/**
    handle key events to the Player
 */
Player.prototype.handleInput = function (key) {
    this.update(key);
};

/*
  listeners  for key presses
*/

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



function updateScore(player) {
    if (player.row === 1) {
        score++;
        $('.score-value').text(score);
        console.log('score:' + score);
    }
}



var enemyA = new Enemy(2);
var enemyB = new Enemy(3);
var enemyC = new Enemy(4);
var enemyD = new Enemy(2);
var enemyE = new Enemy(4);
var allEnemies = [enemyA, enemyB, enemyC, enemyD, enemyE];
var player = new Player();



function checkCollisions(enemies, player) {
    for (var i = 0, len = enemies.length; i < len; i++) {
        var enemyX = enemies[i].x;
        var playerX = player.x;

        if (enemies[i].row === player.row) {
            
            if(Math.abs(enemyX - playerX) <= SAFE_DISTANCE){
                player.reset();
            }
        }
    }
}