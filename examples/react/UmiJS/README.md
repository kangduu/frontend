---
source: "front-end-web-developer/React/UmiJS/README.md"
---

### 静态配置

 在 `.umirc.ts` 或 `config/config.ts` 中配置项目和插件，支持` es6 `。 

```ts
export default {
	base:"/",
	hash:true,
	history:{
        type:"hash"
    }
    //...
}
```

什么情况下我们需要使用 `config/config.ts`  ?  可以说一个常规的项目都是需要拆分的，这样有助于后期维护，同时对项目的分成处理更加清晰。

你需要对那些配置进行拆分？

1. `default.ts` 这是一些静态配置，不会更改
2. `routes.ts` 对路由单独维护，可以清晰知道项目的结构
3. ``

注意： `.umirc.ts` 优先级更高。 



### 本地临时配置（开发配置）

> 以 `.local.ts`结尾的配置文件，例如：`.umirc.local.ts`  `config.local.ts`

注意：

- `config/config.ts` 对应的是 `config/config.local.ts`
- `.local.ts` 是本地验证使用的临时配置，请将其添加到 `.gitignore`，**务必不要提交到 git 仓库中**
- `.local.ts` 配置的**<u>优先级最高</u>**，比 `UMI_ENV` 指定的配置更高
- 本地临时配置采用的是 `deep merge` 模式，即会进行深度合并。



### `UMI_ENV` 环境变量 实现多环境多配置

> 以 `.enverment.ts` 结尾的某一个环境配置，例如：`.umirc.cloud.ts` `config.cloud.ts`
>
> 其中的 `enverment` 就表示是具体环境配置的名称

如何启用环境配置？

1. `set UMI_ENV=cloud && umi dev`

注意：`.local.ts` 配置的优先级最高，比 `UMI_ENV` 指定的配置更高



### 运行时配置

 约定 `src/app.tsx` 为运行时配置。 

1.  [modifyClientRenderOpts(fn)](https://umijs.org/zh-CN/docs/runtime-config#modifyclientrenderoptsfn)
2. [patchRoutes({ routes })](https://umijs.org/zh-CN/docs/runtime-config#patchroutes-routes-)
3. [render(oldRender: Function)](https://umijs.org/zh-CN/docs/runtime-config#renderoldrender-function)
4. [onRouteChange({ routes, matchedRoutes, location, action })](https://umijs.org/zh-CN/docs/runtime-config#onroutechange-routes-matchedroutes-location-action-)
5. [rootContainer(LastRootContainer, args)](https://umijs.org/zh-CN/docs/runtime-config#rootcontainerlastrootcontainer-args)

###### 与静态配置的区别？

 运行时配置和配置的区别是他跑在浏览器端，基于此，我们可以在这里写`函数`、`jsx`、`import 浏览器端依赖`等等，**注意不要引入 node 依赖**。 
