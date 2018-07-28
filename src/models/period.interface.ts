import { Audience } from './audience.interface';

export interface Period{
	timeStart: Date;
	timeEnd: Date;
	venue: string;
	audience: Audience;
	description: string;
	content: any;
	subject: string;
	periodNumber: number;
	periodId: string;
}