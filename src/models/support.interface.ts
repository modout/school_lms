import { User } from './user.interface';

export interface Support{
	type: string;
	profile: User;
	assigned_issues: string[];
}