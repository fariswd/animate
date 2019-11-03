import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native'

const { width } = Dimensions.get('window')

const boxWidth = width-50
const boxHeight = 120
const marginBox = 5
const fullBox = boxWidth+(marginBox*2)
const totalPage = 3

export default class ProfileScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      page: 0,
      pages: (new Array(totalPage)).fill(true),
      loop: true,
    }
  }

  calculateNextPage(){
    if(this.state.page + 1 >= totalPage){
      return 0
    } else {
      return this.state.page + 1
    }
  }

  autoMove(){
    setTimeout(() => {
      if (this.state.loop && this.grantedToAuto) {
        this.scrollRef.scrollTo({ x: (this.calculateNextPage() * (fullBox - 20)), y: 0, animated: true })
        this.autoMove()
      } else {
        this.autoMove()
      }
    }, 3000)
  }

  componentDidMount() {
    console.log(width-60)
    this.grantedToAuto = true
    this.autoMove()
  }
  componentWillUnmount(){
    this.grantedToAuto = false
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={{paddingTop: 16}} />
        <ScrollView
          ref={scrollRef => this.scrollRef = scrollRef}
          scrollEventThrottle={16}
          horizontal
          pagingEnabled
          snapToInterval={fullBox}
          snapToAlignment={"center"}
          showsHorizontalScrollIndicator={false}
          style={{flexDirection: 'row'}}
          onScroll={(scrollProps) => {
            const contentPage = scrollProps.nativeEvent.contentOffset.x / fullBox
            this.setState({page: Math.ceil(contentPage)})
            // console.log(Math.ceil(page))
          }}
          >
          <View
            style={{
              width: boxWidth,
              height: boxHeight,
              backgroundColor: 'skyblue',
              margin: marginBox,
              borderRadius: 5,
            }}
          />
          <View
            style={{
              width: boxWidth,
              height: boxHeight,
              backgroundColor: 'yellow',
              margin: marginBox,
              borderRadius: 5,
            }}
          />
          <View
            style={{
              width: boxWidth,
              height: boxHeight,
              backgroundColor: 'green',
              margin: marginBox,
              borderRadius: 5,
            }}
          />
        </ScrollView>
        <View style={{flexDirection: 'row', marginLeft: 3}}>
          {this.state.pages.map((p, i) => {
            return (
              <View
                key={`pages-${i}`}
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: this.state.page == i ? 'pink' : 'lightgrey',
                  borderRadius: 10/2,
                  borderWidth: 0.5,
                  borderColor: '#999',
                  margin: 2,
                }}
              />
            )
          })}
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  }
})

ProfileScreen.navigationOptions = {
  title: 'Carousel',
}