import { Address } from './address.interface'

export interface User{
	role?: string[];
	title?: string;
	firstname?: string;
	lastname?: string;
	id_or_passport?: string;
	gender?: string;
	cell_number?: string;
	home_number?: string;
	work_number?: string;
	email?: string;
	dp?: any;
	residential_address?: Address;
	proof_of_address?: any;
}