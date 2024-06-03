import { Dimensions, StyleSheet, Animated } from 'react-native';

import { ExternalLink } from './ExternalLink';
import { Text, View } from './Themed';
import React, { useEffect, useRef } from 'react';

import Colors from '@/constants/Colors';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function StoryHelios({ text }: { text: string }) {
  const pulseAnim = useRef(new Animated.Value(1)).current; // Initial opacity

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.8, // Scale up to slightly larger
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(pulseAnim, {
          toValue: 1, // Scale back down to original size
          duration: 1000,
          useNativeDriver: true
        })
      ])
    ).start();
  }, []);

  return (      
  <Animated.View style={[{opacity: pulseAnim }]}>
    <View style = {styles.container}>
      <View style={styles.heliosLogo}></View>
    </View>

  </Animated.View>
  );
}

const styles = StyleSheet.create({
  container : {
    alignItems: 'center',
  },
  heliosLogo: {
    position: 'absolute',
    width: 50,
    alignItems: 'center',
    height: 50,
    borderRadius: 50,
    transform: [{scaleY:1.6}],
    top: (screenHeight) / 6,
    // left: screenWidth/2,

    backgroundColor: '#EC7318',
  },
});
