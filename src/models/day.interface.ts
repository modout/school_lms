import { Period } from './period.interface';

export interface Day{
	date: Date;
	number: number;
	periods: Period[];
}