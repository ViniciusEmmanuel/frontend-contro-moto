import { combineReducers } from 'redux';

import { logon } from './logon/reducer';
import { home } from './Home/reducer';
import { modal } from './Modal/reducer';

export default combineReducers({ logon, home, modal });
