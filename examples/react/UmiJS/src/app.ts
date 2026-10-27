/**
 * @name 运行时配置
 */
import React from 'react';
import {
    BasicLayoutProps,
    Settings as LayoutSettings,
} from '@ant-design/pro-layout';
// logo
import LOGO from "./assets/icons/logo.svg";
import { RequestConfig } from 'umi';
import { createLogger } from 'redux-logger';
import { message } from 'antd';

/**
 * @name dva 运行时配置
 */
export const dva = {
    config: {
        onAction: createLogger(),
        onError(e: Error) {
            message.error(e.message, 3);
        },
    },
};

// export function modifyClientRenderOpts(memo: any) {
//     console.log(memo);

// }

// 在初始加载和路由切换时做一些事情
export function onRouteChange({ routes, matchedRoutes, location, action }: { routes: any[], matchedRoutes: any[], location: object, action: string }) {
    // console.log(routes);
    // console.log(matchedRoutes);
    // console.log(location);
    // console.log(action);

    // if (matchedRoutes.length) {
    //     document.title = '';
    // }
}

// export function render(oldRender) {
//     fetch('/api/auth').then(auth => {
//         if (auth.isLogin) { oldRender() }
//         else {
//             history.push('/login');
//             oldRender()
//         }
//     });
// }

/**
 * @name @umijs/plugin-initial-state
 * @returns 
 */
export async function getInitialState() {
    let result = null;
    await fetch("/api/user")
        .then(response => {
            return response.json()
        })
        .then(res => {
            const { code, data } = res
            if (code == 200) result = data
        })
    return result
}

/**
 * @name useRequest运行时配置
 */
export const request: RequestConfig = {
    timeout: 1000
};

/**
 * @name layout运行时配置
 * @description 1.为路由添加icon；2.修改页面title；3. 
 * @link https://umijs.org/zh-CN/plugins/plugin-layout
 */
export const layout = (layoutProps: any): BasicLayoutProps => {
    // console.log("layoutProps", layoutProps);
    return {
        // pure: false, ?
        /** @name logo url */
        logo: LOGO,
        // loading: true
        /** @name 水印的相关配置 */
        // waterMarkProps: {
        //     content: "@kangduu"
        // },
        /** @name 菜单项自定义 */
        // menuItemRender: (props) => {
        //     console.log("menuItemRender:", props);
        //     return null
        // },
        /** @name 面包屑 */
        // breadcrumbRender: (routers) => {
        //     // console.log(routers);
        //     return routers
        // },
        /** @name 页脚自定义 */
        // footerRender: (props) => {
        //     console.log('footerRender:', props);
        //     return null
        // },
        /** @name 页面切换的时候触发 */
        // onPageChange: (location) => {
        //     // console.log(location);
        // },
        /** @name 导航栏右侧内容（用户信息）*/
        // rightContentRender: (props) => {
        //     console.log('rightContentRender', props);
        //     return [
        //         '<span></span>',
        //         '<span></span>',
        //         '<span></span>',
        //         '<span></span>',
        //     ]
        // },

        onPageChange: () => {
            // const { currentUser } = initialState;
            // const { location } = history;
            // // 如果没有登录，重定向到 login
            // if (!currentUser && location.pathname !== '/user/login') {
            //     history.push('/user/login');
            // }
        },
    }
}

