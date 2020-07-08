import {ActionReducer, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';

export interface AppState {

}

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state before: ', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

//export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger] : [];
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
