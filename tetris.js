const I = [
	[
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
	],
	[
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
	],
	[
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
	]
];

const J = [
	[
		[1, 0, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 1],
		[0, 1, 0],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[0, 0, 1]
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[1, 1, 0]
	]
];

const L = [
	[
		[0, 0, 1],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[1, 0, 0]
	],
	[
		[1, 1, 0],
		[0, 1, 0],
		[0, 1, 0]
	]
];

const O = [
	[
		[0, 0, 0, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 0, 0],
	]
];

const S = [
	[
		[0, 1, 1],
		[1, 1, 0],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 0, 1]
	],
	[
		[0, 0, 0],
		[0, 1, 1],
		[1, 1, 0]
	],
	[
		[1, 0, 0],
		[1, 1, 0],
		[0, 1, 0]
	]
];

const T = [
	[
		[0, 1, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 1, 0],
		[1, 1, 0],
		[0, 1, 0]
	]
];

const Z = [
	[
		[1, 1, 0],
		[0, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 0, 1],
		[0, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 1, 0],
		[1, 1, 0],
		[1, 0, 0]
	]
];


const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");
const scoreElement = document.getElementById("score");
let score = 0;

const ROW = 20;
const COL = 10;
const SQS = 20;
const emptSQ = "white";


function drawSQ(x,y,color){
ctx.fillStyle = color;
ctx.fillRect(x*SQS,y*SQS,SQS,SQS);

ctx.strokeStyle = "black";
ctx.strokeRect(x*SQS,y*SQS,SQS,SQS);

}

let board = [];
for( r=0; r<ROW; r++ ){
	board[r] = [];
  for(c=0; c<COL; c++ ){
     board[r][c] = emptSQ;
  }
}

function drawBoard(){
	for( r=0; r<ROW; r++ ){
	  for(c=0; c<COL; c++ ){
		drawSQ(c,r,board[r][c]);
	  }
	}
}

drawBoard()

const Pieces=[
 [Z, 'red'],
 [S, "green" ],
 [T, "yellow"],
 [O, "blue"],
 [L,"purple"],
 [I, "cyan"],
 [J, "orange"]
];

 function randomPiece(){
   let rmp = Math.floor(Math.random() * Pieces.length)
   return new Piece(Pieces[rmp][0], Pieces[rmp][1]);
 }


let p = randomPiece();

function Piece(tetromino,color){
   this.tetromino = tetromino;
   this.color = color;
 this.tetrominoN = 0;
 this.activeTetromino = this.tetromino[this.tetrominoN]

  this.x=3;
  this.y=-1;
}

Piece.prototype.fill = function(color){
    for( r = 0; r < this.activeTetromino.length; r++){
        for(c = 0; c < this.activeTetromino.length; c++){
            if( this.activeTetromino[r][c]){
                drawSQ(this.x + c,this.y + r,color);
            }
        }
    }
}
Piece.prototype.draw = function(){
	p.fill(this.color)
 }

Piece.prototype.unDraw = function(){
   p.fill(emptSQ)
}

Piece.prototype.moveDown = function(){
  if(!this.collision(0,1,this.activeTetromino)){
	 this.unDraw();
	  this.y++;
     this.draw();	
  } else{
	  this.lock();
	  p = randomPiece();}

}

Piece.prototype.moveRight =function(){
	if(!this.collision(1,0,this.activeTetromino)){
	  this.unDraw();
	   this.x++;
	  this.draw();
	}
  }

  Piece.prototype.moveLeft = function(){
	if(!this.collision(-1,0,this.activeTetromino)){
	  this.unDraw();
	   this.x--;
	  this.draw();
	}
  }

 Piece.prototype.rotate = function(){
      let nextp = this.tetromino[(this.tetrominoN + 1)%this.tetromino.length];
      let kick =0;
	  if(this.collision(0,0,nextp)){
        if(this.x > COL/2 ){
         kick = -1;
	    }
	    else{kick = 1;}
	  }
		
	 if(!this.collision(kick,0,nextp)){
	 this.unDraw();
	   this.x= this.x + kick;  
	 this.tetrominoN = (this.tetrominoN + 1)%this.tetromino.length;
	   this.activeTetromino = this.tetromino[this.tetrominoN];
	 this.draw();}
   }

  Piece.prototype.lock = function(){
        for( r = 0; r < this.activeTetromino.length; r++){
			for(c = 0; c < this.activeTetromino.length; c++){
				if( !this.activeTetromino[r][c]){
					continue;
				}
				if(this.y + r < 0){
					alert('game over')
					gameOver = true;
					break;
				}

			board[this.y + r][this.x + c] = this.color;
			}
		}
		  for( r=0 ; r < ROW; r++){
          let fullRow = true;
         for( c=0 ; c < COL; c++){
			 fullRow = fullRow && (board[r][c] != emptSQ);
		 }
		    if(fullRow){
               for(y = r; y>1 ; y--){
                 for( c=0; c< COL; c++){
					 board[y][c] = board[y-1][c];
				 }
			   }
			   for(c = 0; c< COL; c++){
				   board[0][c] = emptSQ;
			   }
			
			   score += 10;
			}
		}
	  
		drawBoard();
		scoreElement.innerHTML = score;
    }


  Piece.prototype.collision = function(x,y,piece){
	for( r = 0; r < piece.length; r++){
        for(c = 0; c < piece.length; c++){
            if( !piece[r][c]){
                continue;
          }
		    let newX = this.x + c + x;
			let newY = this.y + r + y;
            
               if( newX < 0 || newX >= COL || newY >= ROW ){
				   return true;
			       }
                 
               if( newY < 0){
                    continue;
			      }
               if( board[newY][newX] != emptSQ ){
                    return true;
				  }
        }
     }
    return false;
  }
  


  document.addEventListener('keydown', CONTROL);
  function CONTROL(event){ 
    if(event.keyCode == 37){
        p.moveLeft();
	  }
	if(event.keyCode == 38){
		p.rotate();
	  }
	if(event.keyCode == 39){
	    p.moveRight();	
      }
	if(event.keyCode == 40){
		p.moveDown();
	  }

  }

let dropStart = Date.now();
let gameOver = false;
function drop(){
  let now = Date.now();
  if( (now - dropStart) > 1000){
	  p.moveDown();
	  dropStart = Date.now();
  }
  if(!gameOver){
  requestAnimationFrame(drop); }
  
}
drop()
