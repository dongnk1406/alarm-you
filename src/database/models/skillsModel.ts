import {Model} from '@nozbe/watermelondb';
import {text} from '@nozbe/watermelondb/decorators';

export class SkillsModel extends Model {
  static table = 'skills';
  static associations = {};

  @text('name') name?: string;
  @text('type') type?: string;
}
