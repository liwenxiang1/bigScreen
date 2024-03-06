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
	
	resetTheme()
	scalePage()
	clearLoading()
	// timeInit()
	//资源分类
	classifyInit()
	//资源来源
	sourceInit()
	
	// 右侧表格tab切换
	tableTabsInit()
	//用户访问趋势图
	yhfwInit()

	// 接入企业
	jrqyInit()
	
	//资源需求申请
	zyxqInit()
	//市委办资源数据量
	swbInit()
	//中心
	zxInit()
	$("#zx-charts").hover(function(){
		console.log("?????")
		$("#zx-charts").css('animationPlayState','paused')
	},function(){
		$("#zx-charts").css('animationPlayState','running')
	})
	setTimeout(function(){
		tada()
	},3000)
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
tada=()=>{
	$("#tada").addClass('animate__tada')
	setTimeout(function(){
		//在此更换数据
		setTimeout(function(){
			$("#tada").removeClass('animate__tada')
			setTimeout(function(){
				tada();
			},3000)
		},500)
	},500)
	
}
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
			left: '5%',
			right: '5%',
			bottom: '15%',
			// containLabel: true
		},
		xAxis: [{
			type: 'category',
			axisLine: {
				show: false
			},
			splitArea: {
				// show: true,
				color: '#f00',
				lineStyle: {
					color: '#f00'
				},
			},
			axisLabel: {
				color: '#fff'
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
			smooth: true, //是否平滑
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
				borderWidth: 3,
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
classifyInit = () => {

	let classifyChart = echarts.init(document.getElementById('classify-charts'))
	var seriesData = [{
		name: "政务",
		value: "40000"
	}, {
		name: "业务",
		value: "40000"
	}, {
		name: "事业",
		value: "53000"
	}, {
		name: "位置",
		value: "40000"
	}, {
		name: "物联",
		value: "60000"
	}];
	var legendData = ["政务", "业务", "事业", "位置", "物联"]
	var colorList = ['#73DDFF', '#73ACFF', '#FDD56A', '#FDB36A', '#FD866A'];
	classifyoption = {
		backgroundColor: '',
		title: {
			text: '资源分类',
			x: 'center',
			y: 'center',
			textStyle: {
				color: '#fff',
				fontSize:14
			}
		},
		tooltip: {
			trigger: 'item',
			borderColor: 'rgba(255,255,255,.3)',
			backgroundColor: 'rgba(13,5,30,.6)',
			borderWidth: 1,
			padding: 5,
			formatter: function(parms) {
				var str = parms.marker + "" + parms.data.name + "</br>" +
					"数量：" + parms.data.value + "头</br>" +
					"占比：" + parms.percent + "%";
				return str;
			}
		},

		series: [{
			type: 'pie',
			z: 3,
			center: ['50%', '50%'],
			radius: ['40%', '60%'],
			clockwise: true,
			avoidLabelOverlap: true,
			hoverOffset: 15,
			itemStyle: {
				normal: {
					color: function(params) {
						return colorList[params.dataIndex]
					}
				}
			},
			label: {
				show: true,
				position: 'outside',
				formatter: '{a|{b}：{d}%}\n{hr|}',
				rich: {
					hr: {
						backgroundColor: 't',
						borderRadius: 3,
						width: 3,
						height: 3,
						padding: [3, 3, 0, -12]
					},
					a: {
						padding: [-30, 15, -20, 15]
					}
				}
			},
			labelLine: {
				normal: {
					length: 10,
					length2: 20,
					lineStyle: {
						width: 1
					}
				}
			},
			data: seriesData
		}]
	};
	classifyChart.setOption(classifyoption)
	$(window).resize(function() {
		classifyChart.resize()
	});
}
sourceInit = () => {

	let sourceChart = echarts.init(document.getElementById('source-charts'))

		var trafficWay = [{
		name: '市大数据中心',
		value: 20
	}, {
		name: '市公共信用中心',
		value: 10
	}, {
		name: '企业',
		value: 30
	}, {
		name: '第三方',
		value: 40
	}];
	sourceoption = {
		backgroundColor: "",
		title: {
			text: '资源来源',
			x: 'center',
			y: 'center',
			textStyle: {
				color: '#fff',
				fontSize:14
			}
		},

		tooltip: {
			show: false,
			trigger: 'item',
			formatter: '{a} <br/>{b} : {c} ({d}%)'
		},
		series: [{
			name: '半径模式',
			type: 'pie',
			radius: ['40%', '70%'],
			center: ['50%', '50%'],
			roseType: 'radius',
			label: {
				show: false,
				normal: {
					position: 'outside',
					fontSize: 16,
					color: '#fff',
					formatter: function(params) {
						var percent = 0;
						var total = 0;
						for (var i = 0; i < trafficWay.length; i++) {
							total += trafficWay[i].value;
						}
						percent = ((params.value / total) * 100).toFixed(0);
						if (params.name !== '') {
							return params.name + '\n' + percent + '%';
						} else {
							return '';
						}
					},
				}


			},
			labelLine: {
				length: 1,
				length2: 20,
				smooth: true
			},
			color: ['#face25', '#6eb249', '#1f75ff', '#00e1ff'],
			data: trafficWay
		}]
	};
	sourceChart.setOption(sourceoption)
	$(window).resize(function() {
		sourceChart.resize()
	});
}
jrqyInit = () => {
	let data = [{
		name: '上海xxxx公司',
		value: 9999,
		present: 60,
		color:'#00E1FF',
		bg:'#09618D'
	}, {
		name: '上海xxxx公司',
		value: 9999,
		present: 60,
		color:'#55B4E5',
		bg:'#4183A5'
	}, {
		name: '上海xxxx公司',
		value: 9999,
		present: 60,
		color:'#4BDBCF',
		bg:'#32716C'
	}, {
		name: '上海xxxx公司',
		value: 9999,
		present: 60,
		color:'#00A8FF',
		bg:'#0076B3'
	}, {
		name: '上海xxxx公司',
		value: 9999,
		present: 60,
		color:'#CCC89E',
		bg:'#83816F'
	}, {
		name: '上海xxxx公司',
		value: 9999,
		present: 60,
		color:'#6FB770',
		bg:'#487049'
	}, {
		name: '上海xxxx公司',
		value: 9999,
		present: 60,
		color:'#3E8DFF',
		bg:'#4173BB'
	}, {
		name: '上海xxxx公司',
		value: 9999,
		present: 60,
		color:'#4BDBCF',
		bg:'#32716C'
	}]
	// for (var index = 0; index < data.length; index++) {
	// 	data[index].bg = "#" + ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
	// }
	var html = template('model1', {
		list: data
	})
	$("#company").append(html)
}
zyxqInit = () => {
	let zyxqChart = echarts.init(document.getElementById('zyxq-charts'))
	let img1 =
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAF8CAYAAABFdgLPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDM2MCwgMjAyMC8wMi8xMy0wMTowNzoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjEgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFDNzU4QkMzQjFGRjExRUFBRjkxQTRCMzE0QUM2OTRBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFDNzU4QkM0QjFGRjExRUFBRjkxQTRCMzE0QUM2OTRBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MUM3NThCQzFCMUZGMTFFQUFGOTFBNEIzMTRBQzY5NEEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUM3NThCQzJCMUZGMTFFQUFGOTFBNEIzMTRBQzY5NEEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7hhRVqAAAGG0lEQVR42uyZYZLb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'
	let img2 =
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAAUCAYAAAA6NOUqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFEQUNDRkQzQUM4QTExRUE5OUVDQkFCOTgzQkVDN0NGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFEQUNDRkQ0QUM4QTExRUE5OUVDQkFCOTgzQkVDN0NGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QURBQ0NGRDFBQzhBMTFFQTk5RUNCQUI5ODNCRUM3Q0YiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QURBQ0NGRDJBQzhBMTFFQTk5RUNCQUI5ODNCRUM3Q0YiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5jRYorAAAPE0lEQVR42oRYeZAc1Xn/3utzuqfnnp2ZvS+thIRWxwoBwojCNrhCMOArgMHgFCSEFInJ4TiJ4+DC/sdxxYlTOAfEIRUnJcqpChUkMIk5JAQSkpAipF1ppb2P2Tl2ZnqOvq+XN7MKRxHsrvqmel6/9/r7fcfv+14j+HUCv/RqULn7G3D/sy7c9/IP4I/hK3DDP/jwW80n4amvvwzq1yMgfjMGK/wd6BuH5sRX3/iJmNul8c58jKtEBqxQapdnJpaDtXSvu2VojDTWVGa93CCcwmCXhLl8RRdsr5UR8xcdeWyolOgfYfc+9yJ5ce8yPs1x8O0fXwy6594yZr/9neDUtffZmfM/D/761SLsr8Wh51t/Dgee+TH8x7Pfgc/ln4dcYQ2K2RwMHHsSho88AUai72NhseD+AtCkMwMgoOI0ICTUIQEWKHQgP1+WpzMlxbwBkl1xT157qWhB40X7iYYL4thurOMkhEZElN6cAyHjGlFrh7v5sk22qXk/2Uv8yZ4qlFQXs6Npcvcg72srPa3DTC/yGBuxRQMVH3kAxm3MZkrF0Ev3V7JiUQ0TNlZnz5aMYoNHuzf3OWOE1W11p5kIaU3JmLXbKpcFtqN6KxoBxt2AgD7GvwgeqH8U8MYTAMxC2NYh2rDBuO9nzFeyZ/qGTj7cfdRZgjpnuiibFMQ+xUvYyLx0bE6XXM3ouyqu26PbzX2pXgcjA/FNC1/FRPzTJ1iIyutojgGwsg5hqg48dOYUKL+5HUoDW2BxZQ1qFy3g+Sj8i2jDUJ8MtzAiaEIIphyDq6lBEtQAgdEQABMxLCuMqmmSW/KFSLeHUzOTzEQl7x26/bOFxFJ+7lzhByTf+DlE+DC4Ugh8n3QgfQj8I7XyByxBwDJY8KpNcFkELYlFA1MroWRejZxNjk40wB6o+aUpLpSb70r1t7KyG1Tclhd3kP3b3SmkZUJBQZwOHoRugKUIBCQAK0fga6+68PKpJtx1C4PyFMP1QwBawSBjh54D56u3wmyyFx3034I/i6XIzmAIvrlaQU+EBRj2ODikqXBK1MkmF8GOdBdcYgnM11qwXnPBrGKolRqcCx7f3LpbYRlu+953jm8dW8m7q+lWsTc3c+EUvDrzM3HVj3ZFwKTREGDcwdnB+3sPvkB/A/ADDuxmAFu3lyF7x170jpsJm6aaWWy4KY8EiqKWzLLrrXdtHSl+Zs8mfZsE6MUFj1y6uAA/3Jf1czGFqHTDP6JyreXDVZMr6LreFDGzAtz+3wvQjITgruu60dSPHMKLIfiDgg9P3cHAEZqSt5kmfGklBMmrAe4/3UC3Z6JwTxbIWgjgLyjhLM43YXT1MiKchSLyKHl0IAsBvV8XQsQ1fGQUW4wm8r4ZloKpEwV5abm+QxRSu3aN5lIDcVVHEX5SnDn7+panD9g844PNyRQyAWZbagLsYgWk4jmQR2x0cmy454QGg6XlarzkWJzLuVZsYU3n2fgq2zXeumdHr3F/AtxeygRHpkwktxjy+Z1xoro+OtoGjxEcdJrokFCGZ7MR+EfHBH5MArtbBGQQ2HltAMGeOkROATAZAdISgK9ziLMBzVOHLAYGbGIdeF4Q4a9YA1QarqGuGEymkzClsyhmGTBo6WCm+kAtG1grB8hLK0QM8dhlXaYYENvnuDzPaxfPX5idKRbMCs+wm4VY7pOOp0iLR5fm1i/rUGn5gD77wBOQi0TA2D4hNpP8dsdjRA5ZpjI6XGKJ0JII6wuaxhyfr/J3jfe1/mQiYQJ6P3t+qmlYtRy4V1HIcZYhjzMYptsPLAeBSzlIkqmJ8QaZEAKjfgDjhg67Ls5DDOsQCAyU9QBdUiYhnHqFpCMa4pi3ycvc43AheAJC7VfpGhKrdfTYYC/5Av3//SPHcLg7Qx7u6SFhWwRDJnjWNuFM1WAcL0C3j6bdrZTmXltuMkfKZlCtFoT6Qvk6acvYTkfBaFdM/Tet7JXQ7zz0N1AZ7Eq7E0NDVpmA4FlI7pVXpexQk2uFOJs4KMhG3AnZd+Oebq87BGGE2vwBOYWHL2Yk+KlpoDeqKjzV29NJpgkqZ6hwhoWo4gCpVGe8XTT8K3bb5S7BLY0S1Bl2g135CjDEAg8NI0cwybwbwFG0nZbZFkBdRYdHR+AmhiWfmptHo28ehUdyfWTw2uuBFRDUbQ9mNJM1aPR0RWViNm1smB60wigwwhiKdV84N11mi4XlEUtRNo31ZjLJauUFtv8Lg3wesmnXZgwxxOpCKMpoNVNozsxHAp4hlPiYHOpu3bY7afVLMThvE6h7AXR8SSPAobDGWZ6cRhgW6X03lQBfKRw8R0Bvz9sA/sGKc84ZgB36AJAIDRKfwm8CCHSSIAPROYCS355FB22rs1WIElV7fYYE5N6dOyHSOwJzHl1HdQlhBrhwGA4cW2RGlCrs3D0QtOhmvMzC/OW8fH62yDC54ZqYpT4rFi+vrqzP6pywhT3jdqeYZNq083mRFzjLN01eBg6Gx9NmIiv6kUTIGQ5h5zINqbcLPo7yyGeCtraoUzoOtomD3l0PAhxfqgLvEfhqmIenIwJc6Kj7PuSoQ4mQxTBMeWGCp+NRH95tOJDgMNg8CzXbB5Zw4NE5fHuBR6OCRsY1sgxRalyKFf51dBTw/1OzaYIFZ/eNkZnJVSzxLrBdEfLGdDm1OGcogSsZfqmWdp3AF6kvPdctaKH0WdasM4rA2DyPaXaZHpfZnDaSkUiD4kYK68JUo4KmbYnZxgokREP+0LslbPjEZxmm81Lc9io1gEnFohLiEGQ0Ex5RGIjtHwOSiEGSzntLDaBwdBb++dMDlAdEmhMIjsVYOHxsGR4dleDqsSzkHQynqYcnL5Xgzvw07LhmHLhcFlJ0bJruecH1IMmxIDAIGGqMADZqtxdQL1MEd/cw/lTPQHBEM1BLb+G1mhHEe1NqUK6mVc0iof7wumsEJtdQhwPLMll+5syqKe7YD3XTtiVUFw3LovTCzec1dKGpor6bNvv3KpJfVpvkHc0GZVs3bEkooFEvIs8DWaCeohboot7KtvOchuzfHVuDIUpmDyjie56Zp8GSp3lsUG2lK2NaOy4oEEzXh+n9Zh7T+AGo1nXoKpdhl0dbNArco0Sp2C7MrVfhpG7BquWCZtnA0+gT6X7tys0Sj4lwgKW+RNBAMqrXXNZpeCaTcE2HAUbAgZj0PMey3Fglj+XouGCyObOir1QKZhBP94nZ7DuVMMt2WwYuBJ5TSOVI15KK3qkv8DO0rUJJhWSYpr9erEFPOgIkqcC/n5yB22i9unekvwPIofI09epa3fpQ02iLGMoUvEOj4//AK20ip3necv335lKKAJNGRpNasUYXJtodNgU5kYx0pH1Nmi68TYmwQYGr1Dgcfd5wjOB/Fsts80SNi7TKDC9IiOuBoFQvi07ZbkpRFtaWKzc6NV7pzcZOJEbdFdbO7YCUph1BfGPQaIaTq8ivrtcbHO+idF9SaZSq8epKSxRGc4hTaB2hbI2H01Gc4mR0rmajHEHkallq8xm0G+WXGxYO0xK3ry/+XsLPBYCWFut4f1YKwjz7HgmcqTm4mzZYQ/GN9Vf2QNDUQKLRoPD8R7rytpmGQhz0h9qnDNobUDnfSfoos1vO0R6UBPV1lZSLTZTYMdhki6Xw2uK5PdS/43y4R0kPhA+ms8Zccv48oNu+fwgwpWffdqAZjsRjV0/IXX0Ky5lVaCytZFCDICaVXBq6oXtdiHEdr9UWHC5fKKFtA3JwU08ioI0YWaXy4nKVkXUTPTiQ8oclkdTo2GFC8CvnCsy9Eht8elNXx8VFqvAzZR1rlyv4yd1ZT5AEYhCCTiOEXjk1j4eWLwT79o6T7r5+0k4NGvzI3iA1MN4nuHbPhGjlwZMEMzYLPqUov74OSC85nLp4ickvr8rX7Bj+vBTz07XllkrMEy9dij03U0/44NgRqsSRx6l7NogDU0KJeRp38GJfYsH8hNgncNHVSDwrU26L9EWX+bjQcGuBraoVb9PNW814XHDtthYU0vSxEnB+Be751W20VkBbMFUc/+TUKrc/EgQPb+53L9H/bRa/TOWfjs9yj41GvRvTaX+JjpvUUK/VW1h7/TC+9cY9foSmXIVuTdMItQ+eZhtsOy18gmlBAYtFxL3SOth1wJUlVc7PV8JarcE5PBvtk9md+8fqQ5v6s/bKSeEYqXNvNuAtf1kpgENTENOV6KrpX/vgGQ9YWl2qepI21ght91Py9dbNyKXnzoWWMQYVFs8ZM7YdBntkoCejJOU4hCJlXoyWcK1mhQntvUf72xWLdkrUSXEwi7O6z5YKsGnPIA4J7extnyQALSw6bFAoBlsmul3TB7x4vsC08st4cM+An+nrDarUINSmtB9s94VA6D3xoFPlmMClYgccbWRRbb6UmF1vjdhmqivtE3Hs2tXgVmY98HXSeO3wtrlDF5pT9WkRcFwBAaUh5KEO8M5RVzp524dPtHSUpwdhV8ZgWDX4xIwJDhuBhhZwUTYl7Q1/WQ63RiJvezUOi1JmxBzoF+KxbKy/wfcQz1luOeslHam1uuE7DMGSwHktzVg3eS/fs7lXl4WwRzwfOEKC5YsVsWWoIi/LxKipREqkCJ9JEsswQXA8MSpyDArJgc8RNiFZHPYFB5nYMkIKXkxxXPDmSYaU9XAvz4X4xFHNQ4t68/lvNfurleayrhtHCje32ySgToBOk/CR8/zf/oIPGe1SLlzpS9tCS/R/7jsAd8j3wOnvvgFlYRX+9M4FwJMVNNi4SylGEoxfWePoSTiphyRJtkzB9YVMNp0xFLO2vFKsIjmXNbuTCc3Va1hkHdF1GbZgekRUsHf1cK+v6x7myyXWbbSE2UBA1ACapNZ9i8SCJuv4JYYJrPWL9pcnTfum372VPMPa3q985kcwnnwGfuMpgKlPzsIKjHQgTNDu+DStv4L5cV9ywr/8K1bHCO5GHWsZPNRlgKuqKYjAKpztPkDfOEXi5p1N73Pb4ff/UoOLzkONJvNFVL3ua/7W6lm/ap0KTu26hRksdosJR0WGormuQCSoRzlOYM24APqI4Dv16XeDOwcG/dLecbBo5H2phuH46gtQmn4X/v57j8ItfzgL7o0+qP/1Otz93Eno+t5jkAobtAM2O61xgJMQ5jZ07WqTAXelPHzM9b8CDADSK39CqOmjfQAAAABJRU5ErkJggg=='
	let img3 =
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAAQCAYAAACRBXRYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDM2MCwgMjAyMC8wMi8xMy0wMTowNzoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjEgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg4RjIwODIxQjFERjExRUFBNzI5QTE3MkE4QTdGQkNEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjg4RjIwODIyQjFERjExRUFBNzI5QTE3MkE4QTdGQkNEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODhGMjA4MUZCMURGMTFFQUE3MjlBMTcyQThBN0ZCQ0QiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODhGMjA4MjBCMURGMTFFQUE3MjlBMTcyQThBN0ZCQ0QiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6HHksnAAAA5ElEQVR42uyXTQrCMBSEW3VpxQO4VLyCB/BQQvfF0+QA0gN4hBZdegBFt1KnkJW0gYChP34fDIFkMfCYvOTFVVVFAF0xoQRAAIEAAnTBjBL4Mb3e6mUjHaW93c6lg3QJaN3q+V6vBlvPmCHEO4BbLWdp+XV0l3ZSGcDW6akAlkOtJ0+wP1lDECK7l43Ikw7Y0w740LJoOX5JSQBbp6c6YDLUevIH/C1ziRvNExyU3HFm6lclgIzD80QA/4vUfv6jhoEgHZEnAewphZ126670tDJ2rxiRJ0MI8AcEIIBAAAGC8BFgAE/fO8+F5WVHAAAAAElFTkSuQmCC'
	let barData = [{
			name: '物资1',
			num: 20
		},
		{
			name: '物资1',
			num: 50
		},
		{
			name: '物资1',
			num: 80
		},
		{
			name: '物资1',
			num: 100
		},
		{
			name: '物资1',
			num: 60
		},
		{
			name: '物资1',
			num: 10
		},
		{
			name: '物资1',
			num: 44
		},
		{
			name: '物资1',
			num: 16
		},
		{
			name: '物资1',
			num: 82
		}
	]
	let bar = (data, dom) => {
		let color1 = {
			type: 'linear',
			colorStops: [{
					offset: 0,
					color: 'rgb(27,124,177)'
				},
				{
					offset: 0.2,
					color: 'rgb(23,196,230)'
				},
				{
					offset: 0.5,
					color: 'rgb(6,120,221)'
				},
				{
					offset: 0.8,
					color: 'rgb(27,196,227)'
				},
				{
					offset: 1,
					color: 'rgb(43,113,164)'
				}
			]
		}
		let color2 = {
			type: 'radial',
			colorStops: [{
					offset: 0,
					color: 'rgba(13,47,85,.8)'
				}, {
					offset: 0.5,
					color: 'rgba(33,74,118,.8)'
				},
				{
					offset: 1,
					color: 'rgba(33,74,118,.8)'
				}
			]
		}
		let color3 = {
			type: 'radial',
			colorStops: [{
					offset: 0,
					color: 'rgba(17,47,75,.7)'
				},
				{
					offset: 1,
					color: 'rgba(51,205,207,.7)'
				}
			]
		}
		let xLabelData = []
		let bgData = []
		let innerData = []
		data.forEach(item => {
			xLabelData.push(item.name)
			innerData.push(item.num)
			bgData.push(100)
		})
		let innerTopData = (_data) => {
			let arr = []
			let height = (dom.clientHeight - 126) / 100
			_data.forEach(item => {
				if (item * height > 20) {
					arr.push({
						value: item
					})
				} else {
					arr.push({
						value: item,
						symbolOffset: [0, -25 + item * height]
					})
				}
			})
			return arr
		}
		let innerShadowData = (_data) => {
			let arr = []
			let height = (dom.clientHeight - 126) / 100
			_data.forEach(item => {
				if (item < 100) {
					if (item * height > 20) {
						arr.push({
							value: item
						})
					} else {
						arr.push({
							value: item,
							symbolOffset: [0, -47.5 + item * height]
						})
					}
				} else {
					arr.push({
						value: ''
					})
				}
			})
			return arr
		}
		let option = {
			// animation: false,
			backgroundColor: '',
			grid: {
				top: 10,
				left: 30,
				bottom: 30,
				right: 20,
				containLabel: true
			},
			xAxis: {
				data: xLabelData,
				axisTick: {
					show: false
				},
				axisLine: {
					lineStyle: {
						color: 'rgb(2,185,208)'
					}
				},
				axisLabel: {
					textStyle: {
						color: 'rgb(2,219,227)',
						fontSize: 16,
						fontWeight: 'bold'
					},
					margin: 20,
					interval: 0,
					rotate: 40
				}
			},
			yAxis: {
				axisTick: {
					show: true
				},
				splitLine: {
					show: false
				},
				axisLine: {
					lineStyle: {
						color: 'rgb(2,185,208)'
					}
				},
				axisLabel: {
					textStyle: {
						color: 'rgb(2,185,208)'
					},
					formatter: (value, index) => {
						if (value === 0 || value === 50 || value === 100) {
							return value + '%'
						} else {
							return ''
						}
					}
				},
				splitNumber: 10
			},
			series: [{ //蓝色柱子
				type: 'pictorialBar',
				itemStyle: {
					normal: {
						color: color1
					}
				},
				symbol: 'rect',
				symbolClip: true,
				symbolSize: [15, '100%'],
				symbolOffset: [0, -20],
				symbolPosition: 'start',
				z: 5,
				animation: false,
				data: innerData
			}, { //蓝色柱子顶部椭圆
				type: 'pictorialBar',
				itemStyle: {
					normal: {
						color: 'rgb(51,255,207)'
					}
				},
				symbolSize: [15, 6],
				symbolOffset: [0, -5],
				symbolPosition: 'end',
				z: 6,
				animation: false,
				data: innerTopData(innerData)
			}, { //蓝色柱子底部椭圆
				type: 'pictorialBar',
				itemStyle: {
					normal: {
						color: color1
					}
				},
				symbolSize: [15, 6],
				symbolOffset: [0, -15],
				symbolPosition: 'start',
				z: 5,
				animation: false,
				data: innerData
			}, { //满的背景柱子
				type: 'pictorialBar',
				symbol: 'image://' + img1,
				symbolClip: true,
				// symbolSize: [35, dom.$el.clientHeight - 136],
				symbolSize: [15, '100%'],
				symbolOffset: [0, -20],
				symbolPosition: 'start',
				z: 2,
				animation: false,
				data: bgData
			}, { //满的顶部椭圆
				type: 'pictorialBar',
				itemStyle: {
					normal: {
						color: color2
					}
				},
				symbolSize: [15, 6],
				symbolOffset: [0, -5],
				symbolPosition: 'end',
				z: 3,
				animation: false,
				data: bgData
			}, { //底部投影
				type: 'pictorialBar',
				symbol: 'image://' + img2,
				symbolSize: [25, 10],
				symbolOffset: [0, -8],
				symbolPosition: 'start',
				z: 2,
				animation: false,
				data: bgData
			}]
		}
		return option
	}
	option = bar(barData, document.getElementById('zyxq-charts'))
	zyxqChart.setOption(option)
	$(window).resize(function() {
		zyxqChart.resize()
	});
}
//市委办
swbInit = () => {

	let swbChart = echarts.init(document.getElementById('swb-charts'))
	const CubeLeft = echarts.graphic.extendShape({
		shape: {
			x: 0,
			y: 0
		},
		buildPath: function(ctx, shape) {
			const xAxisPoint = shape.xAxisPoint
			const c0 = [shape.x, shape.y]
			const c1 = [shape.x - 9, shape.y - 9]
			const c2 = [xAxisPoint[0] - 9, xAxisPoint[1] - 9]
			const c3 = [xAxisPoint[0], xAxisPoint[1]]
			ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
		}
	})
	const CubeRight = echarts.graphic.extendShape({
		shape: {
			x: 0,
			y: 0
		},
		buildPath: function(ctx, shape) {
			const xAxisPoint = shape.xAxisPoint
			const c1 = [shape.x, shape.y]
			const c2 = [xAxisPoint[0], xAxisPoint[1]]
			const c3 = [xAxisPoint[0] + 9, xAxisPoint[1] - 9]
			const c4 = [shape.x + 9, shape.y - 9]
			ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
		}
	})
	const CubeTop = echarts.graphic.extendShape({
		shape: {
			x: 0,
			y: 0
		},
		buildPath: function(ctx, shape) {
			const c1 = [shape.x, shape.y]
			const c2 = [shape.x + 9, shape.y - 9]
			const c3 = [shape.x + 9, shape.y - 9]
			const c4 = [shape.x - 9, shape.y - 9]
			ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
		}
	})
	echarts.graphic.registerShape('CubeLeft', CubeLeft)
	echarts.graphic.registerShape('CubeRight', CubeRight)
	echarts.graphic.registerShape('CubeTop', CubeTop)
	const MAX = [6000, 6000, 6000, 6000, 6000, 5000, 4000, 3000]
	const VALUE = [2012, 1230, 3790, 2349, 1654, 1230, 3790, 2349]
	swboption = {
		backgroundColor: "",
		title: {
			text: '',
			top: 32,
			left: 18,
			textStyle: {
				color: '#00F6FF',
				fontSize: 24
			}
		},
		grid: {
			left: 30,
			right: 30,
			bottom: '19%',
			top: 17,
			containLabel: true
		},
		xAxis: {
			type: 'category',
			data: ['德州', '德城区', '陵城区', '禹城市', '乐陵市', '临邑县',
				'平原县', '夏津县'
			],
			axisLine: {
				show: true,
				lineStyle: {
					color: 'white'
				}
			},
			offset: 20,
			axisTick: {
				show: false,
				length: 9,
				alignWithLabel: true,
				lineStyle: {
					color: '#7DFFFD'
				}
			},
			axisLabel: {
				fontSize: 10,
				color: '#fff',
				interval: 0,
				rotate: 30

			}
		},
		yAxis: {
			type: 'value',
			axisLine: {
				show: true,
				lineStyle: {
					color: 'white'
				}
			},
			splitLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				fontSize: 12
			},
			boundaryGap: ['20%', '20%']
		},
		series: [{
			type: 'bar',
			label: {
				normal: {
					show: true,
					position: 'top',
					fontSize: 10,
					color: '#fff',
					offset: [4, -25],
					rotate: 20
				}
			},
			itemStyle: {
				color: 'transparent'
			},
			data: MAX
		}, {
			type: 'custom',
			renderItem: function(params, api) {
				const location = api.coord([api.value(0), api.value(1)])
				return {
					type: 'group',
					children: [{
						type: 'CubeLeft',
						shape: {
							api,
							xValue: api.value(0),
							yValue: api.value(1),
							x: location[0],
							y: location[1],
							xAxisPoint: api.coord([api.value(0), 0])
						},
						style: {
							fill: 'rgba(7,29,97,.6)'
						}
					}, {
						type: 'CubeRight',
						shape: {
							api,
							xValue: api.value(0),
							yValue: api.value(1),
							x: location[0],
							y: location[1],
							xAxisPoint: api.coord([api.value(0), 0])
						},
						style: {
							fill: 'rgba(10,35,108,.7)'
						}
					}, {
						type: 'CubeTop',
						shape: {
							api,
							xValue: api.value(0),
							yValue: api.value(1),
							x: location[0],
							y: location[1],
							xAxisPoint: api.coord([api.value(0), 0])
						},
						style: {
							fill: 'rgba(11,42,106,.8)'
						}
					}]
				}
			},
			data: MAX
		}, {
			type: 'custom',
			renderItem: (params, api) => {
				const location = api.coord([api.value(0), api.value(1)])
				return {
					type: 'group',
					children: [{
						type: 'CubeLeft',
						shape: {
							api,
							xValue: api.value(0),
							yValue: api.value(1),
							x: location[0],
							y: location[1],
							xAxisPoint: api.coord([api.value(0), 0])
						},
						style: {
							fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#3B80E2'
								},
								{
									offset: 1,
									color: '#49BEE5'
								}
							])
						}
					}, {
						type: 'CubeRight',
						shape: {
							api,
							xValue: api.value(0),
							yValue: api.value(1),
							x: location[0],
							y: location[1],
							xAxisPoint: api.coord([api.value(0), 0])
						},
						style: {
							fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#3B80E2'
								},
								{
									offset: 1,
									color: '#49BEE5'
								}
							])
						}
					}, {
						type: 'CubeTop',
						shape: {
							api,
							xValue: api.value(0),
							yValue: api.value(1),
							x: location[0],
							y: location[1],
							xAxisPoint: api.coord([api.value(0), 0])
						},
						style: {
							fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#3B80E2'
								},
								{
									offset: 1,
									color: '#49BEE5'
								}
							])
						}
					}, ]
				}
			},
			data: VALUE
		}, ]
	}
	swbChart.setOption(swboption)
	$(window).resize(function() {
		swbChart.resize()
	});
}
zxInit = () => {
	let zxChart = echarts.init(document.getElementById('zx-charts'))
	// var graph = {
	// 	"nodes": [{
	// 		"id": "0",
	// 		"name": "Myriel",
	// 		"symbolSize": 28.685715,
	// 		"itemStyle": {
	// 			"normal": {
	// 				"color": "#00C6FF"
	// 			}
	// 		},
	// 	},
	// 	{
	// 		"id": "1",
	// 		"name": "Myriel",
	// 		"symbolSize": 28.685715,
	// 		"itemStyle": {
	// 			"normal": {
	// 				"color": "#00C6FF"
	// 			}
	// 		},
	// 	},{
	// 		"id": "2",
	// 		"name": "Myriel",
	// 		"symbolSize": 28.685715,
	// 		"itemStyle": {
	// 			"normal": {
	// 				"color": "#00C6FF"
	// 			}
	// 		},
	// 	}],
	// 	links: [{
	// 		"id": "0",
	// 		"name": null,
	// 		"source": "1",
	// 		"target": "0",
	// 		"lineStyle": {
	// 			"normal": {}
	// 		}
	// 	},{
	// 		"id": "1",
	// 		"name": null,
	// 		"source": "1",
	// 		"target": "2",
	// 		"lineStyle": {
	// 			"normal": {}
	// 		}
	// 	},{
	// 		"id": "2",
	// 		"name": null,
	// 		"source": "2",
	// 		"target": "0",
	// 		"lineStyle": {
	// 			"normal": {}
	// 		}
	// 	}]
	// }
	var graph = {
		"nodes": [{
				"id": "0",
				"name": "办公室（审计室）",
				//"symbolSize": 28.685715,
				"itemStyle": {
					"normal": {
						"color": "#00C6FF"
					}
				},
				"attributes": {
					"modularity_class": 0
				},
				 "symbolSize": 40,
				"x": -418.08344,
				"y": 446.8853,
			},
			{
				"id": "1",
				"name": "党群工作部",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 4,
				"symbolSize": 30,
				"x": -418.08344,
				"y": 446.8853,
				"attributes": {
					"modularity_class": 0
				}
			}, {
				"id": "2",
				"name": "发展改革处",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 9.485714,
				"symbolSize": 30,
				"x": -212.76357,
				"y": 245.29176,
				"attributes": {
					"modularity_class": 1
				}
			}, {
				"id": "3",
				"name": "制度创新和风险防范处",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 9.485714,
				"symbolSize": 30,
				"x": -242.82404,
				"y": 235.26283,
				"attributes": {
					"modularity_class": 1
				}
			}, {
				"id": "4",
				"name": "高新产业和科技创新处",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 4,
				"symbolSize": 30,
				"x": -379.30386,
				"y": 429.06424,
				"attributes": {
					"modularity_class": 0
				}
			}, {
				"id": "5",
				"name": "金融贸易处",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 4,
				"symbolSize": 30,
				"x": -417.26337,
				"y": 406.03506,
				"attributes": {
					"modularity_class": 0
				}
			}, {
				"id": "6",
				"name": "商业和文体旅游处",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 4,
				"symbolSize": 30,
				"x": -332.6012,
				"y": 485.16974,
				"attributes": {
					"modularity_class": 0
				}
			}, {
				"id": "7",
				"name": "财政处",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 4,
				"symbolSize": 30,
				"x": -382.69568,
				"y": 475.09113,
				"attributes": {
					"modularity_class": 0
				}
			}, {
				"id": "8",
				"name": "特殊综合保税区处",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 4,
				"symbolSize": 30,
				"x": -320.384,
				"y": 387.17325,
				"attributes": {
					"modularity_class": 0
				}
			}, {
				"id": "9",
				"name": "规划和自然资源处",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 4,
				"symbolSize": 30,
				"x": -344.39832,
				"y": 451.16772,
				"attributes": {
					"modularity_class": 0
				}
			}, {
				"id": "10",
				"name": "建设和交通管理处",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 4,
				"symbolSize": 30,
				"x": -89.34107,
				"y": 234.56128,
				"attributes": {
					"modularity_class": 1
				}
			}, {
				"id": "11",
				"name": "生态和市容管理处",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 100,
				"symbolSize": 30,
				"x": -87.93029,
				"y": -6.8120565,
				"attributes": {
					"modularity_class": 1
				}
			}, {
				"id": "12",
				"name": "应急管理处",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 6.742859,
				"symbolSize": 30,
				"x": -339.77908,
				"y": -184.69139,
				"attributes": {
					"modularity_class": 1
				}
			}, {
				"id": "13",
				"name": "综合治理处",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 4,
				 "symbolSize": 20,
				"x": -194.31313,
				"y": 178.55301,
				"attributes": {
					"modularity_class": 1
				}
			}, {
				"id": "14",
				"name": "社会发展处",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 4,
				 "symbolSize": 20,
				"x": -158.05168,
				"y": 201.99768,
				"attributes": {
					"modularity_class": 1
				}
			}, {
				"id": "15",
				"name": "市场监督管理局",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 4,
				 "symbolSize": 20,
				"x": -127.701546,
				"y": 242.55057,
				"attributes": {
					"modularity_class": 1
				}
			}, {
				"id": "16",
				"name": "投资促进服务中心",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 25.942856,
				 "symbolSize": 20,
				"x": -385.2226,
				"y": -393.5572,
				"attributes": {
					"modularity_class": 2
				}
			}, {
				"id": "17",
				"name": "审批审查中心",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 20.457146,
				 "symbolSize": 20,
				"x": -516.55884,
				"y": -393.98975,
				"attributes": {
					"modularity_class": 2
				}
			}, {
				"id": "18",
				"name": "行政服务中心",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 20.457146,
				 "symbolSize": 20,
				"x": -464.79382,
				"y": -493.57944,
				"attributes": {
					"modularity_class": 2
				}
			}, {
				"id": "19",
				"name": "临港新城投资建设有限公司 ",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 20.457146,
				 "symbolSize": 20,
				"x": -515.1624,
				"y": -456.9891,
				"attributes": {
					"modularity_class": 2
				}
			}, {
				"id": "20",
				"name": "城市运行管理中心 ",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 20.457146,
				 "symbolSize": 20,
				"x": -408.12122,
				"y": -464.5048,
				"attributes": {
					"modularity_class": 2
				}
			}, {
				"id": "21",
				"name": "市大数据中心",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 20.457146,
				"symbolSize": 30,
				"x": -456.44113,
				"y": -425.13303,
				"attributes": {
					"modularity_class": 2
				}
			}, {
				"id": "22",
				"name": "市公共信用中心",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 20.457146,
				"symbolSize": 30,
				"x": -459.1107,
				"y": -362.5133,
				"attributes": {
					"modularity_class": 2
				}
			}, {
				"id": "23",
				"name": "企业",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 42.4,
				"symbolSize": 20,
				"x": -313.42786,
				"y": -289.44803,
				"attributes": {
					"modularity_class": 2
				}
			}, {
				"id": "24",
				"name": "第三方",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 31.428574,
				"symbolSize": 30,
				"x": 4.6313396,
				"y": -273.8517,
				"attributes": {
					"modularity_class": 7
				}
			}
			/*, {
				"id": "25",
				"name": "卡卡罗特",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 45.142853,
				"symbolSize": 30,
				"x": 82.80825,
				"y": -203.1144,
				"attributes": {
					"modularity_class": 7
				}
			}, {
				"id": "26",
				"name": "圣斗士星矢",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 31.428574,
				"symbolSize": 30,
				"x": 78.64646,
				"y": -31.512747,
				"attributes": {
					"modularity_class": 6
				}
			}, {
				"id": "27",
				"name": "主题信息",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 47.88571,
				 "symbolSize": 40,
				"x": -81.46074,
				"y": -204.20204,
				"attributes": {
					"modularity_class": 7
				}
			}, {
				"id": "28",
				"name": "罗睺",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 12.228573,
				"symbolSize": 30,
				"x": -225.73984,
				"y": 82.41631,
				"attributes": {
					"modularity_class": 4
				}
			}, {
				"id": "29",
				"name": "东皇太一",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 23.2,
				"symbolSize": 30,
				"x": -385.6842,
				"y": -20.206686,
				"attributes": {
					"modularity_class": 3
				}
			}, {
				"id": "30",
				"name": "花生酱",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 6.742859,
				 "symbolSize": 40,
				"x": -403.92447,
				"y": -197.69823,
				"attributes": {
					"modularity_class": 2
				}
			}, {
				"id": "31",
				"name": "你大爷",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 12.228573,
				"symbolSize": 30,
				"x": -281.4253,
				"y": -158.45137,
				"attributes": {
					"modularity_class": 2
				}
			}, {
				"id": "32",
				"name": "说谁呢",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 4,
				"symbolSize": 30,
				"x": -122.41348,
				"y": 210.37503,
				"attributes": {
					"modularity_class": 1
				}
			}, {
				"id": "33",
				"name": "哈哈哈",
				"itemStyle": {
					"normal": {
						"color": "rgb(236,81,72)"
					}
				},
				//"symbolSize": 6.742859,
				"symbolSize": 20,
				"x": -234.6001,
				"y": -113.15067,
				"attributes": {
					"modularity_class": 1
				}
			},*/
		],		
		"links":[{"id":"76","name":null,"source":0,"target":15,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":1,"target":16,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":2,"target":17,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":3,"target":18,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":4,"target":19,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":5,"target":20,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":6,"target":21,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":7,"target":22,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":8,"target":23,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":9,"target":24,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":10,"target":25,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":11,"target":26,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":12,"target":27,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":13,"target":28,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":14,"target":29,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":15,"target":30,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":16,"target":31,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":17,"target":32,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":18,"target":33,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":19,"target":34,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":20,"target":1,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":21,"target":2,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":22,"target":3,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":23,"target":4,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":24,"target":5,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":25,"target":6,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":26,"target":7,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":27,"target":8,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":28,"target":9,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":29,"target":10,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":30,"target":11,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":31,"target":12,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":32,"target":13,"lineStyle":{"normal":{}}},{"id":"76","name":null,"source":33,"target":14,"lineStyle":{"normal":{}}}]
	}
	var dataLL = []
	for (var index = 0; index < graph.nodes.length; index++) {
		dataLL.push({
			// "id": "76",
			"name": null,
			"source": index,
			"target": index + (Math.ceil(graph.nodes.length/2)-3) > graph.nodes.length ? (Math.ceil(graph.nodes.length/2)-3) + index-graph.nodes.length : index + (Math.ceil(graph.nodes.length/2)-3),
			"lineStyle": {
				"normal": {}
			}
		})
	}
	graph.links=dataLL
	console.log(graph)
	// console.log(JSON.stringify(dataLL))
	var categories = [];
	for (var i = 0; i < 9; i++) {
		categories[i] = {
			name: '类目' + i
		};
	}
	graph.nodes.forEach(function(node) {
		// var x = 300,
		// 	y = 200,
		// 	a = 200,
		// 	b = 130,
		// 	du = 360,
		// 	z = 0;
		// var numId = parseInt(node.id)
		// var i = 360 / graph.nodes.length * numId
		// var hudu = (Math.PI / 180) * i,
		// 	x1 = a * Math.sin(hudu) + x - 2,
		// 	y1 = y - (b * Math.cos(hudu)) - 2;
		// node.x = x1;
		// node.y = y1
		node.itemStyle = null;
		node.value = node.symbolSize;
		node.symbolSize /= 1.5;
		node.label = {
			normal: {
				show: node.symbolSize > 10
			}
		};
		node.category = node.attributes.modularity_class;
	});
	zxoption = {
		xAxis: {
			show: false,
			type: "value"
		},
		yAxis: {
			show: false,
			type: "value"
		},
		tooltip: {
			show:false
		},
		animationDurationUpdate: 1500,
		animationEasingUpdate: 'quinticInOut',
		series: [{
			name: 'Les Miserables',
			type: 'graph',
			layout: 'circular',
			zoom :1.4,
			circular: {
				rotateLabel: true
			},
			itemStyle: {
				normal: {
					color: '#00C6FF'
				}
			},
			data: graph.nodes,
			links: graph.links,
			categories: categories,
			roam: false,
			label: {
				position: 'right',
				formatter: '{b}'
			},
			lineStyle: {
				color: 'source',
				curveness: 0.3
			}
		}]
	};

	zxChart.setOption(zxoption)
	$(window).resize(function() {
		zxChart.resize()
	});
}
