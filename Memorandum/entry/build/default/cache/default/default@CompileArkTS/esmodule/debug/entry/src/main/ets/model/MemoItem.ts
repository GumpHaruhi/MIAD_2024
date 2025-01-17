export class MemoItem {
    id: string = "";
    title: string = "";
    content: string = "";
    time: string = "";
    comparativeTime: string = "";
    /// 加载数据
    static loadData() {
        let arrays: MemoItem[] = [];
        for (let index = 0; index < 20; index++) {
            const element = new MemoItem();
            element.title = `第` + index + "个";
            arrays.push(element);
        }
        return arrays;
    }
}
export class UserModel {
    name: string = "";
    id: string = "";
    password: string = "";
}
