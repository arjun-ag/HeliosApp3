import { StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';
  import { NativeStackNavigationProp } from '@react-navigation/native-stack';
  import { Text, View } from 'react-native';
  import { useEffect, useState } from 'react';
  import { listObjects, getSignedUrl } from '../s3-utils';
  import { FlatList } from 'react-native';
  
  const {width, height} = Dimensions.get('window');
  
  type Props = {
    navigation: NativeStackNavigationProp<any>;
  };


  const HonkScreen:React.FC<Props> = ({ navigation }) => {
  
    const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
    const bucketName = "myvodappstack-waywardglobe9df89498-vnwbgksmjzd4"

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://myvodappstack-waywardglobe9df89498-vnwbgksmjzd4.s3.amazonaws.com/cots.json');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const json = await response.json();
          setData(json);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, ['https://myvodappstack-waywardglobe9df89498-vnwbgksmjzd4.s3.amazonaws.com/cots.json']);

  // const [urls, setUrls] = useState({});

  // useEffect(() => {
  //   const fetchUrls = async () => {
  //     const urlsTemp = {};
  //     const data = await listObjects(bucketName);
  //     if (data.Contents){
  //       for (const file of data.Contents) {
  //         const url = await getSignedUrl(bucketName, file.Key);
  //         if (file.Key) {
  //           urlsTemp[file.Key] = url;
  //         }
  //       }
  //       setUrls(urlsTemp);
  //     }
  //   };

  //     fetchUrls();

  // }, [bucketName]);
    
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

            <FlatList
      data={data ? Object.entries(data) : []}
      keyExtractor={(item) => item[0]}
      renderItem={({ item }) => (
        <View style={styles.article}>
          <Text style={styles.subText}>{item[0]}</Text>
          <Text style={styles.subText}>{JSON.stringify(item[1], null, 2)}</Text>
        </View>
      )}
    />

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