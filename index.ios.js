/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react';
import { AppRegistry, Navigator, StyleSheet, Text, View } from 'react-native';

import DesignNewsPost from './app/views/DesignNewsPost';
import Loading from './app/views/Loading';

class DesignNews extends Component {

  store: {}


  componentWillMount(){
    // data object to mirror state...
    this._appData = {}
    this._appData.feedData = [];
    this._appData.feedUrls = [
      "http://blog.invisionapp.com/feed/",
      "http://feeds.feedburner.com/CreativeBloq?format=xml",
      "http://http://feedpress.me/uxbooth",
      "http://feeds.feedburner.com/designmodo",
      "http://feeds.feedburner.com/uxmovement",
      "https://dribbble.com/shots/popular.rss",
      "https://www.smashingmagazine.com/feed/",
      "https://feeds.feedburner.com/fastcodesign/feed",
    ];
    this._appData.feedsLoaded = 0;
    this._appData.feedsTotal = this._appData.feedUrls.length;
  }


  componentDidMount(){
    for( var f in this._appData.feedUrls ){
      this.fetchFeed( this._appData.feedUrls[f] );
    }
  }

  fetchFeed( url ) {
    // if (!(/^http:\/\//.test(url))) {
    //   url = "http://" + url;
    // }
    var GOOGLE_FEED_API_URL = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&q=';
    // var url = GOOGLE_FEED_API_URL + encodeURIComponent(url);
    var google_url = GOOGLE_FEED_API_URL + url;
    fetch( google_url )
      .then( (response) => response.json())
      .then( (responseData) => {
        this.onFeedLoaded( responseData.responseData )
      })
      .done()
  }




  onFeedLoaded( responseData ){
    this._appData.feedsLoaded += 1;
    // if the data came through, put it in a list
    if( responseData ){
      // console.log("feed loaded", responseData.feed.title);
      var entries = responseData.feed.entries;
      for(var e in entries){
        var entry = entries[e];
        entry.publisherTitle = responseData.feed.title;
        this._appData.feedData.push( entry );
      } 
    }
    // when all feeds are loaded (or error'd)..
    if( this._appData.feedsLoaded == this._appData.feedsTotal ){
      // sort them by published date..
      this._appData.feedData.sort(function(entry1, entry2) {
        return Date.parse(entry1.publishedDate) - Date.parse(entry2.publishedDate);
      });
      // set the state with the new feeds
      this.store.feedData = this._appData.feedData;

      this.setState( this.store ); 
    }
  }

  render() {

    if( ! this.state ){
      return <Loading />
    }

    var data = this.state.feedData;

    var mainStyle = {
      backgroundColor: "#000"
    }


    return (
      <Navigator

        style={mainStyle}

        initialRoute={{ 
          index: 0,
          title: data[0].title, 
          body: data[0].contentSnippet,
          publisher: data[0].publisherTitle
        }}

        configureScene={(route, routeStack) =>
          Navigator.SceneConfigs.FloatFromRight
        }

        renderScene={(route, navigator) => {

          return(
            <DesignNewsPost 

              publisher={route.publisher}

              title={route.title}
              body={route.body}

              onForward={() => {
                const nextIndex = route.index + 1;

                // need logic to go back to begining of loop... or tell user that there's no more feeds..

                // console.log(navigator)

                if( data[nextIndex] ){
                  navigator.push({
                    index: nextIndex,
                    title: data[nextIndex].title,
                    body: data[nextIndex].contentSnippet,
                    publisher: data[nextIndex].publisherTitle
                  })
                }else{
                  navigator.jumpTo( navigator.props.initialRoute )
                }

              }}

              onBack={() => {
                if(route.index > 0){
                  navigator.pop();
                }
              }}
            />
          )
        }}
      />
    );
  }
}

AppRegistry.registerComponent('DesignNews', () => DesignNews); 









