import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, View } from '@/components/Themed';

const {width, height} = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const Question1Screen:React.FC<Props> = ({ navigation }) => {
 
 
  return (
    <View style={styles.container}>
        <Text style= {styles.text}>Do you consider yourself sentimental?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('questions2')} style={[styles.buttonContainer, styles.button1]}>
            <Text style={styles.buttonText}>yes</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('questions2')} style={[styles.buttonContainer, styles.button2]}>
            <Text style={styles.buttonText}>no</Text>
          </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  buttonText: {
    fontFamily: 'Bauhaus',
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 30
  },
  button1: {
    margin:20
  },
  button2: {
    marginTop:30,
    backgroundColor: '#CECECE'
  },
  text: {
    fontSize: 26,
    lineHeight: 35,
    fontStyle: 'normal',
    textAlign: 'center',
    letterSpacing: -0.015,
    alignItems: 'center',
    fontWeight: '400',
    fontFamily: 'Caslon',
    display: 'flex',
    color:'#000',
    marginBottom: height/18,
    width:width/1.4
  },
  container : {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#fff'
  },
  buttonContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#FFA600', 
    width:width/1.3,
    height:height/22,
    justifyContent:'center',
    alignItems:'center'
  }

});

export default Question1Screen;