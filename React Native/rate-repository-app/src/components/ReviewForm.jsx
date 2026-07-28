import { Pressable, TextInput, View, Text } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useCreateReview from '../hooks/useCreateReview';
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
  owner: yup
    .string()
    .min(4, 'Username must be 4 or more letters')
    .required('Username is required'),
  name: yup
    .string()
    .min(4, 'Name must be 4 or more letters')
    .required('Name is required'),
  rating: yup
    .number()
    .max(100, 'Rating must be 0-100')
    .min(0, 'Rating must be 0-100')
    .required('Rating is required'),
  reviewText: yup
    .string()
});





const ReviewForm = () => {
  const [createReview] = useCreateReview()
  const navigate = useNavigate()
  const onSubmit = async (values) => {
    const { owner, name, rating, reviewText } = values;

    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName: owner,
            repositoryName: name,
            rating: Number(rating),
            text: reviewText
          }
        }

      })
      const id = data.createReview.repository.id
      navigate(`/repository/${id}`)
    } catch (e) {
      console.log(e);
      console.log(JSON.stringify(e, null, 2));
    }
  };

  const initialValues = {
    owner: '',
    name: '',
    rating: '',
    reviewText: ''
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
        formik.touched.owner && formik.errors.owner && styles.inputError,
        ]}
        placeholder="Owner Username"
        placeholderTextColor={'gray'}
        value={formik.values.owner}
        onChangeText={formik.handleChange('owner')}
        onBlur={formik.handleBlur('owner')}
      />
      {formik.touched.owner && formik.errors.owner && (
        <Text style={{ color: 'red' }}>{formik.errors.owner}</Text>
      )}

      <TextInput
        style={[styles.inputs,
        formik.touched.name && formik.errors.name && styles.inputError,
        ]}
        placeholder="Name"
        placeholderTextColor={'gray'}
        value={formik.values.name}
        onChangeText={formik.handleChange('name')}
        onBlur={formik.handleBlur('name')}
      />
      {formik.touched.name && formik.errors.name && (
        <Text style={{ color: 'red' }}>{formik.errors.name}</Text>
      )}


      <TextInput
        style={[styles.inputs,
        formik.touched.rating && formik.errors.rating && styles.inputError,
        ]}
        placeholder="Rating"
        placeholderTextColor={'gray'}
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        onBlur={formik.handleBlur('rating')}
      />

      {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: 'red' }}>{formik.errors.rating}</Text>
      )}


      <TextInput
        style={styles.inputs}
        placeholder="Review text"
        placeholderTextColor={'gray'}
        value={formik.values.reviewText}
        onChangeText={formik.handleChange('reviewText')}
        onBlur={formik.handleBlur('reviewText')}
        multiline={true}
      >

      </TextInput>
      <Pressable style={styles.pressable} onPress={() => formik.handleSubmit()}>
        <Text style={{ color: 'white' }}>Create review</Text>
      </Pressable>
    </View>
  )

}

export default ReviewForm