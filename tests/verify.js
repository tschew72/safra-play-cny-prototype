async page => {
 const base = 'http://127.0.0.1:7102';
 const pages = ['index','campaigns','leaderboard','profile','faq','signin','campaign-join','campaign-joined','campaign-ended','wave-1','quiz','game-intro','round-briefing','memory-match','design-system'];
 const failures = []; const errors = [];
 page.on('pageerror', e => errors.push(e.message));
 for (const width of [1440,390]) {
  await page.setViewportSize({width,height:900});
  for (const name of pages) {
   await page.goto(`${base}/${name}.html`);
   const issue = await page.evaluate(() => ({overflow:document.documentElement.scrollWidth > innerWidth, broken:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.getAttribute('src'))}));
   if(issue.overflow || issue.broken.length) failures.push({name,width,...issue});
  }
 }
 await page.goto(base);
 await page.getByRole('link',{name:'Play Now, It’s Free'}).click();
 if(!page.url().endsWith('/signin.html')) failures.push('Home CTA failed');
 await page.goto(base+'/faq.html');
 await page.locator('.acc-q').nth(1).click();
 if(!await page.locator('.acc-item.open .acc-a').first().isVisible()) failures.push('FAQ failed');
 await page.goto(base+'/memory-match.html');
 if(await page.locator('.mm-card').count()===0) failures.push('Memory cards missing');
 await page.locator('.mm-card').first().click();
 if(await page.locator('.mm-card.flipped').count()===0) failures.push('Memory card did not flip');
 if(failures.length || errors.length) throw new Error(JSON.stringify({failures,errors}));
 return 'PASS: 30 page/viewport checks, images, JavaScript, home CTA, FAQ, memory card interaction';
}
