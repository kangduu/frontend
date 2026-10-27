---
source: "front-end-web-developer/project/blog/Typescript项目别名配置..md"
---

## [Typescript项目别名配置](https://zhuanlan.zhihu.com/p/298189197)

```js
alias: {
    // Support React Native Web
    // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
    'react-native': 'react-native-web',
        // Allows for better profiling with ReactDevTools
        ...(isEnvProductionProfile && {
        'react-dom$': 'react-dom/profiling',
        'scheduler/tracing': 'scheduler/tracing-profiling',
    }),
    ...(modules.webpackAliases || {}),
},
```

`create-react-app`默认配置alias中，已经添加了`...(modules.webpackAliases || {})`别名系统；这里主要是查看`config/modules.js`文件里的配置。

```

```

我们在项目中使用的是tsx组件，那么就需要配置tsx组件中引入别名；配置成功后直接使用`src`指向项目目录下src文件。（我们之前一直使用的是`@`,这里改为了`src`）

**<u>注意：必须在`tsconfig.json`文件里添加如下配置，否则无法使用</u>**。

```json
{
  "compilerOptions": {
    "baseUrl": "./",   //必须的
	...
  },
}
```

