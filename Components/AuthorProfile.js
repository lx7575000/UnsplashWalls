import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS,
  Image,
  WebView
} from 'react-native';

export default class AuthorProfile extends Component{
  render(){
    let {wallpaper} = this.props;
    return (

        <WebView
          startInLoadingState={true}
          source={{uri: wallpaper.author_url}}
          style={{
            flex: 1
          }}
        />

    )
  }
}
