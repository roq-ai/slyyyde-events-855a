import { RegistrationInterface } from 'interfaces/registration';
import { GetQueryInterface } from 'interfaces';

export interface CheckInInterface {
  id?: string;
  registration_id?: string;
  checked_in?: boolean;
  created_at?: any;
  updated_at?: any;

  registration?: RegistrationInterface;
  _count?: {};
}

export interface CheckInGetQueryInterface extends GetQueryInterface {
  id?: string;
  registration_id?: string;
}
