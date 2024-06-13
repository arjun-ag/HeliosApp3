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

  const GoModeHamletScreen:React.FC<Props> = ({ navigation }) => {
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
           require('../assets/audio/onward.m4a'),
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

                <TouchableOpacity onPress={() => navigation.navigate('goModeHamlet')} activeOpacity={1}>
                <Image
                source={require('../assets/images2/hamletNew.jpeg')} // Replace with your own image URL
                resizeMode="cover" // Cover the entire area of the View
                style={styles.img}/>
            </TouchableOpacity>
            <View style = {[{display: textMode ? 'none' : 'flex', backgroundColor:'white'}]}>
                    <Text style = {[styles.subText, styles.subTitle1]}>editorial</Text>
                    <Text style = {styles.titleText}>Hamlet</Text>
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
                    <TouchableOpacity onPress={() => navigation.navigate('goModeHamlet')}>
                        <Image source={require('../assets/images2/nextIcon.png')} style = {styles.nextIcon}/> 
                    </TouchableOpacity>
                </View>
            </View>
            <View style = {[{display: textMode ? 'flex' : 'none', backgroundColor:'white'}]}>
                <Text style = {[styles.subText, styles.article]}>The complexity of Hamlet’s internal conflict is most acutely projected in his soliloquies. They appear almost to be metaphysical excursions, or what the Greeks might call ‘grappling with one’s telos’. It is no surprise, then, that Hamlet is largely considered a character of great erudition. He is considered, careful, and weary of impulse. Yet, he succumbs to the weight of a wanton impulse. It is this dichotomy that pierces through the essence of the play: is Hamlet an intellectual, or is he motivated by forces more obscure, more mystical? And while to some it may appear that this contradiction must be resolved by what actors call ‘bold choices’, i.e., constructing and adhering to a consistent set of inferences from the text – I believe that it is in the festering and gradual crescendo of his confusion that Hamlet arrives to the heights of his humanity. This paper repositions Hamlet within the context of a dramatic production – and seeks thereby to gain some intuition on the nature of his psyche beyond the arid introspections of scholarship; it seeks to respond to the nuanced mastery of Shakespearean verse from the gut – perhaps in an attempt to mimic Hamlet himself – specifically in reference to Hamlet’s soliloquys. {'\n\n'}
            The first soliloquy, in Act One, Scene Two, (“O, that this too too sullied flesh would melt”) presents Hamlet in despair and disillusionment following the death of his father, the remarriage of his mother, and the whirling turmoil in his soul. It [this soliloquy] is a critical exposition of his [Hamlet’s] psychological journey throughout the play. His longing for his flesh to “melt, thaw, and resolve itself into a dew” breathes an agitated escapism. But Hamlet does not wish merely to be decomposed, disintegrated, he wishes to be resolved. Surely he is vulnerable – distraught – unsure of his desire to hold himself together. But he is also an aspirant for something beyond. Beyond what? A world as “weary, stale, flat, and unprofitable”. I would urge the actor here to notice the stuttering staccato in the words, the dental rhythm pulsing underneath a lustreless sentiment. In this moment, I would argue, there is something in Hamlet unable to resist the weight of his own momentum. What does this chugging motor resemble? As Hamlet puts it, “an unweeded garden that grows to seed”. Even in that metaphor, the stressed, long vowel sound of the word “grows” stands out particularly. Even in an unweeded garden gone astray, there is a ceaseless force of nature transforming the landscape. Nature does not merely change, nor move. It grows – like the sweltering crescendo wrought reflexively upon Shakespeare’s nominal protagonist. {'\n\n'}
            It is Hamlet need for resolution, that drives him to the second soliloquy in Act Two, Scene Two – his frustration with his own inaction, his excursions into the ontology of action and emotion. Why must he obey this ghost? Must he obey anyone? Must he seek revenge? The blatant self-critiquing – “O what a rogue and peasant slave am I” presents an interesting characterization. Hamlet does not consider himself passive – nor inanimate – but a rogue, stepping outside the bounds of convention in his motivations. Stepping outside himself. Like a player who conjures wild and wallowing intensity for fictional utility “could force his soul so to his own conceit.” The machinations of his mind, the deception they prompt in his behaviour, all culminate in his “monstrous” realization of his own pervasive insincerity. He continues the ekphrasis, intrigued by the actor’s portrayal of Hecuba, by the “Tears in his eyes, distraction in his aspect, A broken voice”. But all this to what end? Why does Shakespeare detour thus into the meta-dramaturgical? So Hamlet can ask “What would he [the actor] do, Had he the motive and the cue for passion that I have?” So Hamlet can vicariously through his imagination indulge in the violent catharsis he constrains himself from in actuality. And, so he can use his imagined counterfactual as a foil to his own cowardice – “Yet I, A dull and muddy-mettled rascal, peak, Like John-a-dreams, unpregnant of my cause, And can say nothing”. Could he be working his way to a frenzy? To a blatant and repugnant battle-cry to all in him which hesitates? Or will words fall short? Shakespeare, through Hamlet, seems backhandedly to define the perversity of hollow verbosity, veering again into the meta-dramaturgical. Here Hamlet stands, his father being murdered, waiting faintly for some cosmic wind to whisk him to into action – “Prompted to … revenge by heaven and hell”. Yet here he also stands, “like a whore” to “unpack [his] heart with words.” So he resolves majestically, apostrophically – “O vengeance!”. And so his course is set, for now. {'\n\n'}
            The Third Act breaks with perhaps one of Shakespeare’s most recognizable soliloquys – an angst ridden Hamlet contemplates the metaphysical burden incurred by the act of being. Many great actors have wrestled with these very lines. The clean, crisp sounds of Olivier’s slanted yearning gaze come immediately to mind, marching with the solemnity of a funeral march, “To be or not to be: that is the question”. For someone who spent the entirety of their time contemplating murder – death inevitably appears as “The undiscovered country from whose bourn / No traveller returns”. From whose bowels Claudius himself, once sentenced, will never return. Life, too, appears equally bleak, crippled by “the thousand natural shocks / That flesh is heir to”. What now? Whether to be or not to be seems moot in the face of this dim nihilism. Now Hamlet wriggles to the fountainhead of his problems – his hyperactive intellect which stows and secures his untamed passions. He proclaims, “conscience does make cowards of us all”. He must forsake his conscience, his consideration, if he ever is to act – but whether any good may come of his action is another question altogether. By now, lost in the isolation of his own thought, wallowing in the cowardice of his inaction, solitary on stage, he is impelled to pursue his action and ignore its consequences.
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
                <Text style = {styles.textModeTitle}>Hamlet</Text>
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
        // borderWidth: 3,   // Optional: for border around the image
        // borderColor: '#fff', // Optional: color of the border
        overflow: 'hidden', // Ensures the image does not bleed outside the border
        right:width*0.03,
        top:height*0.017
        // right:1000,
        // bottom:500
        // marginBottom:10,
    },
    textModeTitle: {
      fontSize: 14,
      fontStyle: 'normal',
    //   width: width/3,
    //   left: width/3,
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
  
export default GoModeHamletScreen;
