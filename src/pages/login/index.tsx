import { ErrorMessage, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../../shared/ui';
import { object, string } from 'yup';
import { loginUserFx } from '../../entities/user';

type LoginValues = {
  email: string;
  password: string;
}

const SigninSchema = object().shape({
  email: string()
    .email('Неккоретный email')
    .required('Обязательное поле'),
  password: string()
    .required('Обязательное поле')
    .min(6, 'Минимальное количество символов - 6'),
});


export const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: LoginValues) => {
    try {
      await loginUserFx(data);
      navigate('/', { replace: true })
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="bg-white rounded w-screen h-screen sm:p-6 sm:shadow-2xl sm:w-auto sm:h-auto">
        <div className="flex justify-center items-center flex-col sm:flex-row w-screen h-screen sm:w-auto sm:h-auto">
          <img src="/image/beard.png" alt="bear" className="w-auto h-auto sm:w-96 sm:h-96 sm:mr-10"/>
          <div className="w-screen px-6 sm:w-auto sm:px-0">
            <h1 className="text-lg mb-2 font-bold">Авторизация</h1>
            <Formik
              initialValues={{email: '', password: ''}}
              onSubmit={handleSubmit}
              validationSchema={SigninSchema}
            >
              {({isSubmitting, isValid, touched}) => (
                <Form>
                  <div className="flex flex-col space-y-4 mb-6">
                    <div>
                      <Input label="Email" name="email" type="email"/>
                      <ErrorMessage className="absolute text-xs text-red-600" component="div" name="email"/>
                    </div>
                    <div>
                      <Input label="Пароль" name="password" type="password"/>
                      <ErrorMessage className="absolute text-xs text-red-600" component="div" name="password"/>
                    </div>
                  </div>
                  <Button variant="contained" disabled={isSubmitting || (touched && !isValid)} type="submit">Войти</Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}