import { StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity, Animated } from 'react-native';
  import {useEffect, useState} from 'react';
  import { NativeStackNavigationProp } from '@react-navigation/native-stack';
  import { Text, View } from '@/components/Themed';
  import { Audio, AVPlaybackStatus } from 'expo-av';
  import Slider from '@react-native-community/slider';


//   import Animated, {useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate} from 'react-native-reanimated';
  
  const {width, height} = Dimensions.get('window');
  
  type Props = {
    navigation: NativeStackNavigationProp<any>;
  };

  const GoModeLostScreen:React.FC<Props> = ({ navigation }) => {
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

                <TouchableOpacity onPress={() => navigation.navigate('goModeLost')} activeOpacity={1}>
                <Image
                source={require('../assets/images2/lostNew.jpeg')} // Replace with your own image URL
                resizeMode="cover" // Cover the entire area of the View
                style={styles.img}/>
            </TouchableOpacity>
            <View style = {[{display: textMode ? 'none' : 'flex', backgroundColor:'white'}]}>
                    <Text style = {[styles.subText, styles.subTitle1]}>...</Text>
                    <Text style = {styles.titleText}>Lost</Text>
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
                <Text style = {[styles.subText, styles.article]}>I stood there on the pavement by the bookstore, lost in myself. Around, the great city swirled - and people marched about with blatant purpose. My eyes were fixed upon the distance, so far away I could not make out what I was looking at - only that it was important not to turn away my gaze. And from the streets, the musty smells of passers-by and little food carts wafted upwards between squarely built skyscrapers to reach flattened clouds that weaved about the sun. I let myself be washed away by the crowds, and realised only a half-hour later that I was wafting towards the waterfront.  {'\n\n'}
On the grass, by the outdoor gym where I had seen an old man doing pull-ups on a bar with short, unsteady, gasps for breath, I saw a little girl roaming along the bushes looking for something. After a moment, she bent over and picked something up, I could not see what, examined it for a moment, then put it away to continue the search. A crimson hue was setting across the horizon. I looked at the river for a long moment, then back at the girl, who had now run across the lawn to her bare-chested father, reading a book on the grass, with a small white flower. The father put his book away and tucked the flower behind his left ear, the little girl blushed, I smiled. I walked past them both thinking that the little girl, one day, would perhaps herself nurse a broken heart, and look back on this lazy afternoon to find her peace. To know that she too had been happy once.{'\n\n'}
But as I hobbled to the river, these thoughts left quickly and were replaced by that grudging hum of a persistent realisation—I had not written in two months. And while there had been a time when line upon line burst from me to form such verses drenched in honest truth—the well had dried up. I would sit for hours on my desk, beside the window and the splatters of ink on the floor from too many changed cartridges, and stare at blank paper with no blood in me left to spill upon it. While to some, this problem would appear a trifle, to one in whom the word had been a fountain gushing down Himalayan heights, its absence caused a drought—a withering of the soul.{'\n\n'}
There was a fullness in the air of a city old enough to be steeped in its own idiosyncrasies, but young enough not to be shackled by them. I walked on the long walkway. The reddish leaves scrunched beneath my soles with every step. When I stopped and put one hand on the grey and metal rail, the streetlamps across the river were twinkling. In my other hand, there was an old and crumbling copy of Dorian Gray. There was something about this book that had stayed with me from when I had first read it as a 17-year-old, wilting beneath the heat of an Indian summer: Immortality. But while, for Dorian, immortality was little more than the preservation of a youthful visage, I sought an immortality that would lift, in one breath, my fractured visions of the world to a singularity —there, by the sharp chasm of eternity. So, I stood, a slave to my own death, having lost the only thing that ever brought me happiness. Soon, the sun descended by the water’s edge and turned the world incarnadine; the birds made their way home, and so did I.{'\n\n'}
I lived, at the time, in a studio apartment on forty second street, between fifth and sixth, across the public library. From my window, I could see the city stretching out before me in little glints of tungsten against a Prussian-blue-black sky. I was in love with New York. I remember the first time I stood in the middle of a deserted Times Square, with its strobing neon dripping gently into the whiteness of fresh January snow, and smelled freedom in the air. On my bed, sticking out from in between the rumpled sheets, was the mangled cover of Yeats’ poems with an envelope parked to bookmark ‘The Second Coming’. The room was simple enough: a large wooden desk with drawers along the left-hand-side stuffed with thick laid paper; a bookshelf opposite, arranged without any thought for genre or author, but rather in the chronological order that I had bought the books. In glancing from the top left to the bottom right, a keen eye could decipher my obsessions over the course of the past year. Marlon Brando biographies, then three or four hardcovers about cinema – books I had bought but found too dull in their butchering pedanticism of my favorite films to read –the collected works of James Joyce, a few Bertrand Russell paperbacks with dog-eared sheets of paper stuck every few pages filled with my notes and disagreements in an unkempt cursive hand, some guidebooks in screenwriting – that I had been far too proud to dog-ear or take notes about, but read nonetheless – and three volumes of Valmiki’s Ramayana in Sanskrit with English translations.{'\n\n'}
On the wall adjoining was a large frame with a painting of the Flatiron building in cobalt ink. I had bought it from an artist at Union Square sitting wearily surrounded by his monochromatic cityscapes. In each of them, the city seemed a mirage; waiting to disappear, like a half-remembered dream in morning sun. Underneath the frame was my phonograph, and a small box with an eclectic record collection: the Tannhauser overture, Beethoven’s ‘Emperor’ piano concerto, Billie Eilish, a collection of Kennedy’s speeches, Hariprasad Chaurasia, Bhimsen Joshi. Across it, my electric piano, and a Neumann microphone that was a prized possession. My mother had insisted they play Beethoven’s ninth as I was born; so, in a way, I descended upon this world on fire-drunken wings of Elysian bliss. No wonder I’m rather grandiose.{'\n\n'}
I tossed my overcoat on the armchair next to the piano and switched my lamps on, with tungsten bulbs to add a blip to the night sky, and sank into the desk chair. A spiraling blackness had enveloped me, and I was stupored in its blank abyss – for a moment I could hear the sirens of a firetruck rattling down Fifth Avenue, then, nothing. I set Wagner’s Tannhauser on the record player. I had heard it for the first time played by the London Symphony Orchestra at the Royal Albert Hall as a 16-year-old. I remember standing there, under luminous blue domes in the arena, so close to the conductor that I could almost extend my arm and touch his calves as the horns and clarinets whispered the pilgrim’s theme and pass it to the strings, who take the thought in languid whirls to be torn between the sacred and profane. I realized, standing there, that all these works of art, which now stand tall amidst the canonical features of our shared existence, are often the sacred musings of a single human being tucked away in their sanctum of aloneness. It was surreal.{'\n\n'}
The music swelled and swelled and slinked away, and I remained. It was still too early to go to bed, but too late to begin working. Besides, I doubt there was much in me to work with. I refused to be sucked into vacuum. If there was still one bone in me with some faint echo of sincerity, I would find it, or drive those dreadful falsehoods of civility from my soul for good. Yet, all this I would do tomorrow. I played the record again and snuggled in my crumpled sheets with Yeats for company – an hour passed, or two, I couldn’t quite tell, but soon the centre could not hold. I slouched away to stony sleep.
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
                <Text style = {[styles.textModeSub]}>...</Text>
                <Text style = {styles.textModeTitle}>Lost</Text>
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
  
export default GoModeLostScreen;
