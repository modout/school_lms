import { Sim } from './sim.interface';

export interface Device{
	model: string;
	device_id?: string;
	manufacturer: string;
	type: string;
	institution_assigned_to?: string;
	individual_assigned_to?: string;
	supplier_id?: string;
	supplier_name?: string;
	sim?: Sim;
}