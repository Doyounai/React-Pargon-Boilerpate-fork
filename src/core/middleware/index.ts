import { HelperI18Next } from 'universal-helper';

// import { middlewareFirebase, middlewareFirebaseInit } from './firebase';

export const MiddlewareInit = async ({
  i18nList = [],
}: {
  i18nList: HelperI18Next.TypeI18NDomain[];
}) => {
  // console.log('Middleware Init');
  HelperI18Next.MiddlewareInit(
    {
      debug: import.meta.env.VITE_DEBUG_MIDDLEWARE_I18NEXT == 'true',
      fallbackLng: 'th',
    },
    i18nList,
  );

  // await middlewareFirebaseInit();
  // middlewareChartJSInit
};
