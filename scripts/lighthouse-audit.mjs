import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

// LIGHTHOUSE_MODULE_DIR can point to an existing Lighthouse installation.
const moduleRoot = process.env.LIGHTHOUSE_MODULE_DIR;
const {default: lighthouse} = await import(moduleRoot ? pathToFileURL(path.join(moduleRoot, 'lighthouse/core/index.js')).href : 'lighthouse');
const {launch} = await import(moduleRoot ? pathToFileURL(path.join(moduleRoot, 'chrome-launcher/dist/index.js')).href : 'chrome-launcher');
const {default: desktopConfig} = await import(moduleRoot ? pathToFileURL(path.join(moduleRoot, 'lighthouse/core/config/desktop-config.js')).href : 'lighthouse/core/config/desktop-config.js');
const base = process.env.AUDIT_BASE_URL || 'http://localhost:3002';
const output = process.env.AUDIT_OUTPUT || 'reports/lighthouse';
await fs.mkdir(output, {recursive: true});
await fs.mkdir(path.join(output, 'chrome-profile'), {recursive: true});
const pages = process.argv[2] ? process.argv[2].split(',') : ['index', 'floor-plans', 'financing', 'contact'];
const profiles = process.argv[3] ? process.argv[3].split(',') : ['mobile', 'tablet', 'desktop'];
const summary = [];
for (const profile of profiles) {
  for (const page of pages) {
    const chrome = await launch({chromePath: process.env.CHROME_PATH, chromeFlags: ['--headless', '--no-sandbox'], userDataDir: path.resolve(output, 'chrome-profile')});
    try {
      const settings = {port: chrome.port, output: ['json', 'html'], onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo']};
      if (profile === 'tablet') settings.screenEmulation = {mobile: true, width: 768, height: 1024, deviceScaleFactor: 2, disabled: false};
      const result = await lighthouse(`${base}/${page}.html`, settings, profile === 'desktop' ? desktopConfig : undefined);
      if (result.lhr.runtimeError) throw new Error(JSON.stringify(result.lhr.runtimeError));
      const name = `${page}-${profile}`;
      await fs.writeFile(path.join(output, name + '.json'), result.report[0]);
      await fs.writeFile(path.join(output, name + '.html'), result.report[1]);
      const scores = Object.fromEntries(Object.entries(result.lhr.categories).map(([id, category]) => [id, Math.round(category.score * 100)]));
      const entry = {page, profile, scores, viewport: result.lhr.configSettings.screenEmulation, lcp: result.lhr.audits['largest-contentful-paint'].numericValue, cls: result.lhr.audits['cumulative-layout-shift'].numericValue};
      summary.push(entry);
      console.log(JSON.stringify(entry));
      await fs.writeFile(path.join(output, 'summary.json'), JSON.stringify(summary, null, 2));
    } finally { await chrome.kill(); }
  }
}
