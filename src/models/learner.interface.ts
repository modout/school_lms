import { User } from './user.interface';

export interface Learner{
	profile: User;
	type?: string;
	grade: string;
	subjects: string[];
	devices_ids?: string[];
	timetable?: any;
	school_id: string;
	school_name: string;
	school_emblem: string;
}