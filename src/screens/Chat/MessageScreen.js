import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, FlatList} from 'react-native';
import colors from '../../config/colors';
import {AuthContext} from '../../Context/AuthContext';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from './MessagesStyles';
import axios from '../../Axios';
import {useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MessagesScreen = ({navigation}) => {
  const [Loading, setLoading] = useState(false);
  const [Users, setUsers] = useState([]);
  const Auth = useContext(AuthContext);
  const token = Auth.token;
  const isfocus = useIsFocused();
  useEffect(() => {
    async function GetUsers() {
      try {
        const {data} = await axios({
          method: 'GET',
          url: `/admin/fetch/customers`,
          headers: {authorization: token},
        });
        setUsers(data);
        setLoading(false);
        return;
      } catch (e) {
        setLoading(false);
        return;
      }
    }
    GetUsers();
  }, [isfocus]);
  if (Loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <View
      style={{flex: 1, backgroundColor: colors.primary, alignItems: 'center'}}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginTop: '10%',
          marginBottom: '5%',
        }}>
        Customers Chat
      </Text>
      <Container>
        {/* <Icon name="list" size={28} onPress={() => navigation.toggleDrawer()} /> */}
        {Users ? (
          <FlatList
            data={Users}
            keyExtractor={item => item._id}
            renderItem={item => {
              const user = item.item;

              return (
                <Card
                  onPress={() => navigation.navigate('Chat', {Id: user._id})}>
                  <UserInfo>
                    <UserImgWrapper>
                      <UserImg source={{uri: user.avatar}} />
                    </UserImgWrapper>
                    <TextSection>
                      <UserInfoText>
                        <UserName>{user.username}</UserName>
                        {/* <PostTime>{user.messageTime}</PostTime> */}
                      </UserInfoText>
                      <MessageText>{user.address}</MessageText>
                    </TextSection>
                  </UserInfo>
                </Card>
              );
            }}
          />
        ) : (
          <View>
            <Icon name="backburger" size={68} />

            <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>
              No User Orders Yet
            </Text>
          </View>
        )}
      </Container>
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
