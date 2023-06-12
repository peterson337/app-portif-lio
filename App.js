import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import 
{ 
ScrollView, 
StyleSheet, 
Text, 
TouchableOpacity,
View,
Dimensions, 
Image,
Button,
TouchableNativeFeedback,
TextInput,
}
 from 'react-native';
import {db} from "./firebase";
import { addDoc, collection } from "firebase/firestore";

//!      Impotações do react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Todo   Importação do expo web
import * as WebBrowser from 'expo-web-browser';

//*       Iconis

import { AntDesign } from '@expo/vector-icons'; 


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
  const [showModal, setShowModal] = useState(false);
  const [nome, setNome] = useState('');
  const [messagem, setMessagem] = useState('');

  let windowWidth = Dimensions.get('window').width - 30 - 40;

  const abrirModalContato = () => {
    setShowModal(true);
  }

  const EnviarFormulario =  () => {
    const docRef =  addDoc(collection(db, "contato"), {
      nome: nome,
      messagem: messagem
    });
    
  
      alert("Sua mensagem foi enviada com sucesso!");
      setShowModal(!showModal);
      setNome("");
      setMessagem("");
    
  };
  
  return (
    <View
    style={{  
      flex: 1,
    
      }}
    >

      {
       showModal? (
        <TouchableNativeFeedback
        onPress={() => setShowModal(false)}>
        <View
        style={styles.modalParent}>

       <TouchableNativeFeedback>
              
       <View
        style={styles.boxModal}>

           <AntDesign name="close" size={24} color="black" 
              onPress={() => setShowModal(false)}
              style={styles.close}
              />
              <Text
          style={{...styles.textHeader, fontSize: 24, borderBottomWidth: 0,}}
          >
              Entrar em contato 
         </Text> 

         <Text
          style={{...styles.textHeader, fontSize: 20, borderBottomWidth: 0,}}
          >
          Qual é o seu nome? 
         </Text>   

        <TextInput
        style={styles.textInput}
        placeholder='Escreva o seu nome'
        onChangeText={(text) => setNome(text)}
        value={nome}
        >
          
        </TextInput>

        <Text
          style={{...styles.textHeader, fontSize: 20, borderBottomWidth: 0,}}
          >
          Qual é a sua mensagem? 
         </Text>   

        <TextInput
        style={{...styles.textInput,  height: 80}}
        placeholder='Escreva o sua mensagem'
        onChangeText={(text) => setMessagem(text)}
        value={messagem}
        >
          
        </TextInput>

        <Button
        title='Enviar!'
        onPress={() => EnviarFormulario()}
        >
        
        </Button>
         
       </View>
       </TouchableNativeFeedback>


        </View>
        </TouchableNativeFeedback>

      ) : (
        <View></View>

      )

      }

    <View style={{ 
      padding: 15, 
      flex: 1,
    
      }}>
        <ScrollView
        style={styles.container}
        contentContainerStyle={{ padding: 20}}>

          <Text
          style={{... styles.textHeader, 
            marginHorizontal: 50,
          }}
          >
            Sobre
          </Text>

          <Image
          style={{
            width: windowWidth,
            height: windowWidth,
            marginTop: 20,
          }}
          source={{
            uri: `https://thicc.mywaifulist.moe/waifus/2108/1e10867a3dae59140fc4017543479f862fe3cec9e9c100d58ff112a655531d26_thumb.jpg`
          }}/>

          <View style={styles.divParagrafo}>

            <Text style={styles.tituloImage}>
                Teste / desenvolvdedor front-end
            </Text>

            <Text style={styles.paragrafo}>
                
Nesta aba, você verá informações sobre o nome da nossa empresa, como trabalhamos, o preço para criarmos um web app ou um app, a nossa história e muito mais. Estamos comprometidos em oferecer soluções digitais de alta qualidade e personalizadas para atender às necessidades do seu negócio. Aqui, você encontrará detalhes sobre os serviços que oferecemos, as tecnologias que utilizamos e os projetos que já desenvolvemos.

Estamos sempre em busca de inovação e excelência, garantindo que nossos clientes tenham uma experiência única e satisfatória ao trabalhar conosco. Valorizamos a comunicação aberta e transparente, trabalhando em estreita colaboração com você para entender suas metas e objetivos.

Além disso, temos uma história de sucesso comprovada, tendo ajudado diversas empresas a alcançarem seus resultados desejados por meio de soluções digitais eficientes. Estamos ansiosos para compartilhar nossa experiência e conhecimento com você.

Se você tiver alguma dúvida, quiser solicitar um orçamento ou simplesmente entrar em contato conosco, não hesite em utilizar o botão abaixo. Nossa equipe estará pronta para responder às suas perguntas e ajudá-lo no que for necessário. Estamos ansiosos para trabalhar com você e transformar suas ideias em realidade.
            </Text>

           

          </View>

           <View style={styles.teste}> 
          <Button
          onPress={abrirModalContato}
            title='Entrar em contato'
            >

            </Button>
            </View>

        </ScrollView>
    </View>
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
          website: "https://www.youtube.com/watch?v=Uds7g3M-4lQ",
         }

    ]);

      const [windowWidth, setWindowWidth] = useState(0);    

      useEffect(() => {
        let windowWidthN = Dimensions.get('window').width;
         
//?        Margin: 15 x 2 (lados horizontal) = 30
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
      

      const abrirNavegador = async (website) => {
            let result = await WebBrowser.openBrowserAsync(website);
      }

  return ( 
    <View style={{ flex: 1, padding: 15, }}>
        <ScrollView contentContainerStyle={{padding: 20}} 
      style={styles.container}>
           
        <Text style={styles.textHeader}>
          Os últimos projetos!
        </Text>

        {
              imagens.map((val) => {
                return(
                <View key={val.img}
                style={styles.parentImage}>

                  <Image
                  style={{width: windowWidth, 
                  height: windowWidth*val.ratio,
                  resizeMode: 'stretch'}}
                  source={val.img}
                  />

                  <Button
                  title='Abrir no navegador'
                  onPress={() => abrirNavegador(val.website)}>
                     
                  </Button>

                </View>
              )})
            }

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
    marginHorizontal: 30,

  },

  btnNavigation: {
    padding: 20,
    marginTop: 15,
    backgroundColor: '#40a3ff',
    borderRadius: 20,
    flexDirection: 'row',     
  },

  parentImage: {
    marginTop: 30,
  },

  botaoAbrirNavegador: {
    padding: 10,
    
  },

  divParagrafo: {
     textAlign: 'center',
     justifyContent: 'center',
     alignItems: 'center',
  },

  tituloImage: {
        fontSize: 20,
        marginTop: 10,
  },

  paragrafo: {
          fontSize: 16,
          marginVertical: 10,
  },

  modalParent: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 1,
  },

  boxModal: {
    backgroundColor: 'white',
    height: 370,
    width: '100%',
    position: 'absolute',
    left: 0,
    top: '50%',
//!    370 / 2 = 185   
    marginTop: -185,
    padding: 10,
  },

  close: {
    position: 'absolute',
    right: 0,
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 20,
    color: "white",
    width: 35, 
    marginRight: 10,
    marginTop: 10,
},  


textInput: {
    height: 50,
    width: '100%',
    borderBottomColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 30,
    paddingLeft: 10
},


});