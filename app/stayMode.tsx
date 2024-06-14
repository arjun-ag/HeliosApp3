// import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Animated, StyleSheet, Image, Dimensions, ViewToken , ScrollView, FlatList, StatusBar, ImageBackground, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Text, View } from 'react-native';

const {width, height} = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

interface Item {
  key: string;
  image: any;
  headline: string;
  subtext1: string;
}
const sections1 = [
  {
    key: '1',
    image: require('../assets/images2/honk.jpeg'),
    headline: 'Dream',
    subtext1: '...or why being lost is fun',
  },
  {
    key: '2',
    image: require('../assets/images2/dreamE.jpeg'),
    headline: 'Autumn',
    subtext1: '...or make hay while the sun shines',
  },
  {
    key: '3',
    image: require('../assets/images2/onwardE.jpeg'),
    headline: 'Onward',
    subtext1: '...or don\'t give up',
  },
];

const sections2 = [
  {
    key: '1',
    image: require('../assets/images2/autumnE.jpeg'),
    headline: 'One Wayward Honk',
    subtext1: '',
  },
]

const sections3 = [
  {
    key: '1',
    image: require('../assets/images2/hamletNew.jpeg'),
    headline: 'Playing Hamlet',
    subtext1: '...or why we don\'t understand art',
  },
]

const sections4 = [
  {
    key: '1',
    image: require('../assets/images2/honkE.jpeg'),
    headline: "One Wayward Honk",
    subtext1: '',
    subtext2: '...or the joy of being alone',
  }, 
  {
    key: '2',
    image: require('../assets/images2/showmanE.jpeg'),
    headline: 'The Showman',
    subtext1: "",
    subtext2: '...or why you feel it in your bones'
  }

]


const StayModeScreen:React.FC<Props> = ({ navigation }) => {
  const [goMode, setGoMode] = useState(false);

  const goModeHandler = () => {
    setGoMode(true);
    navigation.navigate('goMode');
    setGoMode(false);
  }

  const [currentSection1Image, setCurrentSection1Image] = useState(0);
  const [currentSection2Image, setCurrentSection2Image] = useState(0);
  const [currentSection3Image, setCurrentSection3Image] = useState(0);
  const [currentSection4Image, setCurrentSection4Image] = useState(0);

  const section1ItemsChanged = React.useCallback(({ viewableItems }: { viewableItems: ViewToken[], changed: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      if (viewableItems[0].index == null) {
        setCurrentSection1Image(0);
      } else {
        setCurrentSection1Image(viewableItems[0].index);
      }
    }
  }, []);

  const section2ItemsChanged = React.useCallback(({ viewableItems }: { viewableItems: ViewToken[], changed: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      if (viewableItems[0].index == null) {
        setCurrentSection2Image(0);
      } else {
        setCurrentSection2Image(viewableItems[0].index);
      }
    }
  }, []);
  const section3ItemsChanged = React.useCallback(({ viewableItems }: { viewableItems: ViewToken[], changed: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      if (viewableItems[0].index == null) {
        setCurrentSection3Image(0);
      } else {
        setCurrentSection3Image(viewableItems[0].index);
      }
    }
  }, []);
  const section4ItemsChanged = React.useCallback(({ viewableItems }: { viewableItems: ViewToken[], changed: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      if (viewableItems[0].index == null) {
        setCurrentSection4Image(0);
      } else {
        setCurrentSection4Image(viewableItems[0].index);
      }
    }
  }, []);

  const handleSection1 = React.useCallback(({ viewableItems }: { viewableItems: ViewToken[], changed: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      if (viewableItems[0].index == null) {
        setCurrentSection4Image(0);
      } else {
        navigation.navigate('dream')
      }
    }
  }, []);

  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };

    lockOrientation();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);


  return (
    <View style = {styles.container}>
    <StatusBar hidden={true}/>

    <Animated.View style ={[styles.header, {
      shadowOpacity: 2,
      shadowRadius: 3,
      shadowColor: '#000',
      shadowOffset: { height: 0, width: 0 },
      elevation: 2 // for Android shadow
    }]}>
      <Image source={require('../assets/images2/backIcon.png')} style ={styles.headerBackIcon}></Image>
      <Image source={require('../assets/images2/logo.png')} style={styles.headerIcon} />
      <Image source={require('../assets/images2/accountIcon.png')} style={styles.headerAccountIcon} />
    </Animated.View>


    <ScrollView style={styles.container}>


      <TouchableOpacity onPress={() => navigation.navigate('editorial')} activeOpacity={0.999}>
        <ImageBackground
          source={require('../assets/images2/wayward.png')}
          resizeMode="cover"
          style={styles.section1}>

          <LinearGradient
              colors={['rgba(31,35,39,100)', 'rgba(0,0,0,0)']}
              start={{ x: 0, y: 0 }} 
              end={{ x: 0, y: 1 }} 
              style={[styles.linearGradientTop, styles.linearGradient]}/>
          <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(31,35,39,100)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={[styles.linearGradientBottom, styles.linearGradient]}/>

          <Text style = {[styles.mainPos1]}>Motion Picture Series</Text>
          <Text style={[styles.mainTitle]}>Children of the Sea</Text>
          
        </ImageBackground>
      </TouchableOpacity>


      <View style={styles.line} />
      <Text style = {styles.rightText}> impressions</Text>
      
      <FlatList
      data={sections1}
      horizontal={true}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      onViewableItemsChanged={section1ItemsChanged}
      keyExtractor={item => item.key}
      renderItem={({ item }) => (
        <TouchableOpacity 
            onPress={() => 
              item.key === '1' ? navigation.navigate('dream') :
              item.key === '2' ? navigation.navigate('autumn') :
              item.key === '3' ? navigation.navigate('onward') : 4 } 
            activeOpacity={0.9}
        >
        <View style = {{width, height: height*0.35}}>
              
              <ImageBackground
                source={item.image}
                resizeMode="cover"
                style={styles.section2}>
                <LinearGradient
              colors={['#000', 'rgba(0,0,0,0)']}  // Starting from a solid color, fading to transparent
              start={{ x: 0, y: 1 }}  // Gradient starts t the left
              end={{ x: 0, y: 0.2 }}    // Gradient ends at the right
              style={styles.linearGradientBottom}/>
              <Text style={[styles.titleText, styles.bottomTextTitle]}>{item.headline}</Text>
                <Text style={[styles.subText, styles.bottomTextsubTitle]}>{item.subtext1}</Text>
              </ImageBackground>
            </View>
        </TouchableOpacity>
      )}
    />

    <View style={styles.indicatorContainer}>
        {sections1.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentSection1Image === index ? styles.activeIndicator : null,
            ]}
          />
        ))}
    </View>

    {/* second section */}

    <View style={[styles.line, styles.line2]} />
    <Text style = {styles.rightText}> motion pictures</Text>
 
    <FlatList
      data={sections2}
      horizontal={true}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      onViewableItemsChanged={section2ItemsChanged}
      renderItem={({ item }) => (
        <TouchableOpacity 
            onPress={() => 
              item.key === '1' ? navigation.navigate('immortal') :
              item.key === '2' ? navigation.navigate('lost') : 3 } 
            activeOpacity={0.9}>
          <View style = {{width, height: height*0.7}}>
            <ImageBackground
              source={item.image}
              resizeMode="cover"
              style={styles.filmSection}>
              <Text style={[styles.titleText, styles.topTextTitle]}>{item.headline}</Text>
              <Text style={[styles.subText, styles.topTextsubTitle]}>{item.subtext1}</Text>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.key}
    />
    <View style={styles.indicatorContainer}>
        {sections2.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentSection2Image === index ? styles.activeIndicator : null,
            ]}
          />
        ))}
    </View>

    <View style={[styles.line]} />
    <Text style = {styles.rightText}> intuitions</Text>


    <FlatList
      data={sections3}
      horizontal={true}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      onViewableItemsChanged={section3ItemsChanged}
      renderItem={({ item }) => (
        <TouchableOpacity 
            onPress={() => 
              item.key === '1' ? navigation.navigate('hamlet') :
              item.key === '2' ? navigation.navigate('lost') : 2 } 
            activeOpacity={0.9}
        >
            <View style = {{width, height: height*0.35}}>
              <ImageBackground
                source={item.image}
                resizeMode="cover"
                style={styles.section2}>
                  <LinearGradient
              colors={['#000', 'rgba(0,0,0,0)']}  // Starting from a solid color, fading to transparent
              start={{ x: 0, y: 1 }}  // Gradient starts t the left
              end={{ x: 0, y: 0.2 }}    // Gradient ends at the right
              style={styles.linearGradientBottom}/>
                <Text style={[styles.titleText, styles.bottomTextTitle]}>{item.headline}</Text>
                <Text style={[styles.subText, styles.bottomTextsubTitle]}>{item.subtext1}</Text>
              </ImageBackground>
            </View>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.key}
    />
    <View style={styles.indicatorContainer}>
        {sections3.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentSection3Image === index ? styles.activeIndicator : null,
            ]}
          />
        ))}
    </View>

    {/* fifth section  rgba(0,66,94,0) */}

    <View style={[styles.line, styles.line2]} />
    <Text style = {styles.rightText}> verse</Text>

    <FlatList
      data={sections4}
      horizontal={true}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      onViewableItemsChanged={section4ItemsChanged}
      renderItem={({ item }) => (
        <TouchableOpacity 
            onPress={() => 
              item.key === '1' ? navigation.navigate('honk') :
              item.key === '2' ? navigation.navigate('showman') : 3} 
            activeOpacity={0.9}
        >
        <View style = {{width, height: height*0.35}}>
          <ImageBackground
            source={item.image}
            resizeMode="cover"
            style={styles.section2}>
              <LinearGradient
              colors={['#000', 'rgba(0,0,0,0)']}  // Starting from a solid color, fading to transparent
              start={{ x: 1, y: 0 }}  // Gradient starts t the left
              end={{ x: 0.5, y: 0 }}    // Gradient ends at the right
              style={styles.linearGradientBottom}/>
            <Text style={[styles.titleText, styles.rightTitle]}>{item.headline}</Text>
            <Text style={[styles.subText, styles.rightTextsubTitle1]}>{item.subtext1}</Text>
            <Text style={[styles.subText, styles.rightTextsubTitle2]}>{item.subtext2}</Text>
          </ImageBackground>
        </View>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.key}
    />
    <View style={styles.indicatorContainer}>
        {sections4.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentSection4Image === index ? styles.activeIndicator : null,
            ]}
          />
        ))}
    </View>
  
    </ScrollView>

    <Animated.View style ={[styles.footer, {
      shadowOpacity: 2,
      shadowRadius: 3,
      shadowColor: '#000',
      shadowOffset: { height: 0, width: 0 },
      elevation: 2 // for Android shadow
    }]}>
    <TouchableOpacity onPress={() => setGoMode(false)}>
        <View style={goMode ? styles.imageBox : styles.imageBoxActive}>
          <Image source={require('../assets/images2/stayMode.png')} style={styles.imageFooter} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={goModeHandler}>
      <View style={goMode ? styles.imageBoxActive : styles.imageBox}>
          <Image source={require('../assets/images2/goMode.png')} style={styles.imageFooter}/>
        </View>
      </TouchableOpacity>
    </Animated.View>

  </View>

  );
}



const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: 'white'
  },
  indicator: {
    height: 10,
    width: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth:1,
    borderColor : 'black',
    marginHorizontal: 5
  },
  activeIndicator: {
    backgroundColor: '#FFA600',
  },

  imageFooter:{
    width: 30,  // Fixed width
    height: 30,  // Fixed height
    resizeMode: 'contain'  // Maintain aspect ratio
  },
  headerLogo: {
    width: 30,  // Fixed width
    height: 30,  // Fixed height
    resizeMode: 'contain'  // Maintain aspect ratio
  },
  rightText: {
    fontSize: 16,
    fontStyle: 'normal',
    textAlign: 'right',
    color: '#000',
    alignItems: 'center',
    fontFamily: 'Reross',
    fontWeight: 'bold',
    right:width/20,
    marginBottom:10
  },
  line: {
    position:"relative",
    width: width/1.1, // This is the thickness of the line
    backgroundColor: '#000', // This sets the color of the line
    marginVertical: 5, // This adds horizontal space around the line
    height: 1, // This makes the line span the full height of the container
    top:1,
    left: width/20,
  },
  lineHeader: {
    // position:"relative",
    width: width, 
    backgroundColor: '#000', // This sets the color of the line
    marginVertical: 5, // This adds horizontal space around the line
    height: 1, // This makes the line span the full height of the container
  },
  imageBox: {
    backgroundColor:'white'
  },
  imageBoxActive: {
    borderRadius: 10,
    justifyContent:'center',
    alignItems:'center',
    width:50,
    height:50,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#000',
    marginLeft:10,
    marginRight:10,
    backgroundColor: 'white'
  },
  stickyHeader: {
    height: height/8,
    backgroundColor: 'white',
    position: 'relative',
    alignItems: 'center',
    zIndex: 1,
  },

  headerIcon: {
    width: 45,  
    height: 45,  
    top:height/35,
    resizeMode: 'contain',
  },
  headerBackIcon: {
    width: 24,  
    height: 24,  
    top:height/35,
    right:width/3,
    resizeMode: 'contain',
  },
  headerAccountIcon: {
    width: 24,  
    height: 24,  
    top:height/35,
    left:width/3,
    resizeMode: 'contain',
  },
  section1: {
    position: 'relative',
    width: width,
    height: height*0.75,
    resizeMode:'contain',
    justifyContent: 'center', // Center the child at the bottom
    alignItems: 'center', // Center the child on the left
    marginBottom: 10,
  },
  line2:{
    marginTop: 12
  },
  section2: {
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'relative',
    width: width,
    height: height*0.35,
    resizeMode:'contain',
    marginBottom: 20,
  },

  filmSection: {
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'relative',
    width: width,
    height: height*0.7,
    resizeMode:'contain',
    marginBottom: 20,
  },

  topTextTitle: {
    bottom:height/4,
  },
  topTextsubTitle: {
    bottom:height/3.1,
  },

  subText : {
    fontSize: 16,
    fontStyle: 'normal',
    textAlign: 'center',
    color: '#FFA600',
    letterSpacing: -0.24,
    alignItems: 'center',
    fontFamily: 'Bodoni',
    lineHeight: 20,
    fontWeight: 'bold',
  },

  titleText: {
    fontSize: 32,
    fontStyle: 'normal',
    textAlign: 'center',
    width: width,
    color: '#FFFFFF',
    letterSpacing: -0.23,
    alignItems: 'center',
    fontFamily: 'Bodoni',
    lineHeight: 30,
    fontWeight: '400',
  },

  mainTitle: {
    fontFamily: 'Reross',
    fontSize:39,
    color: 'white',
    fontWeight: '400',
    lineHeight:44,
    fontStyle:'normal',
    letterSpacing:-0.24,
    bottom:height/1.8,
  },
  mainPos1:{
    color:'white',
    bottom:height/1.8,
    lineHeight:34,
    fontSize:18,
    letterSpacing:-0.24,
    fontWeight:'400',
  },
  bottomTextTitle: {
    // top:height/,
    bottom:height/11
  },
  bottomTextsubTitle:{
    bottom:height/12
  },
  rightTitle: {
    bottom:height/6,
    left:width/3,
    width: width/3,
    margin:10
  },
  rightTextsubTitle1:{
    bottom: height/3.5,
    left: width/3
  },
  rightTextsubTitle2:{
    bottom: height/6,
    left: width/3,
    width: width/4
  },
  footer: {
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row'
  },
  header: {
    padding: height*0.057,
    backgroundColor: '#1F2327',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
  },
  container : {
    flex:1,
    backgroundColor: '#1F2327',
  },   
  linearGradient: {
    width: '100%',
    height: height*0.3, // Adjust the height of the gradient as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradientTop: {
    // top:height*0.02,
  },
  linearGradientBottom: {
    top: height*0.18
  },

});

export default StayModeScreen;