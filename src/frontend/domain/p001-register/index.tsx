import './index.css';

import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { RiEyeLine, RiEyeOffLine, RiLockLine, RiUserLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { helperI18Next, helperTime } from 'universal-helper';
import * as yup from 'yup';

import { getMethodStoreGlobal } from '../../global/store';
import {
  getMethodStoreGlobalPersist,
  useStoreGlobalPersist,
} from '../../global/store/persist';
import initI18N from './i18n';
//import { update } from 'firebase/database';

const testUser = 't@t.com';
const testPassword = 'testtest1234';

const sI18nDomainName = 'register';
const I18N: helperI18Next.TypeI18NDomain = initI18N({ name: sI18nDomainName });

const schema = yup.object({
  username: yup.string().required('validate.required'),
  email: yup.string().required('validate.required').email('validate.email'),
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
  const { setUserDatas } = getMethodStoreGlobalPersist();
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

  const Register = async (sEmail: string, sUsername: string, sPassword: string) => {
    setLoading(true);
    await helperTime.WaitForMilliSecond(300);
    setLoading(false);

    // set new userdata
    // setUserDatas([
    //   {
    //     email: 't@t.com',
    //     username: 'sUsername',
    //     password: 'testtest1234',
    //     gamescore: 0,
    //   },
    // ]);
    // console.log('Save');
    // return;

    if (GetUserDataIndexByEmail(sEmail) != -1) {
      setError('email', {
        type: 'custom',
        message: 'validate.dupicateEmail',
      });
      return;
    }

    const newUserdata = {
      email: sEmail,
      username: sUsername,
      password: sPassword,
      gamescore: 0,
    };
    const temp = userDatas;
    temp.push(newUserdata);

    setUserDatas(temp);
    navigate('/');
  };

  const onSubmit = async (data: any) => {
    await Register(data.email, data.username, data.password);
  };

  const [isShowPassword, setIsShowPassword] = useState(false);
  const onClickShowPassword = () => {
    setIsShowPassword((state) => !state);
  };

  return (
    <div className="HScreen bg-gradient-to-b from-neutral-50 to-neutral-100">
      <div className="RSU">
        <div className="HScreen w-sm container mx-auto flex max-w-full flex-col justify-center">
          <div className="text-center text-7xl font-medium text-gray-500">
            {t('form.title')}
          </div>
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
                    type="text"
                    className="h-10 flex-1 pl-2 pt-1 text-xl text-gray-600 placeholder-gray-400 focus:border-gray-600 focus:bg-white focus:placeholder-gray-500 focus:outline-none "
                  />
                </div>
              </div>
              {errors.username && (
                <div className="mt-2 h-5 text-left text-red-500">
                  {helperI18Next.MappingObject(errors.username.message, t)}
                </div>
              )}

              <div
                className={
                  'border-1 w-full rounded border-gray-300 bg-white placeholder-gray-600 shadow-md focus:border-gray-600 focus:bg-white focus:placeholder-gray-500 focus:outline-none ' +
                  (errors.email || errors.global ? 'border-2 border-red-500' : '')
                }
              >
                <div className="flex divide-x-2 divide-gray-300 py-0.5 pr-2">
                  <div className="my-auto w-10 flex-none pb-0.5">
                    <RiUserLine color="DimGray" size="1.2em" className="m-auto block" />
                  </div>
                  <input
                    {...register('email')}
                    placeholder={t('form.email.placeholder') || ''}
                    type="email"
                    className="h-10 flex-1 pl-2 pt-1 text-xl text-gray-600 placeholder-gray-400 focus:border-gray-600 focus:bg-white focus:placeholder-gray-500 focus:outline-none "
                  />
                </div>
              </div>
              {errors.email && (
                <div className="mt-2 h-5 text-left text-red-500">
                  {helperI18Next.MappingObject(errors.email.message, t)}
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
                  {helperI18Next.MappingObject(errors.password.message, t)}
                </div>
              )}
              {errors.global && (
                <div className="mt-2 h-5 text-left text-red-500">
                  {helperI18Next.MappingObject(errors.global.message, t)}
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
                {t('form.button')}
              </button>
            </div>
          </form>
          <button
            onClick={() => {
              navigate('/');
            }}
            className="bg-primary hover:bg-primary-hover mt-7
                block rounded
                px-6 py-3 text-3xl  font-medium text-white shadow-xl
                disabled:bg-gray-500
                disabled:text-gray-300"
          >
            {t('form.backbutton')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default { I18N, JSX };
