import { defineConfig } from 'umi';
import defaultConfig from "./default";
import routes from "./routes";
import layout from "./layout";
import dva from "./dva";

export default defineConfig({
    ...defaultConfig,
    layout, routes, dva,
    nodeModulesTransform: {
        type: 'none',
    },
    hash: true,
    fastRefresh: {},
    dynamicImport: {
        loading: '@/Loading',
    },
    // metas: [
    //     {
    //         name: 'keywords',
    //         content: 'umi, umijs',
    //     },
    //     {
    //         name: 'description',
    //         content: '🍙 插件化的企业级前端应用框架。',
    //     },
    //     {
    //         bar: 'foo',
    //     },
    // ],

    // mock:false
});
