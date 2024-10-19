import { addMinutes, isBefore } from 'date-fns';
import { config } from '../module/config-module/config.service';
export function generateOtp(): { otp: string, expiresAt: Date } {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = addMinutes(new Date(), config.getNumber('OTP_EXPIRY_MINUTES'));
  return { otp, expiresAt };
}

export function isOtpValid(storedOtp: string, providedOtp: string, expiryDate: Date): boolean {
  const isExpired = isBefore(new Date(expiryDate), new Date());
  return storedOtp === providedOtp && !isExpired;
}
