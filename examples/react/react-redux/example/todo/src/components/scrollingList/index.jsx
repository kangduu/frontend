import React, { Component } from 'react';
import "./index.less";

const LineHeight = 40;

export default class index extends Component {
    timer = null;
    ulRef = React.createRef();
    step = 0; // 向上移动步数
    page = 0; // 支持分页数据
    pageSize = 20; // 分页大小
    size = 3; // 显示框总共可显示数量

    state = {
        data: []
    }

    removeTimer = () => {
        if (this.timer) {
            clearTimeout(this.timer)
            this.timer = null
        }
    }
    move = () => {
        const { data } = this.state;
        const dom = this.ulRef.current;
        if (!dom || !Array.isArray(data)) return;

        const LEN = data.length;

        this.removeTimer();

        this.timer = setTimeout(() => {
            if (LEN - this.step <= this.size) {
                this.page++;
                dom.style.transition = 'initial';
                this.updateData();
            } else {
                this.step++;
                dom.style.transform = `translate3d(0,-${(this.step * LineHeight)}px,0)`;
                this.move()
            }
        }, 2000)
    }

    restartMove() {
        const dom = this.ulRef.current;
        if (dom) {
            this.step = 0;
            dom.style.transform = `translate3d(0,0,0)`;
            let timer = setTimeout(() => {
                this.step++;
                dom.style.transition = 'transform 0.3s';
                dom.style.transform = `translate3d(0,-${(this.step * LineHeight)}px,0)`;
                this.move()
                clearTimeout(timer)
                timer = null
            }, 0);
        }
    }

    updateData() {
        const data = this.setData();
        const oldData = this.state.data.slice(this.step);
        this.setState({ data: [...oldData, ...data] }, this.restartMove)
    }

    setData() {
        return new Array(this.pageSize).fill(0).map((_, index) => (index + 1 + (this.page) * this.pageSize))
    }

    componentWillUnmount() {
        this.removeTimer()
    }

    componentDidMount() {
        const data = this.setData();
        this.setState({ data }, () => { this.move() })
    }

    render() {
        const { data } = this.state;
        return (
            <div className='scrolling-list'>
                <ul
                    ref={this.ulRef}
                    className='box'
                    onMouseEnter={this.removeTimer}
                    onMouseLeave={this.move}
                >
                    {
                        data.map((item) => {
                            return (<li key={item}>{item}</li>)
                        })
                    }
                </ul>
            </div>
        )
    }
} 