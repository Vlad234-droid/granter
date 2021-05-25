import * as user from './user';
import * as registration from './registration';
import * as modal from './modal';
import * as projects from './projects';

const actions = { ...user, ...registration, ...modal, ...projects };

export default actions;
