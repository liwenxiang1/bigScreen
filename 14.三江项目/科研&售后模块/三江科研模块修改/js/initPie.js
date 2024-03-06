radarInit = () => {
	let radarContent1 = echarts.init(document.getElementById(`pieDiv`));
	
	let radarOption = {
		tooltip: {
			trigger: 'item'
		},
		legend: {
			top: '5%',
			left: 'center',
			show:false
		},
		series: [{
			name: '',
			type: 'pie',
			radius: ['40%', '70%'],
			avoidLabelOverlap: false,
			label: {
				show: false,
				position: 'center'
			},
			emphasis: {
				label: {
					show: false,
					fontSize: '40',
					fontWeight: 'bold'
				}
			},
			labelLine: {
				show: false
			},
			data
		}]
	};
	radarContent1.setOption(radarOption)
}
