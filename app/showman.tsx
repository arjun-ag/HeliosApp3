import { StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';
  import StoryHelios from '@/components/storyHelios';
  import { NativeStackNavigationProp } from '@react-navigation/native-stack';
  import { Text, View } from '@/components/Themed';
  import Animated, {useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate} from 'react-native-reanimated';
  
  const {width, height} = Dimensions.get('window');
  
  type Props = {
    navigation: NativeStackNavigationProp<any>;
  };

  const ShowmanScreen:React.FC<Props> = ({ navigation }) => {
    
    return (
    <View style = {styles.container}>
        <ScrollView style={styles.scrollContainer} stickyHeaderIndices={[0]}>

        <View style={styles.stickyHeader}>
          {/* <Image
            source={require('../assets/images/heliosLogo.png')} // Replace with your image URL or local source
            style={styles.headerImage}
          /> */}
        </View>

            <Text style = {[styles.subText, styles.subTitle1]}>verse</Text>
            <Text style = {styles.titleText}>The Showman</Text>
            <Text style = {[styles.subText, styles.subTitle2]}>"...for boundless Self existence joy"</Text>
            <Image source={require('../assets/images2/showmanE.jpeg')} style={styles.img}/>
            <Text style = {[styles.subText, styles.article]}>
Curtains Rise{'\n\n'}
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

            <TouchableOpacity onPress={() => navigation.navigate('stayMode')}>
              <Image
                source={require('../assets/images2/dice.png')} // Replace with your image URL or local source
                style={styles.headerImage}
              />
            </TouchableOpacity>

        </ScrollView>

      </View>

        );    
  }
  
  
  
  
  const styles = StyleSheet.create({
    
    headerImage: {
      width: width,  
      // bottom: -30,       
      // height: 90,  
      resizeMode: 'contain',
      bottom:10
  
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
      width: width/1.1,
      marginLeft: width/15,
      // textAlign :'left',
      marginBottom:10,
      fontSize: 20, 
      fontFamily: 'Caslon',
      textAlign: 'left',
      lineHeight: 35,
    },
    subTitle1: {
      width : width,
      marginBottom:10,
      marginTop: height/35,
      fontWeight: 'bold',
      color: '#E37b00', 
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
      height: height/2,
      marginBottom:20,
    },
    titleText: {
      fontSize: 32,
      fontStyle: 'normal',
      textAlign: 'center',
      width: width,
      color: '#000',
      letterSpacing: -0.23,
      alignItems: 'center',
      fontFamily: 'Bodoni',
      lineHeight: 30,
      fontWeight: '900',
      marginBottom:20
    },
  stickyHeader: {
    height: height/20,
    backgroundColor: 'white',
    // justifyContent: 'flex-end',
    position: 'relative',  // Ensures absolute positioning is relative to the header
    alignItems: 'center',
    zIndex: 1,

  },
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    scrollContainer: {
      flex:1
    }
  });
  
export default ShowmanScreen;