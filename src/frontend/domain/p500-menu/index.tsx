// import './index.css';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { HelperI18Next } from 'universal-helper';

import { getMethodStoreGlobal } from '../../global/store';
import { getMethodStoreGlobalPersist } from '../../global/store/persist';
import initI18N from './i18n';
// import
const sI18nDomainName = 'menu';
const I18N: HelperI18Next.TypeI18NDomain = initI18N({ name: sI18nDomainName });

const JSX = () => {
  const { setMenu, setI18NDomainName, setMenuUIIsShow } = getMethodStoreGlobal();
  const { setUserData } = getMethodStoreGlobalPersist();

  const { t } = useTranslation([sI18nDomainName]);

  useEffect(() => {
    setI18NDomainName(sI18nDomainName);
    setMenuUIIsShow(true, true, true);
    setMenu(t('header'), 5);
  }, []);
  return (
    <div className="bg-light-700 flex flex-auto flex-col">
      <div className="flex flex-auto flex-col"></div>
      <div className="h-15 mb-10 flex-none px-10">
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
    </div>
  );
};

export default { I18N, JSX };
