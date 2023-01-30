// import './index.css';

import { useEffect } from 'react';
import { HelperI18Next } from 'universal-helper';
import { WaitForMilliSecond } from 'universal-helper/src/helper/time';

// import scriptImport from '../../global/component/atoms/script-import';
// import script1 from '../../../../lib/game';
// import script2 from '../../../../lib/game/main.js';
// import { useTranslation } from 'react-i18next';
import { getMethodStoreGlobal } from '../../global/store';
import initI18N from './i18n';
// import * from '../../../../src/interactive/domain/impact-js/'
// import
const sI18nDomainName = 'impactjs';
const I18N: HelperI18Next.TypeI18NDomain = initI18N({ name: sI18nDomainName });

const canvasGame = document.createElement('canvas');
canvasGame.id = 'canvas';
// const canvasGame = <canvas id="canvas"></canvas>;
const script1 = document.createElement('script');
const script2 = document.createElement('script');

const JSX = () => {
  const { setMenu, setI18NDomainName, setMenuUIIsShow } = getMethodStoreGlobal();

  // const { t } = useTranslation([sI18nDomainName]);
  // scriptImport('lib/impact/impact.js');
  // scriptImport('lib/game/main.js');

  const loadScript = async () => {
    if (script1.src != '') {
      return;
    }
    script1.src = 'lib/impact/impact.js';
    script1.async = true;
    document.body.appendChild(script1);
    await WaitForMilliSecond(10);
    if (script2.src != '') {
      return;
    }
    script2.src = 'src/interactive/domain/impact-js/game/main.js';
    script2.async = true;
    document.body.appendChild(script2);
    await WaitForMilliSecond(10);
  };

  useEffect(() => {
    setI18NDomainName(sI18nDomainName);
    setMenuUIIsShow(true, false, true);
    setMenu('impact.js', 3);
    loadScript();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // console.log(ig);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // ig.system.startRunLoop();

    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // ig.system.stopRunLoop();
    };
  }, []);

  return (
    <div
      className="flex-auto"
      ref={(mount) => {
        mount?.append(canvasGame);
      }}
    />
  );
};

export default { I18N, JSX };
