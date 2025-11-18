import { Injectable } from '@nestjs/common';
import { request } from 'undici';

@Injectable()
export class HttpService {
    async get<T = any>(url: string, options?: { headers?: Record<string, string> }): Promise<T> {
        try {
            const { body } = await request(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...options?.headers,
                },
            });

            return await body.json() as T;
        } catch (error) {
            throw new Error(`HTTP GET request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    async post<T = any>(
        url: string,
        data?: any,
        options?: { headers?: Record<string, string> }
    ): Promise<T> {
        try {
            const { body } = await request(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...options?.headers,
                },
                body: data ? JSON.stringify(data) : null,
            });

            return await body.json() as T;
        } catch (error) {
            throw new Error(`HTTP POST request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    async put<T = any>(
        url: string,
        data?: any,
        options?: { headers?: Record<string, string> }
    ): Promise<T> {
        try {
            const { body } = await request(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...options?.headers,
                },
                body: data ? JSON.stringify(data) : null,
            });

            return await body.json() as T;
        } catch (error) {
            throw new Error(`HTTP PUT request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    async delete<T = any>(url: string, options?: { headers?: Record<string, string> }): Promise<T> {
        try {
            const { body } = await request(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    ...options?.headers,
                },
            });

            return await body.json() as T;
        } catch (error) {
            throw new Error(`HTTP DELETE request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}