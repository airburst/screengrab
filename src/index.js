const puppeteer = require('puppeteer');
const CREDS = require('./creds');

const DELAY = 1000;
const $USERNAME = '#$username';
const $PASSWORD = '#password';
const $BUTTON = '#regularsubmit';
const $BOOK = '#ebookID558492';
const $PAGE_LAYOUT = 'body > div > div:nth-child(5) > div > div.leftbuttons > a.activelearn.button.viewtoggle.active';
const $PAGE_NUMBER = 'body > div > div:nth-child(5) > div > div.rightbuttons > div.quicknav.control > input[type="text"]';

const login = async (page, delay = DELAY) => {
  await page.waitFor(delay);
  await page.click($USERNAME);
  await page.keyboard.type(CREDS.username);
  await page.click($PASSWORD);
  await page.keyboard.type(CREDS.password);
  await page.click($BUTTON);
  await page.waitForNavigation();
};

const chooseBook = async (page, delay = DELAY) => {
  await page.waitFor(delay);
  await page.click($BOOK);
};

const main = async ({ url }) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  page.on('targetcreated', async (target) => {
    console.log('POPUP', target);
  });

  await page.goto(url);
  await login(page);
  await chooseBook(page);
};

main({
  url: 'https://idp.activeteachonline.com/sso/idp/www/module.php/core/loginuserpass.php',
});
