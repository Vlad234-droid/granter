import * as user from './user';
import * as registration from './registration';
import * as modal from './modal';
import * as projects from './projects';
import * as claims from './claims';

const actions = { ...user, ...registration, ...modal, ...projects, ...claims };

export default actions;
