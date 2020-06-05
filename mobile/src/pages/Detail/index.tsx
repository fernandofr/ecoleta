import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';

import * as MailComposer from 'expo-mail-composer';

import api from '../../services/api';

import { 
  SafeArea,
  Container, 
  BackButton, 
  PointImage, 
  PointName, 
  PointItems, 
  Address,
  AddressTitle,
  AddressContent,
  Footer,
  Button,
  ButtonText
} from './styles';
import { Linking } from 'expo';

interface Params {
  point_id: number;
}

interface Data {
  point: {
    image: string;
    image_url: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  };
  items: {
    title: string;
  }[]
}

const Detail = () => {
  const [data, setData] = useState<Data>({} as Data);

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    api.get(`points/${routeParams.point_id}`).then(response => {
      setData(response.data);
    });
  }, []);

  function handleNavigateBack() {
    navigation.goBack();
  };

  function handleComposeMail() {
    MailComposer.composeAsync({
      subject: 'Interrese na coleta de resíduos',
      recipients: [data.point.email],
    });
  };

  function handleWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${data.point.whatsapp}&text=Tenho Interrese na coleta de resíduos.`
    );
  };  

  if (!data.point) {
    return null;
  };

  return (
    <SafeArea>
      <Container>
        <BackButton onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </BackButton>

        <PointImage source={{ uri: data.point.image_url }} />

        <PointName>{data.point.name}</PointName>
        <PointItems>{data.items.map(item => item.title).join(', ')}</PointItems>

        <Address>
          <AddressTitle>Endereço</AddressTitle>
          <AddressContent>{data.point.city}, {data.point.uf}</AddressContent>
        </Address>
      </Container>
      <Footer>
        <Button onPress={handleWhatsapp}>
          <FontAwesome name="whatsapp" size={20} color="#fff"/>
          <ButtonText>Whatsapp</ButtonText>
        </Button>

        <Button onPress={handleComposeMail}>
          <Icon name="mail" size={20} color="#fff"/>
          <ButtonText>Email</ButtonText>
        </Button>
      </Footer>
    </SafeArea>    
  )
};

export default Detail;

