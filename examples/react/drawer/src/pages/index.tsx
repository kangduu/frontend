import WithDrawer from '@/components/drawer';
import { Button, ConfigProvider, Drawer } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import { useState } from 'react';

export default function HomePage() {
	const [open, setOpen] = useState(false);
	return (
		<ConfigProvider locale={zhCN}>
			<WithDrawer
				title='一级抽屉'
				onClose={() => {
					console.log('Drawer closed - onClose Event');
				}}
				content={props => {
					// 注意这里的render，每一次都会触发
					// 比如，当关闭时，可以不更新
					console.log(props);

					// drawer已关闭
					if (!props.open) console.log('Drawer closed - props.open');

					return (
						<div style={{ width: 80, margin: '0 auto' }}>
							<Button onClick={() => props.showDrawer()}>打开drawer</Button>;
						</div>
					);
				}}>
				<div>一级抽屉children</div>

				<Button onClick={() => setOpen(true)}>打开二级抽屉</Button>

				<Drawer
					open={open}
					onClose={() => setOpen(false)}
					title='二级抽屉'></Drawer>
			</WithDrawer>
		</ConfigProvider>
	);
}
