import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Loading extends Component {

  render(){

    var colors = ["#462446","#B05F6D","#EB6B56","#47B39D","#E6567A","#BF4A67","#47C9AF","#337ab7"];
    var r = Math.floor(Math.random()*colors.length);
    var bgcolor = colors[r]

    this.styles = {
      container:{
        flex: 1 
      },
    }

    return(
      <View style={ this.styles.container }  >

        // the stuff here..

      </View>
    )
  }
}
