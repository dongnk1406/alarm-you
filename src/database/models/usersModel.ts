import {Model, Q} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';
import database from '../database';

export class UsersModel extends Model {
  static table = 'users';
  static associations = {};

  @field('email') email?: string;
  @field('password') password?: string;
  @field('token') token?: string;

  static login(email: string, password: string) {
    return database
      .get('users')
      .query(Q.where('email', email), Q.where('password', password));
  }

  static resister(email: string, password: string, token: string) {
    return database
      .get('users')
      .query(Q.where('email', email), Q.where('password', password));
  }
}
