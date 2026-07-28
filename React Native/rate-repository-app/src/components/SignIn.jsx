import { StyleSheet, View, TextInput, Pressable } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native'


const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, 'Username must be 4 or more letters')
    .required('Username is required'),
  password: yup
    .string()
    .min(4, 'Password must be 4 or more letters')
    .required('Password is required'),
});

const styles = StyleSheet.create({
  inputs: {
    height: 60,
    padding: 5,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'black',
    marginBottom: 20
  },
  pressable: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0366d6',
    height: 40,
    borderRadius: 4,
  },
  inputError: {
    borderColor: 'red'
  }
})
const initialValues = {
  username: '',
  password: ''
}

export const SignInContainer = ({ onSubmit }) => {

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  });

  return (
    <View style={{ backgroundColor: "white", padding: 10 }}>
      <TextInput
        testID='username'
        style={[styles.inputs,
        formik.touched.username && formik.errors.username && styles.inputError,
        ]}
        placeholder="Username"
        placeholderTextColor={'gray'}
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
      )}
      <TextInput
        testID='password'
        style={[styles.inputs,
        formik.touched.password && formik.errors.password && styles.inputError,
        ]}
        secureTextEntry
        placeholder="Password"
        placeholderTextColor={'gray'}
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
      )}
      <Pressable testID='submit' style={styles.pressable} onPress={() => formik.handleSubmit()}>
        <Text style={{ fontSize: 20, color: 'white' }}>Sign In</Text>
      </Pressable>
    </View>
  )
};








const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate()
  const onSubmit = async (values) => {
    const { username, password } = values;

    console.log('hello')
    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      navigate('/')
    } catch (e) {
      console.log(e);
      console.log(JSON.stringify(e, null, 2));
    }
  };

  return (
    <SignInContainer onSubmit={onSubmit} />
  )
};

export default SignIn;