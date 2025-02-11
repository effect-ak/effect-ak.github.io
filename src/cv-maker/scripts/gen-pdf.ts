// import path from "path";
// import * as Puppeteer from "puppeteer"

// const browser = await Puppeteer.launch({
//   headless: false,
//   defaultViewport: null,
//   args: [
//     '--disable-web-security',
//     // '--disable-features=IsolateOrigins',
//     // '--disable-site-isolation-trials'
//   ]
// });

// const page = await browser.newPage();

// const filePath = 'file://' + path.resolve('dist', 'index.html');

// console.log(filePath);

// await page.goto(filePath, { waitUntil: "load" })
// await page.pdf({
//   path: 'kondaurov-resume.pdf',
//   format: 'a3',
//   printBackground: true
// })
// await browser.close()
