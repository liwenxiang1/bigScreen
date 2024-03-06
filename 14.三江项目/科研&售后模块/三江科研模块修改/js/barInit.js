barInit = () => {
	let radarContent1 = echarts.init(document.getElementById(`barDiv`));

	let radarOption = {
		xAxis: {
			type: 'category',
			data: ['论证阶段', '方案阶段', '初样研制', '试样阶段', '状态鉴定', '列装定型', '生产部署']
		},
		yAxis: {
			type: 'value'
		},
		series: [{
			data: [14, 35, 24, 18, 35, 24, 18],
			type: 'bar',
			barWidth:20
		}]
	};
	radarContent1.setOption(radarOption)
}
