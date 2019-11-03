import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { MonoText } from '../components/StyledText';

const { width } = Dimensions.get('window')

const Breathing = (props) => {
  const [fadeAnim] = useState(new Animated.Value(1))
  const [fadeOuter] = useState(new Animated.Value(1))
  const [fadeMid] = useState(new Animated.Value(1))
  const [fadeCore] = useState(new Animated.Value(1))
  const [outerLayer] = useState(new Animated.Value(10))
  const [midLayer] = useState(new Animated.Value(10))
  const [coreLayer] = useState(new Animated.Value(10))

  React.useEffect(() => {

    Animated.loop(
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1800
        }),
        Animated.timing(coreLayer, {
          toValue: 40,
          duration: 700
        }),
        Animated.timing(midLayer, {
          toValue: 100,
          duration: 800
        }),
        Animated.timing(outerLayer, {
          toValue: 150,
          duration: 1000
        }),

      ])
    ).start()

  }, [])
  return (
    <Animated.View
      style={{
        width: outerLayer,
        height: outerLayer,
        borderRadius: outerLayer,
        backgroundColor: '#9afeb2',
        opacity: fadeAnim,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Animated.View
        style={{
          width: midLayer,
          height: midLayer,
          borderRadius: midLayer,
          backgroundColor: '#7acc8e',
          opacity: fadeAnim,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Animated.View
          style={{
            width: coreLayer,
            height: coreLayer,
            borderRadius: coreLayer,
            backgroundColor: '#5b996b',
            opacity: fadeAnim,
          }}
        >
          {props.children}
        </Animated.View>

      </Animated.View>

    </Animated.View>
  )
}

export default class HomeScreen extends React.Component {
  constructor(){
    super()
    this.state = {
      headerHeight: new Animated.Value(200),
      positionMenu: new Animated.Value(48),
      scrollY: new Animated.Value(0),
    }
  }
  componentDidMount(){
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.positionMenu, {
          toValue: 40,
          duration: 1000
        }),
        Animated.timing(this.state.positionMenu, {
          toValue: 48,
          duration: 1000
        }),
      ]),
    ).start()
  }
  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange:[0, 250],
      outputRange:[250, 100],
      extrapolate:'clamp'
    })
    const fontSize = this.state.scrollY.interpolate({
      inputRange:[0, 250],
      outputRange:[42, 24],
      extrapolate:'clamp'
    })
    const leftHome = this.state.scrollY.interpolate({
      inputRange:[0, 250],
      outputRange:[width/2-45, 52],
      extrapolate:'clamp'
    })
    const bottomHome = this.state.scrollY.interpolate({
      inputRange:[0, 250],
      outputRange:[10, 21],
      extrapolate:'clamp'
    })
    const imageSize = this.state.scrollY.interpolate({
      inputRange:[0, 250],
      outputRange:[100, 32],
      extrapolate:'clamp'
    })
    const rightImagePosition = this.state.scrollY.interpolate({
      inputRange:[0, 250],
      outputRange:[width/2-50, 21],
      extrapolate:'clamp'
    })
    const topImagePosition = this.state.scrollY.interpolate({
      inputRange:[0, 250],
      outputRange:[68, 48],
      extrapolate:'clamp'
    })
    return (
      <View style={styles.container}>
        <Animated.View
          style={{height: headerHeight, backgroundColor: 'skyblue'}}
        >
          <Animated.View style={{ position: 'absolute', top: this.state.positionMenu, left: 16}}>
            <Ionicons size={32} name="ios-menu" />
          </Animated.View>
          <Animated.View style={{position: 'absolute', top: topImagePosition, right: rightImagePosition,}}>
            <Animated.Image
              source={{ uri: 'https://together.ucsf.edu/sites/together.ucsf.edu/files/inline-images/humaaan-ended_0.png'}}
              style={{width: imageSize, height: imageSize}}
            />
          </Animated.View>
          <Animated.View style={{ position: 'absolute', bottom: bottomHome, left: leftHome }}>
            <Animated.Text style={{fontSize: fontSize}}>Home</Animated.Text>
          </Animated.View>
        </Animated.View>
        <ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: this.state.scrollY}}}
          ])}
        >
          <View style={{height: 2000, backgroundColor: 'whitesmoke'}}>
            <View style={{alignItems: 'center', paddingTop: 200, justifyContent: 'center', height: 200}}>
              <Breathing>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
                  <Text style={{textAlign: 'center'}}>Carousel</Text>
                </TouchableOpacity>
              </Breathing>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFE',
  }
});
