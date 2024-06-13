import { StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';
  import { NativeStackNavigationProp } from '@react-navigation/native-stack';
  import { Text, View } from 'react-native';
  
  const {width, height} = Dimensions.get('window');
  
  type Props = {
    navigation: NativeStackNavigationProp<any>;
  };

  const AutumnScreen:React.FC<Props> = ({ navigation }) => {
    
    return (
    <View style = {styles.container}>
        <ScrollView style={styles.scrollContainer} stickyHeaderIndices={[0]}>

        <View style={styles.stickyHeader}>
        </View>

            <Text style = {[styles.subText, styles.subTitle1]}>impressions</Text>
            <Text style = {styles.titleText}>Autumn</Text>
            <Text style = {[styles.subText, styles.subTitle2]}>"Too bad we're past summer solstice, she shrugged, it's only downhill from here"</Text>
            <Image source={require('../assets/images2/dreamE.jpeg')} style={styles.img}/>

            <Text style = {[styles.subText, styles.article]}> Today, I biked across Manhattan. Slowly, the sun set on the horizon, and I looked west from Forty-First and Sixth Avenue to watch the sky turn red. In the distance, birds circled above the water and joined their friends in going home. An old lady with one of those walkers that have breaks and handles waited patiently behind me all the while. The crowds walked swiftly around us. I realised after a minute and turned around to apologise. She was as tall as my mother and as thin as her too.{'\n\n'} 
            “I’m so sorry”. {'\n'}
“I couldn’t help looking myself,” she sighed, and parked her stroller where we were standing. {'\n\n'}
A blinking stop sign… a row of cars with executives from the corporate offices nearby waiting to go home, or the club, or wherever else such people go when they are not at work.{'\n\n'}
“We should cross over now.” {'\n'}
“You go on, I’ll be right behind you”, she said, still looking westward. {'\n'}
Their engines revved. A few more moments the blinking stop persisted. I asked her again. {'\n'}
“It’s a little dangerous here.” {'\n'}
“I’m so glad it’s summer.” {'\n\n'}
The light turned green. And all the cars nudged at each other to move. Then one honked, then another. {'\n\n'}
“Too bad we’re past summer solstice,” she shrugged, “it’s only downhill from here.” {'\n'}
I stared at her for a moment, then to the reddish sun sinking behind a bridge.
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate('stayMode')}>
              <Image
                source={require('../assets/images2/dice.png')}
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
      resizeMode: 'contain',
      bottom:10
  
    },
    subText : {
      fontSize: 15,
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
      // top:100
      // aspectRatio: '',
      resizeMode:'center',
      alignSelf:'baseline'

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
      marginBottom:10,
      marginTop:-10
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
  
export default AutumnScreen;