import React from 'react';
import { StyleSheet } from 'react-native';

import { ExternalLink } from './ExternalLink';
import { Text, View } from './Themed';

import Colors from '@/constants/Colors';

export default function Logo({ path }: { path: string }) {
  return (
    <View style={styles.heliosLogo}>
    </View>
  );
}

const styles = StyleSheet.create({
    heliosLogo: {
      position: 'absolute',
      width: 50,
      height: 50,
      borderRadius: 50,
      transform: [{scaleY:1.6}],
      top:160,

      backgroundColor: '#FFB800',
    },
  });