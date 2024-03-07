import {Model, Q} from '@nozbe/watermelondb';
import {field, date, readonly} from '@nozbe/watermelondb/decorators';
import database from '../database';

export class UsersModel extends Model {
  static table = 'users';
  static associations = {};

  @field('email') email?: string;
  @field('password') password?: string;
  @field('token') token?: string;
  @readonly @date('created_at') created_at?: Date;
  @readonly @date('updated_at') updated_at?: Date;

  static login(email: string, password: string) {
    return database
      .get('users')
      .query(Q.where('email', email), Q.where('password', password));
  }

  static register(email: string, password: string, token: string) {
    return database
      .get('users')
      .query(Q.where('email', email), Q.where('password', password));
  }
}
