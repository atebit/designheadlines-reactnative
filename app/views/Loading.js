import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Loading extends Component {

  render(){


    this.styles = {
      container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#2b2b2b",  
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
        <Text style={ this.styles.instructions}>
          Loading...
        </Text>
      </View>
    )
  }
}
