import {tableSchema} from '@nozbe/watermelondb';

export const usersSchema = tableSchema({
  name: 'users',
  columns: [
    {name: 'email', type: 'string'},
    {name: 'password', type: 'string'},
    {name: 'token', type: 'string'},
  ],
});
