// import './index.css';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HelperI18Next } from 'universal-helper';

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
import UIMock from './component/ui-mock';
import initI18N from './i18n';

const sI18nDomainName = 'userdashboard';
const I18N: HelperI18Next.TypeI18NDomain = initI18N({ name: sI18nDomainName });

const JSX = () => {
  const { setMenu, setI18NDomainName, setMenuUIIsShow } = getMethodStoreGlobal();
  const { t } = useTranslation([sI18nDomainName]);

  // local storage
  // const { userData } = useStoreGlobalPersist(['userData']);
  const { setUserData } = getMethodStoreGlobalPersist();

  // firebase
  let userData: any = null;
  const [username, setUsername] = useState();
  const [gamescore, setGamescore] = useState();
  // const { currentUser } = middlewareFirebase.Auth.GetAuth();

  useEffect(() => {
    const update = async () => {
      await middlewareFirebaseInit();
      userData = await APIGlobal.readUserProfile();
      // console.log(userData.res.data['username']);
      setUsername(userData.res.data['username']);
      setGamescore(userData.res.data['gamescore']);
    };
    update();
  });

  useEffect(() => {
    setI18NDomainName(sI18nDomainName);
    setMenuUIIsShow(true, true, true);
    setMenu(t('header'), 1);
  }, []);
  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <div className="py-3.5 text-center text-4xl">
          {t('dashboard.username')} : {username}
        </div>
        {/* <div className="py-3.5 text-center text-4xl">
          {t('dashboard.email')} : {currentUser?.email}
        </div> */}
        <div className="py-3.5 text-center text-4xl">
          {t('dashboard.gamescore')} : {gamescore}
        </div>

        <button
          className="bg-secondary-select hover:bg-secondary-hover
            block w-full rounded 
             py-3 text-2xl  font-medium text-white shadow-xl
            disabled:bg-gray-500
            disabled:text-gray-300"
          onClick={() => {
            setUserData(null);
          }}
        >
          {t('logout')}
        </button>
      </div>
    </>
  );
};

export default { I18N, JSX };
