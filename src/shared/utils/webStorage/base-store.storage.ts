import type { IStorage } from './storage.types';

export abstract class BaseStorage implements IStorage {
  abstract setItem(key: string, value: string): Promise<void>;
  abstract getItem(key: string): Promise<string | null>;
  abstract removeItem(key: string): Promise<void>;

  protected abstract encryptData(data: any): Promise<string>;
  protected abstract decryptData(encryptedData: string): Promise<any>;

  async setEncryptedItem(key: string, value: any): Promise<boolean> {
    try {
      /*  console.debug('Setting encrypted item:', { key }) */ const encryptedValue =
        await this.encryptData(value);
      await this.setItem(key, encryptedValue);
      return true;
    } catch (error) {
      /* console.error('Error setting encrypted item:', error); */
      return false;
    }
  }

  async getEncryptedItem<T>(key: string): Promise<T | null> {
    try {
      const encryptedValue = await this.getItem(key);
      if (!encryptedValue) return null;

      const decryptedValue = await this.decryptData(encryptedValue);
      /* console.debug('Retrieved encrypted item:', { key }); */
      return decryptedValue as T;
    } catch (error) {
      /* console.error('Error getting encrypted item:', error); */
      return null;
    }
  }

  protected async handleStorageOperation<T>(
    operation: () => Promise<T>,
    errorMessage: string
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      /* console.error(errorMessage, error); */
      throw error;
    }
  }
}
