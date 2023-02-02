// import './index.css';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { HelperI18Next } from 'universal-helper';

import { getMethodStoreGlobal } from '../../global/store';
import initI18N from './i18n';

const sI18nDomainName = 'ghoststory1';
const I18N: HelperI18Next.TypeI18NDomain = initI18N({ name: sI18nDomainName });

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
        1. กฏข้อแรก หากคุณเดินเข้ามาในร้านคุณห้ามเลือกนั่งโต๊ะเองเด็ดขาด
        คุณต้องรอจนกว่าเข้าของร้านจะยกเก้าอี้มาให้คุณนั่งและถ้าคุณนั่งโต๊ะนั้นแล้วคุณห้ามลุกหรือเปลี่ยนไปนั่งโต๊ะอื่นเด็ดขาด
        <br />
        <br />
        2. ส้มตำในร้านนี้จะมีแบบเดียวเท่านั้น
        คุณไม่สามารถเลือกได้และไม่ว่าเจ้าของร้านจะตำส้มตำแบบไหนมาให้คุณกิน
        คุณก็ต้องกินมันให้หมดห้ามแสดงอาการออกมาเด็ดขาดไม่ว่าส้มตำจะมีรสชาติยังไง
        <br />
        <br />
        3.ระหว่างที่คุณกำลังกินส้มตำอยู่
        หากมีคนอื่นเดินเข้ามานั่งกินส้มตำคุณห้ามมองหรือเผลอไปสบตากับเขาเด็ดขาด
        เพราะเขาเป็นวิญญาณเร่ร่อนที่จะปรากฏตัวออกมากินส้มตำทุก ๆ คืน
        <br />
        <br />
        4. ราว ๆ 5 ทุ่ม หากคุณเจอหญิงสติไม่ดีเดินเข้ามาขอกินส้มตำด้วย
        ให้คุณชวนเธอเข้ามานั่งกินส้มตำด้วยกัน ถ้าเธอกินส้มตำจนพอใจแล้ว
        เธออาจจะมีของตอบแทนให้คุณ แต่ถ้าหากเธอไม่ได้กินส้มตำเธออาจจะอาละวาดและทำร้ายคุณได้
        <br />
        <br />
        5. ใกล้เวลาเที่ยงคืน หากคุณสังเกตเห็นว่าเจ้าของร้านมีท่าทีที่ดูผิดปกติไป
        ให้คุณรีบวิ่งหนีออกจากร้านไปโดยไม่ต้องจ่ายเงิน
        ในกรณีที่เหตุการณ์ทุกอย่างปกติให้คุณจ่ายเงินค่าส้มตำให้เจ้าของร้านจนกว่าเขาจะพอใจ
        เพราะถ้าเกิดเขาไม่พอใจในราคาส้มตำคุณอาจจะต้องจ่ายค่าส้มตำเป็นอย่างอื่นแทน{' '}
      </div>
    </>
  );
};

export default { I18N, JSX };
