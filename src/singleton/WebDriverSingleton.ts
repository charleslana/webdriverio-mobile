import * as dotenv from 'dotenv';
import { remote, RemoteOptions } from 'webdriverio';

dotenv.config();

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': process.env.APP_DEVICE_NAME,
  'appium:appPackage': process.env.APP_PACKAGE,
  'appium:appActivity': process.env.APP_ACTIVITY,
};

const wdOpts: RemoteOptions = {
  hostname: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT!, 10) || 4723,
  path: '/wd/hub',
  logLevel: 'info',
  capabilities,
};

export class WebDriverSingleton {
  private static instance: WebdriverIO.Browser | null = null;

  private constructor() {}

  static async getInstance(): Promise<WebdriverIO.Browser> {
    if (!WebDriverSingleton.instance) {
      WebDriverSingleton.instance = await remote(wdOpts);
    }
    return WebDriverSingleton.instance;
  }

  static async close() {
    if (this.instance != null) {
      await this.instance.pause(1000);
      await this.instance.deleteSession();
    }
  }
}
