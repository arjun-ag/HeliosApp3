import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Image, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {useEffect, useState, useRef} from 'react';
import { Text, View } from '@/components/Themed';


const {width, height} = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<any>;
};



const FinalDemoScreen:React.FC<Props> = ({ navigation }) => {
  

    const firstImageScale = useRef(new Animated.Value(1)).current; // Start at full size
    const firstImageRotate = useRef(new Animated.Value(0)).current; // Start at 0 degrees rotation
    const secondImageScale = useRef(new Animated.Value(0)).current; // Start scaled down to 0
    const secondImageRotate = useRef(new Animated.Value(0)).current;


      
      const firstImageAnimatedStyle = {
        transform: [
          { scale: firstImageScale },
          {
            rotate: firstImageRotate.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg']
            })
          }
        ]
      };
    
      const secondImageAnimatedStyle = {
        transform: [
          { scale: secondImageScale },
          {
            rotate: secondImageRotate.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg']
            })
          }
        ]
      };

    useEffect(() => {
        // Rotate and scale down the first image
            const timer = setTimeout(() => {
              navigation.replace('index');
            }, 5000);
    
        return () => clearTimeout(timer);
    }, [navigation]);
    

      return (
        <View style={styles.container}>
            <Image source={require('../assets/images2/finalDemo.jpeg')} style={[styles.imageStyle]}/>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      imageStyle: {
        width: '100%',
        height: '100%'
      }
    });
        

export default FinalDemoScreen;