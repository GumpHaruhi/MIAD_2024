import Account from '../object/Account';
import Constant from '../common/Constant';
import PreferenceModule from '../Module/PreferenceModule';
import TextComponent from '../Module/TextComponent';
import ButtonComponent from '../Module/ButtonComponent';
import ButtonItem from '../Module/ButtonItem';
import { display } from '@kit.ArkUI';
import { promptAction } from '@kit.ArkUI';

// TODO
// 登录界面

@Component
struct LogPage {
  @Link account: Account;
  @State isPortrait: boolean = true;

  aboutToAppear(): void {
    setTimeout(() => {
      this.getWindowProperties();
    }, 100);
  }

  build() {
    Column() {
      Text('用户登录')
        .fontSize(30)
        .fontColor('#000000')
        .textAlign(TextAlign.Center)
        .margin({ bottom: 16 })

        // 输入框组件
        TextComponent({
          text_default: '用户名',
          placeHolder: "请输入用户名",
          textFlag: 0,
          account: $account,
          text_input_callback: (value: string) => {
            this.account.accountName = value;
          },
          inputHeight: '7%'
        }).margin({ top: '5%' });

        TextComponent({
          text_default: '密码',
          placeHolder: "请输入密码",
          textFlag: 1,
          account: $account,
          text_input_callback: (value: string) => {
            this.account.accountPassword = value;
          },
          inputHeight: '7%'
        }).margin({ top: '3%' });

        // 按钮组件
        ButtonComponent({
          account: $account,
          buttonItem: new ButtonItem(
            '登录',
            () => {
              // TODO
              // 用户登录的逻辑
              if(this.account.accountName === '' || this.account.accountPassword === ''){
                this.showToastMessage('用户名或密码不能为空');
                return;
              }
              this.showToastMessage('登录成功');
              PreferenceModule.writeData(this.account);
            }
          )
        }).margin({ top: '20%' })

        ButtonComponent({
          account: $account,
          buttonItem: new ButtonItem(
            '注册',
            () => {
              // TODO
              // 用户注册逻辑
              if(this.account.accountName === '' || this.account.accountPassword === ''){
                this.showToastMessage('用户名或密码不能为空');
                return;
              }
              this.showToastMessage('注册成功');
              console.log('click Sign button');
            }
          )
        })
    }
    .width('100%')
    .height('100%')
    .backgroundColor(Constant.BACKGROUND_COLOR)
  }

  async setAppear(){
    await PreferenceModule.getPreferencesFromStorage();
    PreferenceModule.getAccountData().then((ret: Account) => {
      if(ret){
        this.account = ret;
      }
    })
  }

  async getWindowProperties(){
    let displayClass: display.Display | null = null;
    displayClass = display.getDefaultDisplaySync();
    this.isPortrait = displayClass.availableWidth <= displayClass.availableHeight;
    console.log("w: " + displayClass.availableWidth);
    console.log("h: " + displayClass.availableHeight);
    console.log("isPortrait: " + this.isPortrait);
  }

  showToastMessage(message: string) {
    promptAction.showToast({
      message: message,
      duration: Constant.DURATION
    })
  }

}

export default LogPage;