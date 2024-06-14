import { StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';
  import { NativeStackNavigationProp } from '@react-navigation/native-stack';
  import { Text, View } from 'react-native';
  
  const {width, height} = Dimensions.get('window');
  
  type Props = {
    navigation: NativeStackNavigationProp<any>;
  };

  const OnwardScreen:React.FC<Props> = ({ navigation }) => {
    
    return (
    <View style = {styles.container}>
        <ScrollView style={styles.scrollContainer} stickyHeaderIndices={[0]}>

        <View style={styles.stickyHeader}>
        </View>

            <Text style = {[styles.subText, styles.subTitle1]}>impressions</Text>
            <Text style = {styles.titleText}>Onward</Text>
            <Text style = {[styles.subText, styles.subTitle2]}>"Only the words themselves are; and so, by extension, am I, their writer"</Text>
            {/* <Image source={require('../assets/images2/onwardE.jpeg')} style={styles.img}/> */}

            <Text style = {[styles.subText, styles.article]}> I waited and waited by Fortieth and Sixth, and soon it began to snow. I have never seen that part of town as hopelessly empty as it was on this night in early February. The winds grew; the dead and empty branches of trees snapped in half and fell into the muck of soiled snow and slush on the streets. It was, no doubt, foolish to have stayed waiting there as long as I did. I knew that. But I want no guilt for lack of trying. Black cars with glaring red backlights rushed into the night every few minutes. The cops stayed in their vans on patrol, with blaring blue and orange sirens glinting falling snowflakes like a dream. It was a certain impersonality of the hour that made the cold more bearable. I stood, leaning against a wall, staring blankly at some shimmers in the darkness, playing my part. {'\n\n'}
I remember my screenwriting professor, a most charming man who reminds me eerily of Julian Morrow from ‘The Secret History’, told me once that lurking beneath the surface of my words, he sensed a dormant and terrible hero churning the motors onward. So, I decided to lay the matter before you, quite early on, to tell you he was wrong. There are no daemons hiding behind the veneer of these words. Only the words themselves are; and so, by extension, am I, their writer. I have been misunderstood as a romantic, and on the worst days, as delusional, too much to allow you to do the same. {'\n\n'}
A little more than an hour later, when the police van, presumably, had found another neighbourhood to cast its lighthouse-like beacons of orange and teal, I concluded that I had, of course, been stood up. I unhinged myself from the little ledge my elbows rested on and waded home in the blizzard. 
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate('stayMode')}>
              {/* <Image
                source={require('../assets/images2/dice.png')}
                style={styles.headerImage}
              /> */}
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
      width: width/1.3,
      marginLeft: width/12,
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
      resizeMode:'cover'
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
  
export default OnwardScreen;