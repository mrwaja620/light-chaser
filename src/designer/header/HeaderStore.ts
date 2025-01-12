import {action, makeObservable, observable} from "mobx";

/**
 * 头部状态管理类
 */
class HeaderStore {
    constructor() {
        makeObservable(this, {
            canvasVisible: observable,
            projectVisible: observable,
            themeVisible: observable,
            setCanvasVisible: action,
            setProjectVisible: action,
            setThemeVisible: action,
        })
    }

    /**
     * 画布设置是否可见
     */
    canvasVisible: boolean = false;
    /**
     * 项目设置是否可见
     */
    projectVisible: boolean = false;
    /**
     * 主题设置是否可见
     */
    themeVisible: boolean = false;

    setCanvasVisible = (visible: boolean) => this.canvasVisible = visible;

    setProjectVisible = (visible: boolean) => this.projectVisible = visible;

    setThemeVisible = (visible: boolean) => this.themeVisible = visible;

}

const headerStore = new HeaderStore();
export default headerStore;
