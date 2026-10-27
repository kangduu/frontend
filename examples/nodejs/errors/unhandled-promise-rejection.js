// Unhandled Promise Rejection Warning
function service() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			reject();
		}, 1000);
	});
}

async function request() {
	// await service();
	// 如果你这样做，将会报错哦。

	try {
		await service();
		// .catch(() => {});
		console.log('成功了');
	} catch (error) {
		console.log(error);
	}
}

request();
