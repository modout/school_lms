import { User } from './user.interface';
import { Child } from './child.interface';

export interface Parent{
	profile: User;
	type: string;
	school_id: string;
	school_name: string;
	school_emblem: string;
	children: Child[];
}