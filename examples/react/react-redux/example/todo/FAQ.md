---
source: "front-end-web-developer/React/react-redux/example/todo/FAQ.md"
---

### antd修改语言为中文（默认英文）

###### 版本

^4.10.2

###### 国际化配置[#](https://ant-design.gitee.io/components/date-picker-cn/#国际化配置)

默认配置为 en-US，如果你需要设置其他语言，推荐在入口处使用我们提供的国际化组件，详见：[ConfigProvider 国际化](https://ant.design/components/config-provider-cn/)。

如有特殊需求（仅修改单一组件的语言），请使用 locale 参数，参考：[默认配置](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json)。

```jsx
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

<DatePicker locale={locale} />;
```

```jsx
// 默认语言为 en-US，如果你需要设置其他语言，推荐在入口文件全局设置 locale
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';

<ConfigProvider locale={locale}>
  <DatePicker defaultValue={moment('2015-01-01', 'YYYY-MM-DD')} />
</ConfigProvider>;
```

###### 拓展阅读

- antd组件之[ConfigProvider全局化配置](https://ant-design.gitee.io/components/config-provider-cn/)

### 使用AntD提供的全局配置组件实现全局配置

- 语言配置



###### reference

- [ConfigProvider全局化配置](https://ant-design.gitee.io/components/config-provider-cn/)

### React项目使用Sass，配置Sass

使用create-react-app脚手架创建的项目，默认只配置了css和sass配置项，使用的时候只需要添加依赖包即可；

```js
// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

// modules的rules中默认只配置了css和sass
```

###### 安装Sass

```
npm install sass-loader node-sass --save-dev
```

###### 配置Sass

```js
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
```

```js
{
    test: sassRegex,
    exclude: sassModuleRegex,
    use: getStyleLoaders(
        {
            importLoaders: 3,
            sourceMap: isEnvProduction
            ? shouldUseSourceMap
            : isEnvDevelopment,
        },
        'sass-loader'
    ),
    sideEffects: true,
},
{
  test: sassModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 3,
      sourceMap: isEnvProduction
        ? shouldUseSourceMap
        : isEnvDevelopment,
      modules: {
        getLocalIdent: getCSSModuleLocalIdent,
      },
    },
    'sass-loader'
  ),
},
```

###### 注意: node-sass版本不同对node的要求不一样

```
Node 11 -----> node-sass 4.10

Node 10 ----> node-sass 4.9+

Node 8  -----> node-sass 4.5.3+

```

