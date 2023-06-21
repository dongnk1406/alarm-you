import {appSchema} from '@nozbe/watermelondb';
import {skillsSchema} from './skillsSchema';
import {userSchema} from './userSchema';

/*
See how to define schema and more convention https://watermelondb.dev/docs/Schema
*/

export const schema = appSchema({
  version: 1,
  tables: [skillsSchema, userSchema],
});
