import { Animated, StyleSheet, Dimensions, ScrollView, StatusBar, Image, TouchableOpacity, ImageBackground, FlatList} from 'react-native';
import {useRef, useState, useEffect} from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Amplify, API } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { Text, View } from 'react-native';

const {width, height} = Dimensions.get('window');

Amplify.configure(awsconfig);
interface apiResponse {
  // Define the expected response structure
  key: string;
}

type Props = { navigation: NativeStackNavigationProp<any>; };
  
const GoModeScreen:React.FC<Props> = ({ navigation }) => {
const [goMode, setGoMode] = useState(true);
const [data, setData] = useState<apiResponse>({key:"ngasull"});
const data1='why';

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
    subtext1: 'coming soon',
  },
  // {
  //   key: '4',
  //   image: require('../assets/images2/lostNew.jpeg'),
  //   headline: 'Lost',
  //   subtext1: 'roaming about',
  // }
];

const sections2 = [
  {
    key: '1',
    image: require('../assets/images2/autumnE.jpeg'),
    headline: 'One Wayward Honk',
    subtext1: 'coming soon',
  },
  // {
  //   key: '2',
  //   image: require('../assets/images2/hamletNew.jpeg'),
  //   headline: 'Playing Hamlet',
  //   subtext1: '...or why we don\'t understand art',
  // },
  {
    key: '2',
    image: require('../assets/images2/honkE.jpeg'),
    headline: "One Wayward Honk",
    subtext1: 'homeward',
    subtext2: '...or the joys of aloneness',
  }, 
  {
    key: '3',
    image: require('../assets/images2/showmanE.jpeg'),
    headline: 'The Showman',
    subtext1: "show",
    subtext2: '...or why perform'
  }

  // {
  //   key: '2',
  //   image: require('../assets/images2/1.png'),
  //   headline: 'Light',
  //   subtext1: 'coming soon',
  // },
]

const sections3 = [
  {
    key: '1',
    image: require('../assets/images2/hamletNew.jpeg'),
    headline: 'Playing Hamlet',
    subtext1: '...or why we don\'t understand art',
  },
  // {
  //   key: '2',
  //   image: require('../assets/images2/5.png'),
  //   headline: "Einstein",
  //   subtext1: '...or why be a genius',
  // },
  // {
  //   key: '3',
  //   image: require('../assets/images2/6.png'),
  //   headline: "Picasso",
  //   subtext1: '...or why draw',
  // }
]

const sections4 = [
  {
    key: '1',
    image: require('../assets/images2/honkE.jpeg'),
    headline: "One Wayward Honk",
    subtext1: 'homeward',
    subtext2: '...or the joys of aloneness',
  }, 
  {
    key: '2',
    image: require('../assets/images2/showmanE.jpeg'),
    headline: 'The Showman',
    subtext1: "show",
    subtext2: '...or why perform'
  }

]
  const goModeHandler = () => {
    setGoMode(false);
    navigation.navigate('stayMode');
    setGoMode(true);
  }

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
        <StatusBar hidden = {true} />
      <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
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
        <ImageBackground
          source={require('../assets/images2/GoMode1.png')}
          resizeMode="cover" // Cover the entire area of the View
          style={styles.section1}>
          <Text style = {[styles.subText, styles.editorialPos1]}>editorial</Text>
          <Text style={[styles.titleText, styles.editorialTitle]}>The Essential Manifesto</Text>
          <Text style = {[styles.subText,styles.editorialPos2]}>...or why you should continue listening to this</Text>
        </ImageBackground>
      </TouchableOpacity>
      <View style={[styles.line]} />
    <Text style = {styles.rightText}> impressions</Text>

    <FlatList
      data={sections1}
      horizontal={true}
      pagingEnabled={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity 
            onPress={() => 
              item.key === '1' ? navigation.navigate('goModeDream') :
              item.key === '2' ? navigation.navigate('goModeAutumn') :
              item.key === '3' ? navigation.navigate('goModeOnward') : 4 } 
            activeOpacity={0.9}
        >
          <View style = {styles.section2}>
            <ImageBackground
              source={item.image}
              resizeMode="cover"
              style={styles.section1Container}>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.key}
    />

<View style={[styles.line]} />
    <Text style = {styles.rightText}> intuitions</Text>

    <FlatList
      data={sections2}
      horizontal={true}
      pagingEnabled={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity 
            onPress={() => 
              item.key === '1' ? navigation.navigate('immortal') :
              // item.key === '2' ? navigation.navigate('dream') : 
              item.key === '2' ? navigation.navigate('goModeHonk') :
              item.key === '3' ? navigation.navigate('goModeShowman') : 4} 
            activeOpacity={0.9}
        >
          <View style = {styles.section2}>
            <ImageBackground
              source={item.image}
              resizeMode="cover"
              style={styles.section1Container}>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.key}
    />

    {/* <View style={[styles.line]} />
    <Text style = {styles.rightText}> intuitions</Text>

    <FlatList
      data={sections3}
      horizontal={true}
      pagingEnabled={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity 
            onPress={() => 
              item.key === '1' ? navigation.navigate('goModeHamlet') : 2
              // item.key === '2' ? navigation.navigate('einstein') :
            }
            activeOpacity={0.9}
        >
          <View style = {styles.section2}>
            <ImageBackground
              source={item.image}
              resizeMode="cover"
              style={styles.section1Container}>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.key}
    />

<View style={[styles.line]} />
    <Text style = {styles.rightText}> verse</Text>

    <FlatList
      data={sections4}
      horizontal={true}
      pagingEnabled={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity 
            onPress={() => 
              item.key === '1' ? navigation.navigate('goModeHonk') :
              item.key === '2' ? navigation.navigate('goModeShowman'): 3 } 
            activeOpacity={0.9}
        >
          <View style = {styles.section2}>
            <ImageBackground
              source={item.image}
              resizeMode="cover"
              style={styles.section1Container}>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.key}
    /> */}
      </ScrollView>
    <Animated.View style ={[styles.footer, {
      shadowOpacity: 2,
      shadowRadius: 3,
      shadowColor: '#000',
      shadowOffset: { height: 0, width: 0 },
      elevation: 2 // for Android shadow
    }]}>
    <View>
      <Text>Data from API - {data.key}</Text>
    </View>
    <TouchableOpacity onPress={goModeHandler}>
        <View style={goMode ? styles.imageBox : styles.imageBoxActive}>
          <Image source={require('../assets/images2/stayMode.png')} style={styles.imageFooter} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setGoMode(true)}>
      <View style={goMode ? styles.imageBoxActive : styles.imageBox}>
          <Image source={require('../assets/images2/goMode.png')} style={styles.imageFooter}/>
        </View>
      </TouchableOpacity>
    </Animated.View>    

    </View>
  
    );
  }


  const styles = StyleSheet.create({
    linearGradient: {
      width: '100%',
      height: height*0.4, 
      justifyContent: 'center',
      alignItems: 'center',
      top:height*0.177,
    },
    section1Container: {
      width: height*0.22, 
      height: height*0.22,
      justifyContent:'center',
      // margin:15,
      borderRadius: 10,
      overflow:"hidden",
      marginLeft:10,
      marginRight:10,
      backgroundColor: '#fff',
    },
    section1: {
      position: 'relative',
      width: width,
      height: height*0.4,
      resizeMode:'contain',
      justifyContent: 'flex-end', 
      alignItems: 'flex-start', 
      marginBottom: 10,
      backgroundColor: '#fff',
    },
    section2: {
      backgroundColor: '#fff',
      position: 'relative',
      width: height*0.2,
      height: height*0.2,
      resizeMode:'contain',
      justifyContent: 'flex-end', 
      alignItems: 'flex-start', 
      // borderRadius: 10,
      // overflow:'hidden'
    },

    headerImage: {
      width: 40,  
      bottom: 30,       
      height: 30,  
      resizeMode: 'contain',
      paddingTop:height/4,
      
    },
    stickyHeader: {
      height: height/8,
      backgroundColor: 'white',
      position: 'relative',  
      alignItems: 'center',
      zIndex: 1,
    },
    container : {
      flex:1,
      backgroundColor: '#fff',
    },
    imageBox: {
      backgroundColor: '#fff',
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
      backgroundColor: '#fff',
    },
    imageFooter:{
      width: 30,  
      height: 30, 
      resizeMode: 'contain' 
    },
    footer: {
      padding: 10,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection:'row'
    },
    subText : {
      fontSize: 16,
      fontStyle: 'normal',
      textAlign: 'center',
      color: '#000',
      letterSpacing: -0.24,
      alignItems: 'center',
      fontFamily: 'Bodoni',
      lineHeight: 20,
      fontWeight: '400',
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
    editorialPos1: {
      bottom:height/15,
      left:width/7,
    },
    editorialPos2:{
      width: width/3,
      bottom:height/20,
      left:width/20,
    },
    editorialTitle :{
      bottom:height/20,
      left:width/20,
      width:width/3,
    },
    line: {
      position:"relative",
      width: width/1.1, 
      backgroundColor: '#000',
      marginVertical: 5, // This adds horizontal space around the line
      height: 1, // This makes the line span the full height of the container
      top:1,
      left: width/20,
    },
    rightText: {
      fontSize: 16,
      fontStyle: 'normal',
      textAlign: 'right',
      color: '#000',
      alignItems: 'center',
      fontFamily: 'Bodoni',
      // top:height/3.9,
      right:width/20,
      marginBottom:10
    },
  });


  

  
export default GoModeScreen;