import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';

const initialData = [
  {
    id: 1,
    type: 'gRPC',
    dependsOn: [2, 3],
  },
  {
    id: 2,
    type: 'HTTP',
    dependsOn: [],
  },
  {
    id: 3,
    type: 'gRPC',
    dependsOn: [1, 2],
  },
  {
    id: 4,
    type: 'HTTP',
    dependsOn: [1, 2],
  },
  {
    id: 5,
    type: 'HTTP',
    dependsOn: [3, 2],
  },
  {
    id: 6,
    type: 'gRPC',
    dependsOn: [2, 3, 4, 5],
  },
];

const db = new JsonDB(new Config('data/mock-db', true, false, '/'));

try {
  db.getData('/services[0]');
} catch {
  console.log('writing test data into mock-db.json');
  db.push('/services', initialData, true);
}

/** Mock noSQL db using json-node-db */
export default db;
