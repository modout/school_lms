import { User } from './user.interface';
import { ChannelMessage } from './message.interface';

export interface Channel{
	name: string;
	id: string;
	date_created?: number;
	creator?: User;
	messages: ChannelMessage[];
	subscribers?: string[];
}