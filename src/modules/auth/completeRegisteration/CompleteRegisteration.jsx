import React, { useState, useEffect, useRef } from 'react';
import './style.scss';
import MixImg from '../../../assets/images/mix.png';
import { TextField } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { validateUser } from '../../../global/functions/validation';
import { save, logout } from './state/actions';
import MuiPhoneNumber from 'material-ui-phone-number';
import DatePickers from '../../sideComponents/datePicker';
import PopUp from '../../sideComponents/popUp';
const Form = props => {
	const [userData, setUserData] = useState({
		firstName: '',
		lastName: '',
		mobileNumber: '',
		nickName: '',
		birthDate: new Date(),
		oldPassword: '',
		newPassword: '',
		repeatedPassword: ''
	});
	const [popupMessage, setpopupMessage] = useState('');
	const popUpRef = useRef();
	const handleChange = event => {
		setUserData({ ...userData, [event.target.name]: event.target.value });
	};
	const handlePhoneChange = value => {
		setUserData({ ...userData, mobileNumber: value });
	};
	const handleDateChange = value => {
		setUserData({ ...userData, birthDate: value });
	};
	const onSubmit = event => {
		event.preventDefault();
		//validate data
		if (validateUser(userData)) {
			//call api
			props.save(userData, props.token);
			//redirect to dashboard page
			//props.history.push('/dashboard')
		} else {
			setpopupMessage('Save Failed, Please Fill Out All The Fields Correctly.');
			popUpRef.current.handleClickOpen();
		}
	};
	useEffect(() => {
		if (props.formStatus.saveSuccess) {
			//redirect to dashboard
			props.history.push('/dashboard');
		}
		if (props.formStatus.saveFailed) {
			setpopupMessage('Save Failed, Please Try Again.');
			popUpRef.current.handleClickOpen();
		}
		if (props.formStatus.logoutSuccess) {
			//redirect to login page
			props.history.push('/');
		}
		if (props.formStatus.logoutFailed) {
			setpopupMessage('Logout Failed, Please Try Again.');
			popUpRef.current.handleClickOpen();
		}
	}, [props]);
	return (
		<div className='form-container'>
			<div className='blue'>
				<div className='logo'>
					<img src={MixImg} alt='logo' />
				</div>
			</div>
			<div className='white'>
				<div className='login'>
					<div className='container'>
						<div className='base-container'>
							<div className='content'>
								<h3 className='formLabel'> Finish your account </h3>
								<div className='homeForm'>
									<div className='row-data'>
										<div className='form-group'>
											<TextField
												required
												onChange={handleChange}
												id='outlined-firstname-input'
												label='First Name'
												type='text'
												name='firstName'
												margin='normal'
												variant='outlined'
												style={{ width: '240px' }}
											/>
										</div>
										<div className='form-group'>
											<TextField
												required
												onChange={handleChange}
												id='outlined-lastname-input'
												label='Last Name'
												type='text'
												name='lastName'
												margin='normal'
												variant='outlined'
												style={{ marginLeft: '200px', width: '240px' }}
											/>
										</div>
									</div>
									<div className='row-data'>
										<div className='form-group'>
											<TextField
												required
												onChange={handleChange}
												id='outlined-nickname-input'
												label='Nick Name'
												type='text'
												name='nickName'
												margin='normal'
												variant='outlined'
												style={{ width: '240px' }}
											/>
										</div>
										<div className='form-group'>
											<TextField
												required
												onChange={handleChange}
												id='outlined-old-password-input'
												label='Old Password'
												type='password'
												name='oldPassword'
												margin='normal'
												variant='outlined'
												style={{ marginLeft: '200px', width: '240px' }}
											/>
										</div>
									</div>
									<div className='date-phone'>
										<div className='form-group'>
											<DatePickers
												handleDateChange={handleDateChange}
												birthDate={userData.birthDate}
											/>
										</div>
										<div className='form-group'>
											<MuiPhoneNumber
												required
												variant='outlined'
												className='phone-number'
												defaultCountry={'eg'}
												onChange={handlePhoneChange}
												name='mobileNumber'
												label='Phone Number'
												style={{ width: '600px' }}
											/>
										</div>
									</div>

									<div className='row-data'>
										<div className='form-group'>
											<TextField
												required
												onChange={handleChange}
												id='outlined-first-password-input'
												label='New Password'
												type='password'
												name='newPassword'
												margin='normal'
												variant='outlined'
												style={{ marginRight: '200px', width: '240px' }}
											/>
										</div>
										<div className='form-group'>
											<TextField
												required
												onChange={handleChange}
												id='outlined-second-password-input'
												name='repeatedPassword'
												label='Repeat Password'
												type='password'
												margin='normal'
												variant='outlined'
												style={{ width: '240px' }}
												autoComplete='false'
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='footer'>
				<Button
					onClick={onSubmit}
					type='submit'
					variant='primary'
					style={{
						width: '100px',
						marginTop: '-20px',
						marginRight: '50px',
						fontWeight: 'bold'
					}}>
					Save
				</Button>
				<Button
					onClick={e => props.logout(props.token)}
					variant='primary'
					style={{
						width: '100px',
						marginTop: '-20px',
						marginRight: '550px',
						fontWeight: 'bold'
					}}>
					Cancel
				</Button>
			</div>
			<PopUp
				ref={popUpRef}
				id='PopupMessage'
				title='Register Failed !'
				message={popupMessage}
			/>
		</div>
	);
};
const mapDispatchToProps = dispatch => {
	return {
		logout: token => dispatch(logout(token)),
		save: (userData, token) => dispatch(save(userData, token))
	};
};
const mapStateToProps = state => {
	return {
		token: state.login.token,
		formStatus: state.partialRegister
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Form);
