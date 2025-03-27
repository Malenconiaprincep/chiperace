import { request } from './request';

export interface LoginParams {
  username: string;
  password: string;
}

export interface RegisterParams extends LoginParams {
  confirmPassword: string;
}

export interface ChangePasswordParams {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordParams {
  username: string;
  newPassword: string;
}

export async function login(params: LoginParams) {
  return request('/api/auth/login', {
    method: 'POST',
    data: params,
  });
}

export async function register(params: RegisterParams) {
  return request('/api/auth/register', {
    method: 'POST',
    data: params,
  });
}

export async function changePassword(params: ChangePasswordParams) {
  return request('/api/auth/change-password', {
    method: 'POST',
    data: params,
  });
}

export async function resetPassword(params: ResetPasswordParams) {
  return request('/api/auth/reset-password', {
    method: 'POST',
    data: params,
  });
}

export async function logout() {
  return request('/api/auth/logout', {
    method: 'POST',
  });
} 