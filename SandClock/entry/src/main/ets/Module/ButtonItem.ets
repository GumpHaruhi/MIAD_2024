// 按钮类

export default class ButtonItem {
  name: string = '';
  clickMethod: () => void;
  constructor(name: string, clickMethod: () => void) {
    this.name = name;
    this.clickMethod = clickMethod;
  }
}