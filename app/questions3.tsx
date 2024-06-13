import { StyleSheet, Dimensions, TouchableOpacity, Image} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const {width, height} = Dimensions.get('window');
  
type Props = {
  navigation: NativeStackNavigationProp<any>;
};      

const Question3Screen:React.FC<Props> = ({ navigation }) => {

  const generateYears = (startYear:number) => {
    const currentYear = new Date().getFullYear();
    let years = [];
    for (let year = currentYear; year >= startYear; year--) {
      years.push({ label: year.toString(), value: year.toString() });
    }
    return years;
  }; 

  const [openMonth, setOpenMonth] = useState(false);
  const [months, setMonths] = useState([
    {label: 'may', value: 'may'},
    {label: 'april', value: 'april'},
    {label: 'march', value: 'march'},
    {label: 'february', value: 'february'},
    {label: 'january', value: 'january'},
    {label: 'december', value: 'december'},
    {label: 'november', value: 'november'},
    {label: 'october', value: 'october'},
    {label: 'september', value: 'september'},
    {label: 'august', value: 'august'},
    {label: 'july', value: 'july'},
    {label: 'june', value: 'june'}
  ]);
  const [monthValue, setMonthValue] = useState(months[0].value)

  const [openYear, setOpenYear] = useState(false);
  const year = generateYears(1900);
  const [years, setYears] = useState(year);
  const [yearValue, setYearValue] = useState(years[0].value)

 
  return (
    <View style={styles.container}>
        <Text style= {styles.text}>When last did you love despite everything?</Text>

        <View style={{flexDirection:'row'}}>

        <View style={styles.dropdownContainerMonth}>
            <DropDownPicker
              open={openMonth}
              value={monthValue}
              items={months}
              setOpen={setOpenMonth}
              setValue={setMonthValue}
              setItems={setMonths}
              labelStyle={styles.labelStyle} // Styles for the label text
              style={styles.pickerStyleMonth} // Additional styles for the picker container
              zIndex={3000} // Ensure dropdown is above other content
              zIndexInverse={1000}
            />
        </View>

        <View style={styles.dropdownContainerYear}>
            <DropDownPicker
              open={openYear}
              value={yearValue}
              items={years}
              setOpen={setOpenYear}
              style = {styles.pickerStyleYear}
              labelStyle={styles.labelStyle} // Styles for the label text
              setValue={setYearValue}
              setItems={setYears}
              zIndex={3000} // Ensure dropdown is above other content
              zIndexInverse={1000}
            />
        </View>

      </View>

      <TouchableOpacity onPress={() => navigation.navigate('finalDemo')} style={[styles.buttonContainer]}>
                <Image source={require('../assets/images2/nextQuestion.png')} style={styles.nextButton}/>
        </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  dropdownContainerMonth: {
    width: width/2.5,
    maxHeight: 400,
    height:30,
    margin:10,
    borderRadius:10,
    backgroundColor: '#fff'
  },
  nextButton: {
    width: width/8, 
    height: height/35,
  },
  dropdownContainerYear: {
    width: width/4,
    maxHeight: 400,
    height:30,
    margin:10,
    borderRadius:10,
    backgroundColor: '#fff'
  },
  pickerStyleMonth: {
    backgroundColor: '#d9d9d9',
    borderColor: '#fff'
  },
  pickerStyleYear: {
    backgroundColor: '#ffa600',
    borderColor: '#fff'
  },
  labelStyle: {
    fontSize: 17,
    fontFamily: 'Reross', // Specify the font family you want for the labels
    color: '#000',
    alignContent:'center',
    textAlign:'center',
    fontWeight:'900',
    letterSpacing: 0.060,
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
    marginBottom: height/9,
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
    bottom:height/2
  },
});

export default Question3Screen;