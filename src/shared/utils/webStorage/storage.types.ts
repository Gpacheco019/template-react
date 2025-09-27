
export interface IStorage {
  /**
   * Stores a string value with the given key
   * @param key Storage key
   * @param value String value to store
   */
  setItem(key: string, value: string): Promise<void>;

  /**
   * Retrieves a string value for the given key
   * @param key Storage key
   * @returns Stored string value or null if not found
   */
  getItem(key: string): Promise<string | null>;

  /**
   * Removes an item from storage
   * @param key Storage key to remove
   */
  removeItem(key: string): Promise<void>;

  /**
   * Stores an encrypted value with the given key
   * The value will be automatically stringified and encrypted
   * @param key Storage key
   * @param value Any value to store encrypted
   * @returns Success status of the operation
   */
  setEncryptedItem(key: string, value: any): Promise<boolean>;

  /**
   * Retrieves and decrypts a value for the given key
   * The value will be automatically decrypted and parsed
   * @param key Storage key
   * @returns Decrypted and parsed value or null if not found
   */
  getEncryptedItem<T>(key: string): Promise<T | null>;
}

/**
 * Storage encryption configuration
 */
export interface StorageEncryptionConfig {
  /**
   * Encryption key used for sensitive data
   */
  encryptionKey: string;

  /**
   * Optional encryption algorithm
   * @default 'AES'
   */
  algorithm?: string;

  /**
   * Whether to enable encryption for all storage operations
   * @default false
   */
  encryptAll?: boolean;

  /**
   * List of keys that should always be encrypted
   * regardless of encryptAll setting
   */
  encryptedKeys?: string[];
}

/**
 * Storage configuration options
 */
export interface StorageConfig {
  /**
   * Storage namespace to prevent conflicts
   * @default 'authify'
   */
  namespace?: string;

  /**
   * Encryption configuration
   */
  encryption?: StorageEncryptionConfig;

  /**
   * Whether to use secure storage when available
   * (e.g., Keychain on iOS, EncryptedSharedPreferences on Android)
   * @default true
   */
  useSecureStorage?: boolean;

  /**
   * Whether to persist data across app restarts
   * @default true
   */
  persistent?: boolean;

  /**
   * Custom error handler for storage operations
   */
  onError?: (error: Error) => void;
}

/**
 * Storage error types
 */
export const StorageErrorType = {
  ENCRYPTION_FAILED: 'ENCRYPTION_FAILED',
  DECRYPTION_FAILED: 'DECRYPTION_FAILED',
  STORAGE_FULL: 'STORAGE_FULL',
  INVALID_KEY: 'INVALID_KEY',
  OPERATION_FAILED: 'OPERATION_FAILED',
} as const;

export type StorageErrorType = typeof StorageErrorType[keyof typeof StorageErrorType];

/**
 * Custom storage error class
 */
export class StorageError extends Error {
  public type: StorageErrorType;
  public originalError?: Error;

  constructor(type: StorageErrorType, message: string, originalError?: Error) {
    super(message);
    this.name = 'StorageError';
    this.type = type;
    this.originalError = originalError;
  }
}

export interface StorageKeys {
  TOKEN: string;
  REFRESH_TOKEN: string;
  AUTHORIZATION: string;
  USER_DATA: string;
}

export const STORAGE_KEYS: StorageKeys = {
  TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  AUTHORIZATION: 'auth_authorization',
  USER_DATA: 'auth_user_data',
} as const;