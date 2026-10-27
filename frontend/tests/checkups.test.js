import test from 'node:test';
import assert from 'node:assert/strict';
import { createSessionScope } from '../src/lib/sessionScope.js';
import { createDemoCheckup } from '../src/lib/demoCheckup.js';

test('session changes invalidate pending history and save results', async () => {
  const scope = createSessionScope();
  const first = scope.begin('account-a');
  scope.begin('account-a'); // Token refresh does not invalidate the same user.
  assert.equal(scope.isCurrent(first), true);
  let finish;
  const pending = new Promise((resolve) => { finish = resolve; });
  const staleResult = pending.then(() => scope.isCurrent(first));
  scope.begin(null);
  scope.begin('account-b');
  finish();
  assert.equal(await staleResult, false);
  assert.equal(scope.isCurrent(scope.current()), true);
});

test('demo saves carry no diagnosis or severity and propagate a failed insert', async () => {
  let payload;
  const saved = await createDemoCheckup(['Headache'], 'account-a', async (record) => { payload = record; return { id: 'record-a' }; });
  assert.equal(saved.id, 'record-a');
  assert.equal(payload.is_simulated, true);
  assert.equal(payload.severity, 'Demo');
  assert.deepEqual(payload.possible_conditions, []);
  await assert.rejects(createDemoCheckup(['Headache'], 'account-a', async () => { throw new Error('network failure'); }), /network failure/);
  assert.throws(() => createDemoCheckup(Array(11).fill('x'), 'account-a', () => {}), /between 1 and 10/);
});
