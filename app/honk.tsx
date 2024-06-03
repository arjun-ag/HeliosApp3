import { StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';
  import StoryHelios from '@/components/storyHelios';
  import { NativeStackNavigationProp } from '@react-navigation/native-stack';
  import { Text, View } from '@/components/Themed';
  import Animated, {useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate} from 'react-native-reanimated';
  
  const {width, height} = Dimensions.get('window');
  
  type Props = {
    navigation: NativeStackNavigationProp<any>;
  };

  const HonkScreen:React.FC<Props> = ({ navigation }) => {
    
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
            <Text style = {styles.titleText}>One Wayward Honk</Text>
            <Text style = {[styles.subText, styles.subTitle2]}>"have no-one left to stop and hear"</Text>
            <Image source={require('../assets/images2/honkE.jpeg')} style={styles.img}/>

            <Text style = {[styles.subText, styles.article]}> These times, so full of gasps for nothing done, {'\n'}
Hide truth behind the sound of rain that roars {'\n'}
Above a peak hour rush. These streets, once drenched {'\n'}
And quiet, have no-one left to stop and hear. {'\n\n'}

But I have walked the night and braved the storm {'\n'}
To find desertion midst these city lights. {'\n'}
So I have heard the voice of God entrapped {'\n'}
Beneath one wayward honk in search of home. 
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
  
export default HonkScreen;