layui.config({ base: './echarts/' }).use('echarts', function () {
    const element = layui.element
    const echarts = layui.echarts
    const $ = layui.jquery
    const color = ['#258DFF', '#66DAA7', '#FDBE59', '#67BBFF', '#C56FF9']
    // 安全标签 ok
    let safetyLabel = null;
    let safetyLabelOption = {}
    const getDataSafety = () => {
        // 请求数据
        // 安全标签
        safetyLabel = echarts.init(document.getElementById('safetyLabel'));
        safetyLabelOption = {
            color,
            tooltip: {
                trigger: "item",
                formatter: function (params) {
                    return `<div>${params.data.name}</div><div>数量：${params.data.value}</div><div>占比：${params.data.pre}</div>` 
                }
            },
            series: [
                {
                    type: 'treemap',
                    breadcrumb: {
                        show: false
                    },
                    data: [],
                    label: {
                        show: true
                    },
                    roam:'move',
                    // nodeClick: false, //点击节点后的行为,false无反应
                }
            ]
        };
        // 获取的数据添加到option中
        let data = [
            {
                name: '安全一级',
                value: '5',
                pre: '5%'
            },
            {
                name: '安全二级',
                value: '500',
                pre: '5%'
            },
            {
                name: '安全三级',
                value: '95',
                pre: '5%'
            },
            {
                name: '安全四级',
                value: '55',
                pre: '5%'
            },
            {
                name: '安全五级',
                value: '15',
                pre: '5%'
            },
            {
                name: '安全六级',
                value: '25',
                pre: '5%'
            },
            {
                name: '安全七级',
                value: '5',
                pre: '5%'
            },
            {
                name: '安全八级',
                value: '115',
                pre: '5%'
            }
        ]
        safetyLabelOption.series[0].data = data
        safetyLabel.setOption(safetyLabelOption);
    }
    // 热度排名 ok
    const getHot = () => {
        // 接口 业务表 0 注意传参
        let obj = { text: "通用码表", total: 1000, num: 990, pre: '99%' }
        let res = []
        for (let i = 0; i < 10; i++) {
            res.push(obj)
        }
        let element = ''
        res.forEach((item, index) => {
            element += `
                <div class="progress-box">
                    <div class="progress-sort">TOP${index + 1}</div>
                    <div class="progress-content">
                        <div class="progress-title">
                            <span class="name">${item.text}</span>
                            <span class="num">${item.num}</span>
                        </div>
                        <div class="layui-progress layui-progress-myself">
                            <div class="layui-progress-bar" lay-percent="${item.pre}" style="width: ${item.pre};"></div>
                        </div>
                    </div>
                </div>`
        })
        $('#businessTable').append(element)
        // 接口 码表 1 注意传参
        let obj1 = { text: "通用码表", total: 1000, num: 880, pre: '88%' }
        let res1 = []
        for (let i = 0; i < 10; i++) {
            res1.push(obj1)
        }
        let element1 = ''
        res1.forEach((item, index) => {
            element1 += `
                <div class="progress-box">
                    <div class="progress-sort">TOP${index + 1}</div>
                    <div class="progress-content">
                        <div class="progress-title">
                            <span class="name">${item.text}</span>
                            <span class="num">${item.num}</span>
                        </div>
                        <div class="layui-progress layui-progress-myself">
                            <div class="layui-progress-bar" lay-percent="${item.pre}" style="width: ${item.pre};"></div>
                        </div>
                    </div>
                </div>`
        })
        $('#businessTable1').append(element1)

    }
    // 数据需求 ok
    let dataNeed = null
    let dataNeedLabelOption = {}
    const getDataNeed = () => {
        // 调用接口 注意默认月份
        dataNeed = echarts.init(document.getElementById('dataNeed'));
        dataNeedLabelOption = {
            // color: ['#258DFF', '#FDBE59', '#C56FF9', '#66DAA7'],
            color,
            title: {
                show: false,
                text: '总数',
                subtext: '8644',
                x: 'center',
                y: '45%',
                textStyle: {
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#8C9095'
                },
                subtextStyle: {
                    color: '#000',
                    fontSize: 26,
                    fontWeight: 600,
                },
            },
            tooltip: {
                trigger: 'item'
            },
            legend: [{
                show: true,
                data: ['总量', '新增量'],
                left: 'left',
            }, {
                show: false,
                data: ['审核中', '已完成', '已终止'],
                orient: 'vertical',
                left: '80%',
                top: 'center',
                icon: "circle",
                textStyle: {
                    color: '#121212',
                    fontSize: 16,
                    fontWeight: 500,
                }
            }],
            xAxis: {
                type: 'category',
                data: [],
                show: true
            },
            yAxis: [
                {
                    show: true,
                    type: 'value',
                    name: "(个)",
                    splitLine: {
                        lineStyle: {
                            color: '#DCDCDC',
                            type: 'dashed',
                        }
                    },
                }
            ],
            series: [
                {
                    show: true,
                    name: '总量',
                    type: 'bar',
                    barWidth: 16,
                    stack: 'Total',
                    emphasis: {
                        focus: 'series'
                    },
                    data: [],
                    areaStyle: {
                        color: '#248FFF12'
                    },
                },
                {
                    show: true,
                    name: '新增量',
                    type: 'bar',
                    barWidth: 16,
                    stack: 'Total',
                    emphasis: {
                        focus: 'series'
                    },
                    data: [],
                    areaStyle: {
                        color: '#70E3BF12'
                    },
                },
            ]
        }
        // 接口返回值赋值
        // 需求量
        dataNeedLabelOption.xAxis.data = ['1月', '2月', '3月', '4月', '5月', '6月'];
        dataNeedLabelOption.series[0].data = [120, 132, 101, 134, 90, 230]
        dataNeedLabelOption.series[1].data = [220, 182, 191, 234, 290, 330]
        dataNeed.setOption(dataNeedLabelOption);
    }
    // 数据标准 ok
    let dataStandard = null;
    let dataStandardOption = {}
    const getDataStandard = () => {
        dataStandard = echarts.init(document.getElementById('dataStandard'));
        dataStandardOption = {
            // color: ['#70E3BF', '#248FFF', '#FDBE59','#d61fdf'],
            color,
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['新增量', '总量', '变更量', '落标率'],
                left: 'left'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: []
            },
            yAxis: [
                {
                    type: 'value',
                    name: "(个)",
                    splitLine: {
                        lineStyle: {
                            color: '#DCDCDC',
                            type: 'dashed',
                        }
                    }
                },
                {
                    show: true,
                    type: 'value',
                    name: '落标率',
                    min: 0,
                    max: 100,
                    interval: 10,
                    axisLabel: {
                        formatter: '{value} %'
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#DCDCDC',
                            type: 'dashed',
                        }
                    }
                }
            ],
            series: [
                {
                    name: '新增量',
                    type: 'bar',
                    barWidth: 16,
                    stack: 'Total',
                    emphasis: {
                        focus: 'series'
                    },
                    data: [],
                    areaStyle: {
                        color: '#70E3BF12'
                    },
                },
                {
                    name: '总量',
                    type: 'bar',
                    barWidth: 16,
                    stack: 'Total',
                    emphasis: {
                        focus: 'series'
                    },
                    data: [],
                    areaStyle: {
                        color: '#248FFF12'
                    },
                },
                {
                    name: '变更量',
                    type: 'bar',
                    barWidth: 16,
                    stack: 'Total',
                    emphasis: {
                        focus: 'series'
                    },
                    data: [],
                    areaStyle: {
                        color: '#FDBE5912'
                    },
                },
                {
                    name: '落标率',
                    type: 'line',
                    yAxisIndex: 1,
                    //stack: 'Total',
                    tooltip: {
                        valueFormatter: function (value) {
                            return value + '%';
                        }
                    },
                    data: []

                }
            ]
        };
        dataStandardOption.xAxis.data = ['1月', '2月', '3月', '4月', '5月', '6月'];
        dataStandardOption.series[0].data = [120, 132, 101, 134, 90, 230]
        dataStandardOption.series[1].data = [220, 182, 191, 234, 290, 330]
        dataStandardOption.series[2].data = [150, 232, 201, 154, 190, 330]
        dataStandardOption.series[3].data = [75, 23, 51, 15.4, 19, 33]
        dataStandard.setOption(dataStandardOption);
    }
    // 数据服务 ok
    let dataService = null;
    let dataServiceOption = {}
    const getDataService = () => {
        // 调用接口
        dataService = echarts.init(document.getElementById('dataService'));
        dataServiceOption = {
            color,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                left: 'left'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: []
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: "(个)",
                    splitLine: {
                        lineStyle: {
                            color: '#DCDCDC',
                            type: 'dashed'
                        }
                    }
                }
            ],
            series: [
                {
                    name: '总量',
                    type: 'bar',
                    barWidth: 16,
                    stack: '总量',
                    emphasis: {
                        focus: 'series'
                    },
                    data: []
                },
                {
                    name: '新增量',
                    type: 'bar',
                    barWidth: 16,
                    stack: '趋势图',
                    emphasis: {
                        focus: 'series'
                    },
                    data: []
                },
                {
                    name: '服务活跃数',
                    type: 'bar',
                    barWidth: 16,
                    stack: '趋势图',
                    emphasis: {
                        focus: 'series'
                    },
                    data: []
                },
                {
                    name: '服务流失量',
                    type: 'bar',
                    barWidth: 16,
                    stack: '趋势图',
                    emphasis: {
                        focus: 'series'
                    },
                    data: []
                },
            ]
        };
        // 6个月
        dataServiceOption.xAxis[0].data = ['1月', '2月', '3月', '4月', '5月', '6月']
        // 总量
        dataServiceOption.series[0].data = [620, 732, 701, 734, 1090, 1130]
        // 新增量
        dataServiceOption.series[1].data = [120, 132, 101, 134, 290, 230]
        // 服务活跃量
        dataServiceOption.series[2].data = [60, 72, 71, 74, 190, 130]
        // 服务流失量
        dataServiceOption.series[3].data = [60, 72, 71, 74, 190, 130]
        dataService.setOption(dataServiceOption);
    }
    // 服务调用量 ok
    let serviceCall = null;
    let serviceCallOption = {}
    const getServiceCall = () => {
        serviceCall = echarts.init(document.getElementById('serviceCall'));
        serviceCallOption = {
            color,
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                left: 'left'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: []
            },
            yAxis: [{
                type: 'value',
                name: '(次)',
                splitLine: {
                    lineStyle: {
                        color: '#DCDCDC',
                        type: 'dashed'
                    }
                }
            }
            , {
                show:false,
                type: 'value',
                name: '费用',
                position: "right",
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#DCDCDC',
                        type: 'dashed',
                    }
                }
            }
        ],
            series: [
                {
                    name: '接口',
                    type: 'line',
                    data: [],
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 10,
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 3
                    },
                    lineStyle: {
                        width: 3
                    }
                },
                {
                    // yAxisIndex: 1,
                    name: '订阅',
                    type: 'line',
                    data: [],
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 10,
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 3
                    },
                    lineStyle: {
                        width: 3
                    }
                },
                {
                    name: '推送',
                    type: 'line',
                    data: [],
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 10,
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 3
                    },
                    lineStyle: {
                        width: 3
                    }
                }
            ]
        };
        // 6个月
        serviceCallOption.xAxis.data = ['1月', '2月', '3月', '4月', '5月', '6月']
        // 接口
        serviceCallOption.series[0].data = [120, 132, 101, 134, 90, 230]
        // 订阅
        serviceCallOption.series[1].data = [220, 182, 191, 234, 290, 330]
        // 推送
        serviceCallOption.series[2].data = [320, 142, 121, 154, 280, 340]
        serviceCall.setOption(serviceCallOption);
    }
    // 数据质量 ok
    const getDataQuality = () => {
        // 请求数据质量的接口，并获取返回值
        let req = {
            rule: '100',
            task: '200',
            controlled: '1,259',
            question: "2,568",
            pre: '90%'
        }
        $('#rule').text(req.rule)
        $('#task').text(req.task)
        $('#controlled').text(req.controlled)
        $('#question').text(req.question)
        $('#Proportion').text(req.pre)
    }
    // 质量问题解决分布 ok

    let quality = null
    let qualityOption = {}
    const getQuality = () => {
        // 此处调用接口，获取数据 注意月份传参
        quality = echarts.init(document.getElementById('quality'));
        qualityOption = option = {
            color,
            title: {
                text: '问题总数',
                subtext: 0,
                x: '34%',
                y: '45%',
                textAlign: 'center',
                textStyle: {
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#8C9095'
                },
                subtextStyle: {
                    color: '#000',
                    fontSize: 26,
                    fontWeight: 600,
                },
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: '70%',
                top: 'center',
                icon: "circle",
                itemWidth: 10,
                itemGap: 30,
                formatter: function (name) {
                    let data = option.series[0].data
                    let all = 0
                    let pre = 0
                    data.forEach(item => {
                        all += item.value
                    })
                    let item = data.filter(item => {
                        if (item.name === name) {
                            return item
                        }
                    })
                    if (item.length) {
                        pre = (item[0].value / all * 100).toFixed(2) + '%'
                        return `${name}  ${item[0].value}个  ${pre}`
                    } else {
                        return name
                    }
                },
                textStyle: {
                    color: '#121212',
                    fontSize: 16,
                    fontWeight: 500,
                }

            },
            series: [
                {
                    name: '质量问题解决分布',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    center: ['35%', '50%'],
                    data: [
                        { value: 0, name: '已解决' },
                        { value: 0, name: '解决中' },
                        { value: 0, name: '未解决' },
                    ],
                    label: {
                        formatter: '{b|{c}} \n {per|{d}%}',
                        rich: {
                            b: {
                                color: '#000000',
                                fontSize: 18,
                                fontWeight: 500,
                            },
                            per: {
                                color: '#999999',
                                fontSize: 16,
                                fontWeight: 400,
                            }
                        }
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        // 获取的数据在此处进行拼接
        qualityOption.series[0].data = [
            { value: 1048, name: '已解决' },
            { value: 735, name: '解决中' },
            { value: 580, name: '未解决' },
        ]
        // 计算总数或者接口返回总数
        qualityOption.title.subtext = handleSum(qualityOption.series[0].data)
        quality.setOption(qualityOption);
    }

    // 初始化请求数据（使用接口）
    getDataSafety();
    getHot()
    getDataNeed();
    getDataStandard();
    getDataService();
    getServiceCall();
    getDataQuality()
    getQuality();



    // 数据标准改变标准类型事件（使用接口）
    element.on('tab(dataStandard)', function (data) {
        // index 0 基础标准 默认  1 报文标准  2 指标标准
        let index = data.index;
        if (index == 0) {
            dataStandardOption.legend.data = ['新增量', '总量', '变更量', '落标率']
            dataStandardOption.yAxis[1].show = true
            dataStandardOption.xAxis = ['二月', '三月', '四月', '五月', '六月', '七月']
            dataStandardOption.series[0].data = [220, 182, 191, 234, 290, 330]
            dataStandardOption.series[1].data = [150, 232, 201, 154, 190, 330]
            dataStandardOption.series[2].data = [120, 132, 101, 134, 90, 230]
            dataStandardOption.series[3].data = [20, 32, 61, 34, 90, 50]
        } else {
            dataStandardOption.yAxis[1].show = false
            dataStandardOption.legend.data = ['新增量', '总量', '变更量']
            dataStandardOption.xAxis = ['二月', '三月', '四月', '五月', '六月', '七月']
            dataStandardOption.series[0].data = [20, 18, 11, 234, 90, 30]
            dataStandardOption.series[1].data = [150, 232, 21, 14, 90, 30]
            dataStandardOption.series[2].data = [10, 32, 11, 134, 90, 30]
            dataStandardOption.series[3].data = []
        }
        dataStandard.setOption(dataStandardOption);
    });

    // 数据需求点击选择月份change事件（使用接口）
    // $("#dataNeedSelect").on("change", function () {
    //     // 。。。。。。。根据改变的月份传参调用接口请求数据,并重新渲染echarts
    //     dataNeedLabelOption.series[0].data = [
    //         { value: 1, name: '需求总量' },
    //         { value: 2, name: '新增需求' },
    //         { value: 3, name: '审核中' },
    //         { value: 4, name: '已完成' },
    //         { value: 5, name: '已终止' }
    //     ]
    //     dataNeedLabelOption.title.subtext = handleSum(dataNeedLabelOption.series[0].data)
    //     dataNeed.setOption(dataNeedLabelOption);
    // });
    element.on('tab(dataNeed)', function (data) {
        // index 0 需求量 默认  1 状态  
        let index = data.index;
        if (index == 0) {
            dataNeed.clear()
            dataNeedLabelOption.title.show = false;
            dataNeedLabelOption.legend[0].show = true
            dataNeedLabelOption.legend[1].show = false
            dataNeedLabelOption.xAxis.show = true
            dataNeedLabelOption.yAxis[0].show = true
            dataNeedLabelOption.series = [
                {
                    show: true,
                    name: '新增量',
                    type: 'bar',
                    barWidth: 16,
                    stack: 'Total',
                    emphasis: {
                        focus: 'series'
                    },
                    data: [],
                    areaStyle: {
                        color: '#70E3BF12'
                    },
                },
                {
                    show: true,
                    name: '总量',
                    type: 'bar',
                    barWidth: 16,
                    stack: 'Total',
                    emphasis: {
                        focus: 'series'
                    },
                    data: [],
                    areaStyle: {
                        color: '#248FFF12'
                    },
                },
            ]

            dataNeedLabelOption.xAxis.data = ['1月', '2月', '3月', '4月', '5月', '6月'];
            dataNeedLabelOption.series[0].data = [120, 132, 101, 134, 90, 230]
            dataNeedLabelOption.series[1].data = [220, 182, 191, 234, 290, 330]
        } else {
            dataNeed.clear()
            dataNeedLabelOption.series = []
            // 饼图
            dataNeedLabelOption.title.show = true;
            dataNeedLabelOption.legend[0].show = false
            dataNeedLabelOption.legend[1].show = true
            dataNeedLabelOption.xAxis.show = false
            dataNeedLabelOption.xAxis.data = []
            dataNeedLabelOption.yAxis[0].show = false
            dataNeedLabelOption.series[0] = {
                show: false,
                name: '数据需求',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                data: [],
                label: {
                    formatter: '{b|{c}} \n {per|{d}%}',
                    rich: {
                        b: {
                            color: '#000000',
                            fontSize: 18,
                            fontWeight: 500,
                        },
                        per: {
                            color: '#999999',
                            fontSize: 16,
                            fontWeight: 400,
                        }
                    }
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
            dataNeedLabelOption.series[0].data = [
                { value: 580, name: '审核中' },
                { value: 484, name: '已完成' },
                { value: 300, name: '已终止' }
            ]
            dataNeedLabelOption.title.subtext = handleSum(dataNeedLabelOption.series[0].data)
            console.log(dataNeedLabelOption, '=====')

        }
        dataNeed.setOption(dataNeedLabelOption);
    });


    // 质量问题解决分布点击选择月份change事件（使用接口）
    $("#qualitySelect").on("change", function () {
        // 。。。。。。。根据改变的月份传参调用接口请求数据,并重新渲染echarts
        qualityOption.series[0].data = [
            { value: 1, name: '已解决' },
            { value: 2, name: '解决中' },
            { value: 3, name: '未解决' },]
        qualityOption.title.subtext = handleSum(qualityOption.series[0].data)
        quality.setOption(qualityOption);
    });
    // 传入数组，return 总数
    function handleSum(arr) {
        if (arr.length && typeof (arr[0]) === 'number') {
            let sum = 0
            arr.forEach(item => {
                sum += item
            })
            return sum
        } else if (arr.length) {
            let sum = 0
            arr.forEach(item => {
                sum += item.value
            })
            return sum
        } else {
            return 0
        }
    }
    // 更新数据 预留（可能的轮询）
    // 数据更新调用此处方法，可以避免echarts重新init 节省性能 代码
    const setDataSafety = () => {
        safetyLabel.setOption(safetyLabelOption);
    }
    const setHot = () => {

    }
    const setDataNeed = () => {
        dataNeed.setOption(dataNeedLabelOption);
    }
    const setDataStandard = () => {
        dataStandard.setOption(dataStandardOption);
    }
    const setDataService = () => {
        dataService.setOption(dataServiceOption);
    }
    const setServiceCall = () => {
        serviceCall.setOption(serviceCallOption);
    }
    const setDataQuality = () => {

    }
    const setQuality = () => {
        quality.setOption(qualityOption);
    }
    window.onresize = function () {
        safetyLabel.resize()
        dataNeed.resize()
        dataStandard.resize()
        dataService.resize()
        serviceCall.resize()
        quality.resize()
    }
});