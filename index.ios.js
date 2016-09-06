/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react';
import { AppRegistry, Navigator, StyleSheet, Text, View } from 'react-native';

import SwipeController from './app/views/SwipeController';
import Loading from './app/views/Loading';

class DesignNews extends Component {

  componentWillMount(){
    // data object to mirror state...
    this.store = {}
    this.store.feedData = [];
    this.store.feedUrls = [
      "http://blog.invisionapp.com/feed/",
      "http://feeds.feedburner.com/CreativeBloq?format=xml",
      "http://http://feedpress.me/uxbooth",
      "http://feeds.feedburner.com/designmodo",
      "http://feeds.feedburner.com/uxmovement",
      "https://dribbble.com/shots/popular.rss",
      "https://www.smashingmagazine.com/feed/",
      "https://feeds.feedburner.com/fastcodesign/feed",
    ];
    this.store.feedsLoaded = 0;
    this.store.feedsTotal = this.store.feedUrls.length;
  }


  componentDidMount(){
    for( var f in this.store.feedUrls ){
      this.fetchFeed( this.store.feedUrls[f] );
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
    this.store.feedsLoaded += 1;
    // if the data came through, put it in a list
    if( responseData ){
      // console.log("feed loaded", responseData.feed.title);
      var entries = responseData.feed.entries;
      for(var e in entries){
        var entry = entries[e];
        // the background color
        var colors = ["#462446","#B05F6D","#EB6B56","#47B39D","#E6567A","#BF4A67","#47C9AF","#337ab7"];
        var r = Math.floor(Math.random()*colors.length);
        entry.bgcolor = colors[r];
        // publisher name
        entry.publisherTitle = responseData.feed.title;
        this.store.feedData.push( entry );
      } 
    }
    // when all feeds are loaded (or error'd)..
    if( this.store.feedsLoaded == this.store.feedsTotal ){
      // sort them by published date..
      this.store.feedData.sort(function(entry1, entry2) {
        return Date.parse(entry1.publishedDate) - Date.parse(entry2.publishedDate);
      });

      this.setState( this.store ); 
    }
  }



  render() {

    if( ! this.state ){
      return(
        <Loading />
      ) 
    }else{
      return (
        <SwipeController feedData={this.store.feedData} />
      );
    }
  }
}

AppRegistry.registerComponent('DesignNews', () => DesignNews); 









