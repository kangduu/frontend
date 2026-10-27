//@ts-nocheck
import styles from './styles.less';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useEffect } from 'react';
import Mock from 'mockjs';

export default function HomePage() {
	function split() {}
	const handleClick = async () => {
		const pdf = new jsPDF('p', 'mm', 'a4');
		const margin = 10;
		const pageWidth = pdf.internal.pageSize.getWidth() - margin * 2;
		const pageHeight = pdf.internal.pageSize.getHeight() - margin * 2;

		// Generate cover page
		const cover = document.getElementById('cover');
		await html2canvas(cover, { scale: 1, useCORS: true }).then(canvas => {
			const imgData = canvas.toDataURL('image/jpeg');
			pdf.addImage(imgData, 'JPEG', margin, margin, pageWidth, 0);
		});

		// Generate content page
		const content = document.getElementById('content');
		await html2canvas(content, { scale: 1 }).then(canvas => {
			// 拆分 canvas 为多个图片
			const splitHeight = (pageHeight * canvas.width) / pageWidth; // ? 每张图片的高度 pageWidth / pageHeight = canvas.width / canvas.height
			const numberOfSplits = Math.ceil(canvas.height / splitHeight);

			for (let i = 0; i < numberOfSplits; i++) {
				// 计算当前切割的高度，避免超出边界
				const actualHeight = Math.min(
					splitHeight,
					canvas.height - i * splitHeight
				);

				console.log(actualHeight);

				const imageData = canvas
					.getContext('2d')
					.getImageData(0, i * splitHeight, canvas.width, actualHeight);

				// 创建一个新 canvas 来显示拆分后的部分
				const newCanvas = document.createElement('canvas');
				newCanvas.width = canvas.width;
				newCanvas.height = splitHeight;
				newCanvas;
				const newCtx = newCanvas.getContext('2d');

				// 先清空新 canvas 的内容，填充为透明背景
				newCtx.clearRect(0, 0, newCanvas.width, newCanvas.height);

				// 将提取的 ImageData 绘制到新的 canvas 上
				newCtx.putImageData(imageData, 0, 0);

				// 使用 drawImage 将原始 canvas 的部分内容绘制到新的 canvas 上
				// newCtx.drawImage(
				// 	canvas,
				// 	0,
				// 	i * splitHeight,
				// 	canvas.width,
				// 	actualHeight,
				// 	0,
				// 	0,
				// 	canvas.width,
				// 	actualHeight
				// );

				// 将图片切片add到pdf文件中
				const imgData = newCanvas.toDataURL('image/jpeg');
				pdf.addPage();
				pdf.addImage(imgData, 'JPEG', margin, margin, pageWidth, 0);

				// 将新的 canvas 转换为图片
				// const img = new Image();
				// img.src = newCanvas.toDataURL();
				// img.style.border = '1px solid red';
				// document.body.appendChild(img);
				// document.body.appendChild(document.createElement('br'));
			}

			// const imgData = canvas.toDataURL('image/jpeg');
			// const imgHeight = (canvas.height * pageWidth) / canvas.width;
			// let heightLeft = imgHeight;
			// let position = margin;

			// pdf.addImage(imgData, 'JPEG', margin, position, pageWidth, imgHeight);
			// heightLeft -= pageHeight;

			// while (heightLeft >= 0) {
			// 	position = heightLeft - imgHeight;
			// 	pdf.addPage();
			// 	pdf.addImage(imgData, 'JPEG', margin, position, pageWidth, imgHeight);
			// 	heightLeft -= pageHeight;
			// }

			// // Add header and footer to every page
			// pdf.setFontSize(10);
			// pdf.text('Header Content', margin, 10);
			// pdf.text('Footer Content', margin, pdf.internal.pageSize.height - 10);

			// Save the PDF
			pdf.save('example.pdf');
		});
	};

	return (
		<>
			<button onClick={handleClick}>Click Me</button>
			<div
				id='pdf'
				className={styles.main}>
				<div id='cover'>
					<img
						src='https://images.pexels.com/photos/730981/pexels-photo-730981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
						alt=''
						style={{ maxWidth: '100%' }}
					/>
				</div>
				<div id='header'>
					<p>Header Content</p>
				</div>
				<div id='content'>
					<h1>Main Content</h1>
					{new Array(10).fill('').map((_, index) => {
						return (
							<>
								<h2>{index + 1}</h2>
								<p>{Mock.Random.cparagraph(30, 100)}</p>
							</>
						);
					})}
				</div>
				<div id='footer'>
					<p>Footer Content</p>
				</div>
			</div>
		</>
	);
}
