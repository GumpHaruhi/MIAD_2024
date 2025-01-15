import Account from '../object/Account';
import Constant from '../common/Constant';

@Component
export default struct TextComponent {
  @Link account: Account;
  text_default: string = '';
  placeHolder: string = '';
  textFlag: number = 0;
  text_input_callback = (value: string) => {};
  inputHeight: string = '';
  private marginTop: string = '';
  private marginBottom: string = '';
  private textInputType: InputType = InputType.Normal;

  setAppear() {
    // 输入字符串
    this.marginTop = '12%';
    this.marginBottom = '6%';
    this.textInputType = InputType.Normal;
  }

  selectText(){
    if(this.textFlag === 0){
      return this.account.accountName;
    } else {
      let passwordStr: string = "*".repeat(this.account.accountPassword.length);
      return passwordStr;
    }
  }

  build() {
    Column() {
      Text(this.text_default)
        .fontSize(24)
        .height('24vp')
        .width('100%')
        .fontColor('#333333')
        .letterSpacing('1.58')
        .fontWeight(Constant.FONT_WEIGHT)
        .margin({
          bottom: '3%',
          left: '10%',
          top: this.marginTop
        })

      TextInput({
        placeholder: this.placeHolder,
        text: this.selectText()
      })
        .placeholderFont({ size: Constant.FONT_SIZE, weight: Constant.FONT_WEIGHT })
        .placeholderColor("#BDC1C4")
        .caretColor(Color.Blue)
        .type(this.textInputType)
        .height(this.inputHeight)
        .width('93%')
        .margin({ bottom: this.marginBottom })
        .fontSize(Constant.FONT_SIZE)
        .fontColor('#333333')
        .fontWeight(Constant.FONT_WEIGHT)
        .backgroundColor('#ffffff')
        .onChange((value: string) => {
          this.text_input_callback(value);
        })
    }
  }
}