import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

export class UserModel extends Model {
  static table = 'user';
  static associations = {};

  @field('email') email?: string;
  @field('token') token?: string;
}
