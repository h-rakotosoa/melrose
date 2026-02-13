import { AxiosInstance } from 'axios';
import { apiClient } from '@app/utils/axios';

export interface HttpContract {
  client: AxiosInstance;
}

export const httpContract: HttpContract = {
  client: apiClient,
};
