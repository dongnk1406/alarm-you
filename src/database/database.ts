import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import migrations from './migrations';
import {SkillsModel, UserModel} from './models';
import {schema} from './schemas';

const adapter = new SQLiteAdapter({
  dbName: 'Watermelon DB 2',
  schema: schema,
  // (You might want to comment it out for development purposes -- see Migrations documentation)
  migrations: migrations,
  // (optional database name or file system path)
  // dbName: 'myapp',
  // (recommended option, should work flawlessly out of the box on iOS. On Android,
  // additional installation steps have to be taken - disable if you run into issues...)
  jsi: true /* Platform.OS === 'ios' */,
  // (optional, but you should implement this method)
  onSetUpError: error => {
    // Database failed to load -- offer the user to reload the app or log out
  },
});

// Then, make a Watermelon database from it!
const database = new Database({
  adapter,
  modelClasses: [SkillsModel, UserModel],
});

export default database;
