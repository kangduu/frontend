---
source: "front-end-web-developer/http/AJAX/README.md"
---

[AJAX](https://developer.mozilla.org/zh-CN/docs/Glossary/AJAX)（Asynchronous JavaScript And XML ）是一种使用 XMLHttpRequest 技术构建更复杂，动态的网页的编程实践。

AJAX 允许<u>只更新一个 HTML 页面的部分 DOM，而无须重新加载整个页面</u> [0]。AJAX 还允许<u>异步工作</u>，这意味着当网页的一部分正试图重新加载时，您的代码可以继续运行（相比之下，同步会阻止代码继续运行，直到这部分的网页完成重新加载）。

通过交互式网站和现代 Web 标准，AJAX 正在逐渐被 JavaScript 框架中的函数和官方的 Fetch API 标准取代。

对程序员而言，开发 Ajax 应用最头痛的问题莫过于以下几点：

- Ajax 在本质上是一个浏览器端的技术，首先面临无可避免的<u>第一个问题即是浏览器的兼容性问题</u> [1]。各家浏览器对于 JavaScript／DOM／CSS 的支持总有部分不太相同或是有 Bug，甚至同一浏览器的各个版本间对于 JavaScript／DOM／CSS 的支持也有可能部分不一样。这导致程序员在写 Ajax 应用时花大部分的时间在调试浏览器的兼容性而非在应用程序本身。因此，目前大部分的 Ajax 链接库或开发框架大多以 js 链接库的形式存在，以定义更高阶的 JavaScript API、JavaScript 对象（模板）、或者 JavaScript Widgets 来解决此问题。如 prototype.js。
- Ajax 技术之<u>主要目的在于局部交换客户端及服务器之间的数据</u> [2]。如同传统之主从架构，无可避免的会有部分的业务逻辑会实现在客户端，或部分在客户端部分在服务器。由于业务逻辑可能分散在客户端及服务器，且以不同之程序语言实现，这导致 Ajax 应用程序极难维护。如有用户接口或业务逻辑之更动需求，再加上前一个 JavaScript/DOM/CSS 之兼容性问题，Ajax 应用往往变成程序员的梦魇。针对业务逻辑分散的问题，Ajax 开发框架大致可分为两类：
  - 将业务逻辑及表现层放在浏览器，数据层放在服务器：因为所有的程序以 JavaScript 执行在客户端，只有需要数据时才向服务器要求服务，此法又称为*胖客户端（fat client）架构*。服务器在此架构下通常仅用于提供及储存数据。此法的好处在于程序员可以充分利用 JavaScript 搭配业务逻辑来做出特殊的用户接口，以符合终端用户的要求。但是问题也不少，主因在第一，JavaScript 语言本身之能力可能不足以处理复杂的业务逻辑。第二，JavaScript 的执行性能一向不好。第三，JavaScript 访问服务器数据，仍需适当的服务器端程序之配合。第四，浏览器兼容性的问题又出现。有些 Ajax 开发框架如 DWR 企图以自动生成 JavaScript 之方式来避免兼容的问题，并开立通道使得 JavaScript 可以直接调用服务器端的 Java 程序来简化数据的访问。但是前述第一及第二两个问题仍然存在，程序员必须费相当的力气才能达到应用程序之规格要求，或可能根本无法达到要求。
  - 将表现层、业务逻辑、及数据层放在服务器，浏览器仅有用户接口引擎（User Interface engine）；此法又称为*瘦客户端（thin client）架构*，或*中心服务器（server-centric）架构*。浏览器的用户接口引擎仅用于反映服务器的表现层以及传达用户的输入回到服务器的表现层。由浏览器所触发之事件亦送回服务器处理，根据业务逻辑来更新表现层，然后反映回浏览器。因为所有应用程序完全在服务器执行，数据及表现层皆可直接访问，程序员只需使用服务器端相对较成熟之程序语言（如 Java 语言）即可，不需再学习 JavaScript/DOM/CSS，在开发应用程序时相对容易。缺点在于用户接口引擎以及表现层通常以标准组件的形式存在，如需要特殊组件（用户接口）时，往往须待原框架之开发者提供，缓不济急。如开源码 Ajax 开发框架 ZK 目前支持 XUL 及 XHTML 组件，尚无 XAML 之支持。

<u>Ajax 是以异步的方式向服务器提交需求</u> [3]。对服务器而言，其与传统的提交窗体需求并无不同，而且由于是以异步之方式提交，如果同时有多个 Ajax 需求及窗体提交需求，将无法保证哪一个需求先获得服务器的响应。这会造成应用程序典型的多进程（process）或多线程（thread）的竞争（racing）问题。程序员因此必须自行处理或在 JavaScript 里面动手脚以避免这类竞争问题的发生（如 Ajax 需求未响应之前，先 disable 提交按钮），这又不必要的增加了程序员的负担。目前已知有自动处理此问题之开发框架似乎只有 ZK。

### AJAX 的应用

- 运用 `XHTML + CSS` 来表达信息；
- 运用 `JavaScript` 操作 `DOM（Document Object Model）` 来执行动态效果；
- 运用 `XML` 和 `XSLT` 操作资料；
- 运用 `XMLHttpRequest` 或新的 `Fetch API` 与网页服务器进行异步资料交换。

🌡**注意：** `AJAX` 与 `Flash`、`Silverlight` 和 `Java Applet` 等 RIA 技术是有区分的。

### AJAX 优缺点

使用 Ajax 的最大优点，就是<u>能在不更新整个页面的前提下维护数据</u>。这使得 Web 应用程序更为迅捷地回应用户动作，并避免了在网络上发送那些没有改变的信息。

Ajax 不需要任何浏览器插件，但需要用户允许 JavaScript 在浏览器上执行。就像 DHTML 应用程序那样，Ajax 应用程序必须在众多不同的浏览器和平台上经过严格的测试。随着 Ajax 的成熟，一些简化 Ajax 使用方法的程序库也相继问世。同样，也出现了另一种辅助程序设计的技术，为那些不支持 JavaScript 的用户提供替代功能。

对应用 Ajax 最主要的批评就是，它可能破坏浏览器的后退与加入收藏书签功能。在动态更新页面的情况下，用户无法回到前一个页面状态，这是因为浏览器仅能记下历史记录中的静态页面。一个被完整读入的页面与一个已经被动态修改过的页面之间的可能差别非常微妙；用户通常都希望单击后退按钮，就能够取消他们的前一次操作，但是在 Ajax 应用程序中，却无法这样做。不过开发者已想出了种种办法来解决这个问题，HTML5 之前的方法大多是在用户单击后退按钮访问历史记录时，通过创建或使用一个隐藏的 IFRAME 来重现页面上的变更。（例如，当用户在 Google Maps 中单击后退时，它在一个隐藏的 IFRAME 中进行搜索，然后将搜索结果反映到 Ajax 元素上，以便将应用程序状态恢复到当时的状态）。

关于无法将状态加入收藏或书签的问题，HTML5 之前的一种方式是使用 URL 片断标识符（通常被称为锚点，即 URL 中#后面的部分）来保持追踪，允许用户回到指定的某个应用程序状态。（许多浏览器允许 JavaScript 动态更新锚点，这使得 Ajax 应用程序能够在更新显示内容的同时更新锚点。）HTML5 以后可以直接操作浏览历史，并以字符串形式存储网页状态，将网页加入网页收藏夹或书签时状态会被隐形地保留。上述两个方法也可以同时解决无法后退的问题。

进行 Ajax 开发时，网络延迟——即用户发出请求到服务器发出响应之间的间隔——需要慎重考虑。如果不给予用户明确的回应，没有恰当的预读数据，或者对 XMLHttpRequest 的不恰当处理，都会使用户感到厌烦。通常的解决方案是，使用一个可视化的组件来告诉用户系统正在进行后台操作并且正在读取数据和内容。

### XMLHttpRequest 的兼容性写法

```js
/**
 * 创建一个XMLHttpRequest实例，兼容性写法。
 * @returns xhr XMLHttpRequest实例
 */
function createXHR() {
  var xhr;

  if (typeof XMLHttpRequest != "undefined") {
    xhr = new XMLHttpRequest();
  } else {
    var aVersions = [
      "Msxml2.XMLHttp.5.0",
      "Msxml2.XMLHttp.4.0",
      "Msxml2.XMLHttp.3.0",
      "Msxml2.XMLHttp",
      "Microsoft.XMLHttp",
    ];
    for (var i = 0; i < aVersions.length; i++) {
      try {
        xmlHttp = new ActiveXObject(aVersions[i]);
        break;
      } catch (e) {}
    }
  }

  return xhr;
}

export default createXHR;
```

🔗 维基百科上的 [AJAX](https://zh.wikipedia.org/wiki/AJAX)
