import { EventInterface } from 'interfaces/event';
import { GetQueryInterface } from 'interfaces';

export interface PromotionInterface {
  id?: string;
  event_id?: string;
  description?: string;
  created_at?: any;
  updated_at?: any;

  event?: EventInterface;
  _count?: {};
}

export interface PromotionGetQueryInterface extends GetQueryInterface {
  id?: string;
  event_id?: string;
  description?: string;
}
