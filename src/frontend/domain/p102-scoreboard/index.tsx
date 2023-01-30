// import './index.css';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { HelperI18Next } from 'universal-helper';

import { getMethodStoreGlobal } from '../../global/store';
import { useStoreGlobalPersist } from '../../global/store/persist';
import UserScore from './component/ui-mock';
import initI18N from './i18n';

const sI18nDomainName = 'scoreboard';
const I18N: HelperI18Next.TypeI18NDomain = initI18N({ name: sI18nDomainName });

const JSX = () => {
  const { setMenu, setI18NDomainName, setMenuUIIsShow } = getMethodStoreGlobal();
  const { t } = useTranslation([sI18nDomainName]);
  const { userDatas } = useStoreGlobalPersist(['userDatas']);

  const userScores = userDatas.map((element, index) => {
    return <UserScore key={index} username="{element.username}" score={1} />;
  });

  useEffect(() => {
    setI18NDomainName(sI18nDomainName);
    setMenuUIIsShow(true, false, true);
    setMenu(t('header'), 2);
  }, []);
  return (
    <>
      <div className="flex-1 overflow-y-auto scroll-smooth">{userScores}</div>
    </>
  );
};

export default { I18N, JSX };
