if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface RegisterPage_Params {
    account?: string;
    password?: string;
    confirmPassword?: string;
}
import router from "@ohos:router";
import promptAction from "@ohos:promptAction";
import { PreferenceUtil } from "@normalized:N&&&entry/src/main/ets/model/PreferenceUtil&";
import { UserModel } from "@normalized:N&&&entry/src/main/ets/model/MemoItem&";
class RegisterPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__account = new ObservedPropertySimplePU('', this, "account");
        this.__password = new ObservedPropertySimplePU('', this, "password");
        this.__confirmPassword = new ObservedPropertySimplePU('', this, "confirmPassword");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: RegisterPage_Params) {
        if (params.account !== undefined) {
            this.account = params.account;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        if (params.confirmPassword !== undefined) {
            this.confirmPassword = params.confirmPassword;
        }
    }
    updateStateVars(params: RegisterPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__account.purgeDependencyOnElmtId(rmElmtId);
        this.__password.purgeDependencyOnElmtId(rmElmtId);
        this.__confirmPassword.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__account.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__confirmPassword.aboutToBeDeleted();
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
    private __confirmPassword: ObservedPropertySimplePU<string>;
    get confirmPassword() {
        return this.__confirmPassword.get();
    }
    set confirmPassword(newValue: string) {
        this.__confirmPassword.set(newValue);
    }
    async register() {
        if (!this.account || !this.password || !this.confirmPassword) {
            promptAction.showToast({ message: '请填写完整信息' });
            return;
        }
        if (this.password !== this.confirmPassword) {
            promptAction.showToast({ message: '两次输入的密码不一致' });
            return;
        }
        let ararys = await PreferenceUtil.readModel<UserModel[]>("UserModel") ?? [];
        for (let index = 0; index < ararys.length; index++) {
            if (ararys[index].name == this.account) {
                promptAction.showToast({ message: '该账户已经注册' });
                return;
            }
        }
        let model = new UserModel();
        model.name = this.account;
        model.password = this.password;
        let tempDate = new Date();
        model.id = Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
        ararys.push(model);
        PreferenceUtil.writeModel<UserModel[]>("UserModel", ararys)
            .then(() => {
            promptAction.showToast({
                message: '注册成功',
            });
            router.back();
        })
            .catch(() => {
            promptAction.showToast({
                message: '注册失败，请重试',
            });
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#FFFFFF');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('注册账号');
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
            TextInput.margin({ bottom: 20 });
            TextInput.onChange((value: string) => {
                this.password = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '请确认密码' });
            TextInput.width('80%');
            TextInput.height(50);
            TextInput.type(InputType.Password);
            TextInput.margin({ bottom: 40 });
            TextInput.onChange((value: string) => {
                this.confirmPassword = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('注册');
            Button.width('80%');
            Button.height(50);
            Button.backgroundColor('#1296db');
            Button.onClick(() => {
                this.register();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('返回登录');
            Text.fontColor('#1296db');
            Text.margin({ top: 20 });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "RegisterPage";
    }
}
registerNamedRoute(() => new RegisterPage(undefined, {}), "", { bundleName: "com.wmm.myapplication", moduleName: "entry", pagePath: "pages/RegisterPage", pageFullPath: "entry/src/main/ets/pages/RegisterPage", integratedHsp: "false", moduleType: "followWithHap" });
