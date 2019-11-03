import React, {useEffect, useState} from 'react';
import { ScrollView, StyleSheet, View, Animated } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default function LinksScreen() {
  const [widthCheckListLeft] = useState(new Animated.Value(0))
  const [widthCheckListRight] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(widthCheckListLeft, {
          toValue: 165,
          duration: 1000,
        }),
        Animated.timing(widthCheckListRight, {
          toValue: 250,
          duration: 1000,
        }),
        Animated.timing(widthCheckListRight, {
          toValue: 0,
          duration: 1000,
        }),
        Animated.timing(widthCheckListLeft, {
          toValue: 0,
          duration: 1000,
        }),
      ]) 
    ).start()
  })

  return (
    <ScrollView style={styles.container}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
       <View style={{marginTop: 200, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{ width: 90, height: 1, transform: [{ rotate: '45deg' }],}}>          
            <Animated.View
              style={{
                // position: 'absolute',
                // transform: [{ rotate: '45deg' }],
                width: widthCheckListLeft,
                height: 1,
                borderBottomColor: 'red',
                borderBottomWidth: 5,
              }} />
          </View>
          <View style={{ width: 250, height: 1, transform: [{ rotate: '-45deg' }]}}>
            <Animated.View
              style={{
                // position: 'absolute',
                // transform: [{ rotate: '-45deg' }],
                width: widthCheckListRight,
                height: 1,
                borderBottomColor: 'red',
                borderBottomWidth: 5,
            }} />
          </View>
        </View>
       </View>
      {/* <View style={styles.triangleCorner}></View> */}
      {/* <View style={styles.triangleCornerLayer}></View>
      <View style={styles.triangleCorner1}></View> */}
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: 'Links',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  triangleCorner: {
    position: 'absolute',
    top: 105,
    left: 0,
    width: 300,
    height: 100,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 50,
    borderTopWidth: 80,
    borderRightColor: 'blue',
    borderTopColor: 'gray'
  },
  triangleCorner1: {
    position: 'absolute',
    top: 100,
    left: 0,
    width: 130,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 50,
    borderTopWidth: 90,
    borderRightColor: 'transparent',
    borderTopColor: 'green'
  },
  triangleCornerLayer: {
    position: 'absolute',
    top: 107,
    left: 0,
    width: 297,
    height: 100,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 47,
    borderTopWidth: 75,
    borderRightColor: 'transparent',
    borderTopColor: 'white'
  }
});
