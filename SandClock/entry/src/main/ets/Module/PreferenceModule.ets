import { promptAction } from '@kit.ArkUI';
import { preferences } from '@kit.ArkData';
import Constant from '../common/Constant';
import Account from '../object/Account';

let context = getContext(this);
let preference: preferences.Preferences;
let preferenceTemp: preferences.Preferences;

class PreferenceModule {
  private accountData: Account = new Account();

  async getPreferencesFromStorage() {
    try {
      preference = await preferences.getPreferences(context, Constant.PREFERENCE_NAME);
    } catch (err) {
      console.log(`Failed to get preferences, Cause: ${err}`);
    }
  }

  async getPreference() {
    let account_json = '';
    if(!preference){
      // 载入初始化数据库
      this.getPreferencesFromStorage();
    }
    try{
      // 读取储存的数据，转换为字符串
      account_json = (await preference.get(Constant.PREFERENCE_KEY, '')).toString();
    } catch (err) {
      console.log(`Failed to get value, Cause: ${err}`);
    }
    if(account_json === ''){
      // 数据库是空的，还没写入过数据
      console.log('No data exist');
      return;
    }
    console.log('get preference');
    return JSON.parse(account_json);
  }

  // 读取
  async getAccountData(){
    this.accountData = await this.getPreference();
    if(this.accountData){
      console.log('success get');
    } else {
      console.log('No data exists');
    }
    return this.accountData;
  }

  async putPreference(account: Account){
    if(!preference){
      await this.getPreferencesFromStorage();
    }
    try{
      await preference.put(Constant.PREFERENCE_KEY, JSON.stringify(account));
    } catch (err) {
      console.log(`Failed to put value, Cause: ${err}`);
    }
    preference.flush();
  }

  // 清空数据库
  async deletePreference() {
    try{
      await preferences.deletePreferences(context, Constant.PREFERENCE_NAME);
    } catch (err) {
      console.log(`Failed to delete data, Cause: ${err}`);
    }
    preference = preferenceTemp;
    this.showToastMessage('Success !')
  }

  checkData(account: Account){
    if(account.accountName === '' || account.accountPassword === ''){
      return true;
    }
    return false;
  }

  // 写入
  writeData(account: Account){
    if(this.checkData(account)){
      // 传入的参数是空，不执行写操作
      // this.showToastMessage('用户名或密码不能为空');
      return;
    }
    this.putPreference(account);
    // this.showToastMessage('登录成功');
  }

  // 打印弹窗
  showToastMessage(message: string) {
    promptAction.showToast({
      message: message,
      duration: Constant.DURATION
    })
  }
}

export default new PreferenceModule();