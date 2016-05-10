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

export default class AboutAuthor extends Component{
  render(){
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{textAlign: 'center', fontSize: 20}}>
          <Text style={{fontWeight: 'bold'}}>Author:</Text>
          Narcissus Liu
        </Text>
        <Text style={{textAlign: 'center', fontSize: 16}}>
          <Text style={{fontWeight: 'bold'}}>Email:</Text>
          liu_narcisus@163.com
        </Text>
      </View>
    )
  }
}
