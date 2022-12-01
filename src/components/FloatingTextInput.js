import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../config/colors';

function FloatingTextInput({
  label,
  TextValue,
  icon,
  type,
  Holder,
  secure,
  error,
  EndPress,
  Endicon,
  BorderColor,
  IconColor,
  IconSize,
}) {
  const [topPosition, setTop] = useState();
  const [RightPosition, setRight] = useState(4);
  const [TextColor, setColor] = useState('black');
  const [opacity, setOpacity] = useState(0.25);
  return (
    <View
      style={{
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
      }}>
      <Ionicons
        name={icon}
        size={IconSize ? IconSize : 20}
        style={{padding: 5, alignSelf: 'center'}}
        color={IconColor ? IconColor : 'black'}
      />
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          borderRadius: 10,
          borderWidth: 0.5,
          borderColor: BorderColor ? BorderColor : 'black',
          alignItems: 'center',
          width: '88%',
        }}>
        <TextInput
          secureTextEntry={secure}
          onChangeText={TextValue}
          keyboardType={type ? type : 'default'}
          style={{
            width: '90%',
            color: 'black',
          }}
          onFocus={() => {
            setTop(-25), setColor(colors.primary), setOpacity(1), setRight(25);
          }}
          onBlur={() => {
            !Holder && (setTop(35), setOpacity(0.5), setColor('black')),
              setRight(5);
          }}
        />

        <Text
          style={{
            color: error ? 'red' : TextColor,
            position: 'absolute',
            fontSize: 15,
            backgroundColor: 'white',
            opacity: opacity,
            left: RightPosition,
            borderRadius: 8,
            transform: [{translateY: topPosition < 0 ? topPosition : 0}],
            position: 'absolute',
          }}>
          {error ? error : label}
        </Text>
        <Ionicons name={Endicon} size={20} onPress={EndPress} color={'black'} />
      </View>
    </View>
  );
}

export default FloatingTextInput;
