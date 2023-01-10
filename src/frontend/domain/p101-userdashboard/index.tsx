// import './index.css';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { helperI18Next } from 'universal-helper';

import { getMethodStoreGlobal } from '../../global/store';
import {
  getMethodStoreGlobalPersist,
  useStoreGlobalPersist,
} from '../../global/store/persist';
import UIMock from './component/ui-mock';
import initI18N from './i18n';

const sI18nDomainName = 'userdashboard';
const I18N: helperI18Next.TypeI18NDomain = initI18N({ name: sI18nDomainName });

const JSX = () => {
  const { setMenu, setI18NDomainName, setMenuUIIsShow } = getMethodStoreGlobal();
  const { t } = useTranslation([sI18nDomainName]);
  const { userData } = useStoreGlobalPersist(['userData']);
  const { setUserData } = getMethodStoreGlobalPersist();

  useEffect(() => {
    setI18NDomainName(sI18nDomainName);
    setMenuUIIsShow(true, true, true);
    setMenu(t('header'), 1);
  }, []);
  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <div className="py-3.5 text-center text-4xl">
          {t('dashboard.username')} : {userData.username}
        </div>
        <div className="py-3.5 text-center text-4xl">
          {t('dashboard.email')} : {userData.email}
        </div>
        <div className="py-3.5 text-center text-4xl">
          {t('dashboard.gamescore')} : {userData.gamescore}
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
