import { User } from './user.interface';

export interface PrivateMessage{
   text: string;
   timeStamp: number;
   by: User;
   to: User;
   topic: string;
   delivered: boolean;
   read: boolean;
}