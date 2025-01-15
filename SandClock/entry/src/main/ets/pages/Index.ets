import LogPage from './LogPage';
import ShowPage from './ClockShowPage';
import CatalogPage from './CatalogPage';
import Account from '../object/Account';
import Constant from '../common/Constant';
import SandClock from '../object/SandClock';

@Entry
@Component
struct Index {
  @State currentIndex: number = 0;
  @State account: Account = new Account();
  @State currentClock: SandClock = new SandClock();
  private tabsController: TabsController = new TabsController();

  @Builder
  tabBarBuilder(title: string, targetIndex: number){
    Column() {
      Text(title)
        .fontFamily('Date pull & save')
        .fontSize(15)
        .fontColor(this.currentIndex === targetIndex ? '#0A59F7' : 'rgba(0,0,0,0.60)')
        .textAlign(TextAlign.Center)
        .lineHeight(14)
        .fontWeight(500)
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
    .alignItems(HorizontalAlign.Center)
    .onClick(() => {
      this.currentIndex = targetIndex;
      this.tabsController.changeIndex(targetIndex);
    })
  }

  build() {
    Tabs({barPosition: BarPosition.End, controller: this.tabsController, }) {
      TabContent() {
        ShowPage({ clock: $currentClock });
      }
      .tabBar(this.tabBarBuilder('展示', 0))

      TabContent() {
        CatalogPage({ user: $account, currentClock: $currentClock });
      }
      .tabBar(this.tabBarBuilder('目录', 1))

      TabContent() {
        LogPage({ account: $account });
      }
      .tabBar(this.tabBarBuilder('登录', 2))
    }
    .vertical(false)
    .divider({
      strokeWidth: 0.5,
      color: '#0A59F7'
    })
    .scrollable(false)
    .backgroundColor(Constant.BACKGROUND_COLOR)
    .padding({ top: 36, bottom: 28 })
  }
}