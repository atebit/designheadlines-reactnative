import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

export default class DesignNewsPost extends Component {
  


  render(){

    var styles = {
      container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: this.props.bgcolor,
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
      },
      body: {
        fontFamily: 'Avenir',
        textAlign: 'center',
        color: '#fff',
        marginBottom: 5,
      },
      readmoreContainer: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff',
        marginTop: 40,
        opacity: 0.9
      },
      readmore: {
        fontFamily: 'Avenir',
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 20,
        paddingRight: 20,
      },
    }

    var body = this.props.body;
    body = body.replace(/[^\011\012\015\040-\177]/g, function(x) {
        return '&#' + x.charCodeAt(0) + ';'
    })


    body = body.replace(/\s+/g,' ').trim();
    body = body.replace(new RegExp("&nbsp;", "g"), "");

    // console.log("--> new props <--");
    // console.log( this.props.title );
    // console.log( entities.decode(this.props.title) )

    var title = entities.decode(this.props.title);
    title = title.replace(/[^\011\012\015\040-\177]/g, function(x) {
        return '&#' + x.charCodeAt(0) + ';'
    })

    return(
      <View style={ styles.container }  >

        <Text style={ styles.eybrow}>
          { this.props.publisher }
        </Text>

        <Text style={ styles.headline}>
          {this.props.title}
        </Text>

        <Text style={ styles.body}>
          { body }
        </Text>

        <View style={ styles.readmoreContainer }>
          <Text style={ styles.readmore }>
            READ MORE
          </Text>
        </View>

      </View>
    )
  }
}
