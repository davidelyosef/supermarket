import { ActionType } from './actionType';

export interface Action {
    type: ActionType;
    payload?: any;
}

