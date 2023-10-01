import { Elements } from '../webdriverio/Elements';

export class CommonPage {
  async verifyResultLengthByText(
    text: string,
    expectedCount: number,
    timeoutMs: number = 10000
  ): Promise<void> {
    const driver = await Elements.getDriver();
    await driver.waitUntil(
      async () => {
        const elements = await driver.$$(
          `android=new UiSelector().text("${text}")`
        );
        return elements.length === expectedCount;
      },
      {
        timeout: timeoutMs,
        timeoutMsg: `O número de elementos não é igual a ${expectedCount} dentro do tempo limite de ${timeoutMs}ms`,
      }
    );
  }
}
