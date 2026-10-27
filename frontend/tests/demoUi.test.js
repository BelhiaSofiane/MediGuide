import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

test('the demo UI makes no diagnosis claim and distinguishes new and legacy records', async () => {
  const server = await createServer({ server: { middlewareMode: true }, optimizeDeps: { noDiscovery: true, include: [] }, appType: 'custom' });
  try {
    const { default: DashboardPage } = await server.ssrLoadModule('/src/pages/DashboardPage.jsx');
    const { default: HistoryPage } = await server.ssrLoadModule('/src/pages/HistoryPage.jsx');
    const user = { email: 'test@example.invalid' };
    const dashboard = renderToStaticMarkup(createElement(DashboardPage, { user, historyStatus: 'ready' }));
    assert.match(dashboard, /does not assess, diagnose, or recommend treatment/);
    assert.doesNotMatch(dashboard, /Analyzing with AI|Our AI analyzes|Possible Conditions/);

    const history = renderToStaticMarkup(createElement(HistoryPage, {
      user,
      historyStatus: 'ready',
      historyCount: 2,
      historyError: '',
      checkupHistory: [
        { id: 'new', date: '2026-10-27', symptoms: ['Headache'], isSimulated: true },
        { id: 'old', date: '2026-10-26', symptoms: ['Fever'], isSimulated: false, possibleConditions: ['Old result'], severity: 'Mild', recommendation: 'Old text' },
      ],
    }));
    assert.match(history, /Demo record/);
    assert.match(history, /Legacy record/);
    assert.match(history, /origin unverified/);
  } finally {
    await server.close();
  }
});
