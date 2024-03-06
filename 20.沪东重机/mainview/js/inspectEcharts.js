radarInit = () => {
	let barDivContent = echarts.init(document.getElementById(`barDiv`));
	let radarContent1 = echarts.init(document.getElementById(`pieDiv`));
	let radarContent2 = echarts.init(document.getElementById(`pieDiv2`));
	let radarContent3 = echarts.init(document.getElementById(`pieDiv3`));
	let radarContent4 = echarts.init(document.getElementById(`pieDiv4`));
	let radarContent5 = echarts.init(document.getElementById(`pieDiv5`));
	let radarContent6 = echarts.init(document.getElementById(`pieDiv6`));
	let radarContent7 = echarts.init(document.getElementById(`pieDiv7`));
	let radarContent8 = echarts.init(document.getElementById(`pieDiv8`));
	let barDivOption = {
		title: {
			text: '',
			subtext: '数量',
			textStyle: { //标题颜色
				color: "#fff"
			},
			subtextStyle: {
				color: "#fff"
			}
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data: ['巡检', '整改', '复核'],
			textStyle: {
				color: "#fff"
			}
		},
		calculable: true,
		xAxis: [{
			type: 'category',
			axisLine: { //这是x轴文字颜色
				lineStyle: {
					color: "#fff",
				}
			},
			// prettier-ignore
			data: ['2021-1', '2021-2', '2021-3', '2021-4', '2021-5', '2021-6', '2021-7', '2021-8', '2021-9', '2021-10', '2021-11', '2021-12']
		}],
		yAxis: [{
			type: 'value',
			axisLine: { //这是y轴文字颜色
				lineStyle: {
					color: "#fff",
				}
			},
		}],
		series: [{
				name: '巡检',
				type: 'bar',
				data: [
					2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
				]
			},
			{
				name: '整改',
				type: 'bar',
				data: [
					2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
				]
			},
			{
				name: '复核',
				type: 'bar',
				data: [
					2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
				]
			}
		],
		dataZoom: [{
			type: 'slider',
			show: true,
			xAxisIndex: [0],
			left: '9%',
			bottom: 15,
			start: 10,
			height: 20,
			end: 90 //初始化滚动条
		}],

	};
	let radarOption = {
		tooltip: {
			trigger: 'item'
		},
		legend: {
			top: '5%',
			left: 'center',
			show: false
		},
		series: [{
			name: '',
			type: 'pie',
			radius: '50%',
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
	let radarOption2 = {
		tooltip: {
			trigger: 'item'
		},
		legend: {
			top: '5%',
			left: 'center',
			show: false
		},
		series: [{
			name: '',
			type: 'pie',
			radius: ['80%', '90%'],
			avoidLabelOverlap: false,
			label: {
				show: false,
				position: 'center',
				normal: {
					show: true,
					position: 'center',
					color: '#fff',
					formatter: pre2Data[0].value.toString()
				},
				emphasis: { //中间文字显示
					show: true,
				}
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
			data: pre2Data
		}]
	};
	let radarOption3 = {
		tooltip: {
			trigger: 'item'
		},
		legend: {
			top: '5%',
			left: 'center',
			show: false
		},
		series: [{
			name: '',
			type: 'pie',
			radius: ['80%', '90%'],
			avoidLabelOverlap: false,
			label: {
				show: false,
				position: 'center',
				normal: {
					show: true,
					position: 'center',
					color: '#fff',
					formatter: pre3Data[0].value.toString()
				},
				emphasis: { //中间文字显示
					show: true,
				}
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
			data: pre3Data
		}]
	};
	let radarOption4 = {
		tooltip: {
			trigger: 'item'
		},
		legend: {
			top: '5%',
			left: 'center',
			show: false
		},
		series: [{
			name: '',
			type: 'pie',
			radius: ['80%', '90%'],
			avoidLabelOverlap: false,
			label: {
				show: false,
				position: 'center',
				normal: {
					show: true,
					position: 'center',
					color: '#fff',
					formatter: pre4Data[0].value.toString()
				},
				emphasis: { //中间文字显示
					show: true,
				}
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
			data: pre4Data
		}]
	};
	let radarOption5 = {
		tooltip: {
			trigger: 'item'
		},
		legend: {
			top: '5%',
			left: 'center',
			show: false
		},
		series: [{
			name: '',
			type: 'pie',
			radius: ['80%', '90%'],
			avoidLabelOverlap: false,
			label: {
				show: false,
				position: 'center',
				normal: {
					show: true,
					position: 'center',
					color: '#fff',
					formatter: pre5Data[0].value.toString()
				},
				emphasis: { //中间文字显示
					show: true,
				}
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
			data: pre5Data
		}]
	};
	let radarOption6 = {
		tooltip: {
			trigger: 'item'
		},
		legend: {
			top: '5%',
			left: 'center',
			show: false
		},
		series: [{
			name: '',
			type: 'pie',
			radius: ['80%', '90%'],
			avoidLabelOverlap: false,
			label: {
				show: false,
				position: 'center',
				normal: {
					show: true,
					position: 'center',
					color: '#fff',
					formatter: pre6Data[0].value.toString()
				},
				emphasis: { //中间文字显示
					show: true,
				}
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
			data: pre6Data
		}]
	};
	let radarOption7 = {
		tooltip: {
			trigger: 'item'
		},
		legend: {
			top: '5%',
			left: 'center',
			show: false
		},
		series: [{
			name: '',
			type: 'pie',
			radius: ['80%', '90%'],
			avoidLabelOverlap: false,
			label: {
				show: false,
				position: 'center',
				normal: {
					show: true,
					position: 'center',
					color: '#fff',
					formatter: pre7Data[0].value.toString()
				},
				emphasis: { //中间文字显示
					show: true,
				}
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
			data: pre7Data
		}]
	};
	let radarOption8 = {
		tooltip: {
			trigger: 'item'
		},
		legend: {
			top: '5%',
			left: 'center',
			show: false
		},
		series: [{
			name: '',
			type: 'pie',
			radius: '50%',
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
			data: pre8Data
		}]
	};
	barDivContent.setOption(barDivOption)
	radarContent1.setOption(radarOption)
	radarContent2.setOption(radarOption2)
	radarContent3.setOption(radarOption3)
	radarContent4.setOption(radarOption4)
	radarContent5.setOption(radarOption5)
	radarContent6.setOption(radarOption6)
	radarContent7.setOption(radarOption7)
	radarContent8.setOption(radarOption8)
}