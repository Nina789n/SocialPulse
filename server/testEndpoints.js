const http = require('http');
const app = require('./server');

const PORT = 5001; // Test port

const runTests = async () => {
  // Give MongoDB connection a moment
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const server = app.listen(PORT, async () => {
    console.log(`\n🧪 Running Automated API Tests on port ${PORT}...\n`);

    const endpoints = [
      { name: 'Health Check', path: '/api/health' },
      { name: 'Platforms List', path: '/api/platforms' },
      { name: 'Posts (Default)', path: '/api/posts?limit=5' },
      { name: 'Posts (Filter by Platform)', path: '/api/posts?platform=Instagram' },
      { name: 'Raw Analytics (30 days)', path: '/api/analytics?days=30' },
      { name: 'Raw Analytics (7 days, Platform=YouTube)', path: '/api/analytics?days=7&platform=YouTube' },
      { name: 'Overview (Module 1 - 30 days)', path: '/api/analytics/overview?days=30' },
      { name: 'Overview (Module 1 - 90 days, Platform=X)', path: '/api/analytics/overview?days=90&platform=X' },
      { name: 'Platforms Analytics (Module 2)', path: '/api/analytics/platforms?days=30' },
      { name: 'Engagement Analytics (Module 3)', path: '/api/analytics/engagement?days=30' },
      { name: 'Audience Growth (Module 4)', path: '/api/analytics/audience?days=30' }
    ];

    let passed = 0;
    let failed = 0;

    for (const ep of endpoints) {
      try {
        const res = await new Promise((resolve, reject) => {
          const req = http.get(`http://localhost:${PORT}${ep.path}`, (response) => {
            let data = '';
            response.on('data', (chunk) => { data += chunk; });
            response.on('end', () => {
              resolve({ statusCode: response.statusCode, body: data });
            });
          });
          req.on('error', reject);
        });

        const json = JSON.parse(res.body);
        if (res.statusCode === 200 && (json.success === true || json.status === 'healthy')) {
          console.log(`✅ [PASS] ${ep.name} -> HTTP ${res.statusCode}`);
          passed++;
        } else {
          console.error(`❌ [FAIL] ${ep.name} -> HTTP ${res.statusCode}:`, json);
          failed++;
        }
      } catch (err) {
        console.error(`❌ [ERROR] ${ep.name}: ${err.message}`);
        failed++;
      }
    }

    console.log(`\n📊 Test Summary: ${passed} Passed, ${failed} Failed out of ${endpoints.length} tests\n`);

    server.close(() => {
      process.exit(failed > 0 ? 1 : 0);
    });
  });
};

runTests();
