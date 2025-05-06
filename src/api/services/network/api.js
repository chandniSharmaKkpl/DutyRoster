import axios from 'axios';
import getMock from './data/mock';
import env from '../env.json';
import AsyncStorage from '@react-native-community/async-storage';
import {API_TIMEOUT} from './common/constants';

axios.defaults.headers = {
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
  Expires: '0',
};

export const client = axios.create();
client.defaults.timeout = env.API_TIMEOUT || 60000;

export const setAPITimeout = timeout => {
  client.defaults.timeout = timeout || env.API_TIMEOUT || 60000;
};

/** pick and set last API timeout from local storage */
AsyncStorage.getItem(API_TIMEOUT, (err, value) => {
  if (!err && value) {
    const timeout = Number(value);
    setAPITimeout(timeout);
  }
});

if (env.ENVIRONMENT === 'STATIC' && env.MOCK_REQUESTS === 'ALL') {
  getMock(client);
}
