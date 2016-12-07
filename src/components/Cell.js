import React, { Component, PropTypes } from 'react';

import style from '../css/main.css';


export default class Cell extends Component {
  constructor(props,context){
	  super(props,context);
	  this.state = {
			  selCls:"",point:this.props.point
	  };
  }
  select(){
	  this.setState({selCls:style.sel});
	  return this.props.point;
  }
  deSelect(){
	  
	  this.setState({selCls:"",point:0});
  }
  getValue(key){return this.props[key]}
  render () {
	  
    return (
    		<div className={style.cell +" "+this.state.selCls+" "+(this.state.point==1?style.point:"")}>{this.props.value}</div>
    );
  }
}

Cell.propTypes = {
		up: React.PropTypes.number.isRequired,
		left: React.PropTypes.number.isRequired,
		down: React.PropTypes.number.isRequired,
		right: React.PropTypes.number.isRequired,
		value: React.PropTypes.number.isRequired,
};