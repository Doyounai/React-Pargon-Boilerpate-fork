// import { useState } from 'react';
import './index.css';
import './font.css';

import React from 'react';
import { ReactNode } from 'react';
import { HelperI18Next } from 'universal-helper';

import UILoader from './component/atoms/ui-loader';
import initI18N from './i18n';
import Route from './route';

const i18nList: HelperI18Next.TypeI18NDomain[] = [
  initI18N({ name: 'main' }),
  ...Route.i18nList,
];
class JSX extends React.Component<any, any> {
  render(): ReactNode {
    return (
      <div className="RSU">
        <UILoader>
          <Route.JSX />
        </UILoader>
      </div>
    );
  }
}

export default { i18nList, JSX };
