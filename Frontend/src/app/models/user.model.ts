export type UserRole = 'Reader' | 'Librarian' | 'Admin' | 'admin';

export interface User {
  user_id?: string;
  user_name: string;
  user_email: string;
  user_contact: string;
  user_address: string;
  user_role: UserRole;
}

export interface UserResponse {
  data?: User[] | User;
  message: string;
  success?: boolean;
}
