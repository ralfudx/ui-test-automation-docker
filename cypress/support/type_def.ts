import type spikerz from '../test_data/spikerz';


declare global {
  type ENV = 'local' | 'dev';
  type DataENV = Exclude<ENV, 'local'>;

  type EnvVariables = {
    TEST_ENV: ENV;
    DATA_ENV: DataENV;
    spikerz: (typeof spikerz)[DataENV];
  };

  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Cypress {
      env<T extends keyof EnvVariables>(envVar: T): EnvVariables[T];
    }
  }
}
