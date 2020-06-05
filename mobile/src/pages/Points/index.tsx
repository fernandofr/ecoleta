import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SvgUri } from 'react-native-svg';
import { ScrollView, Alert } from 'react-native';

import * as Location from 'expo-location';

import api from '../../services/api';

import { 
  SafeArea,
  Container, 
  BackButton, 
  Title, 
  Description, 
  MapContainer, 
  Map,
  MapMarker,
  MapMarkerContainer,
  MapMarkerImage,
  MapMarkerTitle,
  ItemsContainer, 
  Item, 
  ItemTitle,
} from './styles';

interface ItemProps {
  id: number;
  title: string;
  image_url: string;
}

interface PointsProps {
  id: number;
  name: string;
  image: string;
  image_url: string;
  latitude: number;
  longitude: number;
}

interface Params {
  uf: string;
  city: string;
}

const Points = () => {
  const [items, setItems] = useState<ItemProps[]>([]);
  const [points, setPoints] = useState<PointsProps[]>([]);  
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(()=> {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Oooops..', 'Precisamos de sua permissão para obter a sua localização !');
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;

      setInitialPosition([latitude, longitude]);
    };

    loadPosition();
  }, []);

  useEffect(()=> {
    api.get('/items').then(response => {
      setItems(response.data);
    });
  }, []);

  useEffect(()=> {
    api.get('/points', {
      params: {
        city: routeParams.city,
        uf: routeParams.uf,
        items: selectedItems
      }
    }).then(response => {
      setPoints(response.data);
    });
  }, [selectedItems]);

  function handleNavigateBack() {
    navigation.goBack();
  };

  function handleNavigateToDetail(id: number) {
    navigation.navigate('Detail', { point_id: id});
  };

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex(item => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);

      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }    
  };

  return (
    <SafeArea>
      <Container>
        <BackButton onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </BackButton>

        <Title>Bem Vindo.</Title>
        <Description>Encontre no mapa um ponto de coleta.</Description>

        <MapContainer>
          {initialPosition[0] !== 0 && (
            <Map 
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >
            {points.map(point => (
              <MapMarker
                key={String(point.id)}
                onPress={() => handleNavigateToDetail(point.id)}
                coordinate={{
                  latitude: point.latitude,
                  longitude: point.longitude,
                }}
              >
                <MapMarkerContainer>
                  <MapMarkerImage source={{ uri: point.image_url }} />
                  <MapMarkerTitle>{point.name}</MapMarkerTitle>
                </MapMarkerContainer>
              </MapMarker>
            ))}  

            
            </Map>
          )}
          
        </MapContainer>
      </Container>
      <ItemsContainer>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20
          }}
        > 
        {items.map(item => (
          <Item 
            key={String(item.id)} 
            onPress={() => handleSelectItem(item.id)}
            activeOpacity={0.6}
            isSelected={selectedItems.includes(item.id)}
          >     
            <SvgUri width={42} height={42} uri={item.image_url} />
            <ItemTitle>{item.title}</ItemTitle>
          </Item>
        ))}
        </ScrollView>
      </ItemsContainer>
    </SafeArea>
  );
};

export default Points;

