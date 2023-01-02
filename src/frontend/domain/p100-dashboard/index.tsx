// import './index.css';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { helperI18Next } from 'universal-helper';

import { getMethodStoreGlobal } from '../../global/store';
import UIMock from './component/ui-mock';
import initI18N from './i18n';

const sI18nDomainName = 'dashboard';
const I18N: helperI18Next.TypeI18NDomain = initI18N({ name: sI18nDomainName });

const JSX = () => {
  const { setMenu, setI18NDomainName, setMenuUIIsShow } = getMethodStoreGlobal();
  const { t } = useTranslation([sI18nDomainName]);

  useEffect(() => {
    setI18NDomainName(sI18nDomainName);
    setMenuUIIsShow(true, true, true);
    setMenu(t('header'), 1);
  }, []);
  return (
    <>
      <div className="flex-1 overflow-x-auto">
        <UIMock.JSX data={{}} sI18nDomainName={sI18nDomainName} />
        <UIMock.JSX data={{}} sI18nDomainName={sI18nDomainName} />
        <UIMock.JSX data={{}} sI18nDomainName={sI18nDomainName} />
        <UIMock.JSX data={{}} sI18nDomainName={sI18nDomainName} />
        <UIMock.JSX data={{}} sI18nDomainName={sI18nDomainName} />
        <UIMock.JSX data={{}} sI18nDomainName={sI18nDomainName} />
        <UIMock.JSX data={{}} sI18nDomainName={sI18nDomainName} />
        <UIMock.JSX data={{}} sI18nDomainName={sI18nDomainName} />
        <UIMock.JSX data={{}} sI18nDomainName={sI18nDomainName} />
        <UIMock.JSX data={{}} sI18nDomainName={sI18nDomainName} />
        <UIMock.JSX data={{}} sI18nDomainName={sI18nDomainName} />
        <UIMock.JSX data={{}} sI18nDomainName={sI18nDomainName} />
        <UIMock.JSX data={{}} sI18nDomainName={sI18nDomainName} />
      </div>
    </>
  );
};

export default { I18N, JSX };
