import {appSchema} from '@nozbe/watermelondb';
import {skillsSchema} from './skillsSchema';
import {usersSchema} from './usersSchema';
import {postsSchema} from './postsSchema';
import {commentsSchema} from './commentsSchema';

/*
See how to define schema and more convention https://watermelondb.dev/docs/Schema
*/

export const schema = appSchema({
  version: 1,
  tables: [skillsSchema, usersSchema, postsSchema, commentsSchema],
});
