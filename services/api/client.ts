import { ApiError } from '@/types/api.types';


interface FetchOptions extends RequestInit {
  token?: string;
}

export class ApiClient {
  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');
    
    const data = isJson ? await response.json() : await response.text();
    
    
    if (!response.ok) {
      const error: ApiError = {
        message: data?.message || data?.error || 'Error en la petición',
        statusCode: response.status,
        error: data?.error,
      };
      
      throw error;
      
    }
    
    return data;
  }

  async request<T>(
    url: string,
    options: FetchOptions = {}
  ): Promise<T> {
    const { token, ...fetchOptions } = options;
    
    const headers = new Headers(fetchOptions.headers);
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
    
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    
    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers,
      });
      
      return await this.handleResponse<T>(response);
      
    } catch (error) {
      if (error && typeof error === 'object' && 'statusCode' in error) {
        throw error;
      }
      
      throw {
        message: 'Error de conexión. Por favor verifica tu internet.',
        statusCode: 0,
        error: 'NETWORK_ERROR'
      } as ApiError;
    }
  }

  async get<T>(url: string, token?: string): Promise<T> {
    return this.request<T>(url, { method: 'GET', token });
  }

  async post<T>(url: string, body: any, token?: string): Promise<T> {
    return this.request<T>(url, {
      method: 'POST',
      body: JSON.stringify(body),
      token,
    });
  }

  async put<T>(url: string, body: any, token?: string): Promise<T> {
    return this.request<T>(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      token,
    });
  }

  async delete<T>(url: string, token?: string): Promise<T> {
    return this.request<T>(url, { method: 'DELETE', token });
  }
}

export const apiClient = new ApiClient();