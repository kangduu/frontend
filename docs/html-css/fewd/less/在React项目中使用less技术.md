---
source: "front-end-web-developer/HTML-CSS/less/在React项目中使用less技术.md"
---

### React项目使用Less，配置Less

使用create-react-app脚手架创建的项目，默认只配置了css和sass配置项。[参考](https://www.cnblogs.com/shun1015/p/13520577.html)

###### 安装Less

```
npm install less less-loader --save-dev
```

###### 配置Less

在`webpack.config.js`文件中找到css和sass配置项

增加 `// style files regexes`

```js
// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
// +
const lessRegex =/\.less$/;
const lessModuleRegex =/\.module\.less$/;
```

增加`// rules`

```js
{
    test: lessRegex,
    exclude: lessModuleRegex,
    use:getStyleLoaders(
        {    
            importLoaders:2,
            moudles: true,//模块化　　
            sourceMap: isEnvProduction && shouldUseSourceMap,
        },
        'less-loader'
    ),
    sideEffects:true,
},
{
    test: lessModuleRegex,
    use:getStyleLoaders(
        {
            importLoaders:2,
            sourceMap: isEnvProduction && shouldUseSourceMap,
            getLocalIdent:getCSSModuleLocalIdent,
        },
        'less-loader'
    )
}
```

### 