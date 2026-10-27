import React from "react";
import "./styles.less";

const datasource = new Array(500).fill(0).map((_, index) => index + 1);
const pagination = {
  current: 1,
  pageSize: 100,
  total: datasource.length,
};

function setData(current) {
  return datasource.slice(0, current * pagination.pageSize);
}

const ScrollingLoad = () => {
  const [list, setList] = React.useState(() => setData(pagination.current));

  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (loading) {
      const { current, pageSize, total } = pagination;
      if (current * pageSize < total) {
        const nextPage = current + 1;
        pagination.current = nextPage;
        let timer = setTimeout(() => {
          setLoading(false);
          setList(setData(nextPage));
          clearTimeout(timer);
        }, 3000);
      }
    }
  }, [loading]);

  React.useLayoutEffect(() => {
    let observer;
    if (loading === false) {
      const children = document.querySelector("ul.container").children;
      console.log(children);
      const node = children[children.length - 2];
      observer = new IntersectionObserver((entries, _observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLoading(true);
            _observer.unobserve(node);
          }
        });
      });
      observer.observe(node);
    }

    return () => {
      if (observer && observer.disconnect instanceof Function) {
        observer.disconnect();
      }
    };
  }, [list, loading]);

  const { current, pageSize, total } = pagination;
  return (
    <section className="scrolling">
      <h2>滚动加载</h2>

      <ul className="container">
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {loading && (current + 1) * pageSize <= total ? (
        <div className="load">数据加载中...</div>
      ) : null}
    </section>
  );
};

export default ScrollingLoad;
