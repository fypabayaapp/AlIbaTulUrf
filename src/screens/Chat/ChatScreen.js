// import {Blob, Buffer} from 'buffer';
import axios from '../../Axios';
import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  SafeAreaView,
  Image,
  Platform,
  PermissionsAndroid,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import Ionicon from 'react-native-vector-icons/Ionicons';
import colors from '../../config/colors';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';
import Sound from 'react-native-sound';
import RNFetchBlob from 'rn-fetch-blob';

import {AuthContext} from '../../Context/AuthContext';
import {ActivityIndicator} from 'react-native-paper';
import Axios from '../../Axios';

const ChatScreen = ({navigation, route}) => {
  const [messages, setMessages] = useState([]);

  const [voice, SetVoice] = useState();
  const [playAudio, setPlayAudio] = useState(false);
  const [playMsg, setPlayMsg] = useState(false);

  const [startAudio, setStartAudio] = useState(false);

  const [Loading, setLoading] = useState(false);

  const dirs = RNFetchBlob.fs.dirs;
  const path = Platform.select({
    ios: 'hello.m4a',
    android: `${dirs.CacheDir}/hello.aac`,
  });

  const [image, SetImage] = useState();
  const [chat, setChat] = useState([]);
  const Record = new AudioRecorderPlayer();
  const ctx = useContext(AuthContext);
  const mode = ctx.mode == 'admin';
  const id = mode ? route.params.Id : '6384b49266bc45f42ae52370';

  const myId = ctx.Data.id;

  useEffect(() => {
    GetMessages();
  }, [id]);

  async function GetMessages() {
    setMessages([]);
    try {
      const {data} = await axios({
        method: 'GET',
        url: `/message/chat?receiver=${id}`,
        headers: {authorization: ctx.token},
      });
      setMessages(data?.response);
    } catch (e) {}
  }

  useEffect(() => {
    const backAction = () => {
      mode ? navigation.goBack() : navigation.navigate('Home');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const onSend = async messages => {
    if (!image && !voice) {
      try {
        const {data} = await axios({
          method: 'POST',
          url: `/message/send?receiver=${id}`,
          headers: {authorization: ctx.token},
          data: {
            text: messages[0].text,
            messageTime: new Date(),
          },
        });
        GetMessages();
        return;
      } catch (e) {
        return;
      }
    }
    if (voice) {
      console.log('pressed from voice+');

      await RNFetchBlob.fs.readFile(path);
      const formData = new FormData();
      formData.append('file', {
        name: `voice ${new Date()} `,
        uri: voice.path,
        type: voice.mime,
      });
      formData.append('text', messages[0].text);

      try {
        await axios({
          url: `/message/send?receiver=${id}`,
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            authorization: ctx.token,
          },
          data: formData,
        });
        SetVoice(null);
        GetMessages();
        return;
      } catch (e) {
        return;
      }
    }
    if (image) {
      const formData = new FormData();
      formData.append('file', {
        name: `pic ${new Date()} `,
        uri: image.path,
        type: image.mime,
      });
      formData.append('text', messages[0].text);
      try {
        await axios(`/message/send?receiver=${id}`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            authorization: ctx.token,
          },
          data: formData,
        });
        SetImage(null);
        GetMessages();
        return;
      } catch (e) {
        return;
      }
    }
  };
  if (Loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  const renderSend = props => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color={colors.primary}
            // "#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderAudio = props => {
    // console.log('AUdio', props.currentMessage.audio, props.currentMessage);
    return !props.currentMessage.audio ? (
      <View />
    ) : (
      <Ionicon
        name="ios-play-circle"
        size={35}
        color={playMsg ? 'red' : 'white'}
        style={styles.Listener}
        onPress={() => {
          setPlayMsg(!playMsg);
          const sound = new Sound(props.currentMessage.audio, '', error => {
            if (error) {
            }

            if (!playMsg) {
              sound.play(success => {
                setPlayMsg(false);

                if (!success) {
                  setPlayMsg(false);
                  Alert.alert('There was an error playing this audio');
                }
              });
            } else {
              sound.stop();
            }
          });
        }}
      />
    );
  };

  const renderBubble = props => {
    //
    return (
      <View>
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: colors.primary,
            },
          }}
          textStyle={{
            right: {
              color: '#fff',
            },
          }}
        />
      </View>
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  useEffect(() => {
    async function Checker() {
      if (Platform.OS === 'android') {
        try {
          const grants = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ]);

          console.log('write external stroage', grants);

          if (
            grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            grants['android.permission.READ_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            grants['android.permission.RECORD_AUDIO'] ===
              PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.log('Permissions granted');
          } else {
            console.log('All required permissions not granted');
            return;
          }
        } catch (err) {
          console.warn(err);
          return;
        }
      }
    }
    Checker();
  }, []);

  async function ImageGetter() {
    ImagePicker.openPicker({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 400,
      compressImageQuality: 0.7,
      cropping: true,
    })
      .then(image => {
        SetImage(image);
      })
      .catch(e => Alert.alert(`${e}` || ` Something went wrong`));

    //
  }

  async function handleAudio() {
    const audioSets = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
      OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
    };
    // const path = 'hello.m4a';

    const uri = await Record.startRecorder(path, audioSets);

    Record.addRecordBackListener(e => {
      console.log(e);
    });

    console.log('FROM Voice Recorder', uri);
  }

  const AudioStop = async () => {
    setStartAudio(false);
    SetVoice(null);
    const aud = await Record.stopRecorder();

    console.log(aud, 'FROM STOP');
    SetVoice({path: aud, mime: 'audio/aac'});

    Record.removeRecordBackListener();
  };

  function Soundplay() {
    setPlayAudio(!playAudio);
    console.log(playAudio);
    const sound = new Sound(
      // 'file:////data/user/0/com.audio/cache/hello.aac',
      voice.path,
      '',
      error => {
        if (error) {
          console.log(error);
        }

        if (!playAudio) {
          sound.play(success => {
            setPlayAudio(false);

            if (!success) {
              setPlayAudio(false);
              Alert.alert('There was an error playing this audio');
            }
          });
        } else {
          sound.pause();
        }
      },
    );
  }

  function changeView() {
    // console.log('PRESSED');
    setStartAudio(true);
  }

  if (startAudio) {
    handleAudio();
  }
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: colors.primary, paddingTop: '5%'}}>
      <Icon
        name="sort-variant"
        size={28}
        color={'white'}
        style={{paddingHorizontal: 10}}
        onPress={() => {
          !mode ? navigation.toggleDrawer() : navigation.navigate('HomeTab');
        }}
      />

      {voice && (
        <Ionicon
          name="ios-play-circle"
          size={32}
          color={'black'}
          style={{
            alignSelf: 'center',

            borderRadius: 29,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.5,
            zIndex: 2,
            backgroundColor: 'pink',
          }}
          onPress={() => Soundplay()}
        />
      )}

      {/* play audio`` */}
      <Ionicon
        name="ios-refresh-circle-outline"
        size={36}
        color={'black'}
        style={{
          alignSelf: 'flex-end',
          marginTop: -30,
          right: 4,
          //   right: Dimensions.get('window').widwhiteth / 2,
          // position: 'absolute',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 0},
          shadowOpacity: 0.5,
          zIndex: 2,
          borderRadius: 35,
          backgroundColor: 'pink',
        }}
        onPress={() => GetMessages()}
      />
      <TouchableOpacity
        style={{
          bottom: 5,
          left: 5,
          position: 'absolute',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 0},
          shadowOpacity: 0.5,
          marginBottom: image ? '32%' : 0,
          zIndex: 2,
          // backgroundColor: 'black',
        }}
        onPress={() => changeView()}>
        <Ionicon name="mic" size={30} color={'purple'} />
      </TouchableOpacity>

      {startAudio && (
        <Ionicon
          name="mic-off"
          size={30}
          color={'yellow'}
          style={{
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.5,
            left: 5,
            zIndex: 2,
          }}
          onPress={AudioStop}
        />
      )}

      <GiftedChat
        messagesContainerStyle={styles.MsgContainer}
        minInputToolbarHeight={59}
        textInputStyle={{
          color: 'black',
          paddingLeft: 35,
        }}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: myId,
        }}
        renderBubble={renderBubble}
        renderMessageAudio={renderAudio}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
      />
      <Ionicon
        name="add-circle"
        size={32}
        // hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
        color={colors.primary}
        style={{
          bottom: 35,
          right: 5,
          //   right: Dimensions.get('window').width / 2,
          position: 'absolute',
          marginBottom: image ? '32%' : 0,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 0},
          shadowOpacity: 0.5,
          zIndex: 2,
          backgroundColor: 'transparent',
        }}
        onPress={() => ImageGetter()}
      />
      {image && (
        <View
          style={{
            width: '50%',
            alignSelf: 'center',
            height: '30%',
            backgroundColor: 'white',
          }}>
          <Image
            style={{
              borderRadius: 10,
              width: '100%',
              height: '100%',
              backgroundColor: 'white',
            }}
            source={{uri: image.path}}
            resizeMode={'contain'}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: 'white',
    justifyContent: 'center',
  },
  MsgContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    marginTop: '5%',
    paddingBottom: '20%',
    overflow: 'hidden',
  },
  ImageButton: {
    bottom: 35,
    right: 5,
    //   right: Dimensions.get('window').width / 2,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    zIndex: 2,
    backgroundColor: 'transparent',
  },
  MicButton: {
    bottom: 5,
    left: 5,
    //   right: Dimensions.get('window').width / 2,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    zIndex: 2,
    backgroundColor: 'transparent',
  },
  PauseButton: {
    top: 35,
    right: 5,
    //   right: Dimensions.get('window').width / 2,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    zIndex: 2,
    backgroundColor: 'transparent',
  },
  Listener: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    backgroundColor: 'transparent',
  },
});
