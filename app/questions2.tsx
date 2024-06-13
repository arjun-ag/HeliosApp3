import { StyleSheet, TextInput, Dimensions, TouchableOpacity, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import {useState} from 'react';

const {width, height} = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const Question2Screen:React.FC<Props> = ({ navigation }) => {
 
  const [text, setText] = useState('');
  // const [texHeight, setTexHeight] = useState(height/60); // Initial height


  return (
    <View style={styles.container}>
        <Text style= {[styles.text]}>What is the first memory you remember?</Text>
        <TextInput
        style={[styles.textInput, {height: 200}]}
        onChangeText={setText}
        value={text}
        placeholder="Enter here..."
        placeholderTextColor="#d9d9d9"
        selectionColor="#FFA600"
        multiline={true}
        // onContentSizeChange={(event) => {
        //   console.log('This is ' + event.nativeEvent.contentSize.height);
        //   setTexHeight(event.nativeEvent.contentSize.height); // Adjust height based on content
        // }}
      />
      <TouchableOpacity onPress={() => navigation.navigate('questions3')} style={[styles.buttonContainer]}>
                <Image source={require('../assets/images2/nextQuestion.png')} style={styles.nextButton}/>
        </TouchableOpacity>

    </View>
  );
};


const styles = StyleSheet.create({
  nextButton: {
    width: width/8, 
    height: height/35,
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
    marginBottom: height/18,
    width:width/1.4,
    backgroundColor:'#fff',
    color:'#000'
  },
  container : {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff'
  },
  buttonContainer: {
    borderRadius: 10,
    left:width/3.5,
    overflow: 'hidden',
    backgroundColor: '#b9b9b9', 
    width:width/5,
    height:height/25,
    justifyContent:'center',
    alignItems:'center',
    bottom:height/1.8
  },
  textInput: {
    width: '80%',
    fontSize: 16,
    color: '#FFA600',
    borderWidth: 0,
    padding: 10,
    margin:20,
    backgroundColor:'#fff'
  }

});

export default Question2Screen;