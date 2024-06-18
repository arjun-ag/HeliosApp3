import {Animated, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

  import { NativeStackNavigationProp } from '@react-navigation/native-stack';
  import { Text, View } from 'react-native';
  import Svg, { Path } from 'react-native-svg'; // If you want to use react-native-svg

  
  const {width, height} = Dimensions.get('window');
  
  type Props = {
    navigation: NativeStackNavigationProp<any>;
  };

  const filmContent = {
    title: 'Children of the Sea'
  }
  const partnerCast = [
    {
      name:'Gitanjali J Angmo',
      role:'Playing Jay',
      image:require('../assets/images2/partner1.jpeg'),
    },
    {
      name:'Gitanjali J Angmo',
      role:'Playing Jay',
      image:require('../assets/images2/partner1.jpeg'),
    },
    {
      name:'Gitanjali J Angmo',
      role:'Playing Jay',
      image:require('../assets/images2/partner1.jpeg'),
    },
  ]
  const partnerCrew = [
    {
      name:'Sonam Wangchuk',
      role:'Director',
      image:require('../assets/images2/partner2.png'),
    },
    {
      name:'Sonam Wangchuk',
      role:'Director',
      image:require('../assets/images2/partner2.png'),
    },
    {
      name:'Sonam Wangchuk',
      role:'Director',
      image:require('../assets/images2/partner2.png'),
    },
  ]

  const episodeContent = {
    episodeNumber: 'Episode one',
    episodeTitle: 'Turbulence',
    runtime: '10 min',
    cc: true,
    languages:'Hindi, English, Bangla',
    overview: 'Two roads diverged in a yellow wood And sorry I could not travel both And be one traveler, long I stood And looked down one as far as I could To where it bent in the undergrowth',
    image: require('../assets/images2/cotsep1.jpeg'),
  }

  const PlayIcon = () => (
    <Svg width="11" height="13" viewBox="0 0 11 13" fill="none">
  <Path d="M11 6.5C11.0004 6.66976 10.9569 6.83674 10.8736 6.98469C10.7904 7.13265 10.6703 7.25654 10.525 7.34433L1.52 12.8528C1.36818 12.9458 1.19429 12.9965 1.0163 12.9998C0.838305 13.0031 0.662659 12.9588 0.5075 12.8716C0.353819 12.7856 0.225798 12.6603 0.136602 12.5085C0.0474071 12.3567 0.000256786 12.1839 0 12.0079V0.992139C0.000256786 0.816076 0.0474071 0.643258 0.136602 0.491458C0.225798 0.339657 0.353819 0.214353 0.5075 0.128431C0.662659 0.0411528 0.838305 -0.00312456 1.0163 0.000171458C1.19429 0.00346747 1.36818 0.0542175 1.52 0.14718L10.525 5.65567C10.6703 5.74346 10.7904 5.86735 10.8736 6.01531C10.9569 6.16326 11.0004 6.33024 11 6.5Z" fill="black"/>
</Svg>
  )

  const SubtitleIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <Path d="M5 4C4.45 4 4 4.18 3.59 4.57C3.2 4.96 3 5.44 3 6V18C3 18.56 3.2 19.04 3.59 19.43C4 19.82 4.45 20 5 20H19C19.5 20 20 19.81 20.39 19.41C20.8 19 21 18.53 21 18V6C21 5.47 20.8 5 20.39 4.59C20 4.19 19.5 4 19 4H5ZM4.5 5.5H19.5V18.5H4.5V5.5ZM7 9C6.7 9 6.47 9.09 6.28 9.28C6.09 9.47 6 9.7 6 10V14C6 14.3 6.09 14.53 6.28 14.72C6.47 14.91 6.7 15 7 15H10C10.27 15 10.5 14.91 10.71 14.72C10.91 14.53 11 14.3 11 14V13H9.5V13.5H7.5V10.5H9.5V11H11V10C11 9.7 10.91 9.47 10.71 9.28C10.5 9.09 10.27 9 10 9H7ZM14 9C13.73 9 13.5 9.09 13.29 9.28C13.09 9.47 13 9.7 13 10V14C13 14.3 13.09 14.53 13.29 14.72C13.5 14.91 13.73 15 14 15H17C17.3 15 17.53 14.91 17.72 14.72C17.91 14.53 18 14.3 18 14V13H16.5V13.5H14.5V10.5H16.5V11H18V10C18 9.7 17.91 9.47 17.72 9.28C17.53 9.09 17.3 9 17 9H14Z" fill="white"/>
</Svg>
  )

  const DreamScreen:React.FC<Props> = ({ navigation }) => {
    
    
    return (
    <View style = {styles.container}>

<Animated.View style ={[styles.header, {
      // shadowOpacity: 2,
      // shadowRadius: 3,
      // shadowColor: '#000',
      // shadowOffset: { height: 0, width: 0 },
      elevation: 2 // for Android shadow
    }]}>
      <Image source={require('../assets/images2/backIcon.png')} style ={styles.headerBackIcon}></Image>
      <Text style = {[styles.headerTitle, styles.CaslonFont]}>{filmContent.title}</Text>
      <Image source={require('../assets/images2/accountIcon.png')} style={styles.headerAccountIcon} />
    </Animated.View>
        
        <ScrollView style={styles.scrollContainer}>

        <ImageBackground
          source={episodeContent.image}
          resizeMode="cover"
          style={styles.mainEpisodeContainer}>
      
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

          {/* <Text style = {[styles.mainPos1]}>{film.subtitle}</Text>
          <Text style={[styles.mainTitle]}>{film.title}</Text> */}

          <View style = {styles.episodeInformation}>
          <Text style={[styles.epNumber, styles.IMFellFont]}>{episodeContent.episodeNumber}</Text>
          <Text style={[styles.epTitle, styles.KaiseiRegularFont]}>{episodeContent.episodeTitle}</Text>
          <TouchableOpacity style={styles.playButtonContainer} onPress={() => navigation.navigate('editorial')}>
            <PlayIcon />
              <Text style={[styles.playText, styles.CaslonFont]}>Play Episode</Text>
          </TouchableOpacity>
          <View style = {styles.metaInfoContainer}>
              <Text style={[styles.runtime, styles.CaslonFont]}>{episodeContent.runtime}</Text>
              <View style = {styles.dot}></View>
              {episodeContent.cc ? (
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <SubtitleIcon/>
            <View style = {styles.dot}></View>
            </View>
          ) : (
            <View/>
          )}
              <Text style={[styles.languages, styles.CaslonFont]}>{episodeContent.languages}</Text>
          </View>
          </View>
        </ImageBackground>

        <View style={styles.overviewContainer}>
          <Text style={[styles.overviewTitle, styles.CaslonFont]}>Overview</Text>
          <Text style={[styles.overviewDescription, styles.CaslonFont]}>{episodeContent.overview}</Text>
        </View>

        <View style={styles.partnerMainContainer}>
          <View style={styles.lineContainer}>
            <View style={styles.line}></View>
          </View>

          <Text style={[styles.partnerHeader, styles.KaiseiRegularFont]}>Cast</Text>

          {partnerCast.map((item, index) => (
          <View key={index} style={styles.partnerContainer}>
            <Image
              source={item.image}
              style={styles.partnerImage}
            />
            <View style={styles.partnerInfoContainer}>
            <Text style={[styles.partnerName, styles.IMFellFont]}>{item.name}</Text>
            <Text style={[styles.partnerRole, styles.CaslonFont]}>{item.role}</Text>
            </View>
          </View>          
        ))}

<Text style={[styles.partnerHeader, styles.KaiseiRegularFont]}>Crew</Text>
          
{partnerCrew.map((item, index) => (
          <View key={index} style={styles.partnerContainer}>
            <Image
              source={item.image}
              style={styles.partnerImage}
            />
            <View style={styles.partnerInfoContainer}>
            <Text style={[styles.partnerName, styles.IMFellFont]}>{item.name}</Text>
            <Text style={[styles.partnerRole, styles.CaslonFont]}>{item.role}</Text>
            </View>
          </View>          
        ))}

        </View>


            {/* <TouchableOpacity onPress={() => navigation.navigate('stayMode')}>
              <Image
                source={require('../assets/images2/dice.png')} // Replace with your image URL or local source
              />
            </TouchableOpacity> */}

        </ScrollView>

      </View>

        );    
  }
  
  
  
  
  const styles = StyleSheet.create({
    KaiseiRegularFont: {
      fontFamily: 'KaiseiRegular'
    },
    IMFellFont: {
      fontFamily:'IMFell'
    },
    CaslonFont: {
      fontFamily: 'Caslon'
    },
    partnerHeader: {
      fontSize: 26,
fontStyle: 'normal',
fontWeight: '400',
lineHeight: 34,
letterSpacing: -0.24,
marginLeft:30,
marginBottom:30
    },
    partnerContainer: {
      flexDirection:'row'
    },
    partnerImage: {
      width:108,
      height:108,
      borderRadius:108,
      marginLeft:2,
      marginBottom:55,
    },
    partnerInfoContainer: {
      marginLeft:31,
      marginTop:23
    },
    partnerName: {
      marginBottom:8,
      fontSize: 26,
fontStyle: 'normal',
fontWeight: '400',
lineHeight: 34, /* 76.923% */
letterSpacing: -0.24,

    },
    partnerRole: {
      fontSize: 17,
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 34, /* 76.923% */
      letterSpacing: -0.24,

    },
    lineContainer:{
      alignItems:'center',
      justifyContent:'center',
      marginTop:21,
      marginBottom:26,
      width:width
    },
    line: {
      width: 50,
      backgroundColor: '#000',
      height: 1.5,
      right:width/16
    },
    partnerMainContainer: {
      backgroundColor: '#D9D9D9',
      padding: 20,
      borderRadius: 20,
      margin: 10,
      flexShrink: 1, // allows the box to shrink
      paddingBottom:1,
      marginBottom:37,
    },
    overviewContainer: {
      width:width/1.1,
      left:width/20,
      bottom:height/15
    },
    overviewTitle: {
      fontSize: 26,
      fontStyle: 'normal',
fontWeight: '400',
lineHeight: 34,
letterSpacing: -0.24,
color:'white',
marginBottom:20,

    },
    overviewDescription: {
      fontSize:18,
fontStyle: 'normal',
fontWeight: '400',
lineHeight: 28,
letterSpacing: -0.24,
color:'white'

    },
    epNumber: {
      fontSize: 24,
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 34,
      letterSpacing: -0.24,
      color:'white',
      marginBottom:7
    },
    epTitle: {
      fontSize: 34,
      fontStyle: 'normal',
      fontWeight: '700',
      lineHeight: 34,
      letterSpacing: -0.24,
      color:'white',
      marginBottom:32
    },
    playButtonContainer: {
      flexDirection:'row',
      backgroundColor: 'white',
    paddingVertical: 6,
    paddingHorizontal: 24,
    borderRadius: 9,
    width:200,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:26
    },
    metaInfoContainer: {
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'space-between',
      width:width/1.5,
      right:20

    },
    playText: {
     marginLeft:15,
     fontSize: 16,
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 20,
      color:'black',
    },
    runtime: {
      color:'white',
      fontSize: 16,
fontStyle: 'normal',
fontWeight: '400',
lineHeight: 20,
    },
    dot: {
     width:5,
     height:5,
     backgroundColor:'white',
     borderRadius:108,
     marginHorizontal:20
    },

    languages: {
      fontSize: 16,
fontStyle: 'normal',
fontWeight: '400',
lineHeight: 20,
color:'white'
    },
    episodeInformation: {
      position:'relative',
      bottom:height/6,
      justifyContent:'center',
      alignItems:'center'
    },
    mainEpisodeContainer: {
      position: 'relative',
      width: width,
      height: height/1.3,
      justifyContent: 'center',
      alignItems: 'center',

    },
    linearGradient: {
      width: '100%',
      height: height*0.3, // Adjust the height of the gradient as needed
      justifyContent: 'center',
      alignItems: 'center',
    },
    linearGradientTop: {
      // bottom:height*0.008,
      top:height*0.03
    },
    linearGradientBottom: {
      top: height*0.21
    },
    header: {
      backgroundColor: 'rgba(31, 35, 39, 0.93)',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection:'row',
      alignContent:'center',   
      padding: height*0.05
    },
    headerTitle: {
     color:'white',
     fontSize:24,
     fontStyle:'normal',
     fontWeight:'400',
     lineHeight:44,
     letterSpacing:-0.24,
     top:height*0.02,

    },
    headerBackIcon: {
      width: 24,  
      height: 24,  
      resizeMode: 'contain',
      right:width*0.1, 
      top:height*0.02
    },
    headerAccountIcon: {
      width: 24,  
      height: 24,  
      // top:height/35,
      // left:width/3,
      left:width*0.13,
      top:height*0.02,
      resizeMode: 'contain',
    },
    container: {
      flex: 1,
      backgroundColor: '#1F2327',
    },  
    scrollContainer: {
      flex:1,
      // justifyContent:'center',
      // alignItems:'center'
    }
  });
  
export default DreamScreen;