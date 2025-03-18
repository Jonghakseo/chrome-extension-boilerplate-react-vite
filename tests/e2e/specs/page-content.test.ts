describe('Webextension Content Script', () => {
  it('should log "content script loaded" in console on example.com', async () => {
    await browser.sessionSubscribe({ events: ['log.entryAdded'] });
    const logs: (string | null)[] = [];

    browser.on('log.entryAdded', logEntry => {
      logs.push(logEntry.text);
    });

    await browser.url('https://www.example.com');

    const EXPECTED_LOG_MESSAGE = '[CEB] content script loaded';
    await browser.waitUntil(() => logs.includes(EXPECTED_LOG_MESSAGE));

    expect(logs).toContain(EXPECTED_LOG_MESSAGE);
  });

  it('should log "content script loaded from Google.com" in console on google.com', async () => {
    await browser.sessionSubscribe({ events: ['log.entryAdded'] });
    const logs: (string | null)[] = [];

    browser.on('log.entryAdded', logEntry => {
      logs.push(logEntry.text);
    });

    await browser.url('https://www.google.com');

    const EXPECTED_LOG_MESSAGE = '[CEB] content script loaded from Google.com';
    await browser.waitUntil(() => logs.includes(EXPECTED_LOG_MESSAGE));

    expect(logs).toContain(EXPECTED_LOG_MESSAGE);
  });
});
