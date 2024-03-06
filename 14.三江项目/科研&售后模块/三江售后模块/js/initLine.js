lineInit = () => {
	let radarContent1 = echarts.init(document.getElementById(`netWork`));

	let radarOption = {
		xAxis: {
			type: 'category',
			data: ['售后服务', '售后服务', '售后服务', '售后服务', '售后服务', '售后服务', '售后服务']
		},
		yAxis: {
			type: 'value'
		},
		tooltip: {
		    trigger: 'axis'
		},
		series: [{
			data: [820, 932, 901, 934, 1290, 1330, 1320],
			type: 'line',
			smooth: true,
			areaStyle: {
				color: {
					type: 'linear',
					x: 0,
					y: 0,
					x2: 0,
					y2: 1,
					colorStops: [{
						offset: 0,
						color: '#C8D8F9' // 0% 处的颜色
					}, {
						offset: 1,
						color: '#F7FAFB' // 100% 处的颜色
					}],
					global: false // 缺省为 false
				}
			}
		}]
	};
	radarContent1.setOption(radarOption)
}
