radarInit = () => {
	let yearInvestment = echarts.init(document.getElementById(`yearInvestmentDiv`));
	let sectionInvestment = echarts.init(document.getElementById(`sectionInvestmentDiv`));
	let monthInvestment = echarts.init(document.getElementById(`monthInvestmentDiv`));
	let sectionMonthInvestment = echarts.init(document.getElementById(`sectionMonthInvestmentDiv`));
	let yearInvestmentOption = {
		legend: {
			data: ['年度计划', '已完成投资']
		},
		xAxis: {
			type: 'category',
			data: yearInvestmentX.time
		},
		yAxis: {
			type: 'value',
			name: '单位：万元',
			axisLabel: {
				formatter: function (value, index) {
					var value
					if (value >= 10000) {
						value = value / 10000
					} else if (value < 10000) {
						value = value
					}
					return value
				}
			}
		},
		tooltip: {
			trigger: 'axis',
			formatter: (params) => { // params为悬浮框上的全部数据
				const newParams = []
				params.forEach((p) => {
					// p.marker为对应数据线的颜色的圆点
					// p.seriesName为对应数据的数据名称
					// p.value为对应数据的值
					const cont = '<div>' + p.axisValueLabel + '<br/>' + p.marker + ' ' + p.seriesName + ': ' + yearInvestmentData[p.dataIndex].plan + '万元' + '</div><div>' + '<br/>' + p.marker + ' 完成比例 ' + ': ' + yearInvestmentData[p.dataIndex].proportion + '%' + '</div><div>' + '<br/>' + p.marker + ' 已完成投资' + ': ' + yearInvestmentData[p.dataIndex].completed + '万元' + '</div>'
					if (p.seriesName == '年度计划') {
						newParams[0] = cont
					}
				})
				// 这里需要将数组转化成字符串显示，如果不转化，每个数据前面都会出现一个逗号
				return newParams.join('')
			}

		},
		series: [{
				name: '年度计划',
				data: yearInvestmentX.plan,
				type: 'bar',
				stack: 'one',
			},
			{
				name: '已完成投资',
				data: yearInvestmentX.completed,
				type: 'bar',
				stack: 'one',
			}
		]
	};
	let sectionInvestmentOption = {
		legend: {
			data: ['合同额', '累计完成投标金额']
		},
		xAxis: {
			type: 'category',
			data: sectionInvestmentX.time
		},
		yAxis: {
			type: 'value',
			name: '单位：万元',
			axisLabel: {
				formatter: function (value, index) {
					var value
					if (value >= 10000) {
						value = value / 10000
					} else if (value < 10000) {
						value = value
					}
					return value
				}
			}
		},
		tooltip: {
			trigger: 'axis',
			formatter: (params) => { // params为悬浮框上的全部数据
				const newParams = []
				params.forEach((p) => {
					// p.marker为对应数据线的颜色的圆点
					// p.seriesName为对应数据的数据名称
					// p.value为对应数据的值
					const cont = '<div>' + p.axisValueLabel + '<br/>' + p.marker + ' ' + p.seriesName + ': ' + sectionInvestmentData[p.dataIndex].plan + '万元' + '</div><div>' + '<br/>' + p.marker + ' 完成比例 ' + ': ' + sectionInvestmentData[p.dataIndex].proportion + '%' + '</div><div>' + '<br/>' + p.marker + ' 已完成投资' + ': ' + sectionInvestmentData[p.dataIndex].completed + '万元' + '</div>'
					if (p.seriesName == '合同额') {
						newParams[0] = cont
					}
				})
				// 这里需要将数组转化成字符串显示，如果不转化，每个数据前面都会出现一个逗号
				return newParams.join('')
			}

		},
		series: [{
				name: '合同额',
				data: sectionInvestmentX.plan,
				type: 'bar',
				stack: 'one',
				barWidth: 30, //柱图宽度
			},
			{
				name: '累计完成投标金额',
				data: sectionInvestmentX.completed,
				type: 'bar',
				stack: 'one',
				barWidth: 30, //柱图宽度
			}
		]
	};
	let monthInvestmentOption = {
		title: {
			text: '',
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
			data: ['本月完成投资额', '至本月累计完成投资额', '直至本月累计完成投资额'],
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
			data: monthInvestmentX.time
		}],
		yAxis: [{
				type: 'value',
				axisLine: { //这是y轴文字颜色
					lineStyle: {
						color: "#fff",
					}
				},
				name: '单位：万元',
				axisLabel: {
					formatter: function (value, index) {
						var value
						if (value >= 10000) {
							value = value / 10000
						} else if (value < 10000) {
							value = value
						}
						return value
					}
				}
			}
		],
		series: [{
				name: '本月完成投资额',
				type: 'bar',
				data: monthInvestmentX.plan
			},
			{
				name: '至本月累计完成投资额',
				type: 'bar',
				data: monthInvestmentX.completed
			},
			{
				name: '直至本月累计完成投资额',
				type: 'line',
				data: monthInvestmentX.completed
			}
		]

	};
	let sectionMonthInvestmentOption = {
		title: {
			text: '',
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
			data: ['本月完成投资额', '至本月累计完成投资额'],
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
			data: sectionMonthInvestmentX.time
		}],
		yAxis: [{
			type: 'value',
			axisLine: { //这是y轴文字颜色
				lineStyle: {
					color: "#fff",
				}
			},
			name: '单位：万元',
			axisLabel: {
				formatter: function (value, index) {
					var value
					if (value >= 10000) {
						value = value / 10000
					} else if (value < 10000) {
						value = value
					}
					return value
				}
			}
		}],
		series: [{
				name: '本月完成投资额',
				type: 'bar',
				data: sectionMonthInvestmentX.plan
			},
			{
				name: '至本月累计完成投资额',
				type: 'bar',
				data: sectionMonthInvestmentX.completed
			}
		]

	};
	yearInvestment.setOption(yearInvestmentOption)
	sectionInvestment.setOption(sectionInvestmentOption)
	monthInvestment.setOption(monthInvestmentOption)
	sectionMonthInvestment.setOption(sectionMonthInvestmentOption)
}