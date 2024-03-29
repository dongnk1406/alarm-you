import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

export class CommentsModel extends Model {
  static table = 'comments';
  static associations = {
    posts: {type: 'belongs_to' as const, key: 'post_id'},
  };
}
