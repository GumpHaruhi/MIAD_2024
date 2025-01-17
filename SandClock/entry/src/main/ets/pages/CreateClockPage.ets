import Account from '../object/Account';
import Constant from '../common/Constant';
import SandClock from '../object/SandClock';
import MemoryModule from '../Module/MemoryModule';
import ButtonComponent from '../Module/ButtonComponent';
import ButtonItem from '../Module/ButtonItem';
import { display } from '@kit.ArkUI';
import { promptAction } from '@kit.ArkUI';

@Component
struct CreateClockPage {
  @Link user: Account;
  @Link logged: boolean;
  private clock: SandClock = new SandClock();
  private inputHeight: string = '7%';
  private marginTop: string = '';
  private marginBottom: string = '';
  private textInputType: InputType = InputType.Normal;

  build(){
    if(this.logged){
      Column() {
        Text('新建沙漏')
          .fontSize(30)
          .fontColor('#000000')
          .textAlign(TextAlign.Center)
          .margin({ bottom: 16 })

        // TextComponent({
        //   text_default: '用户名',
        //   placeHolder: "请输入用户名",
        //   textFlag: 0,
        //   account: $account,
        //   text_input_callback: (value: string) => {
        //     this.account.accountName = value;
        //   },
        //   inputHeight: '7%'
        // }).margin({ top: '5%' });

        Text('持续时间')
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
          placeholder: '单位: 秒',
          text: this.clock.clockDuration
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
            this.clock.clockDuration = value;
          })

        Text('备注')
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
          placeholder: '备注信息',
          text: this.clock.clockCommit
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
            this.clock.clockCommit = value;
          })

        // 按钮组件
        ButtonComponent({
          account: $user,
          buttonItem: new ButtonItem(
            '点击新建',
            () => {
              // 新建沙漏的逻辑
              console.log("click create clock button");
              if(Constant.StringToInt(this.clock.clockDuration) === -1) {
                // 非法的输入，拒绝新建沙漏
                this.showToastMessage('非法输入: ' + this.clock.clockDuration);
                return;
              }
              let currentDate = new Date();
              this.clock.setDate = currentDate.getDate();
              this.clock.clockState = Constant.STATE_RUNNING;
              MemoryModule.write(this.user, this.clock);
              this.showToastMessage('添加成功！');
            }
          )
        }).margin({ top: '20%' })

      }
    }
    else {
      Text('您尚未登录')
        .fontSize(30)
        .fontColor('#000000')
        .textAlign(TextAlign.Center)
        .margin({ bottom: 16 })
    }
  }

  showToastMessage(message: string) {
    promptAction.showToast({
      message: message,
      duration: Constant.DURATION
    })
  }

}

export default CreateClockPage;