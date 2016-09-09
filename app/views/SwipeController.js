import React, { Component } from 'react';
import { 
  View, 
  Animated, 
  PanResponder, 
  Dimensions, 
  AlertIOS 
} from 'react-native';
import DesignNewsPost from './DesignNewsPost';
import SafariView from 'react-native-safari-view';



export default class SwipeController extends Component {

  componentWillMount(){
    
    this.csname = "SwipeController";
    this.viewStackData = {};

    this.store = {
      currentPage: -2,
      cx:0, 
      // cy:0, // current
      dx:0, 
      dy:0, // distance
      ox:0, 
      // oy:0, // offset
      timestamps: {
        start:0, 
        end:0
      },
      isAnimating: false,
    }


    // console.log("will mount", this.props.feedData)
    // set intial view data.
    this.updateViewStackData( true );

    // set up the swipe functions
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,


      onPanResponderGrant: (evt, gestureState) => {
        // console.log("gesture start", this.store.ox, gestureState.dx);
        this.store.dx = 0;
        this.store.timestamps.start = evt.nativeEvent.timestamp;
      },


      onPanResponderMove: (evt, gestureState) => {
        if( ! this.store.isAnimating ){
          console.log(this.store.currentPage)
          // console.log("gesture move", this.store.ox, gestureState.dx);
          this.store.dx = gestureState.dx;
          this.store.dy = gestureState.dy;
          // don't go past the first page
          if( this.store.currentPage <= -1 ){
            if( this.store.dx > 20 ){
              this.store.dx = 20;
            }
          }
          // don't go past the last page
          // console.log(this.store.currentPage, this.props.feedData.length )
          // if( this.store.currentPage == this.props.feedData.length-1){
          if( this.viewStackData.current ){
           if( this.viewStackData.current.lastPost ){
              if( this.store.dx < 20 ){
                this.store.dx = -10;
              }
            } 
          }
          this.updateProps();

        }
      },


      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        if( ! this.store.isAnimating ){
          // this.store.dx = gestureState.dx;

          this.store.timestamps.end = evt.nativeEvent.timestamp;
            // just a tap really..
          var fast = (this.store.timestamps.end - this.store.timestamps.start) < 350;
          var notFar = ((Math.abs(gestureState.dx) < 2) && (Math.abs(gestureState.dy) < 2));

          if( fast && notFar){

            var {height, width} = Dimensions.get('window');
            var inLowerHalf = (evt.nativeEvent.pageY > (height/2));
            var inMiddleThird = ((evt.nativeEvent.pageX > ((width/3)*1)) && (evt.nativeEvent.pageX < ((width/3)*2)));

            // console.log(evt.nativeEvent.pageX, ((width/3)*1) )
            if( inLowerHalf && inMiddleThird ){
              this.onPressButton();
            }
          }else{
            this.onDragEnd(); 
          }
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
        if( ! this.store.isAnimating ){
          // console.log("gesture canceled", this.store.ox);
          // this.store.dx = gestureState.dx;
          this.store.timestamps.end = evt.timestamp;
          this.onDragEnd();
        }
      }
    });
  }


  onPressButton(){

    if( this.viewStackData.current.link.length ){
      SafariView.show({
        url: this.viewStackData.current.link
      });
    }

  }



  updateProps(){
    this.forceUpdate();
  }



  onDragEnd(){
    if( Math.abs(this.store.dx) < 200 ){
      this.store.isAnimating = true
      this.animateLetGo(); 
    }else{
      this.store.isAnimating = true
      this.animateFinish(); 
    }
  }

  animateLetGo(){
    if( this.store.isAnimating ){
      const destinationX = 0;
      const ease = 0.7;
      // update the stored value
      this.store.dx = this.store.dx * ease + destinationX * (1-ease);
      // 
      if( Math.abs(this.store.dx) <= 0.1 ){
        // animation complete
        this.store.ox = this.store.ox + this.store.dx; 
        this.store.isAnimating = false;
      }else{
        // continue animating
        this.updateProps();
        requestAnimationFrame(() => {this.animateLetGo()});
      }
    }
  }

  animateFinish(){
    if( this.store.isAnimating ){
      // get direction we were headed..
      var isDirectionForward = ( this.store.dx < 0) ? true : false;

      var {height, width} = Dimensions.get('window');

      const destinationX = isDirectionForward ? -width : width; 
      const ease = 0.6;
      // update the stored value
      this.store.dx = this.store.dx * ease + destinationX * (1-ease);
      // 
      if( Math.abs(destinationX - this.store.dx) <= 0.1 ){
        // console.log("animation complete")
        // animation complete
        // this.store.dx = 0;

        this.store.ox = this.store.ox + this.store.dx; 
        this.store.isAnimating = false;
        // update the viewStack
        this.updateViewStackData( isDirectionForward );
        // update
        // this.updateProps();
      }else{
        // continue animating
        this.updateProps();
        requestAnimationFrame(() => {this.animateFinish()});
      }
    }
  }


  updateViewStackData( isDirectionForward ){

    var totalPages = this.props.feedData.length;

    if(isDirectionForward){
      this.store.currentPage = this.store.currentPage + 1;
      this.viewStackData = {
        back: this.props.feedData[ this.store.currentPage ],
        current: this.props.feedData[ this.store.currentPage + 1 ],
        forward: this.props.feedData[ this.store.currentPage + 2 ]
      };
    }else{
      this.store.currentPage = this.store.currentPage - 1;
      this.viewStackData = {
        back: this.props.feedData[ this.store.currentPage ],
        current: this.props.feedData[ this.store.currentPage + 1 ],
        forward: this.props.feedData[ this.store.currentPage + 2 ]
      };

    }

    // console.log(this.store .currentPage)
  }


  componentDidMount(){
    // console.log("COMPONENT MOUNTED!!!!!")
    var {height, width} = Dimensions.get('window');
    this.store.dx = width;
    this.store.isAnimating = true;
    this.animateIntro();
  }

  animateIntro(){
    if( this.store.isAnimating ){
      // console.log("animate intro")
      const destinationX = 0;
      const ease = 0.9;
      // update the stored value
      this.store.dx = this.store.dx * ease + destinationX * (1-ease);
      // 
      if( Math.abs(this.store.dx) <= 0.1 ){
        // animation complete
        this.store.ox = this.store.ox + this.store.dx; 
        this.store.isAnimating = false;
      }else{
        // continue animating
        this.updateProps();
        requestAnimationFrame(() => {this.animateIntro()});
      }
    }

  }



  render(){

    this.styles = {
      container:{
        // backgroundColor: "#2b2b2b",
        flex: 1 
      },
    }

    var cx = this.store.dx;
    var {height, width} = Dimensions.get('window');
    var cLeft = (cx < 0) ? cx : cx;
    var cRotate = (cx < 0) ? String( -(cx*0.2))+"deg" : String( -(cx*0.2)) +"deg";

    var currentStyle = {
      position: 'absolute',
      width: width,
      height: height,
      left: cLeft,
      top: Math.abs(cx*0.1),
      opacity: 1 - Math.abs(cx*0.004),
      transform: [
        {scale: 1 - Math.abs(cx*0.0008)},

        {perspective: 800},
        // {translateZ: -Math.abs(cx)},
        {rotateY: cRotate},
        // {rotate: String(cx*0.02)+"deg" },
        {rotate: "0deg" },
      ]
    }

    var forwardStyle = {
      position: 'absolute',
      width: width,
      height: height,
      left: width+cx,
      top: 0,
      opacity: 1,
      transform: [
        {scale: 1},
        {rotate: "0deg" },
      ]
    }


    var backStyle = {
      position: 'absolute',
      width: width,
      height: height,
      left: (cx-width),
      top: 0,
      opacity: 1,
      transform: [
        {scale: 1},
        {rotate: "0deg" },
      ]
    }

    
    var backView = <View />;
    if( this.viewStackData.back ){
      backView = 
        <Animated.View style={ backStyle }>
          <DesignNewsPost 
            publisher={ this.viewStackData.back.publisherTitle } 
            title={this.viewStackData.back.title} 
            body={this.viewStackData.back.contentSnippet}
            bgcolor={this.viewStackData.back.bgcolor} />
        </Animated.View>; 
    }

    var currentView = 
      <Animated.View style={ currentStyle }>
        <DesignNewsPost 
          publisher={this.viewStackData.current.publisherTitle } 
          title={this.viewStackData.current.title} 
          body={this.viewStackData.current.contentSnippet}
          bgcolor={this.viewStackData.current.bgcolor} />
      </Animated.View>;

    var forwardView = <View />;
    if( this.viewStackData.forward ){
      forwardView = 
        <Animated.View style={ forwardStyle }>
          <DesignNewsPost 
            publisher={this.viewStackData.forward.publisherTitle } 
            title={this.viewStackData.forward.title} 
            body={this.viewStackData.forward.contentSnippet} 
            bgcolor={this.viewStackData.forward.bgcolor} />
        </Animated.View>;
      }


      // console.log(this.viewStackData.current)


    return(
      <View style={ this.styles.container }  {...this.panResponder.panHandlers} >

        {backView}
        {currentView}
        {forwardView}

      </View>
    )
  }
}