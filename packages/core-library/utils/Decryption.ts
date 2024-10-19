import crypto from 'crypto';

export const Decryption = (hash: string, key: string): string | null => {
  try {
    const [iv, encryptedText] = hash.split(':');
    const decipher = crypto.createDecipheriv('aes-256-ctr', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedText, 'hex')), decipher.final()]);
    return decrypted.toString();
  }
  catch (error) {
    return null
  }
};