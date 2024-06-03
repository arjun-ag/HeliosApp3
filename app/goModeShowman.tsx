import { StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity, Animated } from 'react-native';
  import {useEffect, useState} from 'react';
  import { NativeStackNavigationProp } from '@react-navigation/native-stack';
  import { Text, View } from '@/components/Themed';
  import { Audio, AVPlaybackStatus } from 'expo-av';
  import Slider from '@react-native-community/slider';
  
  const {width, height} = Dimensions.get('window');
  
  type Props = {
    navigation: NativeStackNavigationProp<any>;
  };

  const GoModeShowmanScreen:React.FC<Props> = ({ navigation }) => {
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
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: true
    });
        const { sound: newSound } = await Audio.Sound.createAsync(
           require('../assets/audio/showman.mp3'),
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
        if (sound == null) {
          setPlaying(true);
          console.log('Happenign');
          await loadAndPlayAudio();
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
      </Animated.View>

                <TouchableOpacity onPress={() => navigation.navigate('goModeShowman')} activeOpacity={1}>
                <Image
                source={require('../assets/images2/showmanE.jpeg')}
                resizeMode="cover" 
                style={styles.img}/>
            </TouchableOpacity>
            <View style = {[{display: textMode ? 'none' : 'flex', backgroundColor:'white'}]}>
                    <Text style = {[styles.subText, styles.subTitle1]}>...</Text>
                    <Text style = {styles.titleText}>Showman</Text>
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
                    <TouchableOpacity onPress={() => navigation.navigate('goModeDream')}>
                        <Image source={require('../assets/images2/nextIcon.png')} style = {styles.nextIcon}/> 
                    </TouchableOpacity>
                </View>
            </View>
            <View style = {[{display: textMode ? 'flex' : 'none', backgroundColor:'white'}]}>
                <Text style = {[styles.subText, styles.article]}>Curtains Rise{'\n\n'}
It seems just so – a perfect normal steeped {'\n'}
In darkness. Now the curtain drooped withholds{'\n'}
Their razor gaze. No eyes can find me yet,{'\n'}
Nor change the strains that fill my eyes by seeing.{'\n'}
I stand alone. All thought mid-movement paused{'\n'}
Like splattered statues ‘cross my soul.{'\n'}
And up it goes: a swell pervades the hall.{'\n'}
A whispered hush and on I go to glares{'\n'}
Of floods diffused on wood. Blank stares,{'\n'}
A blinking storm of eyes does rush to meet{'\n'}
My quivered gut. The statues turn{'\n'}
To silence.{'\n'}
It seems but so – just me and you{'\n'}
For now, to share a moments few.{'\n\n'}
When Art is Made{'\n\n'}
Naught is all – unfailing silence pours in{'\n'}
Vacant thought; un-woken sleep a wakeless{'\n'}
Ruler self-absorbed in non-existence stands.{'\n'}
Lone, a wordless speech across itself from{'\n'}
Nothing bursts, to nothing turns for boundless{'\n'}
Self-existent joy.{'\n\n'}
Walkdown{'\n\n'}
Dimmed lights; applause collapses quick upon{'\n'}
Itself; and tumbles downward-spiraled heights{'\n'}
Until the pulse of everyday can rock{'\n'}
It gently to a halt – a quiet exhale.{'\n'}
But soon that spotlight flush begins to wane.{'\n'}
Invincibility bleeds in languid spurts{'\n'}
To gently wet the floor below.{'\n'}
Demented sinews hunch the spine that was upright.{'\n'}
No mask conceals me now.{'\n'}
And I as I do face the crowds,{'\n'}
Still smiling freedoms once enjoyed,{'\n'}
Remembering glory earlier felt...{'\n'}
Smile again, I tell myself,{'\n'}
Applause resides in you.{'\n'}
Curtains fall. 
            </Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('goMode')}>
              <Image source={require('../assets/images2/dice.png')} style={styles.diceImage} />
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
                <Text style = {[styles.textModeSub]}>verse</Text>
                <Text style = {styles.textModeTitle}>Showman</Text>
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
                    <Image source={require('../assets/images2/dice.png')} style={styles.textModeImg}/>
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
      fontSize : 12,
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
      fontSize: 16,
      fontStyle: 'normal',
      left: width*0.27,
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
        position: 'relative',
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
      },
      article: {
        width: width/1.4,
        marginLeft: width/8,
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
      margin:20
    },
      playPauseButtonContainer: {
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 5,
      },
      buttonText: {
        color: 'white',
        fontSize: 20,
      }
  });
  
export default GoModeShowmanScreen;
