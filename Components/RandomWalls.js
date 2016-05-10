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

import Walls from './Walls.js';
import AuthorProfile from './AuthorProfile.js';
import AboutAuthor from './AboutAuthor.js';


export default class App extends Component{
  render(){
    return (
    <NavigatorIOS
        ref="nav"
        initialRoute={{
          component: Walls,
          title: 'Walls',
          rightButtonTitle: 'About',
          onRightButtonPress: () =>{
            this.refs.nav.push({
              title: 'About Me',
              component: AboutAuthor,
              navigationBarHidden: false
            })
          }
        }}
        style={{flex: 1}}
       />

    )
  }
}
