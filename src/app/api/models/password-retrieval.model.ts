export interface PasswordRetrieval {
  email: string;
  expiration_time: number;
  id: number;
  recovery_code: number;
  user_id: string;
}
