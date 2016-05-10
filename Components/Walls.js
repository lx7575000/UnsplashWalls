import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicatorIOS,
  Dimensions,
  PanResponder,
  CameraRoll, // Add this
  AlertIOS // and this
} from 'react-native';

import Utils from '../Util/Utils.js';
import ProgressHUD from './ProgressHUD.js';
import AuthorProfile from './AuthorProfile.js';


const NUM_WALLPAPERS = 5;
const {width, height} = Dimensions.get('window');
const DOUBLE_TAP_DELAY = 300; // milliseconds
const DOUBLE_TAP_RADIUS = 20;


// 第三方组件
import Swiper from 'react-native-swiper';
import NetworkImage from 'react-native-image-progress';
import Progress from 'react-native-progress';
import ShakeEvent from 'react-native-shake-event-ios';

export default class Walls extends Component{
  constructor(props){
    super(props);
    this.state = {
      wallsJSON: [],
      isLoading: true,
      isHudVisible: false,
    };
    this.imagePanResponder = {};
    this.prevTouchInfo = {
      prevTouchX: 0,
      prevTouchY: 0,
      prevTouchTimeStamp: 0
    };
    this.currentWallIndex = 0;

    // 如果不进行该定义，函数中的this指向的是PanResponder
    this.handlePanResponderGrant = this.handlePanResponderGrant.bind(this);
    // 如果不进行该定义，函数中的this指向的是Swiper
    this.onMomentumScrollEnd = this.onMomentumScrollEnd.bind(this);
  }

  componentWillMount(){
    this.imagePanResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderTerminate
    });

    ShakeEvent.addEventListener('shake', () => {
      this.initialize();
      this.fetchWallsJSON();
    });

    this.fetchWallsJSON();
  }

  componentDidMount(){

  }

  initialize(){
    this.setState({
      wallsJSON: [],
      isLoading: true,
      isHudVisible: false
    });
    this.currentWallIndex = 0;
  }

  // fetchWallsJSON 获取图片链接
  // 因为需要在组件渲染之前获得数据，所以我们要在componentDidMount中执行它
  fetchWallsJSON(){
    let url = 'http://unsplash.it/list';
    fetch(url)
          .then(responseData => responseData.json())
          .then(jsonData => {
            let randomIds = Utils.uniqueRandomNumbers(NUM_WALLPAPERS, 0, jsonData.length);
            let walls = [];
            randomIds.forEach(id => {
              walls.push(jsonData[id]);
            });
            this.setState({isLoading: false, wallsJSON: walls});
          })
          .catch(err => console.log(`Fetch error ${err}`))
          .done();

  }

  isDoubleTap(currentTouchTimeStamp, {x0, y0}){
    let {prevTouchX, prevTouchY, prevTouchTimeStamp} = this.prevTouchInfo;
    let dt = currentTouchTimeStamp - prevTouchTimeStamp;
    return (dt < DOUBLE_TAP_DELAY && Utils.distance(prevTouchX, prevTouchY, x0, y0) < DOUBLE_TAP_RADIUS);
  }

  handleStartShouldSetPanResponder(e, gestureState) {
    return true;
  }
  handlePanResponderGrant(e, gestureState) {
    let currentTouchTimeStamp = Date.now();
    if(this.isDoubleTap(currentTouchTimeStamp, gestureState))
      this.saveCurrentWallpaperToCameraRoll();
    this.prevTouchInfo = {
      prevTouchX: gestureState.x0,
      prevTouchY: gestureState.y0,
      prevTouchTimeStamp: currentTouchTimeStamp
    };
  }
  handlePanResponderEnd(e, gestureState) {
    console.log('Finger pulled up from the image');
  }
  handlePanResponderTerminate(e, gestureState){
    console.log('PanResponder has been terminated ...');
  }

  onMomentumScrollEnd(e, state, context){
    this.currentWallIndex = state.index;
  }

  saveCurrentWallpaperToCameraRoll() {
    let {wallsJSON} = this.state;
    let currentWall = wallsJSON[this.currentWallIndex];
    let currentWallURL = `http://unsplash.it/${currentWall.width}/${currentWall.height}?image=${currentWall.id}`;
    this.setState({isHudVisible: true})

    CameraRoll.saveImageWithTag(currentWallURL)
              .then((data) => {
              this.setState({isHudVisible: false})
              AlertIOS.alert(
                'Saved',
                'Wallpaper successfully saved to Camera Roll',
                [
                  {text: 'High 5!', onPress: () => console.log('OK Pressed!')}
                ]
              );

            })
              .catch(err => {
                console.log('Error saving to camera roll ' + err);
              })
              .done();

}



  renderLoadingMessage(){
    return (
      <View style={styles.isLoading}>
        <ActivityIndicatorIOS
          animating={true}
          color={"#fff"}
          size="large"
          style={{margin: 15}}
        />
        <Text style={{fontSize: 14, color: '#fff'}}>
          Contacting Unsplash.
        </Text>
      </View>
    )
  }

  renderResults(){
    let {wallsJSON, isLoading, isHudVisible} = this.state;
    if(!isLoading)
    return (
      <View style={{flex: 1, marginBottom: 100}}>
        <Swiper
          dot={<View style={{backgroundColor: 'rgba(255, 255, 255, .4)', width: 8, height: 8, borderRadius: 10, marginLeft: 3,marginRight: 3,marginTop: 3,}} />}
          dot={<View style={{backgroundColor: 'rgba(255, 255, 255, 1)', width: 13, height: 13, borderRadius: 7, marginLeft: 7,marginRight: 7,marginTop: 7,}} />}
          loop={false}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
          index={this.currentWallIndex}
        >
          {wallsJSON.map((wallpaper, index) => {
            return (
              <View key={index+wallpaper.id} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <NetworkImage
                  source={{uri: `https://unsplash.it/${wallpaper.width}/${wallpaper.height}?image=${wallpaper.id}`}}
                  indicator={Progress.Circle}
                  style={styles.wallpaperImage}
                  indicatorProps={{
                        color: 'rgba(255, 255, 255)',
                        size: 60,
                        thickness: 7
                      }}

                  {...this.imagePanResponder.panHandlers}
                >
                <Text style={styles.label}>Photo by</Text>
                    <Text style={styles.label_authorName}
                      onPress={() => {
                        this.props.navigator.push({
                          title: wallpaper.author,
                          component: AuthorProfile,
                          passProps: {wallpaper}
                        })
                      }}>
                      {wallpaper.author}
                    </Text>
                </NetworkImage>
              </View>
            )
          })}
        </Swiper>
        <ProgressHUD width={width} height={height} isVisible={isHudVisible}/>
      </View>
    )
  }

  render(){
    let {isLoading } = this.state;
    if(isLoading){
      return this.renderLoadingMessage();
    }else{
      return this.renderResults();
    }
  }
}

const styles = StyleSheet.create({
  isLoading: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  wallpaperImage:{
    flex: 1,
    width: width,
    height: height,
    backgroundColor: '#000'
  },
  label: {
    position: 'absolute',
    color: '#fff',
    fontSize: 13,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 2,
    paddingLeft: 5,
    bottom: 50,
    left: 20,
    width: width / 2,
  },
  label_authorName: {
    position: 'absolute',
    color: '#fff',
    fontSize: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 2,
    paddingLeft: 5,
    bottom: 71,
    left: 20,
    fontWeight: 'bold',
    width: width / 2,
  }
})
