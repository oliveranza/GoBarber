/* eslint-disable no-unused-vars */
import { Credentials } from './Credentials.model';
import { User } from './User.model';
import { UserData } from './UserData.model';

export interface IAuthContext {
	user: User;
	signIn(credentions: Credentials): Promise<UserData>;
	signOut(): void;
}
