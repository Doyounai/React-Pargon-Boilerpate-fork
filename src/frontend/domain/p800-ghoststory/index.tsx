// import './index.css';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { helperI18Next } from 'universal-helper';

import { getMethodStoreGlobal } from '../../global/store';
import Ghoststoryitem from './component/ghoststoryitem/ghoststoryitem';
import initI18N from './i18n';

const sI18nDomainName = 'ghoststory';
const I18N: helperI18Next.TypeI18NDomain = initI18N({ name: sI18nDomainName });

const JSX = () => {
  const { setMenu, setI18NDomainName, setMenuUIIsShow } = getMethodStoreGlobal();
  const { t } = useTranslation([sI18nDomainName]);

  useEffect(() => {
    setI18NDomainName(sI18nDomainName);
    setMenuUIIsShow(true, false, true);
    setMenu(t('header'), 5);
  }, []);
  return (
    <>
      <div className="flex-1 overflow-y-auto scroll-smooth">
        <Ghoststoryitem
          path="/user/ghoststory/ghost1"
          storyname="กฏการกินส้มตำตอนเที่ยงคืน"
        />
        <Ghoststoryitem
          path="/user/ghoststory/ghost2"
          storyname="สยองวิญญานหลอน แขกไม่ได้รับเชิญ"
        />
        <Ghoststoryitem path="/user/ghoststory/ghost3" storyname="คำสาปบนดอยสูง" />
        <Ghoststoryitem path="/user/ghoststory/ghost4" storyname="บ้านพักสยองขวัญ" />
      </div>
    </>
  );
};

export default { I18N, JSX };
