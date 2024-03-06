lineInit = () => {
	let radarContent1 = echarts.init(document.getElementById(`lineDiv`));

	let radarOption = {
		title: {
			subtext: '单位 : 年度',
			x: 'right'
		},
    tooltip: {
      trigger: 'axis',
    },
		xAxis: {
			type: 'category',
			data: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023']
		},
		yAxis: {
			type: 'value'
		},
		grid: {
			x: 50,
			y: 50,
			x2: 20,
			y2: 80
		},
		series: [{
			data: [800, 850, 740, 780, 750, 840, 880, 760],
			type: 'line',
			color: '#1f91ff'
		}]
	};
	radarContent1.setOption(radarOption)
}
