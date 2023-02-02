// import './index.css';

import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HelperI18Next } from 'universal-helper';

import { middlewareFirebaseInit } from '../../../core/middleware/firebase';
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

  // const userScores = userDatas.map((element, index) => {
  //   return <UserScore key={index} username="{element.username}" score={1} />;
  // });
  const [userScores, setUserScore] = useState(<></>);
  // let userScores = <></>;

  useEffect(() => {
    setI18NDomainName(sI18nDomainName);
    setMenuUIIsShow(true, false, true);
    setMenu(t('header'), 2);
  }, []);

  useEffect(() => {
    const GetScoreBoxs = async (userDataArray: Array<any>) => {
      const temp: any = userDataArray.map((element, index) => {
        return (
          <UserScore
            key={index}
            username={element['username']}
            score={element['gamescore']}
          />
        );
      });
      return temp;
    };

    const getUsersDoc = async () => {
      await middlewareFirebaseInit();
      const db = getFirestore();
      const colRef = collection(db, 'users');
      const res = await getDocs(colRef);

      const userDataArray: Array<any> = [];
      res.forEach((doc) => {
        userDataArray.push(doc.data());
      });
      // const temp: any = userDataArray.map((element, index) => {
      //   return (
      //     <UserScore
      //       key={index}
      //       username={element['username']}
      //       score={element['gamescore']}
      //     />
      //   );
      // });
      const temp = await GetScoreBoxs(userDataArray);

      setUserScore(temp);
      // userScores = temp;
    };
    getUsersDoc();
  });

  return (
    <>
      <div className="flex-1 overflow-y-auto scroll-smooth">{userScores}</div>
    </>
  );
};

export default { I18N, JSX };
