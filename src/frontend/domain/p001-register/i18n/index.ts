import { helperI18Next } from 'universal-helper';

import en from './en/index.json';
import th from './th/index.json';

export default ({ name = '' }: { name: string }): helperI18Next.TypeI18NDomain => {
  return {
    name: name,
    locate: { en, th },
  };
};
