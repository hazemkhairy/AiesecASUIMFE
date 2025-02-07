import {
	REGISTER_FAILURE,
	REGISTER_PENDING,
	REGISTER_SUCCESS
} from '../../../../global/types/registerTypes';
const registerInitalState = {
	registerPending: false
};
const partialRegisterReducer = (state = registerInitalState, action) => {
	switch (action.type) {
		case REGISTER_PENDING:
			return {
				...state,
				registerPending: true
			};
		case REGISTER_SUCCESS:
			return {
				...state,
				registerPending: false
			};
		case REGISTER_FAILURE:
			return {
				...state,
				registerPending: false,
				error: action.error
			};
		default:
			return state;
	}
};
export const partialRegisterReducers = { partialRegisterReducer };
