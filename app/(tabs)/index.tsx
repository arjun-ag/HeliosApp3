import { StyleSheet, Dimensions } from 'react-native';

import EditScreenInfo from '@/components/storyHelios';
import Logo from '@/components/logo'
import { Text, View } from '@/components/Themed';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}

    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
