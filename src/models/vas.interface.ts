import { User } from './user.interface';
import { Address } from './address.interface'

export interface VAS{
	profile: User;
	type: string;
	company_name: string;
	address?:Address;
	company_reg?: string;
	company_id?: string;
	service_type: string[];
	service_description?: string;
	company_logo?: string;
	schools_ids?: string[];
}