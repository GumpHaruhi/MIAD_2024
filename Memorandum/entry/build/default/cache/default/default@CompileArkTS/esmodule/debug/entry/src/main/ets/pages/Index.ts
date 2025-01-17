if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    currentIndex?: number;
    memoList?: MemoItem[];
    timeNumber?: number;
}
import type { MemoItem, UserModel } from '../model/MemoItem';
import router from "@ohos:router";
import { PreferenceUtil } from "@normalized:N&&&entry/src/main/ets/model/PreferenceUtil&";
import emitter from "@ohos:events.emitter";
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentIndex = new ObservedPropertySimplePU(0, this, "currentIndex");
        this.__memoList = new ObservedPropertyObjectPU([], this, "memoList");
        this.timeNumber = 0;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.memoList !== undefined) {
            this.memoList = params.memoList;
        }
        if (params.timeNumber !== undefined) {
            this.timeNumber = params.timeNumber;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__memoList.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentIndex.aboutToBeDeleted();
        this.__memoList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentIndex: ObservedPropertySimplePU<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    private __memoList: ObservedPropertyObjectPU<MemoItem[]>;
    get memoList() {
        return this.__memoList.get();
    }
    set memoList(newValue: MemoItem[]) {
        this.__memoList.set(newValue);
    }
    private timeNumber: number;
    async aboutToAppear(): Promise<void> {
        let userModel = await PreferenceUtil.readModel<UserModel>("login");
        if (userModel == null) {
            return;
        }
        let ararys = await PreferenceUtil.readModel<MemoItem[]>(userModel.id) ?? [];
        this.memoList = ararys.reverse();
        this.creatTimer();
    }
    creatTimer() {
        this.timeNumber = setInterval(() => {
            emitter.emit("time-event", null);
        }, 1000);
    }
    async onPageShow(): Promise<void> {
        let userModel = await PreferenceUtil.readModel<UserModel>("login");
        if (userModel == null) {
            return;
        }
        let ararys = await PreferenceUtil.readModel<MemoItem[]>(userModel.id) ?? [];
        this.memoList = ararys.reverse();
    }
    logOut() {
        PreferenceUtil.delete("login");
        router.replaceUrl({ url: 'pages/LoginPage' });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height('100%');
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.justifyContent(FlexAlign.Center);
            Row.alignItems(VerticalAlign.Center);
            Row.height(44);
            Row.width("100%");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.width(44);
            Blank.height(44);
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("备忘录");
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.layoutWeight(1);
            Text.alignSelf(ItemAlign.Center);
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("退出");
            Text.width(44);
            Text.height(44);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.onClick(() => {
                this.logOut();
            });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.BottomEnd });
            Stack.height('100%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.height('100%');
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.height(50);
                    Column.margin({ bottom: 10, left: 15, right: 15 });
                    Column.onClick(() => {
                        router.pushUrl({ url: "pages/MemorandumDetDetailsPage", params: item });
                    });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.height("100%");
                    Row.width("100%");
                    Row.borderRadius(4);
                    Row.borderWidth(1);
                    Row.borderColor("#999999");
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create("名称：" + item.title);
                    Text.padding({ left: 10, right: 10 });
                    Text.layoutWeight(1);
                }, Text);
                Text.pop();
                Row.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.memoList, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("添加");
            Text.width(60);
            Text.height(60);
            Text.borderRadius(40);
            Text.borderWidth(1);
            Text.borderColor("#8a999999");
            Text.backgroundColor("#ffe7b213");
            Text.textAlign(TextAlign.Center);
            Text.alignSelf(ItemAlign.Center);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: 50, right: 20 });
            Text.onClick(() => {
                router.pushUrl({ url: "pages/AddMemorandumPage" });
            });
        }, Text);
        Text.pop();
        Stack.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.wmm.myapplication", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
