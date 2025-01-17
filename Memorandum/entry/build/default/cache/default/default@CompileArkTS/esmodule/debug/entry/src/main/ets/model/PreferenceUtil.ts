import preferences from "@ohos:data.preferences";
let liuPreferences: preferences.Preferences | null = null;
export class PreferenceUtil {
    static async init(context: Context) {
        liuPreferences = await preferences.getPreferences(context, "Memorandum");
    }
    static async writeString(key: string, value?: string) {
        if (liuPreferences == null) {
            console.error("init preferences first");
            return;
        }
        try {
            await liuPreferences.put(key, value);
        }
        catch (e) {
            console.error('Failed to write value, cause:' + e);
        }
        await liuPreferences.flush();
    }
    static async readString(key: string, defaultValue?: string) {
        if (liuPreferences == null) {
            console.error("init preferences first");
            return null;
        }
        let value: string | null = null;
        try {
            value = await liuPreferences.get(key, defaultValue).then();
        }
        catch (e) {
            console.error('Failed to read value, cause:' + e);
        }
        return value;
    }
    static async writeArrayString(key: string, value?: Array<string>) {
        if (liuPreferences == null) {
            console.error("init preferences first");
            return;
        }
        try {
            await liuPreferences.put(key, value);
        }
        catch (e) {
            console.error('Failed to write value, cause:' + e);
        }
        await liuPreferences.flush();
    }
    static async readArrayString(key: string, defaultValue?: Array<string>) {
        if (liuPreferences == null) {
            console.error("init preferences first");
            return null;
        }
        let value: Array<string> | null = null;
        try {
            value = await liuPreferences.get(key, defaultValue).then();
        }
        catch (e) {
            console.error('Failed to read value, cause:' + e);
        }
        return value;
    }
    static async writeNumber(key: string, value?: number) {
        if (liuPreferences == null) {
            console.error("init preferences first");
            return;
        }
        try {
            await liuPreferences.put(key, value);
        }
        catch (e) {
            console.error('Failed to write value, cause:' + e);
        }
        await liuPreferences.flush();
    }
    static async readNumber(key: string, defaultValue?: number) {
        if (liuPreferences == null) {
            console.error("init preferences first");
            return null;
        }
        let value: number | null = null;
        try {
            value = await liuPreferences.get(key, defaultValue).then();
        }
        catch (e) {
            console.error('Failed to read value, cause:' + e);
        }
        return value;
    }
    static async writeArrayNumber(key: string, value?: Array<number>) {
        if (liuPreferences == null) {
            console.error("init preferences first");
            return;
        }
        try {
            await liuPreferences.put(key, value);
        }
        catch (e) {
            console.error('Failed to write value, cause:' + e);
        }
        await liuPreferences.flush();
    }
    static async readArrayNumber(key: string, defaultValue?: Array<number>) {
        if (liuPreferences == null) {
            console.error("init preferences first");
            return null;
        }
        let value: Array<number> | null = null;
        try {
            value = await liuPreferences.get(key, defaultValue).then();
        }
        catch (e) {
            console.error('Failed to read value, cause:' + e);
        }
        return value;
    }
    static async writeBoolean(key: string, value?: boolean) {
        if (liuPreferences == null) {
            console.error("init preferences first");
            return;
        }
        try {
            await liuPreferences.put(key, value);
        }
        catch (e) {
            console.error('Failed to write value, cause:' + e);
        }
        await liuPreferences.flush();
    }
    static async readBoolean(key: string, defaultValue?: boolean) {
        if (liuPreferences == null) {
            console.error("init preferences first");
            return null;
        }
        let value: boolean | null = null;
        try {
            value = await liuPreferences.get(key, defaultValue).then();
        }
        catch (e) {
            console.error('Failed to read value, cause:' + e);
        }
        return value;
    }
    static async writeArrayBoolean(key: string, value?: Array<boolean>) {
        if (liuPreferences == null) {
            console.error("init preferences first");
            return;
        }
        try {
            await liuPreferences.put(key, value);
        }
        catch (e) {
            console.error('Failed to write value, cause:' + e);
        }
        await liuPreferences.flush();
    }
    static async readArrayBoolean(key: string, defaultValue?: Array<boolean>) {
        if (liuPreferences == null) {
            console.error("init preferences first");
            return null;
        }
        let value: Array<boolean> | null = null;
        try {
            value = await liuPreferences.get(key, defaultValue).then();
        }
        catch (e) {
            console.error('Failed to read value, cause:' + e);
        }
        return value;
    }
    static async writeModel<T>(key: string, value?: T) {
        if (liuPreferences == null) {
            console.error("init preferences first");
            return;
        }
        try {
            await liuPreferences.put(key, JSON.stringify(value));
        }
        catch (e) {
            console.error('Failed to write value, cause:' + e);
        }
        await liuPreferences.flush();
    }
    static async readModel<T>(key: string) {
        if (liuPreferences == null) {
            console.error("init preferences first");
            return null;
        }
        let value: string | null = null;
        try {
            value = await liuPreferences.get(key, '').then();
        }
        catch (e) {
            console.error('Failed to read value, cause:' + e);
        }
        if (null === value || undefined === value || value.length === 0) {
            return null;
        }
        else {
            return JSON.parse(value) as T;
        }
    }
    static async delete(key: string) {
        if (liuPreferences == null) {
            console.error("init preferences first");
            return;
        }
        try {
            await liuPreferences.delete(key).then();
        }
        catch (e) {
            console.error('Failed to delete, cause:' + e);
        }
        await liuPreferences.flush();
    }
    static async clear() {
        if (liuPreferences == null) {
            console.error("init preferences first");
            return;
        }
        try {
            await liuPreferences.clear().then();
        }
        catch (e) {
            console.error('Failed to clear, cause:' + e);
        }
        await liuPreferences.flush();
    }
    static async flush() {
        if (liuPreferences == null) {
            console.error("init preferences first");
            return;
        }
        try {
            await liuPreferences.flush().then();
        }
        catch (e) {
            console.error('Failed to flush, cause:' + e);
        }
    }
    private static async deletePreferences(context: Context) {
        try {
            await preferences.deletePreferences(context, "Memorandum");
        }
        catch (e) {
            console.error('Failed to delete preferences, cause:' + e);
        }
        liuPreferences = null;
    }
}
