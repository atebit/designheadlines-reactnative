import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback, PanResponder } from 'react-native';

export default class DesignNewsPost extends Component {


  componentWillMount(){

    var colors = ["#462446","#B05F6D","#EB6B56","#47B39D","#E6567A","#BF4A67","#47C9AF","#337ab7"];
    var r = Math.floor(Math.random()*colors.length);
    var bgcolor = colors[r]

    this.styles = {
      container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: bgcolor,
        padding:20  
      },
      eybrow: {
        fontFamily: 'Avenir',
        textAlign: 'center',
        color: '#fff',
        marginBottom: 5,
        opacity: 0.6
      },
      headline: {
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        fontSize: 40,
        lineHeight:45,
        color: "#fff",
        textAlign: 'center',
        margin: 10,
      },
      body: {
        fontFamily: 'Avenir',
        textAlign: 'center',
        color: '#fff',
        marginBottom: 5,
      },
      readmore: {
        fontFamily: 'Avenir',
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 7,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#fff',
        marginTop: 40,
        opacity: 0.9
      },
    }

  }

  render(){

    return(
      <View style={ this.styles.container }  >

        <Text style={ this.styles.eybrow}>
          { this.props.publisher }
        </Text>

        <Text style={ this.styles.headline}>
          {this.props.title}
        </Text>

        <Text style={ this.styles.body}>
          { this.props.body }
        </Text>

        <Text style={ this.styles.readmore }>
          READ MORE
        </Text>

      </View>
    )
  }
}
