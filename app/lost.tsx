import { StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';
  import { NativeStackNavigationProp } from '@react-navigation/native-stack';
  import { Text, View } from 'react-native';
  
  const {width, height} = Dimensions.get('window');
  
  type Props = {
    navigation: NativeStackNavigationProp<any>;
  };

  const LostScreen:React.FC<Props> = ({ navigation }) => {
    
    return (
    <View style = {styles.container}>
        <ScrollView style={styles.scrollContainer} stickyHeaderIndices={[0]}>

        <View style={styles.stickyHeader}>
        </View>

            <Text style = {[styles.subText, styles.subTitle1]}>Editor's Pick</Text>
            <Text style = {styles.titleText}>Lost</Text>
            <Text style = {[styles.subText, styles.subTitle2]}>"Crimson"</Text>
            <Image source={require('../assets/images2/lostNew.jpeg')} style={styles.img}/>

            <Text style = {[styles.subText, styles.article]}> I stood there on the pavement by the bookstore, lost in myself. Around, the great city swirled - and people marched about with blatant purpose. My eyes were fixed upon the distance, so far away I could not make out what I was looking at - only that it was important not to turn away my gaze. And from the streets, the musty smells of passers-by and little food carts wafted upwards between squarely built skyscrapers to reach flattened clouds that weaved about the sun. I let myself be washed away by the crowds, and realised only a half-hour later that I was wafting towards the waterfront.  {'\n\n'}
On the grass, by the outdoor gym where I had seen an old man doing pull-ups on a bar with short, unsteady, gasps for breath, I saw a little girl roaming along the bushes looking for something. After a moment, she bent over and picked something up, I could not see what, examined it for a moment, then put it away to continue the search. A crimson hue was setting across the horizon. I looked at the river for a long moment, then back at the girl, who had now run across the lawn to her bare-chested father, reading a book on the grass, with a small white flower. The father put his book away and tucked the flower behind his left ear, the little girl blushed, I smiled. I walked past them both thinking that the little girl, one day, would perhaps herself nurse a broken heart, and look back on this lazy afternoon to find her peace. To know that she too had been happy once.{'\n\n'}
But as I hobbled to the river, these thoughts left quickly and were replaced by that grudging hum of a persistent realisation—I had not written in two months. And while there had been a time when line upon line burst from me to form such verses drenched in honest truth—the well had dried up. I would sit for hours on my desk, beside the window and the splatters of ink on the floor from too many changed cartridges, and stare at blank paper with no blood in me left to spill upon it. While to some, this problem would appear a trifle, to one in whom the word had been a fountain gushing down Himalayan heights, its absence caused a drought—a withering of the soul.{'\n\n'}
There was a fullness in the air of a city old enough to be steeped in its own idiosyncrasies, but young enough not to be shackled by them. I walked on the long walkway. The reddish leaves scrunched beneath my soles with every step. When I stopped and put one hand on the grey and metal rail, the streetlamps across the river were twinkling. In my other hand, there was an old and crumbling copy of Dorian Gray. There was something about this book that had stayed with me from when I had first read it as a 17-year-old, wilting beneath the heat of an Indian summer: Immortality. But while, for Dorian, immortality was little more than the preservation of a youthful visage, I sought an immortality that would lift, in one breath, my fractured visions of the world to a singularity —there, by the sharp chasm of eternity. So, I stood, a slave to my own death, having lost the only thing that ever brought me happiness. Soon, the sun descended by the water’s edge and turned the world incarnadine; the birds made their way home, and so did I.{'\n\n'}
I lived, at the time, in a studio apartment on forty second street, between fifth and sixth, across the public library. From my window, I could see the city stretching out before me in little glints of tungsten against a Prussian-blue-black sky. I was in love with New York. I remember the first time I stood in the middle of a deserted Times Square, with its strobing neon dripping gently into the whiteness of fresh January snow, and smelled freedom in the air. On my bed, sticking out from in between the rumpled sheets, was the mangled cover of Yeats’ poems with an envelope parked to bookmark ‘The Second Coming’. The room was simple enough: a large wooden desk with drawers along the left-hand-side stuffed with thick laid paper; a bookshelf opposite, arranged without any thought for genre or author, but rather in the chronological order that I had bought the books. In glancing from the top left to the bottom right, a keen eye could decipher my obsessions over the course of the past year. Marlon Brando biographies, then three or four hardcovers about cinema – books I had bought but found too dull in their butchering pedanticism of my favorite films to read –the collected works of James Joyce, a few Bertrand Russell paperbacks with dog-eared sheets of paper stuck every few pages filled with my notes and disagreements in an unkempt cursive hand, some guidebooks in screenwriting – that I had been far too proud to dog-ear or take notes about, but read nonetheless – and three volumes of Valmiki’s Ramayana in Sanskrit with English translations.{'\n\n'}
On the wall adjoining was a large frame with a painting of the Flatiron building in cobalt ink. I had bought it from an artist at Union Square sitting wearily surrounded by his monochromatic cityscapes. In each of them, the city seemed a mirage; waiting to disappear, like a half-remembered dream in morning sun. Underneath the frame was my phonograph, and a small box with an eclectic record collection: the Tannhauser overture, Beethoven’s ‘Emperor’ piano concerto, Billie Eilish, a collection of Kennedy’s speeches, Hariprasad Chaurasia, Bhimsen Joshi. Across it, my electric piano, and a Neumann microphone that was a prized possession. My mother had insisted they play Beethoven’s ninth as I was born; so, in a way, I descended upon this world on fire-drunken wings of Elysian bliss. No wonder I’m rather grandiose.{'\n\n'}
I tossed my overcoat on the armchair next to the piano and switched my lamps on, with tungsten bulbs to add a blip to the night sky, and sank into the desk chair. A spiraling blackness had enveloped me, and I was stupored in its blank abyss – for a moment I could hear the sirens of a firetruck rattling down Fifth Avenue, then, nothing. I set Wagner’s Tannhauser on the record player. I had heard it for the first time played by the London Symphony Orchestra at the Royal Albert Hall as a 16-year-old. I remember standing there, under luminous blue domes in the arena, so close to the conductor that I could almost extend my arm and touch his calves as the horns and clarinets whispered the pilgrim’s theme and pass it to the strings, who take the thought in languid whirls to be torn between the sacred and profane. I realized, standing there, that all these works of art, which now stand tall amidst the canonical features of our shared existence, are often the sacred musings of a single human being tucked away in their sanctum of aloneness. It was surreal.{'\n\n'}
The music swelled and swelled and slinked away, and I remained. It was still too early to go to bed, but too late to begin working. Besides, I doubt there was much in me to work with. I refused to be sucked into vacuum. If there was still one bone in me with some faint echo of sincerity, I would find it, or drive those dreadful falsehoods of civility from my soul for good. Yet, all this I would do tomorrow. I played the record again and snuggled in my crumpled sheets with Yeats for company – an hour passed, or two, I couldn’t quite tell, but soon the centre could not hold. I slouched away to stony sleep.

            </Text>

            <TouchableOpacity onPress={() => navigation.navigate('stayMode')}>
              <Image
                source={require('../assets/images2/dice.png')}
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
  
export default LostScreen;