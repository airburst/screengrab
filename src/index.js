const puppeteer = require('puppeteer');
const CREDS = require('./creds');

const USERNAME_SELECTOR = '#username';
const PASSWORD_SELECTOR = '#password';
const BUTTON_SELECTOR = '#regularsubmit';

const login = async (page, delay = 2000) => {
  await page.waitFor(delay);
  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(CREDS.username);
  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(CREDS.password);
  await page.click(BUTTON_SELECTOR);
  await page.waitForNavigation();
};

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://idp.activeteachonline.com/sso/idp/www/module.php/core/loginuserpass.php');

  await login(page);
})();
