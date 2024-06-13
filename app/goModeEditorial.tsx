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

  const GoModeEditorialScreen:React.FC<Props> = ({ navigation }) => {
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
           require('../assets/audio/editorial.m4a'),
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

                <TouchableOpacity onPress={() => navigation.navigate('goModeEditorial')} activeOpacity={1}>
                <Image
                source={require('../assets/images2/manifestoE.jpeg')} // Replace with your own image URL
                resizeMode="cover" // Cover the entire area of the View
                style={styles.img}/>
            </TouchableOpacity>
            <View style = {[{display: textMode ? 'none' : 'flex', backgroundColor:'white'}]}>
                    <Text style = {[styles.subText, styles.subTitle1]}>editorial</Text>
                    <Text style = {styles.titleText}>The Essential Manifesto</Text>
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
                    <TouchableOpacity onPress={() => navigation.navigate('goModeDream')}>
                        <Image source={require('../assets/images2/nextIcon.png')} style = {styles.nextIcon}/> 
                    </TouchableOpacity>
                </View>
            </View>
            <View style = {[{display: textMode ? 'flex' : 'none', backgroundColor:'white'}]}>
                <Text style = {[styles.subText, styles.article]}>I will answer one question - what is the essence of this publication; in other words, the question of what this publication will grow to become.{'\n\n'}      I remember as a seven year old, lying down on my bed, on the ground floor of our house, staring out at bright peepal leaves glazed by the tropical sunrise of my childhood, wondering what it might be like to hold a conversation with Chandragupta or Napoleon or Lakshmibai; wondering about what that wild and unshackled glint in their eyes might reveal. Most of my time was spent in the company of books that told the great stories of their legendary exploits. Reading Will Durant’s “The Greatest Minds and Ideas of All Time” in high school, I could not help but be so thoroughly convinced by the idea that the impetus, for all our marches through the muck and on towards a shimmering hope that lingers draped upon the horizon, has always been an enlightened general or prophet, or king or queen. And yet, no matter how wise my seventeen year old self believed himself to be, he could not be much further from the truth. {'\n\n'}      We are not, you see, subscribed blindly to the altar of great men and women – no matter how much that appears to be the case. I refuse that our predicament be either one of spineless apathy or greasy sycophancy. That cannot be why we flock to strong leaders. Within the soul of each human being, I am certain, is a whispering voice that speaks the truth – whether that voice is drowned by the tempests of wanton thought, or amplified into action, is another matter altogether. The very presence of that voice indicates, to me at any rate, that beneath the furious sloshing of our imperfections, we are, in our own uniqueness, perfect beings shackled by our own ignorance. To calm the waters, still the great seas within ourselves until they are purged of all false movement, that is the great problem of our existence. And one, we shall, no doubt, surmount. Either way, a life spent pursuing a solution to that most grand and existential game is no doubt a noble one – and high nobility founded in truth, and nothing else, is the objective of human existence.{'\n\n'}      Our impetus for action, then, cannot be so disparate from our raison d'etre to be either the egotistical act of becoming a ‘great man’ or the cowardly act of becoming a ‘yes man’. It can, most certainly, as we understand it now, be some distortion of our raison d’etre, some perversion of it, but not so utterly divorced from it. What do I mean by this?  Human history, viewed from an evolutionary lens, presents a litany of disasters caused by the misunderstanding or intentional distortion of essential truths. In examining each abhorrent dogma, one finds, if sufficiently humble and open, the presence of some mangled and misshapen truth. The growth of our species into strength and abundance, an ideal few would discount as trivial or misguided, can be distorted into the assumption of a teutonic master race that must enslave and exterminate all others to enable the next great evolutionary leap. The ideal of the mother as the divine creator and nurturer of life can be distorted to constrain a woman’s activity to the domestic.  Beneath the distortions that are the ‘great man theory’, or the shameless worship of heroes, or any other gross simplification of our existence, then, we find an almost anxious search for cosmos (order) amidst the chaos, for certainty amidst ignorance. {'\n\n'}      Returning now to the question of this article, the goal is singular: to present you, my dear reader, with that fundamental question and anxiety of our existence, so you may wrestle with it by the horns and form some conclusions of your own. So you may roll about the mud under the weight of our shared endeavor, and stop, and stand tall in unperturbed self-assurance with the world on your shoulders. For while for so many, our life is a grave and pensive matter to be taken on with decided self-importance, to us, it’s just a game – one we play only because it’s too much fun. At those who would say, as they do no doubt, that you are too distracted by tick tociks and Kardashians and cricket to care, we can scoff together. Because I am yet to meet someone who does not, at least, in the silence between two thoughts, hear the voice of the universe calling their name and beckoning them to the greatest game of all. I know you care because at every point from the cave paintings by a lone flame in the Ajanta caves, to hobbling on the surface of the moon, we have contemplated our place amongst the stars. It’s how we’re wired.{'\n'}
            So, what can this publication be? A reminder. 
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
                <Text style = {[styles.textModeSub]}>editorial</Text>
                <Text style = {styles.textModeTitle}>The Essential Manifesto</Text>
                <Slider
                    style={styles.textModeSlider}
                    value={progress}
                    minimumValue={0}
                    maximumValue={duration}
                    onSlidingComplete={handleSliderComplete}
                    minimumTrackTintColor="#000"
                    maximumTrackTintColor="#808080"
                    thumbTintColor="transparent" 
                />
            </View>
            <View style = {{width:width*0.15,  backgroundColor:'white'}}>
                <TouchableOpacity onPress={handleTextMode}>
                    <Image
                            source={require('../assets/images2/GoMode1.png')} // Replace with your image URL or local source
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
        // left: width/25,
        // marginBottom: 20
    },
    textModeSub: {
      fontSize : 10,
      fontFamily: 'Reross',
      color: '#FFA600',
      left: width*0.3,
    //   lineHeight:20,
    //   width:width/1.2,
    //   marginLeft:width/12,
    //   marginBottom: 20
    },
    textModeImg: {
        width: height/20, 
        height: height/20,
        borderRadius: height/40, // Half the width/height to make it a perfect circle
        overflow: 'hidden', // Ensures the image does not bleed outside the border
        right:width*0.03,
        top:height*0.017

    },
    textModeTitle: {
      fontSize: 14,
      fontStyle: 'normal',

    left: width*0.17,
    color: '#000',
      letterSpacing: 0.23,
      fontFamily: 'Bodoni',
      lineHeight: 25,
      fontWeight: '900',
    },

    readIcon : {
        width: width/9, 
      height: height/20,
    //   marginBottom:50,
    //   marginTop:20,
      margin:30
    },
    nextIcon: {
        width: width/9, 
      height: height/20,
      margin:30,
    //   marginTop:20
    },
    stickyHeader: {
        height: height/8,
        backgroundColor: 'white',
        // justifyContent: 'flex-end',
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
        // backgroundColor:'white'
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
  
export default GoModeEditorialScreen;
