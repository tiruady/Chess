import React from 'react';
import { useDispatch } from 'react-redux';
import { UserRegisterData } from '../../interfaces/User/User';
import { registerUserRequested } from '../../store/user/user.actions';
import { Routes } from '../../interfaces/Router/Routes';
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  useTheme,
} from '@material-ui/core';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import AuthForm from '../../components/AuthForm/AuthForm';
import { useFormState } from '../../components/AuthForm/useFormState';
import { ifFormFieldEmpty } from '../../utils/isFormFieldEmpty';
import { addToast } from '../../store/toaster/toaster.action';
import { generateToast } from '../../utils/toastFactory';
import { ToastTypes } from '../../interfaces/Toaster/ToastTypes';
import styled from '@emotion/styled';
import { StyledLink } from '../../components/StyledLink/StyledLink';

const StyledLinkContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledText = styled.span`
  margin-right: ${props => props.theme.spacing(0.5)}px;
`;

const INITIAL_STATE = {
  login: '',
  password: '',
  email: '',
};

const SignUp = () => {
  const theme = useTheme();
  const { formState, onFormChange } = useFormState<UserRegisterData>(
    INITIAL_STATE,
  );
  const dispatch = useDispatch();

  const submitForm = () => {
    if (ifFormFieldEmpty(formState)) {
      dispatch(
        addToast(generateToast('Please fill in all fields.', ToastTypes.Error)),
      );
      return;
    }
    dispatch(registerUserRequested(formState));
  };

  return (
    <AuthForm headerText="Sign up">
      <FormControl>
        <InputLabel htmlFor="login-input" color="primary" required>
          Login
        </InputLabel>
        <Input
          id="login-input"
          name="login"
          color="primary"
          onChange={onFormChange}
          value={formState.login}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="email-input" color="primary" required>
          Email
        </InputLabel>
        <Input
          id="email-input"
          name="email"
          color="primary"
          onChange={onFormChange}
          value={formState.email}
        />
      </FormControl>
      <PasswordInput
        value={formState.password}
        onChange={onFormChange}
        color="primary"
      />
      <StyledLinkContainer>
        <StyledText theme={theme}>Already have an account?</StyledText>
        <StyledLink to={Routes.login} theme={theme}>
          Login
        </StyledLink>
      </StyledLinkContainer>
      <Button color="primary" onClick={submitForm} variant="contained">
        Sign up
      </Button>
    </AuthForm>
  );
};

export default SignUp;
