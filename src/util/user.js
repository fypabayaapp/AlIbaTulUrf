import axios from '../Axios';
import {Alert} from 'react-native';

export async function LoginUser(email, password) {
  try {
    const {data} = await axios.post(`/user/login`, {
      email,
      password,
    });
    Alert.alert(`${data?.message}`);
    return data;
  } catch (e) {
    Alert.alert(`${e?.response?.data?.message}` || ` Something went wrong`);
    return;
  }
}

export async function SignUpUser(formData) {
  try {
    const {data} = await axios({
      url: `/user/register`,
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    Alert.alert(`🎉${data?.message} 🎉`);
    return;
  } catch (e) {
    Alert.alert(`${e?.response?.data?.message}` || ` Something went wrong`);
    return;
  }
}

export async function ImageUpdate(formData, token) {
  try {
    const {data} = await axios({
      url: `/user/edit/profile-pic`,
      method: 'PUT',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: token,
      },
    });

    Alert.alert(`🎉${data?.message} 🎉`);

    return;
  } catch (e) {
    Alert.alert(`${e?.response?.data?.message}` || ` Something went wrong`);
    return;
  }
}

export async function ProfileUpdate(Data, token) {
  try {
    const {data} = await axios({
      url: `/user/edit/profile`,
      method: 'PUT',
      data: Data,
      headers: {
        authorization: token,
      },
    });

    Alert.alert(`🎉${data?.message} 🎉`);

    return;
  } catch (e) {
    Alert.alert(`${e?.response?.data?.message}` || ` Something went wrong`);
    return;
  }
}
