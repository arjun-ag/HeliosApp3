import { StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity, Animated } from 'react-native';
  import {useEffect, useState} from 'react';
  import { NativeStackNavigationProp } from '@react-navigation/native-stack';
  import { Text, View } from 'react-native';
  import { Audio, AVPlaybackStatus } from 'expo-av';
  import Slider from '@react-native-community/slider';


//   import Animated, {useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate} from 'react-native-reanimated';
  
  const {width, height} = Dimensions.get('window');
  
  type Props = {
    navigation: NativeStackNavigationProp<any>;
  };

  const GoModeDreamScreen:React.FC<Props> = ({ navigation }) => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [playing,  setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(1);
    const [textMode, setTextMode] = useState(false);

    const handleTextMode = () => {
        setTextMode(!textMode)
    }
    async function loadAndPlayAudio() {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        // interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        shouldDuckAndroid: true,
        // interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: true
    });
        const { sound: newSound } = await Audio.Sound.createAsync(
           require('../assets/audio/dream.m4a'),
           { shouldPlay: playing }
        );
        setSound(newSound);
        await newSound.playAsync();
        newSound.setOnPlaybackStatusUpdate(updateProgress);
          }
    
      useEffect(() => {
        return sound
          ? () => {
              console.log('Unloading Sound');
              sound.unloadAsync(); 
            }
          : undefined;
      }, [sound]);
    
      const handlePlayPause = async () => {
        if (!sound) {
          await loadAndPlayAudio();
          setPlaying(true);
        } else {
          if (playing) {
            await sound.pauseAsync();
          } else {
            await sound.playAsync();
          }
          setPlaying(!playing);
        }
      };

      const updateProgress = (playbackStatus: AVPlaybackStatus) => {
        if (playbackStatus.isLoaded) {
            const duration = playbackStatus.durationMillis ?? 1; // fallback to 1 to avoid division by zero later
            setProgress(playbackStatus.positionMillis);
            setDuration(duration);
        }
    };

      const handleSliderComplete = async (value: number) => {
        if (sound) {
            await sound.setPositionAsync(Math.floor(value));
            if (!playing) {
                await sound.playAsync();
                setPlaying(true);
            }
        }
    };

    

    const formatTime = (number: number) => {
        const totalSeconds = Math.floor(number / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        let finalMinute = ''
        let finalSecond = ''
        if (minutes < 10) {
        finalMinute =  '0' + minutes.toString();
        } else {
            finalMinute =  minutes.toString();
        }
        if (seconds < 10) {
            finalSecond =  '0' + seconds.toString();
        } else {
            finalSecond =  seconds.toString();
        }
        return `${finalMinute}:${finalSecond}`;
    };

    
    return (
    <View style = {styles.container}>
        <ScrollView style={styles.scrollContainer} stickyHeaderIndices={[0]}>
        <Animated.View style={[styles.stickyHeader, {
          shadowOpacity: 3,
          shadowRadius: 5,
          shadowColor: '#000',
          shadowOffset: { height: 0, width: 0 },
          elevation: 2 // for Android shadow
        }]}>
        <Image
          source={require('../assets/images2/logo.png')} // Replace with your image URL or local source
          style={styles.headerImage}
        />
        {/* <View style={[styles.lineHeader]} /> */}
      </Animated.View>

                <TouchableOpacity onPress={() => navigation.navigate('goModeDream')} activeOpacity={1}>
                <Image
                source={require('../assets/images2/honk.jpeg')} // Replace with your own image URL
                resizeMode="cover" // Cover the entire area of the View
                style={styles.img}/>
            </TouchableOpacity>
            <View style = {[{display: textMode ? 'none' : 'flex', backgroundColor:'white'}]}>
                    <Text style = {[styles.subText, styles.subTitle1]}>impressions</Text>
                    <Text style = {styles.titleText}>Dream</Text>
                {/* <Text>Status: {status.isLoaded ? (status.isPlaying ? 'Playing' : 'Paused') : 'Loading...'}</Text> */}
                <Slider
                    style={styles.slider}
                    value={progress}
                    minimumValue={0}
                    maximumValue={duration}
                    onSlidingComplete={handleSliderComplete}
                    minimumTrackTintColor="#000"
                    maximumTrackTintColor="#000"
                    thumbTintColor='#444' 
                    // thumbTintColor="transparent"  // Make the thumb invisible

                    // thumbImage={require('../assets/images2/pause.png')}
                />
                <View >
                    <Text style= {styles.startTime}>{formatTime(progress)}</Text>
                    <Text style= {styles.endTime}>{formatTime(duration)}</Text>
                </View>
                {/* <Text>{`Progress: ${Math.round((progress / duration) * 100)}%`}</Text> */}
                <View style= {[{flexDirection:'row', alignContent:'center', justifyContent:'center', backgroundColor:'white'}]}>
                    <TouchableOpacity onPress={handleTextMode}>
                        <Image source={require('../assets/images2/readIcon.png')} style = {styles.readIcon}/> 
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.playPauseButtonContainer} onPress={handlePlayPause}>
                        <Image source = {playing ? require('../assets/images2/pause.png') : require('../assets/images2/play.png')} style = {styles.playPauseButton}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('goModeAutumn')}>
                        <Image source={require('../assets/images2/nextIcon.png')} style = {styles.nextIcon}/> 
                    </TouchableOpacity>
                </View>
            </View>
            <View style = {[{display: textMode ? 'flex' : 'none', backgroundColor:'white'}]}>
                <Text style = {[styles.subText, styles.article]}>I turned twenty-one this year. I remember sitting in the park, on a summer afternoon, when the sun first passes through the clouds, then a canopy of trees, before it gleams on your cheek, reading Yeats’ ‘The Second Coming’. It felt too idyllic a day to be engulfed by any blood-dimmed tide of anarchy. Yet somehow, I believe, I understood then for the first time what it meant to forsake one’s innocence – a warm glint in the eyes that fades suddenly into stony silence. Our world has a way of manifesting the unexpected, of dangling our hopes and dreams by a most fragile thread of trust. Sometimes the thread snaps. Sometimes we are broken. Yeats, however, goes still further. His emanation of the deity is not a kind and kindred spirit, but a great and terrible beast with a “gaze as blank and pitiless as the sun” – that naked moonscape of the Northern Himalayas on a cloudless desert night – stark and wide and forceful and detached. I saw, only a few nights ago, an old and grizzly man reclined against a lonely lamppost with a saxophone. He was free. Lilting to the contours of a musical dream. He played all night, sometimes fiercely over the blaring honks of cars with drunken men and women rushing home, sometimes alone. I sat there by the lamppost for a while, looking sometimes at him, sometimes at the orangish glow from thin wisps of clouds against the moon. Perhaps our times demand the insistence of a solitary voice if it is to be heard. Or they demand our strength of character – our obstinance upon an ideal. Or they demand nothing at all. But I would like to find some remnants of that slouching beast, that glorious deity, in my soul – so I can plant my feet firmly enough to take an unrelenting stand for something good.
            </Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('goMode')}>
              <Image
                source={require('../assets/images2/dice.png')}
                style={styles.diceImage}
              />
            </TouchableOpacity>
            

        </ScrollView>

        <Animated.View style = {[styles.textModeBar, {display: textMode ? 'flex' : 'none', width:width ,
            shadowOpacity: 1,
            shadowRadius: 3,
            shadowColor: '#000',
            shadowOffset: { height: 0, width: 0 },
            elevation: 2 }
        ]}>
            <View style = {{width:width*0.2,  backgroundColor:'white'}}>
                <TouchableOpacity onPress={handlePlayPause}>
                    <Image source = {playing ? require('../assets/images2/pause.png') : require('../assets/images2/play.png')} 
                            style = {styles.textModePlayPauseButton}/>
                </TouchableOpacity>
            </View>

            <View style = {{width:width*0.7, alignContent:'center', justifyContent:'center',  backgroundColor:'white'}}>
                <Text style = {[styles.textModeSub]}>impressions</Text>
                <Text style = {styles.textModeTitle}>Dream</Text>
                <Slider
                    style={styles.textModeSlider}
                    value={progress}
                    minimumValue={0}
                    maximumValue={duration}
                    onSlidingComplete={handleSliderComplete}
                    minimumTrackTintColor="#000"
                    maximumTrackTintColor="#808080"
                    thumbTintColor="transparent" 
                    // thumbImage={require('../assets/images2/pause.png')}
                />
            </View>
            <View style = {{width:width*0.15,  backgroundColor:'white'}}>
                <TouchableOpacity onPress={handleTextMode}>
                    <Image
                            source={require('../assets/images2/dice.png')} // Replace with your image URL or local source
                            style={styles.textModeImg}
                        />
                    </TouchableOpacity>
            </View>
                
        </Animated.View>
    </View>

        );    
  }
  
  
  
  const styles = StyleSheet.create({
    textModePlayPauseButton: {
      width: width/14, 
      height: height/25,
      margin:20,
      left:20,
    },
    textModeBar: {
        width:width,
        height: height/10,
        flexDirection:'row', 
        justifyContent:'center',
        backgroundColor:'white'
    },
      textModeSlider: {
        width: width*0.56,
        height: 40,
        left:width*0.06
    },
    textModeSub: {
      fontSize : 11,
      fontFamily: 'Reross',
      color: '#FFA600',
      left: width*0.3,
    },
    textModeImg: {
        width: height/15, 
        height: height/15,
        borderRadius: height/40,
        overflow: 'hidden',
        right:width*0.06,
        top:height*0.017
    },
    textModeTitle: {
      fontSize: 18,
      fontStyle: 'normal',
        left: width*0.31,
      color: '#000',
      letterSpacing: 0.23,
      fontFamily: 'Bodoni',
      lineHeight: 25,
      fontWeight: '900',
    },

    readIcon : {
        width: width/9, 
      height: height/20,
      margin:30
    },
    nextIcon: {
        width: width/9, 
      height: height/20,
      margin:30,
    },
    stickyHeader: {
        height: height/8,
        backgroundColor: 'white',
        position: 'relative',  // Ensures absolute positioning is relative to the header
        alignItems: 'center',
        zIndex: 1,
        
      },
      headerImage: {
        width: 40,  
        bottom: 30,       
        height: 30,  
        resizeMode: 'contain',
        paddingTop:height/4
      },
    startTime: {
        fontFamily: 'Bodoni',
        marginTop:-30,
        fontSize:15,
        left: width/25,
        color: '#000'
        // backgroundColor:'white'
    }, 
    endTime: {
        fontFamily: 'Bodoni', 
        fontSize:15,
        marginTop:-20,
        left:width/1.15,
        color: '#000'
    },
    diceImage: {
        width: width,  
        // bottom: -30,       
        // height: 90,  
        resizeMode: 'contain',
        bottom:10
      },
      slider: {
        width: width/1.1,
        height: 40,
        left: width/25,
        marginBottom: 20
    },
    subText : {
        fontSize: 18,
        fontStyle: 'normal',
        textAlign: 'center',
        color: '#000',
        letterSpacing: -0.24,
        alignItems: 'center',
        fontFamily: 'Reross',
        lineHeight: 35,
        // fontWeight: '400',
      },
      article: {
        width: width/1.4,
        marginLeft: width/8,
        // textAlign :'left',
        marginBottom:10,
        fontSize: 20, 
        fontFamily: 'Caslon',
        textAlign: 'left',
        lineHeight: 35,
      },
    subTitle1: {
      width : width,
      marginBottom:0,
      marginTop: height/75,
      fontFamily: 'Reross',
      color: '#FFA600'
    },
    subTitle2: {
      fontSize : 14,
      lineHeight:20,
      width:width/1.2,
      marginLeft:width/12,
      marginBottom: 20
    },
    img: {
      width: width, 
      height: height*0.4,
      marginBottom:10,
    },
    titleText: {
      fontSize: 30,
      fontStyle: 'normal',
      textAlign: 'center',
      width: width/3,
      left: width/3,
      color: '#000',
      letterSpacing: 0.23,
      alignItems: 'center',
      fontFamily: 'Bodoni',
      lineHeight: 35,
      fontWeight: '900',
      marginBottom:20,
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    scrollContainer: {
      flex:1
    },
    playPauseButton: {
        width: width/9, 
      height: height/20,
    //   marginBottom:50,
      margin:20
    },
      playPauseButtonContainer: {
        justifyContent:'center',
        alignItems: 'center',
        // padding: 10,
        borderRadius: 5,
      },
      buttonText: {
        color: 'white',
        fontSize: 20,
      }
  });
  
export default GoModeDreamScreen;
