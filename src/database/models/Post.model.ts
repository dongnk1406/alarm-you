// model/Post.js
import {Model} from '@nozbe/watermelondb';
import {field, text, date} from '@nozbe/watermelondb/decorators';

class Post extends Model {
  static table = 'posts';
  static associations = {};

  @text('title') title?: string;
  @text('body') body?: string;
  @field('is_pinned') isPinned?: boolean;
  @date('last_event_at') lastEventAt?: string;
}

export {Post};
