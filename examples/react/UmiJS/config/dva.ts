/**
 * @umijs/plugin-dva
 */
export default {
    // 是否启用 immer 以方便修改 reducer
    immer: true,
    // 是否启用 dva model 的热更新
    hmr: true,
    // 懒加载 dva models，如果项目里 models 依赖了 import from umi 导出模块，建议开启，避免循环依赖导致模块 undefined 问题
    lazyLoad: true,
    // 禁用 dva models 类型导出，默认会将 model 导出的类型挂载到 umi 上
    disableModelsReExport: false,
    // 是否跳过 model 验证
    skipModelValidate: false,
    // 配置额外到 dva model
    // extraModels: [],
}