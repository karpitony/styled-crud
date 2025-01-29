import apiConfig from '@/config/apiConfig';
import { 
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  RegisterRequest,
  RegisterResponse
} from '@/models/auth';

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiConfig.post<LoginResponse>('/auth/login', data);
  return response.data;
};

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const response = await apiConfig.post<RefreshTokenResponse>('/auth/refresh');
  return response.data;
};

export async function registerUser(data: RegisterRequest): Promise<RegisterResponse> {
  const response = await apiConfig.post<RegisterResponse>('/auth/register', data);
  return response.data;
}