if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface LoginPage_Params {
    account?: string;
    password?: string;
}
import router from "@ohos:router";
import promptAction from "@ohos:promptAction";
import { PreferenceUtil } from "@normalized:N&&&entry/src/main/ets/model/PreferenceUtil&";
import type { UserModel } from '../model/MemoItem';
class LoginPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__account = new ObservedPropertySimplePU('', this, "account");
        this.__password = new ObservedPropertySimplePU('', this, "password");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: LoginPage_Params) {
        if (params.account !== undefined) {
            this.account = params.account;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
    }
    updateStateVars(params: LoginPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__account.purgeDependencyOnElmtId(rmElmtId);
        this.__password.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__account.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __account: ObservedPropertySimplePU<string>;
    get account() {
        return this.__account.get();
    }
    set account(newValue: string) {
        this.__account.set(newValue);
    }
    private __password: ObservedPropertySimplePU<string>;
    get password() {
        return this.__password.get();
    }
    set password(newValue: string) {
        this.__password.set(newValue);
    }
    aboutToAppear() {
    }
    async login() {
        if (!this.account || !this.password) {
            promptAction.showToast({ message: '请输入账号和密码' });
            return;
        }
        let ararys = await PreferenceUtil.readModel<UserModel[]>("UserModel") ?? [];
        for (let index = 0; index < ararys.length; index++) {
            if (ararys[index].name == this.account && ararys[index].password == this.password) {
                PreferenceUtil.writeModel<UserModel>("login", ararys[index]);
                router.replaceUrl({ url: 'pages/Index' });
                return;
            }
        }
        promptAction.showToast({ message: '账号或密码错误' });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#FFFFFF');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('欢迎使用');
            Text.fontSize(28);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ top: 100, bottom: 80 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '请输入账号' });
            TextInput.width('80%');
            TextInput.height(50);
            TextInput.margin({ bottom: 20 });
            TextInput.onChange((value: string) => {
                this.account = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '请输入密码' });
            TextInput.width('80%');
            TextInput.height(50);
            TextInput.type(InputType.Password);
            TextInput.margin({ bottom: 40 });
            TextInput.onChange((value: string) => {
                this.password = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('登录');
            Button.width('80%');
            Button.height(50);
            Button.backgroundColor('#1296db');
            Button.onClick(() => {
                this.login();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('还没有账号？立即注册');
            Text.fontColor('#1296db');
            Text.margin({ top: 20 });
            Text.onClick(() => {
                router.pushUrl({ url: "pages/RegisterPage" });
            });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "LoginPage";
    }
}
registerNamedRoute(() => new LoginPage(undefined, {}), "", { bundleName: "com.wmm.myapplication", moduleName: "entry", pagePath: "pages/LoginPage", pageFullPath: "entry/src/main/ets/pages/LoginPage", integratedHsp: "false", moduleType: "followWithHap" });
