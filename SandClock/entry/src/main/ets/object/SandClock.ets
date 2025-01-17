import Constant from '../common/Constant';
import systemDateTime from '@ohos.systemDateTime';

export default class SandClock {
  // 日期（年月日）和倒计时用的时间戳应该区分开
  clockId: number = Constant.DEFAULT_CLOCK_ID;
  setDate: number;          // 起始时间
  clockDuration: string = '';    // 持续时间
  clockCommit: string = Constant.DEFAULT_CLOCK_COMMIT
  clockState: number = Constant.STATE_NOT_EXISTS;

  constructor() {
    let currentDate = new Date();
    this.setDate = currentDate.getDate();
  }
}