import Constant from '../common/Constant';
import ButtonItem from './ButtonItem';
import Account from '../object/Account';

@Component
export default struct ButtonComponent {
  @Link account: Account;
  @Prop buttonItem: ButtonItem;

  build() {
    Column() {
      Button(this.buttonItem.name, { type: ButtonType.Capsule, stateEffect: true })
        .backgroundColor(Constant.BUTTON_BACK_COLOR)
        .width(Constant.BUTTON_WIDTH)
        .height(Constant.BUTTON_HEIGHT)
        .fontWeight(Constant.FONT_WEIGHT)
        .fontSize(Constant.FONT_SIZE)
        .margin({ bottom: Constant.BUTTON_MARGIN_BOTTOM })
        .onClick(() => {
          this.buttonItem.clickMethod();
        });
    }
  }
}