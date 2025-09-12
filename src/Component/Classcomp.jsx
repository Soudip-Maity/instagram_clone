import { Button } from '@mui/material';
import React, { Component } from 'react'

export default class Classcomp extends Component {
constructor(){
    super();
    console.log("construster");
    this.state={
        count:0
    }
}
  render() {
  console.log("render")

    return (
      <div>
        <h1>{this.state.count}</h1>
        <Button onClick={()=>this.setState({count:this.state.count+1})}>increase</Button>
      </div>
    )
  }
}
