import { User } from './user.interface'

export interface Teacher{
	profile: User;
	type: string;
	school_id: string;
	school_name: string;
	school_emblem: string;
	classes: any;
	subjects: string[];
	timetable: any;
}