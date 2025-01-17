if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MemorandumDetDetailsPage_Params {
    titleName?: string;
    content?: string;
    time?: string;
    model?: MemoItem;
    currentDate?: number;
    isToTime?: boolean;
    toDay?: string;
}
import { MemoItem } from "@normalized:N&&&entry/src/main/ets/model/MemoItem&";
import router from "@ohos:router";
import emitter from "@ohos:events.emitter";
class MemorandumDetDetailsPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__titleName = new ObservedPropertySimplePU("", this, "titleName");
        this.__content = new ObservedPropertySimplePU("", this, "content");
        this.__time = new ObservedPropertySimplePU("", this, "time");
        this.__model = new ObservedPropertyObjectPU(new MemoItem(), this, "model");
        this.__currentDate = new ObservedPropertySimplePU(0, this, "currentDate");
        this.__isToTime = new ObservedPropertySimplePU(false, this, "isToTime");
        this.__toDay = new ObservedPropertySimplePU("", this, "toDay");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MemorandumDetDetailsPage_Params) {
        if (params.titleName !== undefined) {
            this.titleName = params.titleName;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.time !== undefined) {
            this.time = params.time;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.currentDate !== undefined) {
            this.currentDate = params.currentDate;
        }
        if (params.isToTime !== undefined) {
            this.isToTime = params.isToTime;
        }
        if (params.toDay !== undefined) {
            this.toDay = params.toDay;
        }
    }
    updateStateVars(params: MemorandumDetDetailsPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__titleName.purgeDependencyOnElmtId(rmElmtId);
        this.__content.purgeDependencyOnElmtId(rmElmtId);
        this.__time.purgeDependencyOnElmtId(rmElmtId);
        this.__model.purgeDependencyOnElmtId(rmElmtId);
        this.__currentDate.purgeDependencyOnElmtId(rmElmtId);
        this.__isToTime.purgeDependencyOnElmtId(rmElmtId);
        this.__toDay.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__titleName.aboutToBeDeleted();
        this.__content.aboutToBeDeleted();
        this.__time.aboutToBeDeleted();
        this.__model.aboutToBeDeleted();
        this.__currentDate.aboutToBeDeleted();
        this.__isToTime.aboutToBeDeleted();
        this.__toDay.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __titleName: ObservedPropertySimplePU<string>;
    get titleName() {
        return this.__titleName.get();
    }
    set titleName(newValue: string) {
        this.__titleName.set(newValue);
    }
    private __content: ObservedPropertySimplePU<string>;
    get content() {
        return this.__content.get();
    }
    set content(newValue: string) {
        this.__content.set(newValue);
    }
    private __time: ObservedPropertySimplePU<string>;
    get time() {
        return this.__time.get();
    }
    set time(newValue: string) {
        this.__time.set(newValue);
    }
    private __model: ObservedPropertyObjectPU<MemoItem>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: MemoItem) {
        this.__model.set(newValue);
    }
    private __currentDate: ObservedPropertySimplePU<number>;
    get currentDate() {
        return this.__currentDate.get();
    }
    set currentDate(newValue: number) {
        this.__currentDate.set(newValue);
    }
    private __isToTime: ObservedPropertySimplePU<boolean>;
    get isToTime() {
        return this.__isToTime.get();
    }
    set isToTime(newValue: boolean) {
        this.__isToTime.set(newValue);
    }
    private __toDay: ObservedPropertySimplePU<string>;
    get toDay() {
        return this.__toDay.get();
    }
    set toDay(newValue: string) {
        this.__toDay.set(newValue);
    }
    aboutToAppear(): void {
        this.loadData();
    }
    onPageHide(): void {
        emitter.off("time-event");
    }
    onPageShow(): void {
        emitter.on("time-event", () => {
            this.loadData();
        });
    }
    loadData() {
        this.model = router.getParams() as MemoItem ?? new MemoItem();
        let date1 = new Date(this.model.comparativeTime);
        let date2 = new Date();
        // 计算两个时间之间的时间差（以毫秒为单位）
        let diffMs = date1.getTime() - date2.getTime();
        // 将时间差转换为天数、小时数和分钟数
        // 将时间差转换为天数、小时数、分钟数和秒数
        let diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // 计算相差的天数
        let remainingMsAfterDays = diffMs % (1000 * 60 * 60 * 24); // 计算除去天数后剩余的毫秒数
        let diffHours = Math.floor(remainingMsAfterDays / (1000 * 60 * 60)); // 计算剩余的小时数
        let remainingMsAfterHours = remainingMsAfterDays % (1000 * 60 * 60); // 计算除去小时数后剩余的毫秒数
        let diffMinutes = Math.floor(remainingMsAfterHours / (1000 * 60)); // 计算剩余的分钟数
        let remainingMsAfterMinutes = remainingMsAfterHours % (1000 * 60); // 计算除去分钟数后剩余的毫秒数
        let diffSeconds = Math.floor(remainingMsAfterMinutes / 1000); // 计算剩余的秒数
        if (diffMs <= 0) {
            this.isToTime = true;
            this.toDay = "0天";
        }
        else {
            this.toDay = `${diffDays}天 ${diffHours}小时 ${diffMinutes}分钟 ${diffSeconds}秒`;
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height('100%');
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Start });
            Stack.height(44);
            Stack.width("100%");
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.justifyContent(FlexAlign.Center);
            Row.alignItems(VerticalAlign.Center);
            Row.height(44);
            Row.width("100%");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("备忘录详情");
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("<返回");
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.height(44);
            Text.textAlign(TextAlign.Center);
            Text.alignSelf(ItemAlign.Center);
            Text.margin({ left: 15 });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
            Column.margin({ top: 10, left: 15, right: 15 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("名称：" + this.model.title);
            Text.height(50);
            Text.width("100%");
            Text.borderRadius(4);
            Text.borderWidth(1);
            Text.borderColor("#999999");
            Text.margin({ top: 15 });
            Text.padding({ left: 10, right: 10 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("内容：" + this.model.content);
            Text.height(150);
            Text.width("100%");
            Text.borderRadius(4);
            Text.borderWidth(1);
            Text.borderColor("#999999");
            Text.margin({ top: 15 });
            Text.padding({ left: 10, right: 10 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("到期日期：" + this.model.time);
            Text.height(50);
            Text.width("100%");
            Text.borderRadius(4);
            Text.borderWidth(1);
            Text.borderColor("#999999");
            Text.margin({ top: 15 });
            Text.padding({ left: 10, right: 10 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("距离到期还有：" + this.toDay);
            Text.height(50);
            Text.width("100%");
            Text.borderRadius(4);
            Text.borderWidth(1);
            Text.borderColor("#999999");
            Text.margin({ top: 15 });
            Text.padding({ left: 10, right: 10 });
        }, Text);
        Text.pop();
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "MemorandumDetDetailsPage";
    }
}
registerNamedRoute(() => new MemorandumDetDetailsPage(undefined, {}), "", { bundleName: "com.wmm.myapplication", moduleName: "entry", pagePath: "pages/MemorandumDetDetailsPage", pageFullPath: "entry/src/main/ets/pages/MemorandumDetDetailsPage", integratedHsp: "false", moduleType: "followWithHap" });
