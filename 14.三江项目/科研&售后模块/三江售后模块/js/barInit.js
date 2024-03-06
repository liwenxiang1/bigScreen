barInit = () => {
	let radarContent1 = echarts.init(document.getElementById(`barEcharts`));

	let radarOption = {
		tooltip: {
		    trigger: 'axis',
		    axisPointer: {
		      type: 'shadow'
		    }
		  },
		xAxis: {
			type: 'category',
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
		},
		yAxis: {
			type: 'value'
		},
		series: [{
			data: [120, 200, 150, 80, 70, 110, 130],
			type: 'bar'
		}]
	};
	radarContent1.setOption(radarOption)
}
