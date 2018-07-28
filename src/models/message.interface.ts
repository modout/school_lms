import { User } from './user.interface';

export interface ChannelMessage{
   text?: string;
   timeStamp?: number;
   by?: User;
   comments?: ChannelMessage[];
   topic?: string;
   delivered: boolean;
   read?: boolean;
   channel_id: string;
}