import { User } from './user.interface';

export interface SchoolManagement{
	type: string;
	profile: User;
	school_id: string;
	school_name: string;
	school_emblem: string;
	classes: any;
	subjects: string[];
	timetable: any;
}