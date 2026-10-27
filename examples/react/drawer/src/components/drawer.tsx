import styles from './styles.less';
import { Drawer, DrawerProps } from 'antd';
import React, {
	useCallback,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

export interface WithDrawerContentProps
	extends Pick<DrawerProps, 'width' | 'open' | 'onClose'> {
	showDrawer: () => void;
	closeDrawer: () => void;
}

const IgnoreWithDrawerProps = [
	'open',
	'getContainer',
	'mask',
	'maskClassName',
	'maskStyle',
	'maskMotion',
	'maskClosable',
] as const;

export type IgnoreWithDrawerKeys = (typeof IgnoreWithDrawerProps)[number];
export interface WithDrawerProps
	extends Omit<DrawerProps, IgnoreWithDrawerKeys> {
	content: (props: WithDrawerContentProps) => React.ReactNode;
	contentClassName?: string;
	contentStyle?: React.CSSProperties;
}
const WithDrawer: React.FC<WithDrawerProps> = ({
	width,
	content,
	contentClassName,
	contentStyle,
	...props
}) => {
	const [open, setOpen] = useState(false);
	const showDrawer = () => !open && setOpen(true);
	const closeDrawer = () => open && setOpen(false);

	// ant design drawer onClose
	const onClose = useCallback(
		e => {
			closeDrawer();
			props.onClose?.(e);
		},
		[props.onClose, closeDrawer]
	);

	// 处理props.children中嵌套了Drawer组件的情况，导致content区域的宽度错误问题
	const DrawerContainerRef = useRef<HTMLDivElement>(null);
	const [translateX, setTranslateX] = useState(0);
	useLayoutEffect(() => {
		if (!open) return setTranslateX(0);

		try {
			requestAnimationFrame(() => {
				const drawer = DrawerContainerRef.current;
				const element = drawer?.querySelector(
					'.ant-drawer .ant-drawer-content-wrapper'
				);
				if (!element) return;

				const style = element.getAttribute('style');
				const match = style?.match(/translateX\(([-\d.]+)px\)/);

				if (match) {
					const translateXValue = parseFloat(match[1]);
					setTranslateX(translateXValue);
				} else setTranslateX(0);
			});
		} catch (error) {}
	}, [props.children, open]);

	// 动态设置content区域的宽度
	const DrawerWidth = useMemo(() => {
		if (!open) return '0px';
		const type = typeof width;
		if (type === 'undefined') return '400px';
		if (type === 'number') return width + 'px';
		return width;
	}, [width, open]);

	return (
		<section
			className={styles.main}
			ref={DrawerContainerRef}>
			<div
				className={[styles.content, contentClassName].filter(Boolean).join(' ')}
				style={{
					width: `calc(100% - ${DrawerWidth} + ${translateX}px)`,
					...contentStyle,
				}}>
				{content({
					width: DrawerWidth,
					open,
					showDrawer,
					closeDrawer,
				})}
			</div>
			<Drawer
				{...props}
				// 会被覆盖的参数
				onClose={onClose}
				width={DrawerWidth}
				// 不可传递的参数
				mask={false}
				open={open}
				getContainer={() => DrawerContainerRef.current as HTMLDivElement}
			/>
		</section>
	);
};

export default WithDrawer;
