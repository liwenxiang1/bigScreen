barInit = () => {
	let radarContent1 = echarts.init(document.getElementById(`barDiv`));

	let radarOption = {
		title: {
			subtext: '单位 : 月份',
			x: 'right'
		},
		tooltip: {
      trigger: 'axis',
    },
		xAxis: {
			type: 'category',
			data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月']
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
			data: [140, 350, 240, 180, 350, 240, 180, 350, 240],
			type: 'bar',
			barWidth: 20,
			color: '#1f91ff'
		}]
	};
	radarContent1.setOption(radarOption)
}
