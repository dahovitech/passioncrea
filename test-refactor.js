import { chromium } from 'playwright';
import http from 'http';
import fs from 'fs';
import path from 'path';

async function startServer() {
  const distDir = '/workspace/passioncrea/dist';
  
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
  };
  
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let filePath = path.join(distDir, req.url === '/' ? 'index.html' : req.url);
      const ext = path.extname(filePath);
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      
      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(404);
          res.end('Not found');
        } else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content);
        }
      });
    });
    
    server.listen(3456, () => {
      console.log('Server started on http://localhost:3456');
      resolve(server);
    });
  });
}

async function testApp() {
  console.log('Starting Playwright test...');
  
  const server = await startServer();
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Collect console messages
  const consoleMessages = [];
  const consoleErrors = [];
  
  page.on('console', msg => {
    const text = msg.text();
    consoleMessages.push(`[${msg.type()}] ${text}`);
    if (msg.type() === 'error') {
      consoleErrors.push(text);
    }
  });
  
  page.on('pageerror', err => {
    consoleErrors.push(`Page Error: ${err.message}`);
  });
  
  try {
    // Navigate to the built app
    await page.goto(`http://localhost:3456`, { waitUntil: 'networkidle' });
    
    // Wait a bit for any async operations
    await page.waitForTimeout(2000);
    
    // Check if main elements are present
    const appContainer = await page.$('#app-container');
    const sidebar = await page.$('#sidebar');
    const previewContainer = await page.$('#preview-container');
    
    console.log('\n=== Element Check ===');
    console.log(`App Container: ${appContainer ? '✓ Found' : '✗ Not Found'}`);
    console.log(`Sidebar: ${sidebar ? '✓ Found' : '✗ Not Found'}`);
    console.log(`Preview Container: ${previewContainer ? '✓ Found' : '✗ Not Found'}`);
    
    // Check for buttons
    const exportButtons = await page.$$('#export-buttons button');
    console.log(`Export Buttons: ${exportButtons.length} found`);
    
    console.log('\n=== Console Messages ===');
    consoleMessages.forEach(msg => console.log(msg));
    
    console.log('\n=== Console Errors ===');
    // Filter out expected errors (tailwind warning and 404s for missing static assets)
    const realErrors = consoleErrors.filter(err => 
      !err.includes('tailwindcss.com') && 
      !err.includes('404') &&
      !err.includes('Failed to load resource')
    );
    if (realErrors.length === 0) {
      console.log('No errors found! ✓');
    } else {
      realErrors.forEach(err => console.log(`✗ ${err}`));
    }
    
    console.log('\n=== Test Result ===');
    if (realErrors.length === 0 && appContainer && sidebar && previewContainer) {
      console.log('All tests passed! ✓');
    } else {
      console.log('Some tests failed. Please review the errors above.');
    }
    
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    await browser.close();
    server.close();
    console.log('\nServer stopped.');
  }
}

testApp();
