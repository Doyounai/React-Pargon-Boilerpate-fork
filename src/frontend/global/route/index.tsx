import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { helperI18Next } from 'universal-helper';

import P000Login from '../../domain/p000-login';
import P001Register from '../../domain/p001-register';
import P100Dashboard from '../../domain/p100-dashboard';
import P101Userdashboard from '../../domain/p101-userdashboard';
import P102Scoreboard from '../../domain/p102-scoreboard';
import P200ThreeJS from '../../domain/p200-threejs';
import P300ImpactJS from '../../domain/p300-impactjs';
import P400ThreejsGo from '../../domain/p400-threejsgo';
import P500Menu from '../../domain/p500-menu';
import RoutePrivate from '../component/atoms/route-private';
import TemplateMobile from '../component/templates/template-mobile';
import { useStoreGlobalPersist } from '../store/persist';

const i18nList: helperI18Next.TypeI18NDomain[] = [
  P000Login.I18N,
  P100Dashboard.I18N,
  P200ThreeJS.I18N,
  P300ImpactJS.I18N,
  P400ThreejsGo.I18N,
  P500Menu.I18N,
  P001Register.I18N,
  P101Userdashboard.I18N,
  P102Scoreboard.I18N,
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
