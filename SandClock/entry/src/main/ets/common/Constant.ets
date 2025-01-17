class Constant {
  // 这个文件里写一些通用的参数，比如字体颜色、按钮颜色、默认的用户名
  BACKGROUND_COLOR: string = '#F1F3F5';
  FONT_SIZE = 20;
  FONT_WEIGHT = 500;
  FULL_PERCENT = '100%';
  BUTTON_WIDTH = '87%';
  BUTTON_HEIGHT = '8%';
  BUTTON_MARGIN_BOTTOM = '25vp';
  BUTTON_BACK_COLOR = "#007DFF";

  // 默认的沙漏信息
  DEFAULT_CLOCK_ID: number = -1;
  DEFAULT_CLOCK_COMMIT = '';
  STATE_NOT_EXISTS: number = 0;
  STATE_RUNNING: number = 1;
  STATE_RUN_OVER: number = 2;

  // 默认用户的信息
  DEFAULT_ACCOUNT_NAME = '';
  DEFAULT_PASSWORD = '';

  DEFAULT_WEB_URL: string = 'LocalWeb.html';
  HTTP_READ_TIMEOUT: number = 5000;
  HTTP_CONNECT_TIMEOUT: number  = 5000;

  // 持久化组件
  PREFERENCE_NAME: string = 'account.db';
  PREFERENCE_KEY: string = 'account';
  TAG = '[PreferenceModel]';
  DURATION: number = 3000;

  // 将字符串转成数字，仅正整数是合法的，非法返回-1
  StringToInt(str: string): number {
    const regx = /^[0-9]+$/;
    if(str === '' || !regx.test(str)){
      return -1;
    }
    return parseInt(str);
  }
}

export default new Constant();