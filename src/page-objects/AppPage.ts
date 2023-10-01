import { CommonPage } from './CommonPage';
import { Elements } from '../webdriverio/Elements';
import { WebDriverSingleton } from '../singleton/WebDriverSingleton';

export class AppPage extends CommonPage {
  private accessCode = '654321';
  private password = '123456';
  private inputAccessCode = 'android.widget.EditText';
  private inputPassword =
    '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.EditText[2]';
  private loginButton =
    '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup';
  private inputSearchEvent = 'android.widget.EditText';
  private eventName = 'PosComTaxa';

  async acceptPermissions() {
    const driver = await WebDriverSingleton.getInstance();
    for (let index = 0; index < 2; index++) {
      await driver.waitUntil(
        async () => {
          const alert = await driver.getAlertText();
          return alert !== null;
        },
        { timeout: 10000, timeoutMsg: 'O diálogo de permissão não apareceu.' }
      );
      await driver.acceptAlert();
    }
  }

  async closeApp() {
    await WebDriverSingleton.close();
  }

  async login() {
    await Elements.fillByClassName(this.inputAccessCode, 0, this.accessCode);
    await Elements.fillByXpath(this.inputPassword, this.password);
    await Elements.clickByXpath(this.loginButton);
    await Elements.waitForTextToAppear('ID do caixa:');
  }

  async goToSales() {
    await Elements.clickByText('VENDAS');
    await Elements.waitForTextToAppear('EVENTOS');
  }

  async searchEvent() {
    await Elements.fillByClassName(this.inputSearchEvent, 0, this.eventName);
    await this.verifyResultLengthByText('INGRESSOS', 1);
  }
}
