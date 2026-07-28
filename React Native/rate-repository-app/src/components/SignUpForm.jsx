import { Pressable, TextInput, View, Text } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useCreateUser from '../hooks/useCreateUser';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10
  },
  inputError: {
    borderColor: 'red',
  },
  inputs: {
    height: 60,
    padding: 5,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'black',
    marginBottom: 10,
    marginTop: 10
  },
  pressable: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0366d6',
    height: 40,
    borderRadius: 4,
  },
})
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, 'Username must be 5 or more letters')
    .max(30, 'Username must be maximum 30 letters')
    .required('Username is required'),
  password: yup
    .string()
    .min(4, 'Password must be 5 or more letters')
    .max(50, 'Password must be maximum 50 letters')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')])
    .required('Password confirm is required')
});

const SignUpForm = () => {
  const [signIn] = useSignIn();
  const [createUser] = useCreateUser()
  const navigate = useNavigate()
  const onSubmit = async (values) => {
    const { username, password, passwordConfirm } = values;

    try {
      const { data } = await createUser({
        variables: {
          user: {
            username: username,
            password: password
          }
        }

      })
      await signIn({ username, password })
      navigate(`/`)
    } catch (e) {
      console.log(e);
      console.log(JSON.stringify(e, null, 2));
    }
  };

  const initialValues = {
    username: '',
    password: '',
    passwordConfirm: ''
  }
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  });
  return (
    <View style={styles.container}>
      <TextInput
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
        style={[styles.inputs,
        formik.touched.password && formik.errors.password && styles.inputError,
        ]}
        placeholder="Password"
        placeholderTextColor={'gray'}
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
      )}


      <TextInput
        style={[styles.inputs,
        formik.touched.passwordConfirm && formik.errors.passwordConfirm && styles.inputError,
        ]}
        placeholder="Confirm Password"
        placeholderTextColor={'gray'}
        value={formik.values.passwordConfirm}
        onChangeText={formik.handleChange('passwordConfirm')}
        onBlur={formik.handleBlur('passwordConfirm')}
      />

      {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
        <Text style={{ color: 'red' }}>{formik.errors.passwordConfirm}</Text>
      )}

      <Pressable style={styles.pressable} onPress={() => formik.handleSubmit()}>
        <Text style={{ color: 'white' }}>Sign up</Text>
      </Pressable>
    </View>
  )

}



export default SignUpForm