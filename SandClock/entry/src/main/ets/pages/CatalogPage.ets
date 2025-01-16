import Account from '../object/Account';
import SandClock from '../object/SandClock';
import Constant from '../common/Constant';
import MemoryModule from '../Module/MemoryModule';

// TODO
// 目录页面的布局与逻辑
// 需要在这个页面实现 HTTP 通信

@Component
struct CatalogPage {
  @Link user: Account;
  @Link currentClock: SandClock;

  build(){
    Column(){
      Text(this.user.accountName)
        .fontSize(24)
        .height('24vp')
        .width('100%')
        .fontColor('#333333')
        .letterSpacing('1.58')
        .fontWeight(Constant.FONT_WEIGHT)
        .margin({
          bottom: '3%',
          left: '10%'
        })

      Text(this.user.accountPassword)
        .fontSize(24)
        .height('24vp')
        .width('100%')
        .fontColor('#333333')
        .letterSpacing('1.58')
        .fontWeight(Constant.FONT_WEIGHT)
        .margin({
          bottom: '3%',
          left: '10%'
        })
    }
  }

}

export default CatalogPage;