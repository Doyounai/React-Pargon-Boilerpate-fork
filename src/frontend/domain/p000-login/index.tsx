import './index.css';

import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { RiEyeLine, RiEyeOffLine, RiLockLine, RiUserLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { HelperI18Next, HelperTime } from 'universal-helper';
import * as yup from 'yup';

import {
  middlewareFirebase,
  middlewareFirebaseInit,
} from '../../../core/middleware/firebase';
import APIGlobal from '../../global/api';
import { getMethodStoreGlobal } from '../../global/store';
import {
  getMethodStoreGlobalPersist,
  useStoreGlobalPersist,
} from '../../global/store/persist';
import initI18N from './i18n';

const testUser = 't@t.com';
const testPassword = 'testtest1234';

const sI18nDomainName = 'login';
const I18N: HelperI18Next.TypeI18NDomain = initI18N({ name: sI18nDomainName });

const schema = yup.object({
  username: yup.string().required('validate.required').email('validate.email'),
  password: yup
    .string()
    .required('validate.required')
    .min(4, { key: 'validate.min', option: { count: 4 } }),
});

const JSX = () => {
  const { t, i18n } = useTranslation([sI18nDomainName]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  const { setLoading } = getMethodStoreGlobal();
  const { setUserData } = getMethodStoreGlobalPersist();
  const { userDatas } = useStoreGlobalPersist(['userDatas']);

  const navigate = useNavigate();

  const GetUserDataIndexByEmail = (email: string) => {
    let indexR = -1;

    userDatas.forEach((element: any, index: number) => {
      if (element['email'] == email) {
        indexR = index;
      }
    });

    return indexR;
  };

  const firebaseLogin = async (sEmail: string, sPassword: string) => {
    setLoading(true);
    await HelperTime.WaitForMilliSecond(300);
    setLoading(false);

    const userDataIndex = GetUserDataIndexByEmail(sEmail);

    // if (userDataIndex == -1) {
    //   setError('username', {
    //     type: 'custom',
    //     message: 'validate.userNotFound',
    //   });
    //   return;
    // }

    // if (sPassword == 'global') {
    //   setError('global', {
    //     type: 'custom',
    //     message: 'validate.networkRequestFailed',
    //   });
    //   return;
    // }

    // firebase
    await middlewareFirebaseInit();
    const res = await middlewareFirebase.Auth.SignInWithEmailAndPassword(
      sEmail,
      sPassword,
    );

    console.log('res', res.error);

    if (res.error?.message != null) {
      setError('username', {
        type: 'custom',
        message: 'validate.userNotFound',
      });
      return;
    }

    //if (sPassword != testPassword) {
    // if (sPassword != userDatas[userDataIndex].password) {
    //   setError('password', {
    //     type: 'custom',
    //     message: 'validate.passwordWrong',
    //   });
    //   return;
    // }

    console.log('sign in');
    //setUserData(userDatas[userDataIndex]);
    setUserData([]);

    navigate('/user/userdashboard');
  };

  const onSubmit = async (data: any) => {
    await firebaseLogin(data.username, data.password);
  };

  const [isShowPassword, setIsShowPassword] = useState(false);
  const onClickShowPassword = () => {
    setIsShowPassword((state) => !state);
  };

  return (
    <div className="uh-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
      <div className="RSU">
        <div className="uh-h-screen w-sm container mx-auto flex max-w-full flex-col justify-center">
          <div className="text-center text-7xl font-medium text-gray-500">
            Boilerplate.
          </div>
          {/* <select
              onChange={(event: any) => i18n.changeLanguage(event.target.value)}
              value={i18n.language}
            >
              <option value="en">EN</option>
              <option value="th">TH</option>
            </select> */}
          <div className="mt-7 flex flex-row justify-center gap-x-2 text-xl">
            <input
              type="radio"
              name="EN"
              value="en"
              checked={i18n.language === 'en'}
              onChange={() => i18n.changeLanguage('en')}
            />
            EN
            <input
              type="radio"
              name="TH"
              value="th"
              checked={i18n.language === 'th'}
              onChange={() => i18n.changeLanguage('th')}
            />
            TH
          </div>

          <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="mx-auto max-w-lg flex-none ">
              <div
                className={
                  'border-1 w-full rounded border-gray-300 bg-white placeholder-gray-600 shadow-md focus:border-gray-600 focus:bg-white focus:placeholder-gray-500 focus:outline-none ' +
                  (errors.username || errors.global ? 'border-2 border-red-500' : '')
                }
              >
                <div className="flex divide-x-2 divide-gray-300 py-0.5 pr-2">
                  <div className="my-auto w-10 flex-none pb-0.5">
                    <RiUserLine color="DimGray" size="1.2em" className="m-auto block" />
                  </div>
                  <input
                    {...register('username')}
                    placeholder={t('form.username.placeholder') || ''}
                    type="email"
                    className="h-10 flex-1 pl-2 pt-1 text-xl text-gray-600 placeholder-gray-400 focus:border-gray-600 focus:bg-white focus:placeholder-gray-500 focus:outline-none "
                  />
                </div>
              </div>
              {errors.username && (
                <div className="mt-2 h-5 text-left text-red-500">
                  {HelperI18Next.MappingObject(errors.username.message, t)}
                </div>
              )}
              <div
                className={
                  'border-1 mt-2 w-full rounded border-gray-300 bg-white placeholder-gray-600 shadow-md focus:border-gray-600 focus:bg-white focus:placeholder-gray-500 focus:outline-none ' +
                  (errors.password || errors.global ? 'border-2 border-red-500' : '')
                }
              >
                <div className="flex divide-x-2 divide-gray-300 py-0.5">
                  <div className="my-auto w-10 flex-none pb-0.5">
                    <RiLockLine color="DimGray" size="1.2em" className="m-auto block" />
                  </div>
                  <input
                    placeholder={t('form.password.placeholder') || ''}
                    {...register('password')}
                    type={isShowPassword ? 'text' : 'password'}
                    /* block py-2 */
                    className="h-10 flex-1 pl-2 pt-1 text-xl text-gray-600 placeholder-gray-400 focus:border-gray-600 focus:bg-white focus:placeholder-gray-500 focus:outline-none"
                  />
                  <div
                    className="my-auto w-10 flex-none pb-0.5"
                    onClick={onClickShowPassword}
                  >
                    {isShowPassword && (
                      <RiEyeOffLine
                        color="DimGray"
                        size="1.2em"
                        className="m-auto block"
                      />
                    )}
                    {!isShowPassword && (
                      <RiEyeLine color="DimGray" size="1.2em" className="m-auto block" />
                    )}
                  </div>
                </div>
              </div>
              {errors.password && (
                <div className="mt-2 h-5 text-left text-red-500">
                  {HelperI18Next.MappingObject(errors.password.message, t)}
                </div>
              )}
              {errors.global && (
                <div className="mt-2 h-5 text-left text-red-500">
                  {HelperI18Next.MappingObject(errors.global.message, t)}
                </div>
              )}
              <button
                disabled={!isDirty || !isValid}
                type="submit"
                className="bg-primary hover:bg-primary-hover mt-7
                block w-full rounded
                px-6 py-3 text-3xl  font-medium text-white shadow-xl
                disabled:bg-gray-500
                disabled:text-gray-300"
              >
                {t('form.login')}
              </button>
            </div>
          </form>
          <button
            onClick={() => {
              navigate('/register');
            }}
            className="bg-primary hover:bg-primary-hover mt-7
                block w-full rounded
                px-6 py-3 text-3xl  font-medium text-white shadow-xl
                disabled:bg-gray-500
                disabled:text-gray-300"
          >
            {t('register.signup')}
          </button>
          <div className="mt-5 grid grid-cols-2 text-xl">
            <div>User : {testUser}</div>
            <div>Password : {testPassword}</div>
            <div>Test Globel Error</div>
            <div>Password : global</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default { I18N, JSX };
