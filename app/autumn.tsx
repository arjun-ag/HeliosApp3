import { StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
  import { NativeStackNavigationProp } from '@react-navigation/native-stack';
  import { ViewToken , FlatList, StatusBar, ImageBackground, View, Text, Vibration } from 'react-native';
  import { LinearGradient } from 'expo-linear-gradient';
  import Svg, { Path } from 'react-native-svg'; // If you want to use react-native-svg


  import React, { useState, useRef, useCallback, useEffect } from 'react';

  
  const {width, height} = Dimensions.get('window');
  interface InfoPopupProps {
    onClose: () => void;
  }
  
  type Props = {
    navigation: NativeStackNavigationProp<any>;
  };
  const artistImage = require('../assets/images2/demoImage.jpeg')
  
  const artistDetails = {
    role: 'Director | Actor',
    name: 'Robert Frost',
    note: "jkgn"
  }

  const BackSvg = () => (
    <Svg width="19" height="19" viewBox="0 0 19 19" fill="none">
  <Path d="M2.48129 9.6875L9.96392 17.1688L9.04167 18.0833L0 9.04167L9.04167 0L9.96392 0.9145L2.48 8.39583H18.0833V9.6875H2.48129Z" fill="white"/>
</Svg>
  )

  const InfoSvg = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <Path d="M11 9H13V7H11M12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM11 17H13V11H11V17Z" fill="white"/>
</Svg>
  )
  const PlusIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <Path d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99805H13V10.998H19V12.998Z" fill="#FFA600"/>
</Svg>
  )

  const CrownIcon = () => (
<Svg width="18" height="16" viewBox="0 0 18 16" fill="none">
  <Path d="M2 12L0 1L5.5 6L9 0L12.5 6L18 1L16 12H2ZM16 15C16 15.6 15.6 16 15 16H3C2.4 16 2 15.6 2 15V14H16V15Z" fill="#FFA600"/>
</Svg>
  )

  const ArtistIcon = () => (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
  <Path d="M15.4638 8.50056C15.4878 8.66686 15.5 8.83368 15.5 9C15.5 9.17197 15.4705 9.3409 15.4142 9.5C15.3403 9.70895 15.2204 9.90096 15.0607 10.0607C14.9873 10.134 14.9072 10.1989 14.8218 10.2549C14.8078 10.2425 14.7946 10.2301 14.7822 10.2178C14.6423 10.0779 14.5 9.83562 14.5 9.5C14.5 9.16438 14.6423 8.92213 14.7822 8.78223C14.9171 8.64741 15.1469 8.51033 15.4638 8.50056ZM11.8218 4.74516C12.0576 4.81192 12.2838 4.89124 12.5 4.98175C12.8478 5.12739 13.1695 5.30203 13.4629 5.5C13.4752 5.50833 13.4875 5.5167 13.4997 5.52511C13.4929 5.84772 13.3542 6.08138 13.2178 6.21777C13.0779 6.35767 12.8356 6.5 12.5 6.5C12.1644 6.5 11.9221 6.35767 11.7822 6.21777C11.6423 6.07787 11.5 5.83562 11.5 5.5C11.5 5.16438 11.6423 4.92213 11.7822 4.78223C11.7946 4.76986 11.8078 4.75747 11.8218 4.74516ZM4.52274 10.4998C4.50764 10.3343 4.5 10.1675 4.5 10C4.5 9.83239 4.50765 9.66557 4.52276 9.5C4.5532 9.16639 4.61392 8.83788 4.70334 8.51829C4.935 8.56106 5.10793 8.6724 5.21777 8.78223C5.35767 8.92213 5.5 9.16438 5.5 9.5C5.5 9.83562 5.35767 10.0779 5.21777 10.2178C5.08105 10.3545 4.84658 10.4935 4.52274 10.4998ZM8.22845 4.79312C8.36482 4.93453 8.5 5.17292 8.5 5.5C8.5 5.83562 8.35767 6.07787 8.21777 6.21777C8.07787 6.35767 7.83562 6.5 7.5 6.5C7.16438 6.5 6.92213 6.35767 6.78223 6.21777C6.67775 6.11329 6.57192 5.95173 6.52502 5.73682C6.62662 5.654 6.73092 5.57503 6.83768 5.5C7.04935 5.35125 7.27072 5.21801 7.5 5.10101C7.73514 4.98103 7.9786 4.87813 8.22845 4.79312Z" fill="#FFA600" stroke="#FFA600" stroke-width="5"/>
</Svg>
  )

  const AutumnScreen:React.FC<Props> = ({ navigation }) => {

    const [isPopupVisible, setPopupVisible] = useState(false);
    const togglePopup = () => {
      setPopupVisible(!isPopupVisible);
    };

          
    return (
    <View style = {styles.container}>
          
        
        <ScrollView style={styles.scrollContainer}>
        

        <ImageBackground
          source={artistImage}
          resizeMode="cover"
          style={styles.artistImage}>
            <View style={styles.header}>
                <BackSvg></BackSvg>
                <TouchableOpacity onPress={() => {togglePopup}}>
                  <InfoSvg></InfoSvg>
                </TouchableOpacity>
          </View>


      
      
          {/* <LinearGradient
              colors={['rgba(31,35,39,100)', 'rgba(0,0,0,0)']}
              start={{ x: 0, y: 0 }} 
              end={{ x: 0, y: 1 }} 
              style={[styles.linearGradientTop, styles.linearGradient]}/>
          <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(31,35,39,100)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={[styles.linearGradientBottom, styles.linearGradient]}/> */}

              

              <View style={styles.artistInfo}>

          <Text style = {[styles.artistRole, styles.IMFellFont]}>{artistDetails.role}</Text>
          <Text style={[styles.artistName, styles.CaslonFont]}>{artistDetails.name}</Text>
          </View>

            <View style={styles.actionButtons}>
              <View style={styles.followButton}>
                <PlusIcon></PlusIcon>
                <Text style={styles.followText}>Follow</Text>
              </View>
              <View style={styles.patronButton}>
                <CrownIcon></CrownIcon>
                <Text style={styles.patronText}>Become a Patron</Text>
              </View>
            </View>
          
        </ImageBackground>

        <View style={styles.noteContainer}>
      <View style={styles.noteTitleBox}>
        <ArtistIcon />
        <Text style={[styles.noteTitle, styles.KaiseiRegularFont]}>Artist's Note</Text>
      </View>
      <Text style={[styles.note, styles.CaslonFont]}>{artistDetails.note}</Text>
    </View>


        </ScrollView>

      </View>

        );    
  }
  
  
  
  
  const styles = StyleSheet.create({
    popup: {
      width: '100%',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
      alignItems: 'center',
      elevation: 5,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    subTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'green',
      marginTop: 10,
    },
    text: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 10,
    },
    noteContainer: {
      backgroundColor: '#C95B65',
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
    artistImage: {
      height:height/1.1,
      // top:-height/10,
    },
    linearGradient: {
      width: '100%',
      height: height*0.3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    linearGradientTop: {
      bottom:height*0.3
      // top:height*0.06,
    },
    linearGradientBottom: {
      top: height*0.25
    },
    artistRole: {
fontSize: 22,
fontStyle: 'normal',
fontWeight: '400',
lineHeight: 60,
letterSpacing: -0.24,
marginBottom:-20,
color:'white'
    },
    artistName: {
      fontSize: 40,
fontStyle: 'normal',
fontWeight: '400',
lineHeight: 60,
letterSpacing: -0.24,
color:'white'
    },
    actionButtons: {
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'row'
    },
    followButton: {
      borderWidth: 1,
      borderRadius:10,
       borderColor: '#FFF',
       width:112,
       height:47,
       flexDirection:'row',
       justifyContent:'center',
       alignItems:'center'
      //  flex:1
    },
    patronButton: {
      width:width/2.2,
       height:47,
       borderWidth:1,
       borderColor:'#FFF',
       borderRadius:10,
       flexDirection:'row',
       justifyContent:'center',
       alignItems:'center',
       backgroundColor:'#fff',
       marginLeft:12
      //  flex:1
    },
    artistInfo: {
      marginTop:height/1.7,
      alignContent:'center',
      alignItems:'center',
      justifyContent:'center'
    },
    patronText: {
      fontSize: 16,
fontStyle: 'normal',
fontWeight: '400',
lineHeight: 20,
marginLeft:10
    },
    followText: {
      fontSize: 16,
fontStyle: 'normal',
fontWeight: '400',
lineHeight: 20,
color:'white',
marginLeft:10

    },
    header: {
      flexDirection:'row',
      justifyContent: 'space-between',
      padding:30,
      backgroundColor:'transparent',
      top:height/20,
    },
    container: {
      flex: 1,
      backgroundColor: '#1F2327',
    },
    scrollContainer: {
      flex:1
    }
  });
  
export default AutumnScreen;