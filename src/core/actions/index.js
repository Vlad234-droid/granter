import * as user from './user';
import * as registration from './registration';
import * as modal from './modal';

const actions = {...user, ...registration, ...modal};

export default actions;
