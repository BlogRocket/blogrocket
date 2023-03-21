import { getUser, LoginCredentialsDTO, loginWithEmailAndPassword, logout, RegisterCredentialsDTO, registerWithEmailAndPassword, User } from '@/features/auth';
import storage from '@/utils/storage';
import { configureAuth } from 'react-query-auth';


const userFn = async () => {
  if (storage.getToken()) {
    const response = await getUser();
    return response.user;
  }
  return null;
}

const loginFn = async (data: LoginCredentialsDTO) => {
  const response = await loginWithEmailAndPassword(data);
  const { user, access, refresh } = response;
  storage.setToken(access, 'access');
  storage.setToken(refresh, 'refresh');
  return user;
}

const registerFn = async (data: RegisterCredentialsDTO) => {
  const response = await registerWithEmailAndPassword(data);
  const { user, access, refresh } = response;
  storage.setToken(access, 'access');
  storage.setToken(refresh, 'refresh');
  return user;
}

const logoutFn = async () => {
  await logout();
  storage.clearToken('access');
  storage.clearToken('refresh');
}

const config = {
  userFn,
  loginFn,
  registerFn,
  logoutFn,
}

export const { useUser, useLogin, useRegister, useLogout, AuthLoader } = configureAuth<
  User | null,
  unknown,
  LoginCredentialsDTO,
  RegisterCredentialsDTO
>(config)