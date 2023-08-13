import { EventInterface } from 'interfaces/event';
import { GetQueryInterface } from 'interfaces';

export interface DataAnalysisInterface {
  id?: string;
  event_id?: string;
  analysis?: string;
  created_at?: any;
  updated_at?: any;

  event?: EventInterface;
  _count?: {};
}

export interface DataAnalysisGetQueryInterface extends GetQueryInterface {
  id?: string;
  event_id?: string;
  analysis?: string;
}
