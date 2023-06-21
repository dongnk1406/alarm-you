import {tableSchema} from '@nozbe/watermelondb';

export const userSchema = tableSchema({
  name: 'user',
  columns: [
    {name: 'email', type: 'string'},
    {name: 'token', type: 'string'},
  ],
});
