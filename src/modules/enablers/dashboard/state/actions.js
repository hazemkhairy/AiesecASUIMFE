import {
	GET_ALL_ENABLERS_SUCCESS,
	GET_ALL_ENABLERS_PENDING,
	GET_ALL_ENABLERS_FAILED
} from '../../../../global/types/dashboardTypes';
import { URL } from '../../../../global/API_URL';
import axios from 'axios';
export const getAllEnablers = pageNum => {
	var token = 'djfh'
	return dispatch => {
		dispatch(getAllEnablersPending());
		const AuthStr = 'Bearer '.concat(token);
		axios
			.get(URL + '/Enabler/GetAllEnablers', null, {
				headers: { Authorization: AuthStr }
			})
			.then(response => {
				dispatch(getAllEnablersSuccess(response.data));
			})
			.catch(err => {
				dispatch(getAllEnablersFailed(err));
			});
	};
};

const getAllEnablersPending = () => {
	return {
		type: GET_ALL_ENABLERS_PENDING
	};
};
const getAllEnablersSuccess = enablers => {
	return {
		type: GET_ALL_ENABLERS_SUCCESS,
		enablers
	};
};

const getAllEnablersFailed = err => {
	return {
		type: GET_ALL_ENABLERS_FAILED,
		err
	};
};
