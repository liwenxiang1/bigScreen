let angle = 0; //角度，用来做简单的动画效果的
let value = [56790, 61000, 79990, 6790]
let pjBuildDnChart = null
let pjDn = null
let pjTypeDn = null
let pjStopDn = null
let pjInfo = null
let pjBuildDn = null
let cMapOption = null
let barOption = null
$(function() {
	//中间初始化
	run();
	setInterval(() => {
		run();
	}, 17000);
	
	resetTheme()
	scalePage()
	clearLoading()
	timeInit()
	// 项目分布图
	setInterval(function() {
	//用setInterval做动画感觉有问题
		angle = angle + 3
		for (var index = 0; index < 4; index++) {
			pjDnInit(index)
		}
	}, 100);

	//存储容量

	ccrlInit()
	// 项目类型分布图
	// pjTypeDnInit()
	// 项目停工分布图
	pjStopDnInit()
	// 右侧表格tab切换
	tableTabsInit()

	// 处理量图
	cllinit()
	//异常数据趋势
	ycsjInit()
	//用户访问趋势图
	yhfwInit()
	//安全标签
	aqbqInit()
	//敏感词汇
	mgchInit()
	//企业数据质量
	qysjInit()
	// 
	// progressChartsInit()
	// statisticsInit()
	// bChartsInit()
	//全屏
	// $("#fullScreen").on("click",function(){
	//     fullScreen();
	// })
	// //退出全屏
	// $("#exitFullScreen").on("click",function(){
	//     exitFullscreen();
	// })
})

clearLoading = () => {
	//删除加载动画
	$('#loading').fadeOut(1000)
	setTimeout(function() {
		$('#loading').remove()
	}, 1000);
}

timeInit = () => {
	setInterval(() => {
		let date = new Date()
		$('#time').text(getFormatDate)
	}, 1000);
}
getFormatDate = () => {
	let nowDate = new Date();
	let year = nowDate.getFullYear();
	let month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
	let date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
	let hour = nowDate.getHours() < 10 ? "0" + nowDate.getHours() : nowDate.getHours();
	let minute = nowDate.getMinutes() < 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
	let second = nowDate.getSeconds() < 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();
	return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}
getScale = () => {
	// 固定好16:9的宽高比，计算出最合适的缩放比，宽高比可根据需要自行更改
	const width = 2912
	const height = 1248
	let ww = window.innerWidth / width
	let wh = window.innerHeight / height
	return ww < wh ? ww : wh
}
// 页面渲染计算比例缩放
scalePage = () => {
	setScale = debounce(() => {
		// 获取到缩放比，设置它
		let scale = this.getScale()
		$('.scale-wrapper').css({
			'transform': 'scale(' + scale + ') translate(-50%, -50%)',
			'-webkit-transform': 'scale(' + scale + ') translate(-50%, -50%)'
		})
	}, 200)
	setScale()
	window.addEventListener('resize', setScale)
}
// 防抖
debounce = (fun, delay) => {
	let timer
	return function() {
		if (timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(fun, delay)
	}
}
var startMap = {
	三门: [121.1353, 28.6688],
	石岛: [123.1353, 28.6688]
}

function dataLines(province, data) {
	var res = [];
	province.forEach((name, index) => {
		res.push({
			name: name,
			value1: data[name].value1,
			value2: data[name].value2,
			coords: [
				startMap[name],
				[130.1353, (50 - index * 2)]
			],
		})
	})
	return res;
}


// 项目分布图渲染
pjDnInit = (index) => {
	let pjDnChart = echarts.init(document.getElementById('pj-dn' + index));

	option = {
		backgroundColor: "",
		title: {
			text: '{a|' + value[index] + '}',
			x: 'center',
			y: 'center',
			textStyle: {
				rich: {
					a: {
						fontSize: 28,
						color: '#29EEF3'
					},

					c: {
						fontSize: 20,
						color: '#ffffff',
						// padding: [5,0]
					}
				}
			}
		},
		series: [{
				name: "ring5",
				type: 'custom',
				coordinateSystem: "none",
				renderItem: function(params, api) {
					return {
						type: 'arc',
						shape: {
							cx: api.getWidth() / 2,
							cy: api.getHeight() / 2,
							r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.8,
							startAngle: (0 + angle) * Math.PI / 180,
							endAngle: (90 + angle) * Math.PI / 180
						},
						style: {
							stroke: "#0CD3DB",
							fill: "transparent",
							lineWidth: 1.5
						},
						silent: true
					};
				},
				data: [0]
			}, {
				name: "ring5",
				type: 'custom',
				coordinateSystem: "none",
				renderItem: function(params, api) {
					return {
						type: 'arc',
						shape: {
							cx: api.getWidth() / 2,
							cy: api.getHeight() / 2,
							r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.8,
							startAngle: (180 + angle) * Math.PI / 180,
							endAngle: (270 + angle) * Math.PI / 180
						},
						style: {
							stroke: "#0CD3DB",
							fill: "transparent",
							lineWidth: 1.5
						},
						silent: true
					};
				},
				data: [0]
			}, {
				name: "ring5",
				type: 'custom',
				coordinateSystem: "none",
				renderItem: function(params, api) {
					return {
						type: 'arc',
						shape: {
							cx: api.getWidth() / 2,
							cy: api.getHeight() / 2,
							r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.85,
							startAngle: (270 + -angle) * Math.PI / 180,
							endAngle: (40 + -angle) * Math.PI / 180
						},
						style: {
							stroke: "#0CD3DB",
							fill: "transparent",
							lineWidth: 1.5
						},
						silent: true
					};
				},
				data: [0]
			}, {
				name: "ring5",
				type: 'custom',
				coordinateSystem: "none",
				renderItem: function(params, api) {
					return {
						type: 'arc',
						shape: {
							cx: api.getWidth() / 2,
							cy: api.getHeight() / 2,
							r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.85,
							startAngle: (90 + -angle) * Math.PI / 180,
							endAngle: (220 + -angle) * Math.PI / 180
						},
						style: {
							stroke: "#0CD3DB",
							fill: "transparent",
							lineWidth: 1.5
						},
						silent: true
					};
				},
				data: [0]
			}, {
				name: "ring5",
				type: 'custom',
				coordinateSystem: "none",
				renderItem: function(params, api) {
					let x0 = api.getWidth() / 2;
					let y0 = api.getHeight() / 2;
					let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.85;
					let point = getCirlPoint(x0, y0, r, (90 + -angle))
					return {
						type: 'circle',
						shape: {
							cx: point.x,
							cy: point.y,
							r: 4
						},
						style: {
							stroke: "#0CD3DB", //粉
							fill: "#0CD3DB"
						},
						silent: true
					};
				},
				data: [0]
			}, {
				name: "ring5", //绿点
				type: 'custom',
				coordinateSystem: "none",
				renderItem: function(params, api) {
					let x0 = api.getWidth() / 2;
					let y0 = api.getHeight() / 2;
					let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.85;
					let point = getCirlPoint(x0, y0, r, (270 + -angle))
					return {
						type: 'circle',
						shape: {
							cx: point.x,
							cy: point.y,
							r: 4
						},
						style: {
							stroke: "#0CD3DB", //绿
							fill: "#0CD3DB"
						},
						silent: true
					};
				},
				data: [0]
			}, {
				name: '吃猪肉频率',
				type: 'pie',
				radius: ['70%', '50%'],
				silent: true,
				clockwise: true,
				startAngle: 90,
				z: 0,
				zlevel: 0,
				label: {
					normal: {
						position: "center",

					}
				},
				data: [{
						value: value[index],
						name: "",
						itemStyle: {
							normal: {
								color: { // 完成的圆环的颜色
									colorStops: [{
										offset: 0,
										color: '#4FADFD' // 0% 处的颜色
									}, {
										offset: 1,
										color: '#28E8FA' // 100% 处的颜色
									}]
								},
							}
						}
					},
					{
						value: 100000 - value[index],
						name: "",
						label: {
							normal: {
								show: false
							}
						},
						itemStyle: {
							normal: {
								color: "#173164"
							}
						}
					}
				]
			},

			{
				name: "",
				type: "gauge",
				radius: "80%",
				center: ['50%', '50%'],
				startAngle: 0,
				endAngle: 359.9,
				splitNumber: 8,
				hoverAnimation: true,
				axisTick: {
					show: false
				},
				splitLine: {
					length: 0,
					lineStyle: {
						width: 5,
						color: "#06174095"
					}
				},
				axisLabel: {
					show: false
				},
				pointer: {
					show: false
				},
				axisLine: {
					lineStyle: {
						opacity: 0
					}
				},
				detail: {
					show: false
				},
				data: [{
					value: 0,
					name: ""
				}]
			},

		]
	};
	// pjDnChart.setOption(option, true)
	// console.log

	pjDnChart.setOption(option)

	// 窗口尺寸变化时resize
	$(window).resize(function() {
		pjDnChart.resize()
	});
}


//获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
function getCirlPoint(x0, y0, r, angle) {
	let x1 = x0 + r * Math.cos(angle * Math.PI / 180)
	let y1 = y0 + r * Math.sin(angle * Math.PI / 180)
	return {
		x: x1,
		y: y1
	}
}

// function draw(){

//    //window.requestAnimationFrame(draw);
// }
//存储容量Init
ccrlInit = () => {

	let ccrlChart = echarts.init(document.getElementById('pj-type-dnm'));
	var img =
		'data:image/png;base64,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';

	var trafficWay = [{
		name: '火车',
		value: 20
	}, {
		name: '飞机',
		value: 10
	}, {
		name: '客车',
		value: 30
	}, {
		name: '轮渡',
		value: 40
	}];

	var data = [];
	var color = ['#00ffff', '#00cfff', '#006ced', '#ffe000', '#ffa800', '#ff5b00', '#ff3000']
	for (var i = 0; i < trafficWay.length; i++) {
		data.push({
			value: trafficWay[i].value,
			name: trafficWay[i].name,
			itemStyle: {
				normal: {
					borderWidth: 5,
					shadowBlur: 20,
					borderColor: color[i],
					shadowColor: color[i]
				}
			}
		}, {
			value: 2,
			name: '',
			itemStyle: {
				normal: {
					label: {
						show: false
					},
					labelLine: {
						show: false
					},
					color: 'rgba(0, 0, 0, 0)',
					borderColor: 'rgba(0, 0, 0, 0)',
					borderWidth: 0
				}
			}
		});
	}
	var seriesOption = [{
		name: '',
		type: 'pie',
		clockWise: false,
		radius: [70, 85],
		hoverAnimation: false,
		itemStyle: {
			normal: {
				label: {
					show: true,
					position: 'outside',
					color: '#ddd',
					fontSize:14,
					formatter: function(params) {
						var percent = 0;
						var total = 0;
						for (var i = 0; i < trafficWay.length; i++) {
							total += trafficWay[i].value;
						}
						percent = ((params.value / total) * 100).toFixed(0);
						if (params.name !== '') {
							return '' + params.name + '\n' + '\n' + percent + '%';
						} else {
							return '';
						}
					},
				},
				labelLine: {
					length: 13,
					length2: 20,
					show: true,
					color: '#00ffff'
				}
			}
		},
		data: data
	}];
	let ccoption = {
		backgroundColor: '',
		color: color,
		title: {
			text: '交通方式',
			top: '48%',
			textAlign: "center",
			left: "49%",
			textStyle: {
				color: '#fff',
				fontSize: 14,
				fontWeight: '400'
			}
		},
		graphic: {
			elements: [{
				type: "image",
				z: 3,
				style: {
					image: img,
					width: 78,
					height: 78
				},
				left: 'center',
				top: 'center',
				position: [10, 10]
			}]
		},
		tooltip: {
			show: false
		},
		legend: {
		    show:false
		},
		toolbox: {
			show: false
		},
		series: seriesOption
	}
	ccrlChart.setOption(ccoption)
	// 窗口尺寸变化时resize
	$(window).resize(function() {
		ccrlChart.resize()
	});
}
// 项目类型分布图渲染
pjTypeDnInit = () => {
	const pjTypeDnData = [{
		name: '核电',
		value: 200,
		selected: true
	}, {
		name: '军工',
		value: 400
	}, {
		name: '民用',
		value: 242
	}]
	let pjTypeDnChart = echarts.init(document.getElementById('pj-type-dn'));
	pjTypeDn = {
		title: {
			text: 742,
			subtext: ' 总数',
			textStyle: {
				color: '#00FFFE',
				fontSize: 30,
			},
			subtextStyle: {
				fontSize: 20,
				color: '#00FFFE'
			},
			x: '28.5%',
			y: '37%',
		},
		grid: {
			left: 15,
			top: 20,
			bottom: 20,
			right: 15
		},
		legend: {
			show: true,
			orient: 'vertical',
			top: 100,
			right: 60,
			textStyle: {
				color: '#00FFFE',
				fontSize: 13,
				fontWeight: 'bold'
			},
			formatter: (name) => {
				let curItem = pjTypeDnData.filter(item => item.name === name)
				return name + '：' + curItem[0].value
			}
		},
		series: [{
			type: "pie",
			center: ["35%", "50%"],
			radius: ["52%", "65%"],
			color: ['#2BC191', '#00AEFF', '#FEC006'],
			startAngle: 90,
			selectedMode: 'single',
			label: {
				show: false,
				position: 'center'
			},
			labelLine: {
				show: false
			},
			data: pjTypeDnData
		}]
	}
	pjTypeDnChart.setOption(pjTypeDn)

	// 窗口尺寸变化时resize
	$(window).resize(function() {
		pjTypeDnChart.resize()
	});
}

pjStopDnInit = () => {
	let pjStopDnChart = echarts.init(document.getElementById('pj-stop-dn'));
	var bg1 =
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDQ3NDI0QTJENkVFMTFFQUJERjNCODFBQTEzNUFFNTYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDQ3NDI0QTFENkVFMTFFQUJERjNCODFBQTEzNUFFNTYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Qzk3QkIwOEQ5RkY1MTFFQThFMzVDNjE0ODZGMUNGRDgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Qzk3QkIwOEU5RkY1MTFFQThFMzVDNjE0ODZGMUNGRDgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7n5CpxAAAAJUlEQVR42mJg+P/fF4gZYJgRzGBg8GWAgM0wGYQqZM5/IAYIMACSthzOFsmOvAAAAABJRU5ErkJggg==';
	var back1 = new Image();
	back1.src = bg1;
	var qsoption = {
		backgroundColor: "",
		// title: [{
		//     text: '',
		//     x: '50%',
		//     y: 30,
		//     textAlign: 'center',
		//     textStyle: {
		//         align: 'center',
		//         color: '#707b90',
		//         fontSize: 30,
		//         fontWeight: '100',
		//     },
		// }],
		tooltip: {},
		legend: {
			show: false,
		},
		xAxis: {
			type: 'category',
			data: ['2020-09-01', '2020-09-02', '2020-09-03', '2020-09-04', '2020-09-05', '2020-09-06', '2020-09-07',
				'2020-09-08'
			],
			axisLine: {
				lineStyle: {
					color: '#ffffff',
					width: '5',
				},

			},
			axisLabel: {
				interval: 0,
				rotate: 20,
				align:'right'
			},
			axisTick: {
				alignWithLabel: true
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#ffffff'
				}
			},
		},
		yAxis: {
			type: 'value',
			name: '',
			splitLine: {
				lineStyle: {
					color: '#79a5a5'
				}
			},
			axisTick: {
				lineStyle: {
					color: '#79a5a5',
				}
			},
			axisLine: {
				lineStyle: {
					color: '#ffffff',
					width: '2',
				},
			},
			axisLabel: {
				show: true,
				formatter: '{value} ',
				textStyle: {
					color: '#79a5a5',
				}
			},
			min: 0,
			max: 500,
		},
		grid: {
			left: 15,
			bottom: 20,
			top: 10,
			right: 30,
			containLabel: true
		},
		series: [{
			name: 'H',
			data: [355, 463, 277, 480, 360, 470, 369, 385],
			type: 'line',
			symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAEdCAYAAADuAZ5NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3YjI2MDY0Zi1hMzc1LWNkNGMtOTY0OC0wOGQ3YWM4OTRjNmQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUJEQjZDODQwMDk5MTFFQkI5Q0RBODU4RUIzQzYyRDciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUJEQjZDODMwMDk5MTFFQkI5Q0RBODU4RUIzQzYyRDciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQyYWFjNjk3LTQ2MDAtZmY0ZC05OWU0LTVlOThkYzA1N2I3MiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3YjI2MDY0Zi1hMzc1LWNkNGMtOTY0OC0wOGQ3YWM4OTRjNmQiLz4gPC9y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',
			symbolSize: [10, 15],
			symbolOffset: ['0', '25'],
			symbolRotate: 0,
			label: {
				normal: {
					show: true
				}
			},
			lineStyle: {
				color: '#4bfffc',
				shadowColor: 'rgba(0,0,0,0.3)',
				shadowBlur: 2,
				shadowOffsetX: 5,
				shadowOffsetY: 5,
			},
			itemStyle: {
				color: ({
					data
				}) => {
					if (data <= 60) {
						return '#f00 '
					}
					return '#4bfffc'
				}
			},
			markLine: {
				symbol: 'none',
				data: [
					[{
						value: 60,
						lineStyle: {
							color: '#80e000',
						},
						label: {
							color: '#e7fd9b',
							textShadowColor: '#37a300',
							textShadowBlur: '0',
							textShadowOffsetX: 1,
							textShadowOffsetY: 1,
							position: 'middle',
							formatter: '{c} %',
							backgroundColor: '#80e000',
							shadowColor: 'rgba(0,0,0,0.3)',
							shadowBlur: 1,
							shadowOffsetX: 2,
							shadowOffsetY: 2,
							padding: 5,
							borderRadius: 5
						},
						coord: ['A', 60]
					}, {
						coord: ['H', 60]
					}]
				]
			},
			areaStyle: {
				normal: {
					color: {
						image: back1,
						repeat: 'repeat'
					},
				}
			},
		}]
	};

	pjStopDnChart.setOption(qsoption)
	// 窗口尺寸变化时resize
	$(window).resize(function() {
		pjStopDnChart.resize()
	});
}


tableTabsInit = () => {
	$('.area-table .types').on('click', 'td', e => {
		$('.area-table .types .active').removeClass('active')
		$(e.currentTarget).addClass('active')
		const id = $(e.currentTarget).attr('id')
		listDataInit()
	})
	$($('.area-table .types td')[0]).trigger('click')
	let listIndex = 1
	setInterval(() => {
		$($('.area-table .types td')[listIndex]).trigger('click')
		listIndex += 1
		if (listIndex === 4) {
			listIndex = 0
		}
	}, 5000);
}
listDataInit = () => {
	const listData = [{
		id: '1',
		status: '在建',
		amount: Math.floor(Math.random() * 500 + 20),
		info: '甘肃核技术产业园办公及生活项目'
	}, {
		id: '2',
		status: '在建',
		amount: Math.floor(Math.random() * 500 + 20),
		info: 'PPP项目经营性固定建设实施项目'
	}, {
		id: '3',
		status: '停工',
		amount: Math.floor(Math.random() * 500 + 20),
		info: '连云港分公司属地化建设项目'
	}, {
		id: '4',
		status: '在建',
		amount: Math.floor(Math.random() * 500 + 20),
		info: '甘肃核技术产业园办公及生活项目'
	}, {
		id: '5',
		status: '在建',
		amount: Math.floor(Math.random() * 500 + 20),
		info: 'PPP项目经营性固定建设实施项目'
	}, {
		id: '6',
		status: '停工',
		amount: Math.floor(Math.random() * 500 + 20),
		info: '连云港分公司属地化建设项目'
	}, {
		id: '7',
		status: '在建',
		amount: Math.floor(Math.random() * 500 + 20),
		info: '甘肃核技术产业园办公及生活项目'
	}, {
		id: '8',
		status: '筹建',
		amount: Math.floor(Math.random() * 500 + 20),
		info: 'PPP项目经营性固定建设实施项目'
	}]
	$('.table-list-wrapper .table-list').addClass('animate__fadeOutLeft')
	setTimeout(() => {
		$('.table-list-wrapper .table-list').remove()
		let liDom = '<ul class="table-list animate__animated animate__fadeInRight">'
		$.each(listData, (index, item) => {
			liDom += '<li class="list-item">' +
				'' + (index + 1) + '、<span class="' + (item.status === '在建' ? 'default' :
					item.status === '筹建' ? 'warning' : 'danger') + '">' + item.status +
				' ' + item.amount + ' </span><span>' + item.info + '</span>' +
				'</li>'
		})
		liDom += '</div>'
		$('.table-list-wrapper').append(liDom)
	}, 300);
}
//数据处理量初始化
cllinit = () => {
	let cllChart = echarts.init(document.getElementById('cll-charts'));
	clloption = {
		grid: {
			left: '5%',
			right: '5%',
			bottom: '5%',
			top: '10%',
			containLabel: true
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'none'
			},
			formatter: function(params) {
				return params[0].name + '<br/>' +
					"<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
					params[0].seriesName + ' : ' + Number((params[0].value.toFixed(4) / 10000).toFixed(2)).toLocaleString() +
					' 万元<br/>'
			}
		},
		backgroundColor: '',
		xAxis: {
			show: false,
			type: 'value'
		},
		yAxis: [{
			type: 'category',
			inverse: true,
			axisLabel: {
				show: true,
				textStyle: {
					color: '#fff'
				},
			},
			splitLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLine: {
				show: false
			},
			data: ['归集', '融合', '编目', '应用']
		}, {
			type: 'category',
			inverse: true,
			axisTick: 'none',
			axisLine: 'none',
			show: true,
			axisLabel: {
				textStyle: {
					color: '#ffffff',
					fontSize: '12'
				},
				formatter: function(value) {
					if (value >= 10000) {
						return (value / 10000).toLocaleString() + '万条';
					} else {
						return value.toLocaleString();
					}
				},
			},
			data: [50000000, 22000000, 10000000, 5000000]
		}],
		series: [{
				name: '金额',
				type: 'bar',
				zlevel: 1,
				itemStyle: {
					normal: {
						barBorderRadius: 30,
						color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
							offset: 0,
							color: 'rgb(57,89,255,1)'
						}, {
							offset: 1,
							color: 'rgb(46,200,207,1)'
						}]),
					},
				},
				barWidth: 10,
				data: [50000000, 22000000, 10000000, 5000000]
			},
			{
				name: '背景',
				type: 'bar',
				barWidth: 10,
				barGap: '-100%',
				data: [50000000, 50000000, 50000000, 50000000],
				itemStyle: {
					normal: {
						color: 'rgba(24,31,68,1)',
						barBorderRadius: 30,
					}
				},
			},
		]
	};
	cllChart.setOption(clloption)

	$(window).resize(function() {
		cllChart.resize()
	});
}
//异常数据趋势
ycsjInit = () => {
	let ycsjChart = echarts.init(document.getElementById('ycsj-charts'));
	var XName = ["2020-09-01", "2020-09-02", "2020-09-03", "2020-09-04", "2020-09-05", "2020-09-06", "2020-09-07"]
	var data1 = [267, 397, 251, 338, 332, 311, 321]
	var img = [
		'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABRCAYAAABFTSEIAAAACXBIWXMAAAsSAAALEgHS3X78AAAEp0lEQVR42u3cz4sjRRTA8W9Vd3Vn8mMmjj9WQWSRZQ+CsH+B7MnDIgiCd0E8CYJ/gOAIelo8ehUP/gF6WLw5/gMueFP2sIcF0dHd2Z1kknR11fOQZJJJMtlZd03H7HtQpNOTnpn+8Lrm1etmjIig8e/DKoECKqACKqCGAiqgAiqghgIqoAIqoIYCKqACKqCGAiqgAiqghgIqoAJudKTr+osZMNPvBUQBHwHsPF9fB9R0DeHMOQ6T6WOrhEzXBM4swDOL0M6CrArRVoq3t2dGUIb9fTvatg8ZZup1PDBgzPmy98mey6qfzjLz2WaWjEUZKEvGyi9nWyneMOvGIyFQo2Sbg4MUSChpU9IeTTUpJdsEajPZOJeJG5uBZj7rLLduWS5dGm6XNLEELOFUFj54ACJCaychkpDSASK3bwsXL0YgVpWJKwM0iy9Zy8HdGru7jvt3Pbu7w0wES7drTwAbjTHMGCsQcIAnYTC1/wRx0wEnl27JNgZI8HQ6Kc1mQq83RNzaMjPzXqDbjTQaJRFLxIyyMSxAXEkWrhrQzAAmo5HOjCQf7jflILxOkohL+aUPgV4vEGNJo+E5PAy02+UIMEwBxo0CPDP7Dg5SnEtpt1PA0e87XO25FOoh8IYIH2Y5b45RzGAQBiIltZoHxqMcjbksXAVgdc2EQMYzzzdotyeZWKuleULXJtwT4SODfC2QCWR+IF9KnjuX1Xbo99Op7LVE8iXlz0YBTk5SyLEEjo5OLuccEoFUvHfO+reuUPx4zftXAIcx1hdcF+/TvFab4A0Bs0VwqyhpVnkJT89/Q4DDQ0e77YCMwIUsFMeFZD856699URRvX4nxE4A/jbnxXp7v4Zw3ReGNSDHI8wFQjIafuoyn58L/fB6sth/Ybg9fez2TRC6QZcZYvgHsazF+MP7YCyLXcM7gvSXLDGBqYDg+NhwdmSpPoTrAkub0W+f4FSB1fDucIunMHSLpO8WAH0rSy8u+19MBCHB4OHzd2pI+CEUhpigEiN+l6WcdY252jLn5s7Wf472ImPcN8pUl/tEHoV4XWq1Ke4KrLmPsTA3oODpytFoOyJKSyzHyMSIxteWngMW5cSEdDJQUhTdZVgxOz3/+jFJm4+bA2e5JpNU6WZ4Fw99JwnWMKccwpeddP+B7GZTNUPKqybJy0O+Hs1YfMz9swwvpB8fbGDG0GuGkkK7V0hxSmZQpABI8l2z0v3sJf50qpAMJCd2qCulql3LD1lRGQjm7lEsDz0rkxTQOfiPPxUBcuJTbbhss/Y1eyi3NwsmKInmkZsKk5gtPUzNhvp11507CSy/X6XYStpvFudpZw1ZWIOF4Cq6SdtbKbioJyAhRTu3u9yMJXerN+ugvaQQsjcZ8Q3VnZwxlSDhe1lB9GjrSw5b+1avT8+Jw+979nNaOI6U3KpTrWAosxVQmygK4ld8X0ZtK/7eViExD7O1NQPb3T7fsl4/4sBpwYzPwjFbTo95Yl9l9Vd1YN1X/147HebSjary1AHyc5qc+XLQEQx9ve8Kg6xr6hKoCKqACKqCGAiqgAiqghgIqoAIqoIYCKqACKqCGAiqgAiqghgIq4JrHP8fEWV8FMTmOAAAAAElFTkSuQmCC',
		'image://data:image/png;base64,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',
		'image://data:image/png;base64,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',
		'image://data:image/png;base64,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',
	]

	var data = [{
		coords: [
			['2020-09-01', 267],
			['2020-09-02', 397],
			['2020-09-03', 251],
			['2020-09-04', 338],
			['2020-09-05', 332],
			['2020-09-06', 311],
			['2020-09-07', 321],
		]
	}]

	ycsjoption = {
		backgroundColor: '',
		grid: {
			left: '15%',
			top: '5%',
			bottom: '25%',
			right: '5%',
		},
		legend: {
			type: "scroll",
			data: "来电量",
			itemWidth: 18,
			itemHeight: 12,
			textStyle: {
				color: "#00ffff",
				fontSize: 14
			},
		},
		yAxis: [{
			type: 'value',
			position: 'left',
			nameTextStyle: {
				color: '#00FFFF'
			},
			splitLine: {
				lineStyle: {
					type: 'dashed',
					color: 'rgba(135,140,147,0.8)'
				}
			},
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				formatter: '{value}',
				color: '#fff',
				fontSize: 14
			}
		}, ],
		xAxis: [{
			type: 'category',
			axisTick: {
				show: false
			},
			axisLine: {
				show: false,
				lineStyle: {
					color: '#0696f9',
				}
			},
			axisLabel: {
				interval: 0,
				rotate: 20,
				inside: false,
				textStyle: {
					color: '#fff', // x轴颜色
					fontWeight: 'normal',
					fontSize: '14',
					lineHeight: 22
				}

			},
			data: XName,
		}, ],
		series: [{
				symbolSize: 150,
				symbol: img[2],
				name: '小灯光',
				type: "line",
				data: data1,
				itemStyle: {
					normal: {
						borderWidth: 5,
						color: '#0696f9',
					}
				}
			},
			{
				name: '滑行的光点',
				type: 'lines',
				coordinateSystem: 'cartesian2d',
				symbolSize: 30,
				polyline: true,
				effect: {
					show: true,
					trailLength: 0,
					symbol: "arrow",
					period: 10, //光点滑动速度
					symbolSize: 150,
					symbol: img[0]
				},
				lineStyle: {
					normal: {
						width: 1,
						opacity: 0.6,
						curveness: 0.2
					}
				},
				data: data
			}
		],
	};
	ycsjChart.setOption(ycsjoption)
	$(window).resize(function() {
		ycsjChart.resize()
	});
}
yhfwInit = () => {
	let yhfwChart = echarts.init(document.getElementById('yhfw-charts'));
	var O3_data = [281.55, 398.35, 214.02, 179.55, 289.57, 356.14, 422.0]
	var date_list = ['2020-10-01', '2020-10-02', '2020-10-03', '2020-10-04', '2020-10-05', '2020-10-06', '2020-10-07']


	yhfwoption = {
		backgroundColor: '',
		title: {
			text: '',
			textStyle: {
				align: 'center',
				color: '#fff',
				fontSize: 20,
			},
			top: '5%',
			left: 'center',
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				lineStyle: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 0,
							color: 'rgba(0, 255, 233,0)'
						}, {
							offset: 0.5,
							color: 'rgba(255, 255, 255,1)',
						}, {
							offset: 1,
							color: 'rgba(0, 255, 233,0)'
						}],
						global: false
					}
				},
			},
		},
		grid: {
			top: '15',
			left: '7%',
			right: '5%',
			bottom: '15%',
			// containLabel: true
		},
		xAxis: [{
			type: 'category',
			axisLine: {
				show: true
			},
			splitArea: {
				// show: true,
				color: '#f00',
				lineStyle: {
					color: '#f00'
				},
			},
			axisLabel: {
				color: '#fff',
				interval: 0,
				rotate: 0
			},
			splitLine: {
				show: false
			},
			boundaryGap: true,
			data: date_list,
			// date:getVirtulData()['data'],

		}],

		yAxis: [{
			type: 'value',
			position: 'left',
			nameTextStyle: {
				color: '#00FFFF'
			},
			splitLine: {
				lineStyle: {
					type: 'dashed',
					color: 'rgba(135,140,147,0.8)'
				}
			},
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				formatter: '{value}',
				color: '#fff',
				fontSize: 14
			}
		}, ],
		series: [{
			name: 'O3',
			type: 'line',
			// smooth: true, //是否平滑
			showAllSymbol: true,
			// symbol: 'image://./static/images/guang-circle.png',
			symbol: 'circle',
			symbolSize: 15,
			lineStyle: {
				normal: {
					color: "#10D3FE",
					shadowColor: 'rgba(0, 0, 0, .3)',
					shadowBlur: 0,
					shadowOffsetY: 5,
					shadowOffsetX: 5,
				},
			},
			label: {
				show: true,
				position: 'top',
				textStyle: {
					color: '#10D3FE',
				}
			},

			itemStyle: {
				color: "#10D3FE",
				borderColor: "#fff",
				borderWidth: 1,
				shadowColor: 'rgba(0, 0, 0, .3)',
				shadowBlur: 0,
				shadowOffsetY: 2,
				shadowOffsetX: 2,
			},
			tooltip: {
				show: false
			},
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(0,202,149,0.3)'
						},
						{
							offset: 1,
							color: 'rgba(0,202,149,0)'
						}
					], false),
					shadowColor: 'rgba(0,202,149, 0.9)',
					shadowBlur: 20
				}
			},
			data: O3_data,
		}, ]
	};
	yhfwChart.setOption(yhfwoption)
	$(window).resize(function() {
		yhfwChart.resize()
	});
}
aqbqInit = () => {
	let aqbqChart = echarts.init(document.getElementById('aqbq-charts'));
	aqbqoption = {
		backgroundColor: "",
		legend: {
			show: false,
			orient: 'vertical',
			top: "bottom",
			right: "5%",
			data: ['例行试验', '基建', '消缺', '大修技改'],
			textStyle: {
				color: "#fff",
				fontSize: 12
			}
		},
		tooltip: {
			trigger: 'item',
			formatter: '{a} <br/>{b} : {c} ({d}%)'
		},
		series: [{
			name: '',
			type: 'pie',
			radius: ['40%', '80%'],
			center: ['50%', '50%'],
			roseType: 'area',
			label: {
				show: true,
				normal: {
					position: 'outside',
					fontSize: 12
				}
			},
			labelLine: {
				length: 1,
				length2: 20,
				smooth: true
			},
			data: [{
					value: 3,

					name: '例行试验',
					itemStyle: {
						color: "rgba(50,123,250,0.7)",
						borderColor: "rgba(50,123,250,1)",
						borderWidth: 3
					}
				},
				{
					value: 2,
					name: '基建',
					itemStyle: {
						color: "rgba(244,201,7,0.7)",
						borderColor: "rgba(244,201,7,1)",
						borderWidth: 3
					}
				},
				{
					value: 3,
					name: '消缺',
					itemStyle: {
						color: "rgba(23,216,161,0.7)",
						borderColor: "rgba(23,216,161,1)",
						borderWidth: 3
					}
				},
				{
					value: 1,
					name: '大修技改',
					itemStyle: {
						color: "rgba(122,60,235,0.7)",
						borderColor: "rgba(122,60,235,1)",
						borderWidth: 3
					}
				}
			]
		}]
	};
	aqbqChart.setOption(aqbqoption)
	$(window).resize(function() {
		aqbqChart.resize()
	});
}
//敏感词汇
mgchInit = () => {
	// return false
	let mgchChart = echarts.init(document.getElementById('mgch-charts'));
	let datas = [{
			name: "雨伞",
			value: 30
		},
		{
			name: "晴天",
			value: 28
		},
		{
			name: "电话",
			value: 24
		},
		{
			name: "手机",
			value: 23
		},
		{
			name: "下雨",
			value: 22
		},
		{
			name: "暴雨",
			value: 21
		},
		{
			name: "多云",
			value: 20
		},
		{
			name: "雨衣",
			value: 29
		},
		{
			name: "屋檐",
			value: 28
		},
		{
			name: "大风",
			value: 27
		},
		{
			name: "台风",
			value: 26
		},
		{
			name: "下雪",
			value: 25
		},
		{
			name: "打雷",
			value: 24
		},
		{
			name: "小雨",
			value: 30
		},
		{
			name: "中雨",
			value: 18
		},
		{
			name: "大雨",
			value: 14
		},
		{
			name: "雷阵雨",
			value: 13
		},
		{
			name: "下雪",
			value: 12
		},
		{
			name: "小雪",
			value: 11
		},
		{
			name: "中雪",
			value: 10
		},
		{
			name: "大雪",
			value: 9
		},
		{
			name: "暴雪",
			value: 8
		},
		{
			name: "东风",
			value: 7
		},
		{
			name: "南风",
			value: 6
		},
		{
			name: "西北风",
			value: 5
		},
		{
			name: "北风",
			value: 4
		},
		{
			name: "闪电",
			value: 3
		}
	];



	mgchoption = {
		tooltip: {
			show: true,
			position: 'top',
			textStyle: {
				fontSize: 16
			}
		},
		series: [{
			type: "wordCloud",
			// 网格大小，各项之间间距
			gridSize: 10,
			// 形状 circle 圆，cardioid  心， diamond 菱形，
			// triangle-forward 、triangle 三角，star五角星
			shape: 'circle',
			// 字体大小范围
			sizeRange: [14, 24],
			// 文字旋转角度范围
			rotationRange: [0, 90],
			// 旋转步值
			// rotationStep: 90,
			// 自定义图形
			// maskImage: maskImage,
			left: 'center',
			top: 'center',
			right: null,
			bottom: null,
			// 画布宽
			width: '90%',
			// 画布高
			height: '100%',
			// 是否渲染超出画布的文字
			drawOutOfBound: false,
			textStyle: {
				normal: {
					color: function() {
						return 'rgb(' + [
							Math.round(Math.random() * 200 + 55),
							Math.round(Math.random() * 200 + 55),
							Math.round(Math.random() * 200 + 55)
						].join(',') + ')';
					}
				},
				emphasis: {
					shadowBlur: 10,
					shadowColor: '#2ac'
				}
			},
			data: datas
		}]
	};
	mgchChart.setOption(mgchoption)
	$(window).resize(function() {
		mgchChart.resize()
	});
}
qysjInit = () => {

	let qysjChart = echarts.init(document.getElementById('qysj-charts'));
	qysjoption = {
		backgroundColor: '',
		grid: {
			left: '8%',
			top: '5%',
			bottom: '12%',
			right: '4%'
		},
		xAxis: {
			data: ['驯鹿', '火箭', '飞机', '高铁', '轮船', '汽车', '跑步', '步行', ],
			axisTick: {
				show: false
			},
			axisLine: {
				lineStyle: {
					color: '#ffffff',
					width: 2 //这里是为了突出显示加上的
				}
			},
			axisLabel: {
				textStyle: {
					color: '#fff',
					fontSize: 12
				}
			}
		},
		yAxis: [{
			axisTick: {
				show: false
			},
			axisLine: {
				lineStyle: {
					color: '#fff',
					width: 2 //这里是为了突出显示加上的
				}
			},
			axisLabel: {
				textStyle: {
					color: '#999'
				}
			},
			splitArea: {
				areaStyle: {
					color: 'rgba(255,255,255,.5)'
				}
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: 'rgba(255, 129, 109, 0.1)',
					width: 0.5,
					type: 'dashed'
				}
			}
		}],
		series: [{
			type: 'pictorialBar',
			barCategoryGap: '0%',
			symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
			label: {
				show: true,
				position: 'top',
				distance: 15,
				color: '#08DFFE',
				fontWeight: 'bolder',
				fontSize: 15,
			},
			itemStyle: {
				normal: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
								offset: 0,
								color: '#9A11FF'
							},
							{
								offset: 1,
								color: '#08DFFE'
							}
						],
						global: false //  缺省为  false
					}
				},
				emphasis: {
					opacity: 1
				}
			},
			data: [123, 60, 25, 18, 12, 9, 2, 1]
		}]
	};
	qysjChart.setOption(qysjoption)
	$(window).resize(function() {
		qysjChart.resize()
	});
}



function run() {
	var icons = $(".part-item-icon");
	for (var i = 0; i < icons.length; i++) {
		$(icons[i]).removeClass("animation-rotate");
		$(icons[i]).removeClass("animation-heart");
	}
	//第一个流程
	setTimeout(() => {
		$(icons[0]).removeClass("animation-heart").addClass("animation-rotate");
	}, 1000);
	setTimeout(() => {
		$(icons[0]).removeClass("animation-rotate").addClass("animation-heart");
		$(".dian01").show().addClass("animation-move01");
	}, 2000);
	//第二个流程
	setTimeout(() => {
		$(".dian01").hide();
		$(icons[1]).addClass("animation-rotate");
	}, 5000);
	setTimeout(() => {
		$(icons[1]).removeClass("animation-rotate").addClass("animation-heart");
		$(".dian02").show().addClass("animation-move02");
	}, 6000);
	//第三个流程
	setTimeout(() => {
		$(".dian02").hide();
		$(icons[2]).addClass("animation-rotate");
	}, 12000);
	setTimeout(() => {
		$(icons[2]).removeClass("animation-rotate").addClass("animation-heart");
		$(".dian03").show().addClass("animation-move03");
	}, 13000);
	//第四个流程
	setTimeout(() => {
		$(".dian03").hide();
		$(icons[3]).addClass("animation-rotate");
	}, 16000);
	setTimeout(() => {
		$(icons[3]).removeClass("animation-rotate").addClass("animation-heart");
	}, 17000);
}

