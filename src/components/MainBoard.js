import React, { Component, PropTypes } from 'react';
import Cell from './Cell';

import style from '../css/main.css';


export default class MainBoard extends Component {
 
  constructor(props,context){
	super(props,context);
	this.state={row:20,column:20,totalPoint:0,"message":""};
	this.selected=null;
	this.randoms = this.getRandom(1,400);
	this.direction = 'right';
  }
  getRandom(startRange,endRange){
	  var nums =[];
	  for (var i = 0; i < 40; i++) {
		  nums.push(Math.floor((Math.random() * endRange) + startRange));
	  }
	  return nums;
  }
  getCells(){
	  //console.log(this.state.row);
	  var randoms = this.randoms;
	  var cells= [],chk=false;
	  for (var i = 0; i < this.state.column; i++) {
		  var tempCells =[];
		  for(var j=0; j<this.state.row;j++){
			  var value = i+j*this.state.column;
				var top= j==0 ? -1: value-this.state.column,
					right= i == this.state.column-1 ?-1:value+1 ,
					bottom= j == this.state.row-1?-1:value+this.state.column,
					left= i==0?-1:value-1;
				
				tempCells.push((<Cell key={value} point={randoms.indexOf(value) >-1?1:0} ref={"cell-"+value} value={value} left={left} right={right} up={top} down={bottom}/>))
		  }
		  cells.push((<div key={"vRow-"+i} style={{width:60,float:'left'}}>{tempCells}</div>));
	  }
	 
	  return cells;
  }
  componentDidMount(){
	  document.addEventListener("keydown",this.setDirection.bind(this));
	  this.selected = this.refs["cell-1"];
	  this.refs["cell-1"].select();
	 
  }
  startGame=()=>{
	  var _this = this;
	  this.gameThread = setInterval(function(){_this.walk();}, 200);
  }
  stopGame=()=>{
	  clearInterval(this.gameThread); 
  }
  pauseGame(){
	  clearInterval(this.gameThread);
  }
  setDirection(){
	  var key = arguments[0].keyIdentifier;
	  var direction = key.toLowerCase();
	  if(this.isValid(direction))
		  this.direction = direction;
	  else
		  console.log("invalid direction...........");
  }
  isValid(direction){
	  var obj={
			  left:'right',up:'down',down:'up',right:'left'
	  }
	  
	  return !(this.direction == obj[direction]);
  }
  walk(){
	  
	  var value = this.selected.getValue(this.direction);
	  if(value >=0){
		  this.selected.deSelect();
		  this.selected = this.refs["cell-"+value];
		  var point = this.selected.select();
		  if(point >0){
			  this.setState({totalPoint:this.state.totalPoint+point});
		  }
	  }else{
		  this.stopGame();
		  this.setState({message:"GAME OVER....."});
	  }
  }
  
  render () {
    return (
    		<div>
    		<div className={style["control-menu"]}><button onClick={this.startGame}>Start</button><button onClick={this.stopGame}>Stop</button></div>
    		{this.getCells()}
    		<span>Total Point: {this.state.totalPoint}</span><br/>
    		<span>{this.state.message}</span>
    		</div>
    		
    );
  }
}
