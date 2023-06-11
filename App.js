import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View,
Dimensions, 
Image,
Button} from 'react-native';

//! Impotações do react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


function HomeScreen({navigation}) {
  return (
    <View style={{ padding: 15, flex: 1 }}>

      <ScrollView contentContainerStyle={{padding: 20}} 
      style={styles.container}>

        <Text style={styles.textHeader}>
          Para onde você deseja navegar?
        </Text>

{/*         <TouchableOpacity
        style={styles.btnNavigation}
        onPress={() => navigation.navigate('Home')}
        >
          
          <Ionicons name='md-home' size={29} color='white'/>
          <Text style={{color: 'white', marginTop: 8, marginLeft: 8}}>
            Home
          </Text>
        </TouchableOpacity> */}

        <TouchableOpacity
         onPress={() => navigation.navigate('Sobre')}
        style={styles.btnNavigation}>
          <Ionicons name='ios-information-circle' size={29} color='white'/>
          <Text
           style={{color: 'white', marginTop: 8, marginLeft: 8}}>
            Sobre
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={() => navigation.navigate('Portifólio')}

        style={styles.btnNavigation}>
          <Ionicons name='ios-list' size={29} color='white'/>
          <Text 
          style={{color: 'white', marginTop: 8, marginLeft: 8}}>
            Portifólio
          </Text>
        </TouchableOpacity>

      </ScrollView>
      
    </View>
  );
}

function SobreScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Sobre Screen</Text>
    </View>
  );
}

function PortifolioScreen({navigation, route}) {
    const [imagens, setImagens] = useState([
         {
          img: require('./resources/projeto.png'),
          width: 0,
          height: 0,
          ratio: 0,
         }

    ]);

      const [windowWidth, setWindowWidth] = useState(0);    

      useEffect(() => {
        let windowWidthN = Dimensions.get('window').width;
         
//?        Margin: 15 x 2 (lados hoorizontal) = 30
//!        Padding: 20 x 2 = 40
        setWindowWidth(windowWidthN - 30 - 40);

          let newImagens = imagens.filter((val) => {
          let w = Image.resolveAssetSource(val.img).width;
          let h = Image.resolveAssetSource(val.img).height;

          val.width = w;
          val.height = h;
          val.ratio = h/w;

          return val;
        })

          setImagens(newImagens);
      }, [])
      

  return ( 
    <View style={{ flex: 1, padding: 15, }}>
        <ScrollView contentContainerStyle={{padding: 20}} 
      style={styles.container}>
            {
              imagens.map((val) => {
                <View>

                  <Image
                  style={{width: windowWidth, 
                  height: windowWidth*val.ratio,
                  resizeMode: 'stretch'}}
                  source={val.img}
                  />

                  <TouchableOpacity>
                    <Text>Abrir no  navegador</Text>
                  </TouchableOpacity>

                </View>
              })
            }
        <Text style={styles.textHeader}>
          Os últimos projetos!
        </Text>



      </ScrollView>
    </View>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



export default function App() {
  return (
    <NavigationContainer
    >
      <StatusBar hidden />

  {/*  */}
      <Tab.Navigator style={{backgroundColor: 'black', flex: 1}}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home';
            } else if (route.name === 'Portifólio') {
              iconName = focused ? 'ios-list' : 'ios-list';
            }else if (route.name === 'Sobre') {
              iconName = focused ? 'ios-information-circle' 
              : 'ios-information-circle';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: '#40a3ff',

          /* 
          tabBarActiveTintColor: '#40a3ff',
          tabBarInactiveTintColor: 'black',
          */

        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Sobre" component={SobreScreen} />
        <Tab.Screen name="Portifólio" component={PortifolioScreen} />

      </Tab.Navigator>
  {/*  */}
  </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
  },

  textHeader: {
    color: '#8c8c8c',
    fontSize: 24,
    borderBottomColor: '#8c8c8c',
    borderBottomWidth: 1,
    paddingBottom: 15,   
    textAlign: 'center', 
  },

  btnNavigation: {
    padding: 20,
    marginTop: 15,
    backgroundColor: '#40a3ff',
    borderRadius: 20,
    flexDirection: 'row',     
  },
});