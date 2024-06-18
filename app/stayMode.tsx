import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Animated, StyleSheet, Image, Dimensions, ViewToken , ScrollView, FlatList, StatusBar, ImageBackground,  Vibration, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg'; // If you want to use react-native-svg
import { Video, ResizeMode } from 'expo-av';
import { fetchS3Object, getSignedUrl } from '@/s3-utils';
import HapticFeedback from 'react-native-haptic-feedback';





const {width, height} = Dimensions.get('window');

const DirectorLogo = () => (<Svg
width="20"
height="20"
fill="none"
viewBox="0 0 20 20"
>
<Path
  fill="#FFA600"
  d="M7.858 17.71L10 14H3.07a8.018 8.018 0 004.788 3.71zM2.252 12h4.284L3.07 5.999A7.963 7.963 0 002 10c0 .69.088 1.36.252 2zm2.143-7.708L6.535 8 10 2a7.974 7.974 0 00-5.605 2.292zm7.747-2.002L10 6h6.93a8.018 8.018 0 00-4.788-3.71zM17.748 8h-4.284l3.465 6.001A7.964 7.964 0 0018 10c0-.675-.084-1.347-.252-2zm-2.143 7.708L13.465 12 10 18a7.974 7.974 0 005.605-2.292zM10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm1.155-12h-2.31l-1.154 2 1.154 2h2.31l1.154-2-1.154-2z"
></Path>
</Svg>
);

const InterviewLogo = () => (
<Svg
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
        <Path
          fill="#FFA600"
          d="M17.5 17.75c0-.75 2.5-2.25 2.5-3.875 0-1.875-1.75-3.375-3.875-4 .875-1 1.375-2.125 1.375-3.5C17.5 2.875 13.875 0 9.25 0 4.875 0 0 2.625 0 6.375c0 2.625 2 4.5 2.875 5.25-.125 1.5-.75 2.125-.75 2.125L.625 15H2.5c2 0 3.625-.625 4.625-1.375v.25c0 2.5 2.75 4.5 6.25 4.5h.75c.5.625 2.125 1.75 4.25 1.75C18.5 20 17.5 19.5 17.5 17.75zM9.25 1.25c3.875 0 7 2.375 7 5.125S13 11.5 9 11.5H7.625l-.125.25c-.375.5-1.875 1.5-3.875 1.875.125-.5.125-1.25.125-2.25V11C2.5 10 1.125 8.25 1.125 6.5c0-2.75 4-5.25 8.125-5.25z"
        ></Path>
    </Svg>
)

const MusicLogo = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <Path fill-rule="evenodd" clip-rule="evenodd" d="M20 4V17C19.9997 17.6368 19.7967 18.2569 19.4206 18.7707C19.0444 19.2844 18.5145 19.6652 17.9076 19.8578C17.3007 20.0505 16.6482 20.045 16.0446 19.8422C15.441 19.6394 14.9176 19.2498 14.5501 18.7298C14.1826 18.2098 13.9901 17.5864 14.0004 16.9497C14.0107 16.313 14.2234 15.6961 14.6076 15.1883C14.9918 14.6806 15.5276 14.3082 16.1375 14.1251C16.7473 13.942 17.3997 13.9577 18 14.17V6H10V19C9.99967 19.6368 9.79673 20.2569 9.42057 20.7707C9.0444 21.2844 8.51451 21.6652 7.90759 21.8578C7.30067 22.0505 6.64819 22.045 6.04459 21.8422C5.44098 21.6394 4.91755 21.2498 4.55006 20.7298C4.18256 20.2098 3.99005 19.5864 4.0004 18.9497C4.01074 18.313 4.2234 17.6961 4.60759 17.1883C4.99179 16.6805 5.52759 16.3082 6.13747 16.1251C6.74735 15.942 7.39966 15.9577 8 16.17V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H18C18.5304 2 19.0391 2.21071 19.4142 2.58579C19.7893 2.96086 20 3.46957 20 4Z" fill="#FFA600"/>
</Svg>
)

const WritingLogo = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <Path d="M8.14777 15.276L6.49777 16.376L6.08277 18.056L7.74777 17.636L8.85177 15.98L8.14777 15.276ZM9.59977 13.899L10.2268 14.526L10.3178 14.494C11.2548 14.16 12.1978 13.475 13.1418 12.405C14.2808 11.115 16.2028 8.81804 18.8988 5.52604C18.9321 5.48555 18.9491 5.43412 18.9466 5.38175C18.9441 5.32939 18.9221 5.27984 18.885 5.24277C18.848 5.2057 18.7984 5.18375 18.7461 5.18122C18.6937 5.17868 18.6423 5.19572 18.6018 5.22904C15.3158 7.92204 13.0188 9.84504 11.7208 10.987C10.6448 11.933 9.96077 12.875 9.63277 13.806L9.59977 13.899ZM8.98477 19.385L3.34277 20.814L4.74277 15.143L7.74677 13.139C8.19977 11.863 9.08277 10.645 10.3998 9.48604C11.7198 8.32404 14.0318 6.38904 17.3358 3.68204C17.7597 3.33154 18.2991 3.15173 18.8486 3.17777C19.398 3.20381 19.918 3.43382 20.3069 3.82284C20.6958 4.21186 20.9257 4.73193 20.9515 5.28139C20.9774 5.83085 20.7974 6.37021 20.4468 6.79404C17.7368 10.103 15.8018 12.414 14.6428 13.728C13.4868 15.038 12.2698 15.921 10.9908 16.378L8.98477 19.385Z" fill="#FFA600"/>
</Svg>
)

interface GoLogoProps {
  color: string;
}

const GoLogo:React.FC<GoLogoProps> = ({color}) => (
  <Svg width="12" height="26" viewBox="0 0 12 26" fill="none">
  <Path d="M0.315405 2.01824L9.53686 12.1686C9.7391 12.3901 9.85254 12.689 9.85254 13.0006C9.85254 13.3121 9.7391 13.611 9.53686 13.8325L0.317406 23.9829C0.115267 24.2057 0.00200081 24.5056 0.00200081 24.8181C0.00200081 25.1305 0.115267 25.4304 0.317406 25.6533C0.416154 25.763 0.534179 25.8502 0.664525 25.9098C0.794871 25.9693 0.934901 26 1.07636 26C1.21782 26 1.35785 25.9693 1.4882 25.9098C1.61854 25.8502 1.73657 25.763 1.83531 25.6533L11.0548 15.5051C11.6606 14.8367 12 13.9373 12 13.0006C12 12.0638 11.6606 11.1644 11.0548 10.496L1.83531 0.347822C1.73654 0.237757 1.61839 0.150266 1.48786 0.0905237C1.35733 0.0307812 1.21706 0 1.07536 0C0.933659 0 0.793397 0.0307812 0.662866 0.0905237C0.532334 0.150266 0.414185 0.237757 0.315405 0.347822C0.113266 0.570665 0 0.8706 0 1.18303C0 1.49547 0.113266 1.7954 0.315405 2.01824Z" fill={color}/>
</Svg>
)


type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const film = {
  key: 1,
  title: 'Children of the Sea',
  subtitle: 'Motion Picture Series',
  director:'Arya',
  directorNote: ' I will answer one question - what is the essence of this publication; in other words, the question of what this publication will grow to become.',
  section1:'Director\'s Note',
  section2:'Interviews',
  section3:'Music',
  section4:'Editorial'
}

const partners = [
  {
    key:'1',
    name: 'Gitanjali J Angmo',
    image: require('../assets/images2/partner1.jpeg')
  },
  {
    key:'2',
    name: 'Sonam Wangchuk',
    image: require('../assets/images2/partner2.png')
  }
]
const episodes = [
  {
    key: '1',
    image: require('../assets/images2/wayward.png'),
    episodeNumber: 'Episode one',
    episodeName: 'turbulence',
    episodePlay: 'Play',
    episodeDescription: 'We venture into sea life on the coasts on India. Watch us take the'
  },
  {
    key: '2',
    image: require('../assets/images2/onward.jpeg'),
    episodeNumber: 'Episode two',
    episodeName: 'turbulence',
    episodePlay: 'Play',
    episodeDescription: 'We venture into sea life on the coasts on India. Watch us take the'
  },
  {
    key: '3',
    image: require('../assets/images2/honk.jpeg'),
    episodeNumber: 'Episode three',
    episodeName: 'turbulence',
    episodePlay: 'Play',
    episodeDescription: 'We venture into sea life on the coasts on India. Watch us take the'
  },
];

const interviewContent = [
  {
    key: '1',
    image: require('../assets/images2/honk.jpeg'),
    title: 'Raising a Child',
    subtitle: 'With Gitanjali J Angmo',
    text: 'Whose woods these are I think I know His house is in the village though He will not see me stopping here To watch his woods fill up with snow'
  },
  {
    key: '2',
    image: require('../assets/images2/honkE.jpeg'),
    title: 'Living Simply',
    subtitle: 'With Sonam Wangchuk',
    text: 'My little horse must think it queer To stop without a farmhouse near Between the woods and frozen lake The darkest evening of the year'
  },
  {
    key: '3',
    image: require('../assets/images2/lostNew.jpeg'),
    title: 'The Market and Heart',
    subtitle: 'With Jay Jayshankar',
    text: 'He gives his harness bells a shake To ask if there is some mistake The only other sound\'s the sweep Of easy wind and donwy flake'
  }
]

const musicContent = [
  {
    key: '1',
    image: require('../assets/images2/music.png'),
    title: 'Transcendence',
    subtitle: 'Extended Play',
  },
]

const writingContent = [
  {
    key: '1',
    image: require('../assets/images2/manifestoE.jpeg'),
    title: 'Directing your First Film',
    subtitle: 'Written by Arya',
    text: 'The woods are lovely, dark and deep But I have promises to keep And miles to go before I sleep And miles to go before I sleep',
  }
]


const StayModeScreen:React.FC<Props> = ({ navigation }) => {

  const [filmContent, setFilmContent] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const filmContentUrl = await getSignedUrl('myvodappstack-cotshomebucket55bfd178-wh4jgdwduqj4', 
          'filmDetails.json'
        );
        setFilmContent(await fetchS3Object(filmContentUrl));
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
    console.log(filmContent)
  }, []);

  const video = useRef<Video>(null);

  useEffect(() => {
    const playVideo = async () => {
      if (video.current) {
        await video.current.playAsync();
      }
    };
    playVideo();
  }, []);

  const [goMode, setGoMode] = useState(false);

  const goModeHandler = () => {
    setGoMode(true);
    navigation.navigate('goMode');
    setGoMode(false);
  }

  const [mainFilmImage, setMainFilmImage] = useState(0);

  const mainItemsChanged = React.useCallback(({ viewableItems }: { viewableItems: ViewToken[], changed: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      if (viewableItems[0].index == null) {
        setMainFilmImage(0);
      } else {
        setMainFilmImage(viewableItems[0].index);
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


  const [expanded, setExpanded] = useState(false);
  const scale = new Animated.Value(0);

  const handlePress = () => {
    HapticFeedback.trigger('impactLight');
    Vibration.vibrate(50);
    Animated.spring(scale, {
      toValue: expanded ? 0 : 1,
      useNativeDriver: true,
    }).start();
    setExpanded(!expanded);
  };


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

    <FlatList
      data={episodes}
      horizontal={true}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      onViewableItemsChanged={mainItemsChanged}
      keyExtractor={item => item.key}
      renderItem={({ item }) => (

      <TouchableOpacity onPress={() => 
              item.key === '1' ? navigation.navigate('dream') :
              item.key === '2' ? navigation.navigate('autumn') :
              item.key === '3' ? navigation.navigate('onward') : 4 } 
            activeOpacity={0.9}
        >
        <ImageBackground
          source={item.image}
          resizeMode="cover"
          style={styles.mainFilmContainer}>
      
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

          <Text style = {[styles.subtitle, styles.IMFellFont]}>{film.subtitle}</Text>
          <Text style={[styles.mainTitle, styles.CorbenRegularFont]}>{film.title}</Text>

          <Text style={[styles.epNumber, styles.IMFellFont]}>{item.episodeNumber}</Text>
          <Text style={[styles.epName, styles.KaiseiRegularFont]}>{item.episodeName}</Text>
          <TouchableOpacity style={styles.playButtonContainer} onPress={() => navigation.navigate('editorial')}>
              <Text style={[styles.playButton, styles.CaslonFont]}>{item.episodePlay}</Text>
          </TouchableOpacity>
          <Text style={[styles.epDescription, styles.CaslonFont]}>{item.episodeDescription}</Text>
          
        </ImageBackground>
        <View style={styles.indicatorContainer}>
      {episodes.map((_, index) => (
        <View
          key={index}
          style={[
            styles.indicator,
            mainFilmImage === index ? styles.activeIndicator : null,
          ]}
        />
      ))}
      </View>
      </TouchableOpacity>
      )}
      />


    <View style={styles.noteContainer}>
      <View style={styles.noteTitleBox}>
        <DirectorLogo />
        <Text style={[styles.noteTitle, styles.KaiseiRegularFont]}>{film.section1}</Text>
      </View>
      <Text style={[styles.note, styles.CaslonFont]}>{film.directorNote}</Text>
    </View>


    <View style={styles.writingContainer}>
      <View style={styles.writingHeaderBox}>
        <WritingLogo />
        <Text style={[styles.writingHeader, styles.KaiseiRegularFont]}>{film.section4}</Text>
      </View>

        {writingContent.map((item, index) => (
          <View key={index} style={styles.writingContentContainer}>
            <Image
              source={item.image} // replace with your image URL or local asset
              style={styles.writingImage}
            />
            <View style={styles.writingTitleBox}>
              <Text style={[styles.writingTitle, styles.KaiseiRegularFont]}>{item.title}</Text>
              <GoLogo color='white'></GoLogo>
            </View>
            <Text style={[styles.writingSubtitle, styles.KaiseiRegularFont]}>{item.subtitle}</Text>
            <Text style={[styles.writingText, styles.CaslonFont]}>{item.text}</Text>
            {/* <View style={styles.lineContainer}>
                <View style={styles.line} />
            </View> */}
          </View>
        ))}
    </View>

    <View style={styles.interviewContainer}>
      <View style={styles.interviewHeaderBox}>
        <InterviewLogo />
        <Text style={[styles.interviewHeader, styles.KaiseiRegularFont]}>{film.section2}</Text>
      </View>

        {interviewContent.map((item, index) => (
          <View key={index} style={styles.interviewContentContainer}>
            <View style={styles.interviewImage}>
              <View style={styles.interviewImageInner}>
              <Video
        ref={video}
        source={require('../assets/audio/honk.mp4')}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        shouldPlay={true}
        isLooping={true}
        style={styles.video}
        resizeMode={ResizeMode.CONTAIN}
      />
      </View>
              </View>
              <View style={styles.interviewTitleBox}>
            <Text style={[styles.interviewTitle, styles.KaiseiRegularFont]}>{item.title}</Text>
            <GoLogo color='black'></GoLogo>
            </View>
            <Text style={[styles.interviewSubtitle, styles.KaiseiRegularFont]}>{item.subtitle}</Text>
            <Text style={[styles.interviewText, styles.CaslonFont]}>{item.text}</Text>
            <View style={styles.lineContainer}>
                <View style={styles.line} />
            </View>
          </View>
        ))}
    </View>

    <View style={styles.musicContainer}>
      <View style={styles.musicHeaderBox}>
        <MusicLogo />
        <Text style={[styles.musicHeader, styles.KaiseiRegularFont]}>{film.section3}</Text>
      </View>

        {musicContent.map((item, index) => (
          <View key={index} style={styles.musicContentContainer}>
            <Image
              
            />
            <Image
              source={item.image}
              style={styles.musicImage}/>
              <Text style={[styles.musicSubtitle, styles.IMFellFont]}>{item.subtitle}</Text>
              <Text style={[styles.musicTitle, styles.IMFellFont]}>{item.title}</Text>
            <View style={styles.lineContainer}>
                <View style={styles.line} />
            </View>
          </View>
        ))}
    </View>

    <View style={styles.creditContainer}>
        <View style={[styles.line, styles.line2]}/>


        <Text style={[styles.creditTitle, styles.IMFellFont]}>{film.title}</Text>
        <Text style={[styles.creditFeaturing, styles.IMFellFont]}>Featuring</Text>

        {partners.map((item, index) => (
          <View style={styles.creditPartners}>
        <Image style={styles.creditPartnerImage} source={item.image}></Image>
        <Text style={[styles.creditPartnerName, styles.IMFellFont]}>{item.name}</Text>
        </View>
      ))}

        <Text style={[styles.creditDirection, styles.IMFellFont]}>Written & Directed by</Text>
        <Text style={[styles.creditDirector, styles.IMFellFont]}>{film.director}</Text>
        <Text style={[styles.creditFor, styles.IMFellFont]}>for</Text>
        <Image source={require('../assets/images2/logo.png')} style={styles.creditIcon} />
        <Text style={[styles.creditCompany, styles.IMFellFont]}>Agni, Inc.</Text>
        <Text style={[styles.creditStory, styles.CaslonFont]}>Sincere Stories</Text>

    </View>
  
    </ScrollView>

    {/* <Animated.View style ={[styles.footer, {
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
    </Animated.View> */}


    <Animated.View
        style={[
          styles.expandedCircle,
          {
            transform: [{ scale }],
          },
        ]}
      >
        {expanded && <Text style={styles.expandedText}>Expanded Content</Text>}
      </Animated.View>
      <TouchableOpacity style={styles.circle} onPress={handlePress}>
        <Text style={styles.circleText}>+</Text>
      </TouchableOpacity>

  </View>

  );
}



const styles = StyleSheet.create({
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  circleText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  expandedCircle: {
    position: 'absolute',
    bottom: 0,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 123, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandedText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  video: {
    width:'100%',
    height:'100%',
    borderRadius:20,
    overflow:'hidden',
    backgroundColor: 'transparent'
  },
  CorbenRegularFont: {
    fontFamily: 'CorbenRegular'
  },
  KaiseiRegularFont: {
    fontFamily: 'KaiseiRegular'
  },
  IMFellFont: {
    fontFamily:'IMFell'
  },
  CaslonFont: {
    fontFamily: 'Caslon'
  },
  creditPartners: {
    alignContent:'center',
    justifyContent: 'center',
    alignItems:'center'
  },
  creditContainer: {
    position:'relative',
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:30
  },
  creditTitle: {
     fontSize:50,
     fontStyle:'normal',
     fontWeight:'400',
     lineHeight:60,
     textAlign:'center',
     width:width/1.4,
     letterSpacing:-0.24,
     color:'white',
     margin:20,
  },
  creditFeaturing: {
     fontSize:16,
     fontStyle:'normal',
     fontWeight:'400',
     lineHeight:20,
     letterSpacing:-0.24,
     color:'white',
     margin:30
  },
  creditPartnerImage: {
    borderRadius:108,
    width:108,
    height:108,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    margin:15
  },
  creditPartnerName: {
     fontSize:26,
     fontStyle:'normal',
     fontWeight:'400',
     lineHeight:36,
     letterSpacing:-0.24,
     color:'white',
     marginBottom:30
  },
  creditDirection: {
     fontSize:16,
     fontStyle:'normal',
     fontWeight:'400',
     lineHeight:20,
     letterSpacing:-0.24,
     color:'white',
     marginTop:30
  },
  creditDirector: {
     fontSize:32,
     fontStyle:'normal',
     fontWeight:'400',
     lineHeight:30,
     letterSpacing:-0.24,
     color:'white',
     marginTop:20,
     marginBottom:25
  },
  creditFor: {
    fontSize:16,
    fontStyle:'normal',
    fontWeight:'400',
    lineHeight:20,
    letterSpacing:-0.24,
    color:'white',
    marginBottom:15
  },
  creditIcon: {
    width:71,
    height:71,
    margin:10,
    marginBottom:20
  },
  creditCompany: {
    fontSize:40,
    fontStyle:'normal',
    fontWeight:'400',
    lineHeight:40,
    letterSpacing:-0.24,
    color:'white',
    marginBottom:10
  },
  creditStory: {
     fontSize:16,
     fontStyle:'normal',
     fontWeight:'400',
     lineHeight:20,
     letterSpacing:-0.24,
     color:'white',
  },
  mainFilmContainer: {
    position: 'relative',
    width: width,
    height: height*0.75,
    resizeMode:'contain',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  noteContainer: {
    backgroundColor: '#6A7682',
    padding: 20,
    borderRadius: 20,
    margin: 10,
    flexShrink:1,
    position:'relative',
    marginBottom:15,
  },
  noteTitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    margin:10
  },
  noteTitle: {
    fontSize: 26,
    color:'black',
    fontStyle: 'normal',
    marginLeft: 20,
    fontWeight:'400',
    lineHeight:36, 
    letterSpacing: -0.24,
  },
  note: {
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight:'400',
    lineHeight:28, 
    letterSpacing: -0.24,
    color: '#000',
    width:width/1.1,
    marginTop:10,
    marginBottom:10
  },
  interviewContainer: {
    backgroundColor: '#D9D9D9',
    padding: 20,
    borderRadius: 20,
    margin: 10,
    flexShrink: 1, // allows the box to shrink
    paddingBottom:1,
    marginBottom:37,
  },
  interviewHeaderBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    margin:10
  },
  interviewHeader: {
    fontSize: 26,
    color:'black',
    fontStyle: 'normal',
    marginLeft: 20,
    fontWeight:'400',
    lineHeight:26, 
    letterSpacing: -0.24,
  },
  interviewContentContainer : {
    // marginBottom:30,
    marginTop:10,
    position:'relative'
  },
  interviewTitleBox: {
    marginTop:20,
    flexDirection:'row'
  },
  interviewTitle: {
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 33,
    marginTop:-15,
    marginRight:width/3
  },
  interviewSubtitle: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 23,
    // marginTop:-1
  },
  interviewText: {
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 23,
    marginTop:24
  },
  interviewImage: {
    width:width/1.2,
    borderRadius:20,
    height:height/4,
    flex:1,
    overflow: 'hidden',
    backgroundColor: 'transparent'
  },
  interviewImageInner: {
    flex: 1,
    overflow: 'hidden',
    borderRadius:20,
    backgroundColor: 'transparent'

  },
  lineContainer: {
    alignItems:'center',
    justifyContent:'center',
    marginTop:21,
    marginBottom:26
  },
  line: {
    width: 30,
    backgroundColor: '#000',
    height: 1.5,
  },
  line2: {
    backgroundColor:'white'
  },
  musicContainer: {
    backgroundColor: '#914C00',
    padding: 20,
    borderRadius: 20,
    margin: 10,
    marginBottom:37,
    flexShrink: 1, // allows the box to shrink
    paddingBottom:1
  },
  musicHeaderBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    margin:10
  },
  musicHeader: {
    fontSize: 26,
    color:'white',
    fontStyle: 'normal',
    marginLeft: 20,
    fontWeight:'400',
    lineHeight:26, 
    letterSpacing: -0.24,
  },
  musicContentContainer : {
    // marginBottom:30,
    marginTop:10,
    position:'relative',
    marginBottom:-height/10
  },
  musicTitle: {
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 34,
    bottom:height/11,
    left:width/6
  },
  musicSubtitle: {
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 34,
    bottom:height/11,
    left:width/3.5
  },
  musicImage: {
    width:width/1.2,
    height:height/2.5,
    borderRadius:20,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    bottom:height/20
  },
  writingContainer: {
    // backgroundColor: '#D9D9D9',
    padding: 20,
    borderRadius: 20,
    margin: 10,
    flexShrink: 1, // allows the box to shrink
    paddingBottom:1,
    marginBottom:45,
  },
  writingHeaderBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    // margin:10
  },
  writingHeader: {
    fontSize: 26,
    color:'white',
    fontStyle: 'normal',
    marginLeft: 10,
    fontWeight:'400',
    lineHeight:26, 
    letterSpacing: -0.24,
  },
  writingContentContainer : {
    marginTop:10,
    position:'relative'
  },
  writingTitleBox: {
    flexDirection:'row',
    width:width,
    marginTop:26,
  },
  writingTitle: {
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 33,
    color:'white',
    marginRight:30,
    marginTop:-4
  },
  writingSubtitle: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 23,
    marginTop:7,
    color:'white'
  },
  writingText: {
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 23,
    marginTop:19,
    color:'white'
  },
  writingImage: {
    width:width/1.2,
    borderRadius:20,
    height:height/4
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
  mainTitle: {
    fontFamily: 'Reross',
    fontSize:39,
    color: 'white',
    fontWeight: '400',
    lineHeight:60,
    fontStyle:'normal',
    letterSpacing:-0.24,
    bottom:height/2.05,
  },
  subtitle:{
    color:'white',
    bottom:height/2,
    lineHeight:34,
    fontSize:18,
    letterSpacing:-0.24,
    fontWeight:'400',
    fontStyle:'normal',
  },
  epNumber:{
    color:'white',
    bottom:height/6,
    lineHeight:34,
    fontSize:18,
    letterSpacing:-0.24,
    fontWeight:'400',
    fontStyle:'normal',
  },
  epName:{
    color:'white',
    bottom:height/6,
    lineHeight:34,
    fontSize:26,
    letterSpacing:-0.24,
    fontWeight:'400',
    fontStyle:'normal',
  },
  playButtonContainer: {
    backgroundColor: 'white',
    paddingVertical: 6,
    paddingHorizontal: 24,
    borderRadius: 16,
    bottom:height/7
  },
  playButton: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  epDescription:{
    color:'white',
    bottom:height/8,
    lineHeight:34,
    fontSize:15,
    letterSpacing:-0.24,
    fontWeight:'400',
    width:width/1.15,
    alignContent:'center',
    alignItems:'center',
    textAlign:'center'
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
    top:height*0.06,
  },
  linearGradientBottom: {
    top: height*0.25
  },

});

export default StayModeScreen;