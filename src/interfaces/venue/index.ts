import { EventInterface } from 'interfaces/event';
import { GetQueryInterface } from 'interfaces';

export interface VenueInterface {
  id?: string;
  name: string;
  event_id?: string;
  created_at?: any;
  updated_at?: any;

  event?: EventInterface;
  _count?: {};
}

export interface VenueGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  event_id?: string;
}
