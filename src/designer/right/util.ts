import {DatabaseFilled, HighlightFilled, MediumCircleFilled, SkinFilled} from "@ant-design/icons";
import {MenuInfo} from "./MenuType";

export const getDefaultMenuList = (): Array<MenuInfo> => {
    return [
        {
            icon: MediumCircleFilled,
            name: '信息',
            key: 'info',
        },
        {
            icon: HighlightFilled,
            name: '样式',
            key: 'style',
        },
        {
            icon: DatabaseFilled,
            name: '数据',
            key: 'data',
        },
        // {
        //     icon: VideoCameraFilled,
        //     name: '动画',
        //     key: 'animation',
        // },
        {
            icon: SkinFilled,
            name: '主题',
            key: 'theme',
        }
    ];
}