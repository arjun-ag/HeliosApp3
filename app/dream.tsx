import { StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';
  import { NativeStackNavigationProp } from '@react-navigation/native-stack';
  import { Text, View } from '@/components/Themed';
  
  const {width, height} = Dimensions.get('window');
  
  type Props = {
    navigation: NativeStackNavigationProp<any>;
  };

  const DreamScreen:React.FC<Props> = ({ navigation }) => {
    
    return (
    <View style = {styles.container}>
        <ScrollView style={styles.scrollContainer} stickyHeaderIndices={[0]}>

        <View style={styles.stickyHeader}>
        </View>

            <Text style = {[styles.subText, styles.subTitle1]}>impressions</Text>
            <Text style = {styles.titleText}>Dream</Text>
            <Text style = {[styles.subText, styles.subTitle2]}>"... so I can plant my feet firmly enough to take an unrelenting stand for something good"</Text>
            <Image source={require('../assets/images2/honk.jpeg')} style={styles.img}/>

            <Text style = {[styles.subText, styles.article]}> I turned twenty-one this year. I remember sitting in the park, on a summer afternoon, when the sun first passes through the clouds, then a canopy of trees, before it gleams on your cheek, reading Yeats’ ‘The Second Coming’. It felt too idyllic a day to be engulfed by any blood-dimmed tide of anarchy. Yet somehow, I believe, I understood then for the first time what it meant to forsake one’s innocence – a warm glint in the eyes that fades suddenly into stony silence. Our world has a way of manifesting the unexpected, of dangling our hopes and dreams by a most fragile thread of trust. Sometimes the thread snaps. Sometimes we are broken. Yeats, however, goes still further. His emanation of the deity is not a kind and kindred spirit, but a great and terrible beast with a “gaze as blank and pitiless as the sun” – that naked moonscape of the Northern Himalayas on a cloudless desert night – stark and wide and forceful and detached. I saw, only a few nights ago, an old and grizzly man reclined against a lonely lamppost with a saxophone. He was free. Lilting to the contours of a musical dream. He played all night, sometimes fiercely over the blaring honks of cars with drunken men and women rushing home, sometimes alone. I sat there by the lamppost for a while, looking sometimes at him, sometimes at the orangish glow from thin wisps of clouds against the moon. Perhaps our times demand the insistence of a solitary voice if it is to be heard. Or they demand our strength of character – our obstinance upon an ideal. Or they demand nothing at all. But I would like to find some remnants of that slouching beast, that glorious deity, in my soul – so I can plant my feet firmly enough to take an unrelenting stand for something good. 
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
    position: 'relative',
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
  
export default DreamScreen;