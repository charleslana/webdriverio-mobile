import * as dotenv from 'dotenv';
import { AppPage } from '../page-objects/AppPage';

dotenv.config();

const appPage = new AppPage();

async function runTest() {
  try {
    await appPage.acceptPermissions();
    await appPage.login();
    await appPage.goToSales();
    await appPage.searchEvent();
  } finally {
    await appPage.closeApp();
  }
}

runTest().catch(console.error);
