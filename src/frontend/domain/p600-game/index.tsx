// import './index.css';

import './App.css';

import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HelperI18Next } from 'universal-helper';

import { middlewareFirebaseInit } from '../../../core/middleware/firebase';
import APIGlobal from '../../global/api';
import { getMethodStoreGlobal } from '../../global/store';
import {
  getMethodStoreGlobalPersist,
  useStoreGlobalPersist,
} from '../../global/store/persist';
import Quiz from './component/Quiz';
import QuizDatas from './Data';
import initI18N from './i18n';

const sI18nDomainName = 'game';
const I18N: HelperI18Next.TypeI18NDomain = initI18N({ name: sI18nDomainName });

const JSX = () => {
  const { setMenu, setI18NDomainName, setMenuUIIsShow } = getMethodStoreGlobal();
  const { t } = useTranslation([sI18nDomainName]);

  const { setUserDatas, setUserData } = getMethodStoreGlobalPersist();
  const { userDatas } = useStoreGlobalPersist(['userDatas']);
  const { userData } = useStoreGlobalPersist(['userData']);

  const GetUserDataIndexByEmail = (email: string) => {
    let indexR = -1;

    userDatas.forEach((element: any, index: number) => {
      if (element['email'] == email) {
        indexR = index;
      }
    });

    return indexR;
  };

  useEffect(() => {
    setI18NDomainName(sI18nDomainName);
    setMenuUIIsShow(true, false, true);
    setMenu(t('header'), 3);
  }, []);

  // Game
  const [score, setScore] = useState(0);
  const [hightestScore, setHightestScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  function optionClick(isCorrect: boolean) {
    if (isCorrect) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
  }

  function restart() {
    if (score > hightestScore) setHightestScore(score);

    setScore(0);
    setCurrentQuestion(0);
  }

  const onShowResult = () => {
    // const currentUserIndex = GetUserDataIndexByEmail(userData.email);
    // const temp = userData;
    // const userDatasTemp = userDatas;
    // temp.gamescore = score;
    // userDatasTemp[currentUserIndex] = temp;
    // setUserData(temp);
    // setUserDatas(userDatasTemp);
    useEffect(() => {
      const update = async () => {
        await middlewareFirebaseInit();
        const res = await APIGlobal.editFieldInCollection({
          key: 'gamescore',
          value: score,
        });
        console.log('game res', res);
      };
      update();
    });
  };

  const section =
    currentQuestion < QuizDatas.length ? (
      <div>
        <Quiz.Score score={score} hightScore={hightestScore} />
        <Quiz.Quiz Data={QuizDatas[currentQuestion]} click={optionClick} />
      </div>
    ) : (
      <Quiz.Result
        onShowResult={onShowResult}
        click={restart}
        maxScore={QuizDatas.length}
        score={score}
      />
    );

  return (
    <>
      <div className="flex-1 overflow-y-auto scroll-smooth">{section}</div>
    </>
  );
};

export default { I18N, JSX };
