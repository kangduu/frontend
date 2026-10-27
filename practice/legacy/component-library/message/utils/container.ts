import { MessageModalClassName } from './vendor';

// 创建容器
export function createContainer(): HTMLDivElement {
  let container: HTMLDivElement = document.createElement('div');
  container.className = MessageModalClassName;
  container.style.position = 'fixed';
  container.style.zIndex = '1000';
  container.style.left = '50%';
  container.style.transform = 'translateX(-50%)';
  container.style.top = 0 + 'px';

  return container;
}

// 获取容器
export function getContainer(): HTMLDivElement | null {
  let container: HTMLDivElement | null = document.querySelector(
    `body > .${MessageModalClassName}`,
  );
  return container;
}

// 移除容器
export function removeContainer(container: HTMLDivElement) {
  document.body.removeChild(container);
}
