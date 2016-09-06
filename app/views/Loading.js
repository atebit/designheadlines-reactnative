import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Loading extends Component {

  render(){

    var colors = ["#462446","#B05F6D","#EB6B56","#47B39D","#E6567A","#BF4A67","#47C9AF","#337ab7"];
    var r = Math.floor(Math.random()*colors.length);
    var bgcolor = colors[r]

    this.styles = {
      container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: bgcolor,  
      },
      welcome: {
        fontFamily: 'Avenir',
        fontSize: 40,
        color: "#fff",
        textAlign: 'center',
        margin: 10,
      },
      instructions: {
        fontFamily: 'Avenir',
        textAlign: 'center',
        color: '#fff',
        marginBottom: 5,
      },
    }

    return(
      <View style={ this.styles.container }  >
        <Text style={ this.styles.welcome}>
          DesignNews
        </Text>
        <Text style={ this.styles.instructions}>
          Loading...
        </Text>
      </View>
    )
  }
}
