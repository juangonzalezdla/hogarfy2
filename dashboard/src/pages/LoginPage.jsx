import BasicHeader from '../components/BasicHeader';
import Main from '../components/form/Main';
import FormContainer from '../components/form/FormContainer';
import FormTitle from '../components/form/FormTitle';
import Form from '../components/form/Form';
import { Input } from '../components/form/Input';
import ErrorMessage from '../components/form/ErrorMessage';
import SuccessMessage from '../components/form/SuccessMessage';

import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userLoginSchema } from '../schemas/user.js';
import { zodResolver } from '@hookform/resolvers/zod';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    document.title = 'Iniciar sesión | Dashboard';
  }, []);

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(userLoginSchema)
  });

  const { signin, successMessage, errorsMessage, isAuthenticated, isAuthorized } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => await signin(data);

  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  return (
    <>
      <BasicHeader />
      <Main>
        <FormContainer>
          <FormTitle title='Iniciar sesión' />
          {
            errorsMessage.map((error, i) => (
              <ErrorMessage message={error} key={i} />
            ))
          }
          {
            successMessage.map((success, i) => (
              <SuccessMessage message={success} key={i} />
            ))
          }
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className='w-full flex flex-col'>      
              <Input 
                type="email"
                placeholder='Correo electronico'
                id='email'
                {...register('email')}
              />
              {errors.email?.message && (
                <p className='text-red-500 font-semibold ml-2'>{errors.email?.message}</p>
              )}

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-2/3 transform -translate-y-1/2 bg-transparent border-none"
                >
                  {showPassword ? (
                    <i className='bx bxs-hide text-azul bx-sm'></i>
                  ) : (
                    <i className='bx bxs-show text-azul bx-sm'></i>
                  )}
                </button>
              </div>
              {errors.password?.message && (
                <p className="text-red-500 font-semibold ml-2">
                  {errors.password?.message}
                </p>
              )}
            </div>

            <button 
              type="submit"
              className='mt-10 bg-azul px-6 py-2.5 text-base text-blanco 
              font-bold border-2 border-solid border-azul rounded-[20px]'
            >
              Ingresar
            </button>
          </Form>
        </FormContainer>
      </Main>
    </>
  )
};

export default LoginPage;