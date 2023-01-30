// import './index.css';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { HelperI18Next } from 'universal-helper';

import { getMethodStoreGlobal } from '../../global/store';
// import UIMock from './component/ui-mock';
import initI18N from './i18n';

const sI18nDomainName = 'threejsgo';
const I18N: HelperI18Next.TypeI18NDomain = initI18N({ name: sI18nDomainName });

const JSX = () => {
  const { setMenu, setI18NDomainName, setMenuUIIsShow } = getMethodStoreGlobal();
  const { t } = useTranslation([sI18nDomainName]);

  useEffect(() => {
    setI18NDomainName(sI18nDomainName);
    setMenuUIIsShow(true, false, true);
    setMenu(t('header'), 4);
  }, []);
  return (
    <>
      <div className="flex-1 overflow-y-auto scroll-smooth">Three JS Go</div>
    </>
  );
};

export default { I18N, JSX };
