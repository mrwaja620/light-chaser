import {AbstractCustomComponentDefinition} from "../framework/core/AbstractCustomComponentDefinition";
import {AbstractHeaderItem, HeaderItemProps} from "./header/HeaderTypes";

/**
 * 设计器启动器，通过该启动器自动化扫描加载组件
 */
class DesignerStarter {
    //自定义组件信息映射
    customComponentInfoMap: { [key: string]: Object } = {};
    //头部操作菜单实例
    headerItemInstances: HeaderItemProps[] = [];
    //自定义组件主题刷新器
    themeRefresher: { [key: string]: Function } = {};


    //todo 扫描组件，要优化为异步扫描
    doScan = () => {
        this.scannerHeader();
        this.scannerCustomComponents();
    }

    //扫描头部组件
    scannerHeader = () => {
        const headerCtx = require.context('./header/items', true, /\.(tsx|ts)$/);
        let tempHeaderItemInstances: HeaderItemProps[] = [];
        headerCtx.keys().forEach(key => {
            const HeaderClazz = headerCtx(key).default;
            if (HeaderClazz && AbstractHeaderItem.isPrototypeOf(HeaderClazz)) {
                let headerItemIns = new HeaderClazz();
                tempHeaderItemInstances.push(headerItemIns.getHeaderItemInfo());
            }
        });
        this.headerItemInstances = tempHeaderItemInstances.sort((a, b) => {
            const aOrder = a.order || 0, bOrder = b.order || 0;
            return aOrder - bOrder
        });
    }

    //扫描自定义组件
    scannerCustomComponents = () => {
        const compCtx = require.context('../comps', true, /\.(ts)$/);
        compCtx.keys().forEach(key => {
            const Clazz = compCtx(key).default;
            if (Clazz && AbstractCustomComponentDefinition.isPrototypeOf(Clazz)) {
                let customComponentInfo = new Clazz();
                let compKey = customComponentInfo.getBaseInfo().key;
                if (compKey) {
                    this.customComponentInfoMap[compKey] = customComponentInfo;
                    this.themeRefresher[compKey] = customComponentInfo.updateTheme;
                }
            }
        });
    }
}

const designerStarter = new DesignerStarter();
export default designerStarter;
