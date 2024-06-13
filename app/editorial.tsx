import { StatusBar } from 'expo-status-bar';
import { useState, useRef, useCallback } from 'react';
import { Platform, StyleSheet, Image, Dimensions, ViewToken , ScrollView, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';

  const {width, height} = Dimensions.get('window');
  
  type Props = {
    navigation: NativeStackNavigationProp<any>;
  };
  
  const EditorialScreen:React.FC<Props> = ({ navigation }) => {

    return (
      <View style = {styles.container}>
        <ScrollView style={styles.scrollContainer} stickyHeaderIndices={[0]}>

        <View style={styles.stickyHeader}>
          {/* <Image
            source={require('../assets/images/heliosLogo.png')} // Replace with your image URL or local source
            style={styles.headerImage}
          /> */}
        </View>

            <Text style = {[styles.subText, styles.subTitle1]}>editorial</Text>
            <Text style = {styles.titleText}>The Essential Manifesto</Text>
            <Text style = {[styles.subText, styles.subTitle2]}>"To calm the waters, still the great sea within ourselves untile they are purged of all false movement, that is the great problem of our existence"</Text>
            <Image source={require('../assets/images2/manifestoE.jpeg')} style={styles.img}/>

            <Text style={[styles.subText, styles.article]}>
            {/* <Text style = {[styles.article, styles.first]}>I</Text> */}
            <Text style = {[styles.subText, styles.article]}>I will answer one question - what is the essence of this publication; in other words, the question of what this publication will grow to become.{'\n\n'}      I remember as a seven year old, lying down on my bed, on the ground floor of our house, staring out at bright peepal leaves glazed by the tropical sunrise of my childhood, wondering what it might be like to hold a conversation with Chandragupta or Napoleon or Lakshmibai; wondering about what that wild and unshackled glint in their eyes might reveal. Most of my time was spent in the company of books that told the great stories of their legendary exploits. Reading Will Durant’s “The Greatest Minds and Ideas of All Time” in high school, I could not help but be so thoroughly convinced by the idea that the impetus, for all our marches through the muck and on towards a shimmering hope that lingers draped upon the horizon, has always been an enlightened general or prophet, or king or queen. And yet, no matter how wise my seventeen year old self believed himself to be, he could not be much further from the truth. {'\n\n'}      We are not, you see, subscribed blindly to the altar of great men and women – no matter how much that appears to be the case. I refuse that our predicament be either one of spineless apathy or greasy sycophancy. That cannot be why we flock to strong leaders. Within the soul of each human being, I am certain, is a whispering voice that speaks the truth – whether that voice is drowned by the tempests of wanton thought, or amplified into action, is another matter altogether. The very presence of that voice indicates, to me at any rate, that beneath the furious sloshing of our imperfections, we are, in our own uniqueness, perfect beings shackled by our own ignorance. To calm the waters, still the great seas within ourselves until they are purged of all false movement, that is the great problem of our existence. And one, we shall, no doubt, surmount. Either way, a life spent pursuing a solution to that most grand and existential game is no doubt a noble one – and high nobility founded in truth, and nothing else, is the objective of human existence.{'\n\n'}      Our impetus for action, then, cannot be so disparate from our raison d'etre to be either the egotistical act of becoming a ‘great man’ or the cowardly act of becoming a ‘yes man’. It can, most certainly, as we understand it now, be some distortion of our raison d’etre, some perversion of it, but not so utterly divorced from it. What do I mean by this?  Human history, viewed from an evolutionary lens, presents a litany of disasters caused by the misunderstanding or intentional distortion of essential truths. In examining each abhorrent dogma, one finds, if sufficiently humble and open, the presence of some mangled and misshapen truth. The growth of our species into strength and abundance, an ideal few would discount as trivial or misguided, can be distorted into the assumption of a teutonic master race that must enslave and exterminate all others to enable the next great evolutionary leap. The ideal of the mother as the divine creator and nurturer of life can be distorted to constrain a woman’s activity to the domestic.  Beneath the distortions that are the ‘great man theory’, or the shameless worship of heroes, or any other gross simplification of our existence, then, we find an almost anxious search for cosmos (order) amidst the chaos, for certainty amidst ignorance. {'\n\n'}      Returning now to the question of this article, the goal is singular: to present you, my dear reader, with that fundamental question and anxiety of our existence, so you may wrestle with it by the horns and form some conclusions of your own. So you may roll about the mud under the weight of our shared endeavor, and stop, and stand tall in unperturbed self-assurance with the world on your shoulders. For while for so many, our life is a grave and pensive matter to be taken on with decided self-importance, to us, it’s just a game – one we play only because it’s too much fun. At those who would say, as they do no doubt, that you are too distracted by tick tociks and Kardashians and cricket to care, we can scoff together. Because I am yet to meet someone who does not, at least, in the silence between two thoughts, hear the voice of the universe calling their name and beckoning them to the greatest game of all. I know you care because at every point from the cave paintings by a lone flame in the Ajanta caves, to hobbling on the surface of the moon, we have contemplated our place amongst the stars. It’s how we’re wired.{'\n'}
            So, what can this publication be? A reminder. 
            </Text>
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
      marginBottom: 20,
    },
    img: {
      width: width, 
      height: height/2,
      marginBottom:30,
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
  
export default EditorialScreen;