import Constant from '../common/Constant';
import Account from '../object/Account';
import SandClock from '../object/SandClock';


class MemoryModule {
  private accountConfig: Map<Account, Array<SandClock>>;

  constructor() {
    this.accountConfig = new Map<Account, Array<SandClock>>();
  }

  private deepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  creatAccount(user: Account): boolean {
    // 注册新用户
    // 如果用户已存在或是空用户，则返回 false, 否则返回 true
    if(this.accountConfig.has(user)
      || user.accountName === Constant.DEFAULT_ACCOUNT_NAME
      || user.accountPassword == Constant.DEFAULT_PASSWORD){
      return false;
    }
    const new_user = this.deepCopy(user);
    this.accountConfig.set(new_user, []);
    return true;
  }

  checkAccount(user: Account): boolean {
    if(this.accountConfig.has(user)){
      return true;
    }
    return false;
  }

  async read(user: Account){
    // 如果未存在此用户，则返回空列表
    if(!this.accountConfig.has(user)) {
      return [];
    }
    // 返回此用户的沙漏列表
    return this.deepCopy(this.accountConfig.get(user)!);
  }

  async write(user: Account, clock: SandClock){
    // 如果未存在此账户或发生意外没有写入成功，则返回 false
    if(!this.accountConfig.has(user)){
      return false;
    }
    const clockList = this.accountConfig.get(user);
    if(clockList){
      clockList.push(clock);
      return true;
    }
    return false;
  }
}

export default new MemoryModule();