import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS,
  Image,
} from 'react-native';

import RandomWalls from './RandomWalls.js';
import AboutAuthor from './AboutAuthor.js';
import Icon from '../Assets/Icon.js';

import ImageList from './ImageList.js';

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      selected: 'Random',
    }
  }
  render(){
    return (
    <TabBarIOS
      tintColor={'white'}
      barTintColor={'darkslateblue'}
    >
      <TabBarIOS.Item
        title="Random5"
        icon={{uri: Icon.walls, scale: 3}}
        selected={this.state.selected === 'Random'}
        onPress={() => {
          this.setState({
            selected: 'Random',
          })
        }}
      >
        <RandomWalls />
      </TabBarIOS.Item>
      <TabBarIOS.Item
        systemIcon="history"
        selected={this.state.selected === 'About'}
        onPress={() => {
          this.setState({
            selected: 'About'
          })
        }}
      >
      {/* 这处准备加入ListView，然后根据Unsplash.it的内容导入具体图片*/}
          <AboutAuthor />
      </TabBarIOS.Item>
      <TabBarIOS.Item
        systemIcon="bookmarks"
        selected={this.state.selected === 'ImageList'}
        onPress={() =>{
          this.setState({
            selected: 'ImageList',
          });
        }}
      >
      <ImageList />
      </TabBarIOS.Item>
    </TabBarIOS>
    )
  }

}
