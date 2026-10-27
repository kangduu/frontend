import './global.css';
import { useState } from 'react';
import { Rnd } from 'react-rnd';

export default function HomePage() {
	const [open, setOpen] = useState(false);
	return (
		<>
			<div>
				<div
					onClick={() => {
						alert(2);
					}}>
					端口的连接
				</div>
				<div
					onClick={() => {
						alert(1);
					}}>
					发调
				</div>
				内容元素
			</div>
			<div className='container'>
				<Rnd
					bounds='.container'
					style={{
						border: 'solid 1px #ddd',
						background: '#f0f0f0',
						borderRadius: '50%',
						textAlign: 'center',
						position: 'absolute',
						zIndex: 1000,
					}}>
					<div
						style={{
							width: 100,
							height: 100,
							lineHeight: '100px',
							textAlign: 'center',
							border: '1px solid #000',
							borderRadius: '50%',
						}}>
						Drag
					</div>
				</Rnd>
			</div>
		</>
	);
}
