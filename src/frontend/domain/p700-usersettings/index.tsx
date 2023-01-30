// import './index.css';

// eslint-disable-next-line simple-import-sort/imports
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { HelperI18Next, HelperTime } from 'universal-helper';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { getMethodStoreGlobal } from '../../global/store';
import {
  getMethodStoreGlobalPersist,
  useStoreGlobalPersist,
} from '../../global/store/persist';
import initI18N from './i18n';

const sI18nDomainName = 'usersetting';
const I18N: HelperI18Next.TypeI18NDomain = initI18N({ name: sI18nDomainName });

const schema = yup.object({
  username: yup.string().required('กรุณาใส่ผู้ใช้งานใหม่'),
});

const JSX = () => {
  const { setMenu, setI18NDomainName, setMenuUIIsShow } = getMethodStoreGlobal();
  const { t } = useTranslation([sI18nDomainName]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  const { setLoading } = getMethodStoreGlobal();
  const { setUserDatas, setUserData } = getMethodStoreGlobalPersist();
  const { userData } = useStoreGlobalPersist(['userData']);
  const { userDatas } = useStoreGlobalPersist(['userDatas']);

  const GetUserDataIndexByEmail = (email: string) => {
    let indexR = -1;

    userDatas.forEach((element: any, index: number) => {
      if (element['email'] == email) {
        indexR = index;
      }
    });

    return indexR;
  };
  const Register = async (sUsername: string) => {
    setLoading(true);
    await HelperTime.WaitForMilliSecond(300);
    setLoading(false);

    const currentUserIndex = GetUserDataIndexByEmail(userData.email);
    const userDataTemp = userData;
    const userDatasTemp = userDatas;

    if (userDataTemp.username == sUsername) {
      setError('username', {
        type: 'custom',
        message: 'กรุณากรอกชื่อผู้ใช้งานใหม่',
      });
      return;
    }

    userDataTemp.username = sUsername;
    userDatasTemp[currentUserIndex] = userDataTemp;

    setUserData(userDataTemp);
    setUserDatas(userDatasTemp);
  };

  const onSubmit = async (data: any) => {
    await Register(data.username);
  };

  useEffect(() => {
    setI18NDomainName(sI18nDomainName);
    setMenuUIIsShow(true, false, true);
    setMenu(t('header'), 4);
  }, []);
  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <div className="py-3.5 text-center text-4xl">
          ชื่อผู้ใช้งาน : {userData.username}
        </div>
        <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
          <div
            className={
              'border-1 w-full rounded border-gray-300 bg-white placeholder-gray-600 shadow-md focus:border-gray-600 focus:bg-white focus:placeholder-gray-500 focus:outline-none ' +
              (errors.username || errors.global ? 'border-2 border-red-500' : '')
            }
          >
            <div className="flex divide-x-2 divide-gray-300 py-0.5 pr-2">
              <input
                {...register('username')}
                placeholder="ชื่อผู้ใช้งานใหม่"
                type="text"
                className="h-10 flex-1 pl-2 pt-1 text-xl text-gray-600 placeholder-gray-400 focus:border-gray-600 focus:bg-white focus:placeholder-gray-500 focus:outline-none "
              />
            </div>
          </div>
          {errors.username && (
            <div className="mt-2 h-5 text-left text-red-500">
              {HelperI18Next.MappingObject(errors.username.message, t)}
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
            เปลี่ยน
          </button>
        </form>
      </div>
    </>
  );
};

export default { I18N, JSX };
