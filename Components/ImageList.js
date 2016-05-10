import React, {
  Component,
  StyleSheet,
  ListView,
  Text,
  View,
  NavigatorIOS,
  Image,
  TouchableHighlight
} from 'react-native';

const datas = [
  'row1',
  'row2',
  'row3',
  'row4',
  'row5',
  'row6'
]

export default class ImageList extends Component{
  constructor(props){
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource : ds.cloneWithRows(datas)
    }
  }
  _renderRow(rowData){
    return(
      <TouchableHighlight underlayColor={'red'}>
        <View style={styles.row}>
          <Text style={styles.text}>
            {rowData}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }

  render(){
    return (
      <ListView
        contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
      />
    )
  }
}

const styles = StyleSheet.create({
  list:{
    marginTop: 20,
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
    marginTop: 5
  },
  row: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    margin: 3,
    width: 110,
    height: 100,
    backgroundColor: '#f6f6f6',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc'
  }
})
