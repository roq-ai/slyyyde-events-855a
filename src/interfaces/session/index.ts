import { EventInterface } from 'interfaces/event';
import { GetQueryInterface } from 'interfaces';

export interface SessionInterface {
  id?: string;
  name: string;
  event_id?: string;
  created_at?: any;
  updated_at?: any;

  event?: EventInterface;
  _count?: {};
}

export interface SessionGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  event_id?: string;
}
