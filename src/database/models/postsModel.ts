import {Model} from '@nozbe/watermelondb';
import {field, text, date} from '@nozbe/watermelondb/decorators';

export class PostsModel extends Model {
  static table = 'posts';
  static associations = {
    comments: {type: 'has_many', foreignKey: 'post_id'},
  };
  @text('title') title?: string;
  @text('body') body?: any;
  @field('is_pinned') isPinned?: boolean;
  @date('last_event_at') lastEventAt?: Date;
}
