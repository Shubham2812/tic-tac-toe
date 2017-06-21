import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  p1name = "Player 1";  
  p2name = "Player 2";  
  
  constructor() { }

  ngOnInit() {
  }

  turn = false;
  start = false;
  p1_avatar;
  p2_avatar;

  imageSelectP1(event, p1_image){
    if(!this.start)
  	{ this.p1_avatar = event.target.src.substr(length - 7);
  	  p1_image.style.display = 'block';
  	}
  }

  imageSelectP2(event, p2_image){
    if(!this.start)
  	{ this.p2_avatar = event.target.src.substr(length - 7);
  	  p2_image.style.display = 'block';
  	}
  }

  begin(p1, p1_name, p1_photo, p1_enter, p2_enter, zero, cross){
  	if(!this.start)
	{ 	this.start = true;
		p1.style.boxShadow = '0px 0px 60px grey';
		p1.style.webkitTransform = "scale(1.2)";
		
		p1_enter.style.display = 'none';
		p2_enter.style.display = 'none';

		zero.style.display = 'block'
		cross.style.display = 'block'
	}
  }

  reset(p1, p2, row1, row2, row3, p1_enter, p2_enter, trophy1, trophy2, zero, cross, p1_image, p2_image){
  	p1.style.boxShadow = '0px 0px 0px grey';
  	p1.style.webkitTransform = "none";
  	p2.style.boxShadow = '0px 0px 0px grey';
  	p2.style.webkitTransform = "none";

  	p1_enter.style.display = 'block';
	p2_enter.style.display = 'block';

	trophy1.style.display = 'none';
	trophy2.style.display = 'none';

	zero.style.display = 'none';
	cross.style.display = 'none';

	p1_image.style.display = 'none';
	p2_image.style.display = 'none';

  	for(let i=0; i<3; i++)
  	{
  		row1.children[i].firstElementChild.style.display = 'none';
  		row1.children[i].lastElementChild.style.display = 'none';

  		row2.children[i].firstElementChild.style.display = 'none';
  		row2.children[i].lastElementChild.style.display = 'none';

  		row3.children[i].firstElementChild.style.display = 'none';
  		row3.children[i].lastElementChild.style.display = 'none';
  		this.start = false;
  	}

  	resetGrid();
  }

  onClick(event, element, p1, p2, trophy1, trophy2){
  	if(this.start)
	{  	if(this.turn)
	  	{	event.target.children[0].style.display = 'block';
	  		event.target.children[1].style.display = 'none';
	  		
	  		p1.style.webkitTransform = "scale(1.2)";
			p1.style.boxShadow = '0px 0px 60px grey';
	  		p2.style.webkitTransform = "none";
	  		p2.style.boxShadow = '0px 0px 0px grey';
	  		
	  		if(checkGrid(event.target.id, this.turn))
	  		{ console.log("A Won");
	  		  trophy2.style.display = 'block';
	  		  p1.style.webkitTransform = "none";
	  		  p1.style.boxShadow = '0px 0px 0px grey';
	  		  this.start = false;
	  		}
	  	}
	  	else
	  	{	event.target.children[1].style.display = 'block';
	  		event.target.children[0].style.display = 'none';

	  		p2.style.webkitTransform = "scale(1.2)";
			p2.style.boxShadow = '0px 0px 60px grey';
	  		p1.style.webkitTransform = "none";
	  		p1.style.boxShadow = '0px 0px 0px grey';

	  		if(checkGrid(event.target.id, this.turn))
	  		{ console.log("B Won");
	  		  trophy1.style.display = 'block';
	  		  p2.style.webkitTransform = "none";
	  		  p2.style.boxShadow = '0px 0px 0px grey';
	  		  this.start = false;
	  		}
	  	}
	  	this.turn = !this.turn;
	}

  }
}

let grid: number[][] = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

function checkGrid(id, turn){
	let i = id[0];
	let j = id[1];
	if(grid[i][j] == 0 && turn)
		grid[i][j] = 2;
	else if(grid[i][j] == 0 && !turn)
		grid[i][j] = 1;
	else{
		console.log('invalid')
	}

	console.log(grid);
	
	for(let i=0; i<3; i++)
	{
		if(grid[i][0] != 0 && grid[i][0] == grid[i][1] && grid[i][1] == grid[i][2])
		return true;
	}

	for(let i=0; i<3; i++)
	{
		if(grid[0][i] != 0 && grid[0][i] == grid[1][i] && grid[1][i] == grid[2][i])
		return true;
	}

	if(grid[0][0] != 0 && grid[0][0] == grid[1][1] && grid[1][1] == grid[2][2])
	return true;

	if(grid[0][2] != 0 && grid[0][2] == grid[1][1] && grid[1][1] == grid[2][0])
	return true;

return false;
}

function resetGrid(){
	for(let i=0; i<3; i++)
	{ for(let j=0; j<3; j++)
	  grid[i][j] = 0;
	}
}
