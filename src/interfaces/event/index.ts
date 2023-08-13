import { DataAnalysisInterface } from 'interfaces/data-analysis';
import { PromotionInterface } from 'interfaces/promotion';
import { RegistrationInterface } from 'interfaces/registration';
import { SessionInterface } from 'interfaces/session';
import { VenueInterface } from 'interfaces/venue';
import { ClientInterface } from 'interfaces/client';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface EventInterface {
  id?: string;
  name: string;
  client_id?: string;
  manager_id?: string;
  created_at?: any;
  updated_at?: any;
  data_analysis?: DataAnalysisInterface[];
  promotion?: PromotionInterface[];
  registration?: RegistrationInterface[];
  session?: SessionInterface[];
  venue?: VenueInterface[];
  client?: ClientInterface;
  user?: UserInterface;
  _count?: {
    data_analysis?: number;
    promotion?: number;
    registration?: number;
    session?: number;
    venue?: number;
  };
}

export interface EventGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  client_id?: string;
  manager_id?: string;
}
