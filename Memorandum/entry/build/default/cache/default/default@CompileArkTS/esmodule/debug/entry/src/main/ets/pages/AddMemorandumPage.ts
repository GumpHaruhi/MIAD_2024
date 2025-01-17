if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AddMemorandumPage_Params {
    titleName?: string;
    content?: string;
    time?: string;
    currentDate?: string;
}
import { MemoItem } from "@normalized:N&&&entry/src/main/ets/model/MemoItem&";
import type { UserModel } from "@normalized:N&&&entry/src/main/ets/model/MemoItem&";
import promptAction from "@ohos:promptAction";
import router from "@ohos:router";
import { PreferenceUtil } from "@normalized:N&&&entry/src/main/ets/model/PreferenceUtil&";
class AddMemorandumPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__titleName = new ObservedPropertySimplePU("", this, "titleName");
        this.__content = new ObservedPropertySimplePU("", this, "content");
        this.__time = new ObservedPropertySimplePU("", this, "time");
        this.__currentDate = new ObservedPropertySimplePU("", this, "currentDate");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AddMemorandumPage_Params) {
        if (params.titleName !== undefined) {
            this.titleName = params.titleName;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.time !== undefined) {
            this.time = params.time;
        }
        if (params.currentDate !== undefined) {
            this.currentDate = params.currentDate;
        }
    }
    updateStateVars(params: AddMemorandumPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__titleName.purgeDependencyOnElmtId(rmElmtId);
        this.__content.purgeDependencyOnElmtId(rmElmtId);
        this.__time.purgeDependencyOnElmtId(rmElmtId);
        this.__currentDate.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__titleName.aboutToBeDeleted();
        this.__content.aboutToBeDeleted();
        this.__time.aboutToBeDeleted();
        this.__currentDate.aboutToBeDeleted();
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
    private __currentDate: ObservedPropertySimplePU<string>;
    get currentDate() {
        return this.__currentDate.get();
    }
    set currentDate(newValue: string) {
        this.__currentDate.set(newValue);
    }
    aboutToAppear(): void {
        const now = new Date();
        const year = now.getFullYear(); // 获取年份
        const month = now.getMonth() + 1; // 获取月份，注意月份是从0开始的
        const day = now.getDate(); // 获取日期
        let hours = now.getHours();
        let minutes = now.getMinutes();
        this.time = year + "年" + month + "月" + day + "日" + hours + "时" + minutes + "分";
    }
    /// 添加数据
    async addData() {
        if (this.titleName.trim().length == 0) {
            promptAction.showToast({
                message: '名称不能为空',
            });
            return;
        }
        if (this.content.trim().length == 0) {
            promptAction.showToast({
                message: '内容不能为空',
            });
            return;
        }
        if (this.time.trim().length == 0) {
            promptAction.showToast({
                message: '时间不能为空',
            });
            return;
        }
        let timeStr = this.time;
        timeStr = timeStr.replace(/年/g, "-");
        timeStr = timeStr.replace(/月/g, "-");
        timeStr = timeStr.replace(/日/g, "T");
        timeStr = timeStr.replace(/时/g, ":");
        timeStr = timeStr.replace(/分/g, ":");
        timeStr = timeStr + "00";
        timeStr = this.formatDate(timeStr);
        let date1 = new Date(timeStr.trim());
        let year = date1.getFullYear();
        let month = date1.getMonth();
        let day = date1.getDay();
        let hours = date1.getHours();
        let minutes = date1.getMinutes();
        if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day) || Number.isNaN(hours) ||
            Number.isNaN(minutes)) {
            promptAction.showToast({
                message: '日期格式错误，请按照规定格式输入',
            });
            return;
        }
        month = month + 1;
        let model = new MemoItem();
        model.title = this.titleName;
        model.content = this.content;
        model.time = this.time;
        model.comparativeTime = timeStr.trim();
        let userModel = await PreferenceUtil.readModel<UserModel>("login");
        if (userModel == null) {
            return;
        }
        let ararys = await PreferenceUtil.readModel<MemoItem[]>(userModel.id) ?? [];
        ararys.push(model);
        PreferenceUtil.writeModel<MemoItem[]>(userModel.id, ararys)
            .then(() => {
            promptAction.showToast({
                message: '添加成功',
            });
            router.back();
        })
            .catch(() => {
            promptAction.showToast({
                message: '添加失败，请重试',
            });
        });
    }
    padZero(value: number): string {
        return value < 10 ? '0' + value : value.toString();
    }
    formatDate(dateString: string): string {
        let datePart: string = "";
        let timePart: string = "";
        let arrays = dateString.split('T');
        if (arrays.length == 2) {
            datePart = arrays[0];
            timePart = arrays[1];
        }
        let year: number = 0;
        let month: number = 0;
        let day: number = 0;
        let temps = datePart.split('-').map(Number);
        if (temps.length == 3) {
            year = temps[0];
            month = temps[1];
            day = temps[2];
        }
        let hour: number = 0;
        let minutes: number = 0;
        let ssss: number = 0;
        let temps1 = timePart.split(':').map(Number);
        if (temps.length == 3) {
            hour = temps1[0];
            minutes = temps1[1];
            ssss = temps1[2];
        }
        // 补零操作
        let paddedMonth = this.padZero(month);
        let paddedDay = this.padZero(day);
        let paddedhour = this.padZero(hour);
        let paddedminutes = this.padZero(minutes);
        let paddedssss = this.padZero(ssss);
        // 重新拼接日期时间字符串
        let formattedDate = `${year}-${paddedMonth}-${paddedDay}T${paddedhour}:${paddedminutes}:${paddedssss}`;
        return formattedDate;
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
            Text.create("添加备忘录");
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
            TextInput.create({ text: { value: this.titleName, changeEvent: newValue => { this.titleName = newValue; } }, placeholder: "请输入名称" });
            TextInput.height(50);
            TextInput.width("100%");
            TextInput.borderRadius(4);
            TextInput.borderWidth(1);
            TextInput.borderColor("#999999");
            TextInput.margin({ top: 15 });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: { value: this.content, changeEvent: newValue => { this.content = newValue; } }, placeholder: "请输入内容" });
            TextInput.height(50);
            TextInput.width("100%");
            TextInput.borderRadius(4);
            TextInput.borderWidth(1);
            TextInput.borderColor("#999999");
            TextInput.margin({ top: 15 });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: { value: this.time, changeEvent: newValue => { this.time = newValue; } }, placeholder: "请输入结束日期" });
            TextInput.height(50);
            TextInput.width("100%");
            TextInput.borderRadius(4);
            TextInput.borderWidth(1);
            TextInput.borderColor("#999999");
            TextInput.margin({ top: 15 });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("保存");
            Text.height(50);
            Text.width("100%");
            Text.borderRadius(4);
            Text.borderWidth(1);
            Text.borderColor("#999999");
            Text.margin({ top: 35 });
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.textAlign(TextAlign.Center);
            Text.alignSelf(ItemAlign.Center);
            Text.onClick(() => {
                this.addData();
            });
        }, Text);
        Text.pop();
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "AddMemorandumPage";
    }
}
registerNamedRoute(() => new AddMemorandumPage(undefined, {}), "", { bundleName: "com.wmm.myapplication", moduleName: "entry", pagePath: "pages/AddMemorandumPage", pageFullPath: "entry/src/main/ets/pages/AddMemorandumPage", integratedHsp: "false", moduleType: "followWithHap" });
