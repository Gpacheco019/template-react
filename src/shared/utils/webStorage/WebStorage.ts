import { BaseStorage } from './base-store.storage';
import * as CryptoJS from 'crypto-js';

export class WebStorage extends BaseStorage {
  private readonly encryptionKey: string;

  constructor(encryptionKey: string) {
    super();
    this.encryptionKey = encryptionKey;
  }

  async setItem(key: string, value: string): Promise<void> {
    localStorage.setItem(key, value);
  }

  async getItem(key: string): Promise<string | null> {
    return localStorage.getItem(key);
  }

  async removeItem(key: string): Promise<void> {
    localStorage.removeItem(key);
  }

  protected async encryptData(data: any): Promise<string> {
    try {
      // Serializa os dados
      const serializedData = this.serializeData(data);
      
      // Cria um objeto com metadata
      const payload = {
        data: serializedData,
        iat: Math.floor(Date.now() / 1000),
        type: 'encrypted-storage'
      };

      // Encripta o payload completo
      const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(payload),
        this.encryptionKey
      ).toString();

      return encrypted;
    } catch (error) {
      /* console.error('Error encrypting data:', error); */
      throw new Error('Failed to encrypt data');
    }
  }

  protected async decryptData(encryptedData: string): Promise<any> {
    try {
      // Log do dado encriptado
      /* console.debug('Attempting to decrypt data:', { encryptedData }); */

      const decrypted = CryptoJS.AES.decrypt(
        encryptedData,
        this.encryptionKey
      ).toString(CryptoJS.enc.Utf8);

      if (!decrypted) {
        /* console.error('Decryption resulted in empty string'); */
        throw new Error('Decryption failed');
      }

      // Log do dado decriptado
      /* console.debug('Successfully decrypted data:', { decrypted }); */

      const payload = JSON.parse(decrypted);
      
      // Log do payload
      /* console.debug('Parsed payload:', { payload }); */

      if (!payload || !payload.data || !payload.iat || payload.type !== 'encrypted-storage') {
        /* console.error('Invalid payload format:', { payload }); */
        throw new Error('Invalid data format');
      }

      const MAX_AGE = 24 * 60 * 60;
      const now = Math.floor(Date.now() / 1000);
      if (now - payload.iat > MAX_AGE) {
        /*       console.warn('Data is too old:', { 
          iat: payload.iat, 
          now, 
          age: now - payload.iat 
        }); */
        return null;
      }

      const result = this.deserializeData(payload.data);
      /* console.debug('Final deserialized result:', { result }); */
      return result;
    } catch (error) {
      /* console.error('Error in decryptData:', error); */
      throw new Error('Failed to decrypt data');
    }
  }

  private serializeData(data: any): string {
    if (typeof data === 'string') return data;
    try {
      return JSON.stringify(data);
    } catch (error) {
      /* console.error('Error serializing data:', error); */
      throw new Error('Failed to serialize data');
    }
  }

  private deserializeData(data: string): any {
    try {
      /* console.debug('WebStorage: Deserializing data:', { data, type: typeof data }); */
      
      // Se já for um objeto, retorna ele
      if (typeof data === 'object') {
        /* console.debug('WebStorage: Data is already an object'); */
        return data;
      }

      // Tenta fazer o parse
      const parsed = JSON.parse(data);
      /* console.debug('WebStorage: Successfully parsed data:', parsed); */
      return parsed;
    } catch (error) {
      /* console.error('WebStorage: Error deserializing data:', error); */
      // Se não for JSON válido, retorna a string original
      return data;
    }
  }
}