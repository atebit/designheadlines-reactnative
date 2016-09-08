import React, { Component } from 'react';
import { Text, View, Image, Animated, Easing } from 'react-native';

export default class Loading extends Component {

  componentWillMount(){
    this.state = {
      fadeAnim: new Animated.Value(0),
      dropAnim: new Animated.Value(-300),
    }
  }

  componentDidMount(){
    Animated.timing(
      this.state.fadeAnim,
      {toValue:1, duration:3000, delay:1000}
    ).start();

    Animated.timing(
      this.state.dropAnim,
      {toValue:0, duration:500, ease:Easing.quad}
    ).start();
  }

  render(){

    var logoWidth = 146/2;
    var logoHeight = 232/2;

    var logoShadowWidth = 443/2;
    var logoShadowHeight = 839/2;


    var style = {
      container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: "#2b2b2b",  
      },
      line1: {
        fontFamily: 'Avenir',
        textAlign: 'center',
        color: '#fff',
        backgroundColor: "transparent", 
      },
      line2: {
        color: '#9c74b3',
        backgroundColor: "transparent", 
      },

      logo: {
        position:"relative",
        width: logoWidth,
        height: logoHeight,
        top: this.state.dropAnim
      },

      logoShadow: {
        position:"absolute",
        width: logoShadowWidth,
        height: logoShadowHeight,
        left:0,
        top:20,
        opacity: this.state.fadeAnim
      },

      logoContainer: {
        marginBottom: 20
      },

      loadingText: {
        alignItems: 'center',
      },

      adjust: {
        alignItems: 'center',
        color: '#fff',
        opacity:0.6,
        backgroundColor: "transparent", 
        fontSize: 10,
        marginTop: 40
      }
    }

    return(
      <View style={ style.container }  >

        <View style={ style.logoContainer } >
          <Animated.Image source={require('../../assets/logo_shadow.png')} style={ style.logoShadow } />
          <Animated.Image source={require('../../assets/logo.png')} style={ style.logo } />
        </View>

        <View style={ style.loadingText }  >
          <Text style={ style.line1 }>
            loading design industry news
          </Text>
          <Text style={ style.line1, style.line2}>
            for you to peruse
          </Text>

          <Text style={ style.adjust }>
            Made with ♥ by Adjust Creative
          </Text>
        </View>
      </View>
    )
  }
}
