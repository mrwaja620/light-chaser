import html2canvas from "html2canvas";
import {idGenerate} from "./IdGenerate";
import localforage from "localforage";

export class ImgUtil {
    static async htmlToImgWithUrl(dom: HTMLElement, options?: any): Promise<string> {
        try {
            const canvas = await html2canvas(dom, {...options});
            const blob = await new Promise<Blob | null>((resolve) => {
                canvas.toBlob((blob) => {
                    resolve(blob);
                });
            });
            return URL.createObjectURL(blob);
        } catch (error) {
            console.error('生成截图失败', error);
            return '';
        }
    }

    static async htmlToImgWithId(dom: HTMLElement, options?: any): Promise<string> {
        try {
            const canvas = await html2canvas(dom, {...options});
            return await new Promise<string>((resolve) => {
                canvas.toBlob((blob) => {
                    const key = idGenerate.generateId();
                    localforage.setItem(key, blob);
                    resolve(key);
                })
            });
        } catch (error) {
            console.error('保存截图到本地存储异常', error);
            return '';
        }
    }

    static async saveImgToLocal(url: string, key: string): Promise<boolean> {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const blob = await response.blob();
                await localforage.setItem(key, blob);
                return true;
            } else {
                console.error("save bgImg error", response);
                return false;
            }
        } catch (error) {
            console.error("save bgImg error", error);
            return false;
        }
    }

    static delImgFormLocal = (key: string) => {
        localforage.removeItem(key).then(() => {
            console.log("del bgImg success: ", key);
        });
    }

    static async getImageFromLocalWithKey(key: string): Promise<{ [key: string]: string }> {
        try {
            const blob = await localforage.getItem(key);
            if (blob)
                return {[key]: URL.createObjectURL(blob)};
            else
                return {[key]: ""};
        } catch (error) {
            console.log("get bgImg error", error);
            return {[key]: ""};
        }
    }

    static async getImgFromLocal(key: string | any): Promise<string> {
        const imageObj = await ImgUtil.getImageFromLocalWithKey(key)
        return imageObj[key];
    }
}