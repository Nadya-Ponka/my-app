import { createAction, props } from '@ngrx/store';

import { UserItem } from 'src/app/shared/models/user';

export const checkUser = createAction(
 '[Admin] CHECK_USER',
 props<{ user: any }>()
);

export const checkUserSuccess = createAction(
  '[Admin] CHECK_USER_SUCCEESS',
  props<{ user: UserItem }>()
);
export const checkUserError = createAction(
  '[Admin] CHECK_USER_ERROR',
  props<{ error: Error | string }>()
);

export const logoutUser = createAction(
	'[Admin] LOGOUT_USER'
 );
 
 export const logoutUserSuccess = createAction(
	 '[Admin] LOGOUT_USER_SUCCEESS'
 );
 export const logoutUserError = createAction(
	 '[Admin] LOGOUT_USER_ERROR',
	 props<{ error: Error | string }>()
 );
 