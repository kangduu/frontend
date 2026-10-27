import React from "react";
import AuthorityController from "./AuthorityController";
import ExtractStateHOC from "./extractState";
import ViewValue from "./extractState/ViewValue";
import MixinPropsHOC from "./mixinProps";
import "./index.less";
import AcquireRef from "./refs";

export default function HOC() {
  return (
    <div className="hoc-wrapper">
      <h3>高阶组件</h3>

      <section className="property-proxy">
        <h4>属性代理</h4>
        <ul>
          <li>
            属性代理是最常见的实现方式，
            <u>
              它本质上是使用组合的方式，通过将组件包装在容器组件中实现功能。
            </u>
          </li>
          <li>
            属性代理方式实现的 <b>高阶组件和原组件的生命周期关系</b>
            完全是React父子组件的生命周期关系，所以该方式实现的高阶组件会影响原组件某些生命周期等方法。
          </li>
        </ul>

        <h5>1. 混入props模式：</h5>
        <MixinPropsHOC id="999" />

        <h5>2. 抽离state控制渲染：</h5>
        <ul>
          <li>
            需要注意 ⚠️的是，通过属性代理方式实现的高阶组件无法直接操作原组件的
            state，但是可以通过 props 和回调函数对 state 进行抽象。️
          </li>
          <li>常见的例子是实现非受控组件到受控组件的转变：</li>
        </ul>
        <ExtractStateHOC />
        <ViewValue />

        <h5>3.获取refs引用</h5>
        <ul>
          <li>
            为了访问 DOM element （focus事件、动画、使用第三方 DOM
            操作库），有时我们会用到组件的 ref 属性，关于refs
            的介绍详见官方文档。
          </li>
          <li>
            ref 属性只能声明在 class
            类型的组件上，而无法声明在函数类型的组件上（因为无状态组件没有实例）。
          </li>
          <li>
            通过属性代理方式实现的高阶组件无法直接获取原组件的 refs
            引用，但是可以通过在原组件的ref回调函数中调用父组件传入的 ref
            回调函数来获取原组件的refs 引用。
          </li>
          <li> 假设有一个 User 组件（原组件），它的代码如下：</li>
        </ul>
        <AcquireRef />
      </section>

      <section className="extend-reverse">
        <h4>反向继承</h4>
      </section>

      <section>
        <h4>经典应用</h4>

        <li>
          权限控制:
          <AuthorityController />
        </li>
      </section>
    </div>
  );
}
