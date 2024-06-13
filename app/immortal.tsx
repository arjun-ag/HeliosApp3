// import { StyleSheet, Dimensions, StatusBar, TouchableOpacity, Image } from 'react-native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { Video, ResizeMode } from 'expo-av';
// import Slider from '@react-native-community/slider';
// import { useState, useEffect, useRef } from 'react';
// import * as ScreenOrientation from 'expo-screen-orientation';

// //   import Animated, {useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate} from 'react-native-reanimated';
  
//   const {width, height} = Dimensions.get('window');
  
//   type Props = {
//     navigation: NativeStackNavigationProp<any>;
//   };

//   interface VideoMethods {
//     playAsync: () => Promise<void>;
//     pauseAsync: () => Promise<void>;
//     setPositionAsync: (position: number) => Promise<void>;
//     }


//   const ImmortalScreen:React.FC<Props> = ({ navigation }) => {
    
//     useEffect(() => {
//         const lockOrientation = async () => {
//           await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
//         };
    
//         lockOrientation();
    
//         return () => {
//             ScreenOrientation.unlockAsync();
//         };
//       }, []);
      
    
//     const videoRef = useRef<VideoMethods | null>(null);
//     const [status, setStatus] = useState<any>({});
//     const [subtitle, setSubtitle] = useState(false)

//     const handleSubtitle = () => {
//         setSubtitle(!subtitle);
//     }

//     const handlePlayPause = () => {
//         if (videoRef.current) {
//             status.isPlaying ? videoRef.current.pauseAsync() : videoRef.current.playAsync();
//         };
//     }

//     const onSliderValueChange = (value: number) => {
//         if (videoRef.current) {
//             videoRef.current.setPositionAsync(value);
//         }
//     };

//     return (
//         <View style = {styles.container}>
//             <StatusBar hidden={true} />
//             <Video
//                 source={require('../assets/video/honk.mp4')}
//                 rate={1.0}
//                 volume={1.0}
//                 ref={videoRef as any}
//                 isMuted={false}
//                 isLooping
//                 style={styles.video}
//                 useNativeControls= {false}
//                 onPlaybackStatusUpdate={setStatus}
//                 resizeMode={ResizeMode.COVER}
//             />

//             <TouchableOpacity onPress={handlePlayPause}>
//                 <View style={[styles.controls, {opacity: status.isPlaying ? 0 : 100}]}>
//                     <View style = {{width:width, flexDirection:'row', height:height/10, backgroundColor: 'transparent'}}>
//                         <TouchableOpacity onPress={handleSubtitle}>
//                             <Image source={require('../assets/images2/subtitle.png')} style={styles.subTitleImage}/>
//                         </TouchableOpacity>
//                         <Text style = {styles.textModeSub}>motion pictures</Text>
//                         <Text style = {styles.textModeTitle}>One Wayward Honk</Text>
//                         <TouchableOpacity onPress={() => {navigation.navigate('stayMode');}}>
//                             <Image source={require('../assets/images2/dice.png')} style={styles.diceImage}/>
//                         </TouchableOpacity>
//                     </View>
                
//                     <Image source = {status.isPlaying ? require('../assets/images2/transparent.png') : require('../assets/images2/play.png')} style = {styles.playPauseButton}/>
                    
//                         <Text style= {styles.startTime}>{new Date(status.positionMillis || 0).toISOString().substr(14, 5)}</Text>
//                         <Text style= {styles.endTime}>{new Date(status.durationMillis || 0).toISOString().substr(14, 5)}</Text>
//                     <Slider
//                     style={styles.slider}
//                     value={status.positionMillis}
//                     minimumValue={0}
//                     maximumValue={status.durationMillis}
//                     onValueChange={onSliderValueChange}
//                     minimumTrackTintColor="#FFFFFF"
//                     maximumTrackTintColor="#000000"
//                     thumbTintColor="transparent" />

//                 </View>
//             </TouchableOpacity>

//         </View>

//     );    
//   }
  
//   const styles = StyleSheet.create({
//     subTitleImage: {
//         // width: width,   
//         resizeMode: 'contain',
//         left:width/12,
//         top:height/15,
//         backgroundColor: 'transparent',
//     },
//     textModeSub: {
//         fontSize : 18,
//         fontFamily: 'Reross',
//         color: '#FFA600',
//         left:width/2.8,
//         top:height/40,
//         backgroundColor: 'transparent',
//     },
//     textModeTitle: {
//         fontSize: 40,
//         fontStyle: 'normal',
//         // color: '#000',
//         backgroundColor:'transparent', 
//         letterSpacing: 0.23,
//         fontFamily: 'Bodoni',
//         lineHeight: 40,
//         fontWeight: 'bold',
//         top:height/10,
//         left:width/10,
//         color:'#fff'
        
//     },
//     diceImage: {
//         resizeMode: 'contain',
//         left:width/3.9,
//         backgroundColor: 'transparent',
//       },
//     playPauseButton: {
//       width: width/10, 
//       height: height/10,
//       marginLeft:width/2.4,
//       justifyContent: 'center',
//       alignItems: 'center',
//       top:height/3,
//       backgroundColor: 'transparent',
//     //   color:'#000'
//     },
//     controls: {
//         backgroundColor:'transparent', 
//         width: '100%',
//         padding: 10,
//         height:height,
//         alignContent:'center',
//         // justifyContent:'center',
//         // flex:1
//       },
//       slider: {
//         width: '90%',
//         top:height/1.95,
//         left:width/18
//       },
//     video: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         bottom: 0,
//         right: 0,
//         resizeMode: 'cover',
//       },
//       overlay: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0,0,0,0.5)',
//       },
//       title: {
//         color: 'white',
//         fontSize: 24,
//         marginBottom: 20,
//         backgroundColor: 'transparent',
//       },
//     buttonText: {
//         color: 'white',
//         fontSize: 18,
//         backgroundColor: 'transparent',
//       },
//     subText : {
//       fontSize: 18,
//       fontStyle: 'normal',
//       textAlign: 'center',
//       color: '#000',
//       letterSpacing: -0.24,
//       alignItems: 'center',
//       fontFamily: 'Reross',
//       lineHeight: 35,
//       backgroundColor: 'transparent',
//     },
//     article: {
//       width: width/1.4,
//       marginLeft: width/8,
//       marginBottom:10,
//       fontSize: 20, 
//       fontFamily: 'Caslon',
//       textAlign: 'left',
//       lineHeight: 35,
//       backgroundColor: 'transparent',
//     },
//     subTitle1: {
//       width : width,
//       marginBottom:10,
//       marginTop: height/35,
//       fontWeight: 'bold',
//       color: '#E37b00', 
//     },
//     subTitle2: {
//       fontSize : 14,
//       lineHeight:20,
//       width:width/1.2,
//       marginLeft:width/12,
//       marginBottom: 20
//     },
//     stickyHeader: {
//         height: height/20,
//         backgroundColor: 'transparent',
//         // justifyContent: 'flex-end',
//         position: 'relative',  // Ensures absolute positioning is relative to the header
//         alignItems: 'center',
//         zIndex: 1,
//     },
//     container: {
//       flex: 1,
//       backgroundColor: 'transparent',
//     },
//     scrollContainer: {
//       flex:1
//     },
//     startTime: {
//         fontFamily: 'Bodoni',
//         fontSize:15,
//         top:height/1.75,
//         left: width/13,
//         color: '#fff',
//     }, 
//     endTime: {
//         fontFamily: 'Bodoni', 
//         fontSize:15,
//         left:width/1.15,
//         top:height/1.9,
//         color: '#fff'
//     },
//   });
  
// export default ImmortalScreen;


import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Video } from 'expo-av';

const VideoPlayer = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your actual CloudFront URL
    const cloudFrontUrl = 'https://d3imy5bwh3ajmv.cloudfront.net/output/honk.mp4';
    setVideoUrl(cloudFrontUrl);
    setLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Video
          source={{ uri: videoUrl }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          shouldPlay
          useNativeControls
          style={styles.video}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: 320,
    height: 180,
  },
});

export default VideoPlayer;
