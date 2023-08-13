import { CheckInInterface } from 'interfaces/check-in';
import { EventInterface } from 'interfaces/event';
import { GetQueryInterface } from 'interfaces';

export interface RegistrationInterface {
  id?: string;
  attendee_name: string;
  event_id?: string;
  created_at?: any;
  updated_at?: any;
  check_in?: CheckInInterface[];
  event?: EventInterface;
  _count?: {
    check_in?: number;
  };
}

export interface RegistrationGetQueryInterface extends GetQueryInterface {
  id?: string;
  attendee_name?: string;
  event_id?: string;
}
