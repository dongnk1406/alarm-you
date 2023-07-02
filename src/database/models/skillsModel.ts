import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

export class SkillsModel extends Model {
  static table = 'skills';
  static associations = {};

  @field('name') name?: string;
  @field('type') type?: string;
}
