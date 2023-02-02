import APIFirebase from './firebase';
import { TypeRepositoryPattern } from './repository-pattern';
const APIGlobal: TypeRepositoryPattern = {
  ...APIFirebase,
};

export default APIGlobal;
