import { helperZustand } from 'universal-helper';
import create from 'zustand';

// import {
//   FirebaseSignInWithEmailAndPassword,
//   FirebaseSignOut,
// } from '../../../core/middleware/firebase';
import { GameCore } from '../../../interactive/domain/three-js';

// export const getMethodStoreGlobalPersist = (): TypeStoreGlobalMethodPersist => {
//   return storeGlobalPersist.getState().method;
// };

// ============ Store ==============

export type TypeStoreGlobal = {
  gameCore: GameCore;
  isLoading: boolean;
  sI18NDomainName: string;
  menu: {
    sHeaderName: string;
    iIconID: number;
  };
  menuUIIsShow: {
    isShowHeader: boolean;
    isShowI18n: boolean;
    isShowFooter: boolean;
  };
  count: number;
};

export const storeGlobal = create(
  (): TypeStoreGlobal => ({
    gameCore: new GameCore(),
    isLoading: false,
    sI18NDomainName: '',
    menu: {
      sHeaderName: '',
      iIconID: 0,
    },
    menuUIIsShow: {
      isShowHeader: false,
      isShowI18n: false,
      isShowFooter: false,
    },
    count: 0,
  }),
);

// ============ Method ==============
export type TypeMethodStoreGlobal = {
  setLoading: (isLoading: boolean) => void;
  setMenu: (sHeaderName: string, iIconID: number) => void;
  setI18NDomainName: (sI18NDomainName: string) => void;
  setCountIncrease: () => void;
  setCountDecrease: () => void;
  setMenuUIIsShow: (
    isShowHeader: boolean,
    isShowI18n: boolean,
    isShowFooter: boolean,
  ) => void;
  // signIn: (sEmail: string, sPassword: string) => Promise<helperType.TypeGolangResponse>;
  // signOut: () => void;
};

export const methodStoreGlobal: TypeMethodStoreGlobal = {
  setLoading: (isLoading: boolean) => {
    storeGlobal.setState({ isLoading });
  },
  // user: '',
  // setUser: (name: string) => setState(() => ({ user: name })),
  setI18NDomainName: (sI18NDomainName: string) => {
    storeGlobal.setState({ sI18NDomainName });
  },
  setMenu: (sHeaderName: string, iIconID: number) => {
    storeGlobal.setState({
      menu: { sHeaderName, iIconID },
    });
  },
  setCountIncrease: () => {
    storeGlobal.setState((state: TypeStoreGlobal) => ({
      count: state.count + 1,
    }));
  },
  setCountDecrease: () => {
    storeGlobal.setState((state: TypeStoreGlobal) => ({
      count: state.count - 1,
    }));
  },
  setMenuUIIsShow: (
    isShowHeader: boolean,
    isShowI18n: boolean,
    isShowFooter: boolean,
  ) => {
    storeGlobal.setState({
      menuUIIsShow: { isShowHeader, isShowI18n, isShowFooter },
    });
  },
  // signIn: async (
  //   sEmail: string,
  //   sPassword: string,
  // ): Promise<{ res: any; error: Error | null }> => {
  //   setState({ isLoading: true });
  //   const resAuth = await FirebaseSignInWithEmailAndPassword(sEmail, sPassword);

  //   if (resAuth.error) {
  //     setState({ isLoading: false });
  //     return { res: null, error: resAuth.error };
  //   }

  //   // console.log('resAuth.res ', resAuth.res);

  //   // const { setUserData } = useStoreGlobalPersist(['setUserData']);
  //   const { setUserData }: any = storePersist.getState();
  //   setUserData(resAuth.res);
  //   setState({ isLoading: false });
  //   return { res: resAuth.res, error: null };
  //   // isLoading
  // },
  // signOut: async () => {
  //   setState({ isLoading: true });
  //   await FirebaseSignOut();
  //   // const { setUserData } = useStoreGlobalPersist(['setUserData']);
  //   const { setUserData }: any = storePersist.getState();
  //   setUserData(null);
  //   setState({ isLoading: false });
  // },
};

// ============ Export ==============

export const useStoreGlobal = (
  stateList: string[],
  isShallow?: boolean,
): TypeStoreGlobal => {
  return helperZustand.StateMapping(stateList, storeGlobal, isShallow) as TypeStoreGlobal;
};

export const getMethodStoreGlobal = (): TypeMethodStoreGlobal => {
  return methodStoreGlobal;
};

export const getStoreGlobal = () => storeGlobal.getState();
export const setStoreGlobal = (prop: any) => storeGlobal.setState(prop);
