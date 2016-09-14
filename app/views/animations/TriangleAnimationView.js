import React, { Component } from 'react';
import { 
  Text, 
  View, 
  Image, 
  Animated, 
  Easing,
  Dimensions
} from 'react-native';

import Triangle from 'react-native-triangle';

export default class TriangleAnimationView extends Component {


  componentWillMount(){
    this.store = {
      triangleData: []
    }
    this.buildData();
  }

  componentDidMount(){ }

  componentWillUpdate(){
    this.buildData();
  }

  buildData(){

    var {height, width} = Dimensions.get('window');
    var scale = 0.4;
    var triangleWidth = 90*scale;
    var triangleHeight = 150*scale;
    var direction = "left";
    var widthIncrement = triangleWidth/2;
    var heightIncrement = triangleHeight/2;

    for( var x=-widthIncrement; x < width; x += widthIncrement){
      direction = (direction == "left") ? "right" : "left";
      for( var y=-heightIncrement; y < height; y += heightIncrement){
        // don't render every time so it feels more random
        var createTriangle = (Math.round(Math.random()*3)>2);
        if(createTriangle){
          var x2 = x;
          var y2 = y;
          this.store.triangleData.push({
            left: x2,
            top: y2,
            height: triangleHeight,
            width: triangleWidth,
            direction: direction,
            opacity: (Math.random()*0.02)
          });
        }
      }
    }
  }
  

  render(){
    var triangles = [];
    // 
    for(var i=0; i < this.store.triangleData.length; i++ ){
      var data = this.store.triangleData[i];
      var style = {
        opacity: data.opacity,
        top: data.top,
        left: data.left,
        position: "absolute"
      }
      //
      triangles.push(
        <Triangle
          key={i}
          style={ style }
          width={data.width}
          height={data.height}
          color={'#fff'}
          direction={data.direction} />
      );
    }

    return(
      <View>
        {triangles}
      </View>
    )
  }
}
