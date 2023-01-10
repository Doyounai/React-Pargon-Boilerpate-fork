import { helperZustand } from 'universal-helper';
import { object } from 'yup';
import create from 'zustand';
import { persist } from 'zustand/middleware';

// ============ Store ==============
export type TypeStoreGlobalPersist = {
  userData: any;
  userDatas: object[];
};

// cant use method
export const storeGlobalPersist = create(
  persist(
    (): TypeStoreGlobalPersist => ({
      userData: null,
      userDatas: [],
    }),
    {
      name: 'storage-user',
    },
  ),
);

// ============ Method ==============

export type TypeMethodStoreGlobalPersist = {
  setUserData: (userData: any) => void;
  setUserDatas: (userDatas: object[]) => void;
  updateUserData: (payload: any) => void;
};

const methodStoreGlobalPersist: TypeMethodStoreGlobalPersist = {
  setUserData: (userData: any) => {
    storeGlobalPersist.setState({ userData });
  },
  setUserDatas: (userDatas: object[]) => {
    console.log(userDatas);
    storeGlobalPersist.setState({ userDatas });
  },
  updateUserData: (payload: any) => {
    storeGlobalPersist.setState((state: TypeStoreGlobalPersist) => ({
      userData: {
        ...state.userData,
        payload,
      },
    }));
  },
};

// ============ Export ==============

export const useStoreGlobalPersist = (
  stateList: string[],
  isShallow?: boolean,
): TypeStoreGlobalPersist => {
  return helperZustand.StateMapping(
    stateList,
    storeGlobalPersist,
    isShallow,
  ) as TypeStoreGlobalPersist;
};

export const getMethodStoreGlobalPersist = (): TypeMethodStoreGlobalPersist => {
  return methodStoreGlobalPersist;
};

export const getStoreGlobalPersist = () => storeGlobalPersist.getState();
export const setGlobalStorePersist = (prop: any) => storeGlobalPersist.setState(prop);
