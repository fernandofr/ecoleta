import React, { useState, useEffect, useMemo } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { Image, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';

import { 
  Container, 
  Main, 
  Title, 
  Description, 
  Footer, 
  Button, 
  ButtonText, 
  ButtonIcon,
  Select
} from './styles';

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

interface ISelect {
  label: string;
  value: string;
}

export default function Home () {
  const navigation = useNavigation();

  const [ufs, setUfs] = useState<ISelect[]>([]);
  const [cities, setCities] = useState<ISelect[]>([]);

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  const pickerSelectStyles = {
    inputIOS: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16
    },
    inputAndroid: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16
    },
  };

  function handleNavigateToPoints() {
    navigation.navigate('Points', { 
      uf: selectedUf,
      city: selectedCity
    });
  };

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const selectUfs = response.data.map(uf => {
        return {
          label: uf.sigla,
          value: uf.sigla
        }
      });

      setUfs(selectUfs);
    })
  }, []);
  
  useEffect(() => {
    if (selectedUf === '0') {
      return
    };

    axios
      .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(response => {
        const selectCity = response.data.map(city => {
          return {
            label: city.nome,
            value: city.nome
          }
        });

        setCities(selectCity);
      });
  }, [selectedUf]); 

  return (
    <Container 
      source={require('../../assets/home-background.png')}
      imageStyle={{ width: 274, height: 368 }}      
    >
      <Main>
        <Image source={require('../../assets/logo.png')} />

        <Title>Seu marketplace de coleta de resíduos</Title>
        <Description>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Description>
      </Main>

      <RNPickerSelect
        onValueChange={(value) => setSelectedUf(value)} 
        items={ufs}  
        style={pickerSelectStyles}
        value={selectedUf}
      />

      <RNPickerSelect
        onValueChange={(value) => setSelectedCity(value)} 
        items={cities}  
        style={pickerSelectStyles}
        value={selectedCity}
      />

      <Footer>
        <Button onPress={handleNavigateToPoints}>
          <ButtonIcon>
            <Text>
              <Icon name="arrow-right" color="#fff" size={24} />
            </Text>
          </ButtonIcon>
          <ButtonText>Entrar</ButtonText>
        </Button>
      </Footer>
    </Container>
  );
};

