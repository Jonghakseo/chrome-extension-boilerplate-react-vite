describe('Webextension Content Script', () => {
  it('should log "example content script loaded" in console', async () => {
    await browser.sessionSubscribe({ events: ['log.entryAdded'] });
    const logs: (string | null)[] = [];

    browser.on('log.entryAdded', logEntry => {
      logs.push(logEntry.text);
    });

    await browser.url('https://example.com');

    const EXPECTED_LOG_MESSAGE = 'example content script loaded';
    await browser.waitUntil(() => logs.includes(EXPECTED_LOG_MESSAGE));

    expect(logs).toContain(EXPECTED_LOG_MESSAGE);
  });
});
