import { combineReducers } from 'redux';

import { logon } from './logon/reducer';
import { home } from './Home/reducer';

export default combineReducers({ logon, home });
