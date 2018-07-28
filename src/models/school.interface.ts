import { Address } from './address.interface';
import { User } from './user.interface';
import { Learner } from './learner.interface';
import { Teacher } from './teacher.interface';
import { Device } from './device.interface';
import { Parent } from './parent.interface';

export interface School{
	profile: User;
	type: string;
	name: string;
	address: Address;
	parents?: Parent[];
	principal?: User;
	emblem: string;
	learners?: Learner[];
	teachers?: Teacher[];
	admin?: any;
	sgb?:any;
	devices?: Device[];
	id?: string;
}