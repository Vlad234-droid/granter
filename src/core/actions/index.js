import * as user from './user';
import * as registration from './registration';
import * as modal from './modal';
import * as project from './project';

const actions = { ...user, ...registration, ...modal, ...project };

export default actions;
