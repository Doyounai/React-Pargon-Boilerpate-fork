import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { HelperI18Next } from 'universal-helper';

import P000Login from '../../domain/p000-login';
import P001Register from '../../domain/p001-register';
import P100Dashboard from '../../domain/p100-dashboard';
import P101Userdashboard from '../../domain/p101-userdashboard';
import P102Scoreboard from '../../domain/p102-scoreboard';
import P200ThreeJS from '../../domain/p200-threejs';
import P300ImpactJS from '../../domain/p300-impactjs';
import P400ThreejsGo from '../../domain/p400-threejsgo';
import P500Menu from '../../domain/p500-menu';
import P600Chat from '../../domain/p600-game';
import P700Usersettings from '../../domain/p700-usersettings';
import P800Ghoststory from '../../domain/p800-ghoststory';
import P801Ghoststory1 from '../../domain/p801-ghoststory-1';
import P802Ghoststory2 from '../../domain/p802-ghoststory-2';
import P803Ghoststory3 from '../../domain/p803-ghoststory-3';
import P804Ghoststory4 from '../../domain/p804-ghoststory-4';
import RoutePrivate from '../component/atoms/route-private';
import TemplateMobile from '../component/templates/template-mobile';
import { useStoreGlobalPersist } from '../store/persist';

const i18nList: HelperI18Next.TypeI18NDomain[] = [
  P000Login.I18N,
  P100Dashboard.I18N,
  P200ThreeJS.I18N,
  P300ImpactJS.I18N,
  P400ThreejsGo.I18N,
  P500Menu.I18N,
  P001Register.I18N,
  P101Userdashboard.I18N,
  P102Scoreboard.I18N,
  P600Chat.I18N,
  P700Usersettings.I18N,
  P800Ghoststory.I18N,
  P801Ghoststory1.I18N,
  P802Ghoststory2.I18N,
  P803Ghoststory3.I18N,
  P804Ghoststory4.I18N,
];

const JSX = (props: any) => {
  const { userData } = useStoreGlobalPersist(['userData']);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={userData ? <Navigate replace to="/user" /> : <P000Login.JSX />}
        />
        {/* <Route path="/" element={<p000Login.JSX />} /> */}
        <Route
          path="user"
          element={
            <RoutePrivate isAuth={userData}>
              <TemplateMobile>
                <Outlet />
              </TemplateMobile>
            </RoutePrivate>
          }
        >
          <Route index element={<Navigate replace to="userdashboard" />} />
          <Route path="userdashboard" element={<P101Userdashboard.JSX />} />
          <Route path="scoreboard" element={<P102Scoreboard.JSX />} />
          <Route path="chat" element={<P600Chat.JSX />} />
          <Route path="usersetting" element={<P700Usersettings.JSX />} />
          <Route path="ghoststory">
            <Route index element={<P800Ghoststory.JSX />} />
            <Route path="ghost1" element={<P801Ghoststory1.JSX />} />
            <Route path="ghost2" element={<P802Ghoststory2.JSX />} />
            <Route path="ghost3" element={<P803Ghoststory3.JSX />} />
            <Route path="ghost4" element={<P804Ghoststory4.JSX />} />
          </Route>

          <Route path="dashboard" element={<P100Dashboard.JSX />} />
          <Route path="threejs" element={<P200ThreeJS.JSX />} />
          <Route path="impactjs" element={<P300ImpactJS.JSX />} />
          <Route path="threejsgo" element={<P400ThreejsGo.JSX />} />
          <Route path="menu" element={<P500Menu.JSX />} />
        </Route>
        <Route path="register" element={<P001Register.JSX />} />
        <Route path="*" element={<div>URLs Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default { i18nList, JSX };
