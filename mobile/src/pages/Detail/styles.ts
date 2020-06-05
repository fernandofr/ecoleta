import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { RectButton } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

export const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  padding: 32px; 
  padding-top: 20px;
`;

export const BackButton = styled.TouchableOpacity``;

export const PointImage = styled.Image`
  width: 100%;
  height: 120px;
  resize-mode: cover;
  border-radius: 10px;
  margin-top: 32px;
`;

export const PointName = styled.Text`
  color: #322153;
  font-size: 28px;
  margin-top: 24px;
  font-family: 'Ubuntu_700Bold';
`;

export const PointItems = styled.Text`  
  font-size: 16px;
  line-height: 24px;
  margin-top: 8px;
  color: #6C6C80;
  font-family: 'Roboto_400Regular';
`;

export const Address = styled.View`  
  margin-top: 32px;
`;

export const AddressTitle = styled.Text`  
  font-size: 16px;
  color: #322153;
  font-family: 'Roboto_500Medium';
`;

export const AddressContent = styled.Text`  
  font-family: 'Roboto_400Regular';
  line-height: 24px;
  margin-top: 8px;
  color: #6C6C80;
`;

export const Footer = styled.View`  
  border-top-width: ${StyleSheet.hairlineWidth}px;
  border-color: #999;
  padding-vertical: 20px;
  padding-horizontal: 32px;
  padding-bottom: 0;
  flex-direction: row;
  justify-content: space-between;
`;

export const Button = styled(RectButton)`
  width: 48%;
  background-color: #34CB79;
  border-radius: 10px;
  height: 50px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  margin-left: 8px;
  color: #FFF;
  font-family: 'Roboto_500Medium';
  font-size: 16px;
`;
