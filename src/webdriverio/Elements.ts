import { ElementArray } from 'webdriverio';
import { WebDriverSingleton } from '../singleton/WebDriverSingleton';

export class Elements {
  private constructor() {}

  static async findAllByClassName(className: string): Promise<ElementArray> {
    const driver = await WebDriverSingleton.getInstance();
    const elements = await driver.$$(`//*[@class='${className}']`);
    return elements;
  }

  static async fillByXpath(selector: string, text: string) {
    const driver = await WebDriverSingleton.getInstance();
    const element = await driver.$(selector);
    await element.waitForDisplayed();
    await element.setValue(text);
  }

  static async fillByClassName(className: string, index: number, text: string) {
    const elements = await this.findAllByClassName(className);
    await elements[index].waitForDisplayed();
    await elements[index].setValue(text);
  }

  static async clickByXpath(selector: string) {
    const driver = await WebDriverSingleton.getInstance();
    const element = await driver.$(selector);
    await element.waitForDisplayed();
    await element.click();
  }

  static async clickByText(text: string) {
    const driver = await WebDriverSingleton.getInstance();
    const element = await driver.$(`android=new UiSelector().text("${text}")`);
    await element.click();
  }

  static async waitForTextToAppear(text: string, timeoutMs: number = 10000) {
    const driver = await WebDriverSingleton.getInstance();
    await driver.waitUntil(
      async () => {
        const element = await driver.$(
          `android=new UiSelector().text("${text}")`
        );
        return element && element.isDisplayed();
      },
      {
        timeout: timeoutMs,
        timeoutMsg: `Text "${text}" did not appear within the specified timeout`,
      }
    );
  }

  static async getDriver(): Promise<WebdriverIO.Browser> {
    return await WebDriverSingleton.getInstance();
  }
}
