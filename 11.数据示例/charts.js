
        $(document).ready(() => {
            chartsInit()
            renderList()
            rankInit()
            dropDownInit()
        })
        chartsInit = () => {
            var growthChart = echarts.init(document.getElementById('growth-chart'));
            var assetsChart = echarts.init(document.getElementById('assets-chart'));
            var serverChart = echarts.init(document.getElementById('server-chart'));
            var healthChart = echarts.init(document.getElementById('health-chart'));
            growthChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                legend: {
                    itemWidth: 7,
                    itemHeight: 7,
                    top: 5,
                    data: ['新增条数', '变更条数', '总条数']
                },
                grid: {
                    x: 0,
                    y: 40,
                    width: '95%',
                    height: '80%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: ['03-01', '03-02', '03-03', '03-04', '03-05', '03-06', '03-07'],
                    axisPointer: {
                        type: 'shadow'
                    },
                    axisLabel: {
                        color: '#333',
                        fontSize: 10
                    }
                }],
                yAxis: [{
                        type: 'value',
                        name: '条数(万)',
                        min: 0,
                        max: 250,
                        interval: 50,
                        axisLabel: {
                            color: '#333',
                            formatter: '{value} 万'
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#ccc"
                            }
                        },
                        axisTick: {
                            show: false
                        }
                    },
                    {
                        type: 'value',
                        name: '',
                        min: 0,
                        max: 25,
                        interval: 5,
                        axisLabel: {
                            color: '#333',
                            formatter: '{value} 亿'
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#ccc"
                            }
                        },
                        axisTick: {
                            show: false
                        }
                    }
                ],
                series: [{
                        name: '新增条数',
                        type: 'bar',
                        color: '#2997EF',
                        barMaxWidth: 10,
                        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6] //, 162.2, 32.6, 20.0, 6.4, 3.3
                    },
                    {
                        name: '变更条数',
                        type: 'bar',
                        color: '#3F53B1',
                        barMaxWidth: 10,
                        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6] //, 182.2, 48.7, 18.8, 6.0, 2.3
                    },
                    {
                        name: '总条数',
                        type: 'line',
                        color: '#FC9626',
                        symbolSize: 8,
                        itemStyle: {
                            normal: {
                                borderWidth: 1
                            }
                        },
                        yAxisIndex: 1,
                        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3] //, 23.4, 23.0, 16.5, 12.0, 6.2
                    }
                ]
            })

            assetsChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                legend: {
                    itemWidth: 7,
                    itemHeight: 7,
                    left: 0,
                    top: 5,
                    data: ['新增', '修改', '删除']
                },
                grid: {
                    x: 0,
                    y: 40,
                    width: '95%',
                    height: '80%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                    axisPointer: {
                        type: 'shadow'
                    },
                    axisLabel: {
                        color: '#333',
                        fontSize: 10
                    }
                }],
                yAxis: [{
                    type: 'value',
                    name: '',
                    axisLabel: {
                        color: '#333',
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#ccc"
                        }
                    },
                    axisTick: {
                        show: false
                    }
                }],
                series: [{
                        name: '新增',
                        type: 'bar',
                        stack: 'num',
                        color: '#1ACDA6',
                        barMaxWidth: 15,
                        data: [2, 3, 8, 6, 10, 5, 3] //, 162.2, 32.6, 20.0, 6.4, 3.3
                    },
                    {
                        name: '修改',
                        type: 'bar',
                        stack: 'num',
                        color: '#2997EF',
                        barMaxWidth: 15,
                        data: [3, 2, 2, 1, 3, 5, 7] //, 182.2, 48.7, 18.8, 6.0, 2.3
                    },
                    {
                        name: '删除',
                        type: 'bar',
                        stack: 'num',
                        color: '#3F53B1',
                        barMaxWidth: 15,
                        data: [5, 4, 3, 5, 5, 2, 6] //, 182.2, 48.7, 18.8, 6.0, 2.3
                    }
                ]
            })

            let hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
                '7a', '8a', '9a', '10a', '11a',
                '12p', '1p', '2p', '3p', '4p', '5p',
                '6p', '7p', '8p', '9p', '10p', '11p'
            ];
            let days = ['周日', '周六', '周五', '周四', '周三', '周二', '周一'];
            var data = [
                [0, 0, 5],
                [0, 1, 1],
                [0, 2, 0],
                [0, 3, 0],
                [0, 4, 0],
                [0, 5, 0],
                [0, 6, 0],
                [0, 7, 0],
                [0, 8, 0],
                [0, 9, 0],
                [0, 10, 0],
                [0, 11, 2],
                [0, 12, 4],
                [0, 13, 1],
                [0, 14, 1],
                [0, 15, 3],
                [0, 16, 4],
                [0, 17, 6],
                [0, 18, 4],
                [0, 19, 4],
                [0, 20, 3],
                [0, 21, 3],
                [0, 22, 2],
                [0, 23, 5],
                [1, 0, 7],
                [1, 1, 0],
                [1, 2, 0],
                [1, 3, 0],
                [1, 4, 0],
                [1, 5, 0],
                [1, 6, 0],
                [1, 7, 0],
                [1, 8, 0],
                [1, 9, 0],
                [1, 10, 5],
                [1, 11, 2],
                [1, 12, 2],
                [1, 13, 6],
                [1, 14, 9],
                [1, 15, 11],
                [1, 16, 6],
                [1, 17, 7],
                [1, 18, 8],
                [1, 19, 12],
                [1, 20, 5],
                [1, 21, 5],
                [1, 22, 7],
                [1, 23, 2],
                [2, 0, 1],
                [2, 1, 1],
                [2, 2, 0],
                [2, 3, 0],
                [2, 4, 0],
                [2, 5, 0],
                [2, 6, 0],
                [2, 7, 0],
                [2, 8, 0],
                [2, 9, 0],
                [2, 10, 3],
                [2, 11, 2],
                [2, 12, 1],
                [2, 13, 9],
                [2, 14, 8],
                [2, 15, 10],
                [2, 16, 6],
                [2, 17, 5],
                [2, 18, 5],
                [2, 19, 5],
                [2, 20, 7],
                [2, 21, 4],
                [2, 22, 2],
                [2, 23, 4],
                [3, 0, 7],
                [3, 1, 3],
                [3, 2, 0],
                [3, 3, 0],
                [3, 4, 0],
                [3, 5, 0],
                [3, 6, 0],
                [3, 7, 0],
                [3, 8, 1],
                [3, 9, 0],
                [3, 10, 5],
                [3, 11, 4],
                [3, 12, 7],
                [3, 13, 14],
                [3, 14, 13],
                [3, 15, 12],
                [3, 16, 9],
                [3, 17, 5],
                [3, 18, 5],
                [3, 19, 10],
                [3, 20, 6],
                [3, 21, 4],
                [3, 22, 4],
                [3, 23, 1],
                [4, 0, 1],
                [4, 1, 3],
                [4, 2, 0],
                [4, 3, 0],
                [4, 4, 0],
                [4, 5, 1],
                [4, 6, 0],
                [4, 7, 0],
                [4, 8, 0],
                [4, 9, 2],
                [4, 10, 4],
                [4, 11, 4],
                [4, 12, 2],
                [4, 13, 4],
                [4, 14, 4],
                [4, 15, 14],
                [4, 16, 12],
                [4, 17, 1],
                [4, 18, 8],
                [4, 19, 5],
                [4, 20, 3],
                [4, 21, 7],
                [4, 22, 3],
                [4, 23, 0],
                [5, 0, 2],
                [5, 1, 1],
                [5, 2, 0],
                [5, 3, 3],
                [5, 4, 0],
                [5, 5, 0],
                [5, 6, 0],
                [5, 7, 0],
                [5, 8, 2],
                [5, 9, 0],
                [5, 10, 4],
                [5, 11, 1],
                [5, 12, 5],
                [5, 13, 10],
                [5, 14, 5],
                [5, 15, 7],
                [5, 16, 11],
                [5, 17, 6],
                [5, 18, 0],
                [5, 19, 5],
                [5, 20, 3],
                [5, 21, 4],
                [5, 22, 2],
                [5, 23, 0],
                [6, 0, 1],
                [6, 1, 0],
                [6, 2, 0],
                [6, 3, 0],
                [6, 4, 0],
                [6, 5, 0],
                [6, 6, 0],
                [6, 7, 0],
                [6, 8, 0],
                [6, 9, 0],
                [6, 10, 1],
                [6, 11, 0],
                [6, 12, 2],
                [6, 13, 1],
                [6, 14, 3],
                [6, 15, 4],
                [6, 16, 0],
                [6, 17, 0],
                [6, 18, 0],
                [6, 19, 0],
                [6, 20, 1],
                [6, 21, 2],
                [6, 22, 2],
                [6, 23, 6]
            ];

            // data = data.map(function (item) {
            //     return [item[1], item[0], item[2]];
            // });
            let serverOption = {
                top: 0,
                color: ['#4C6CBF', '#7886C8', '#69B6F4', '#5EDCC1', '#F78B71', '#F48899', '#F9BE4C'],
                tooltip: {
                    position: 'top'
                },
                title: [],
                singleAxis: [],
                series: []
            }

            echarts.util.each(days, function (day, idx) {
                serverOption.title.push({
                    textBaseline: 'middle',
                    top: (idx + 0.5) * 100 / 7 - 5 + '%',
                    text: day,
                    textStyle: {
                        fontSize: 12
                    }
                });
                serverOption.singleAxis.push({
                    left: 50,
                    type: 'category',
                    boundaryGap: false,
                    data: hours,
                    top: (idx * 100 / 7 + 4) + '%',
                    height: (100 / 7 - 14) + '%',
                    axisLine: {
                        lineStyle: {
                            color: '#D9D8D8'
                        }
                    },
                    axisLabel: {
                        show: idx === 6 ? true : false,
                        color: '#666',
                        fontSize: 10
                    },
                    axisTick: {
                        show: false
                    }
                });
                serverOption.series.push({
                    singleAxisIndex: idx,
                    coordinateSystem: 'singleAxis',
                    type: 'scatter',
                    data: [],
                    symbolSize: function (dataItem) {
                        return dataItem[1] * 2;
                    }
                });
            });

            echarts.util.each(data, function (dataItem) {
                serverOption.series[dataItem[0]].data.push([dataItem[1], dataItem[2]]);
            });
            serverChart.setOption(serverOption);

            healthChart.setOption({
                radar: {
                    center: ['50%', '50%'],
                    name: {
                        textStyle: {
                            color: '#7CA3CB',
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#86C4F5',
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color: ['#86C4F5'],
                            width: 1,
                        }
                    },
                    splitArea: {
                        areaStyle: {
                            color: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)',
                                'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)'
                            ],
                            shadowColor: '#fff'
                        }
                    },
                    indicator: [{
                            name: '完整性',
                            max: 1000
                        },
                        {
                            name: '标准化程度',
                            max: 1000
                        },
                        {
                            name: '稳定性',
                            max: 1000
                        },
                        {
                            name: '稳定性',
                            max: 1000
                        },
                        {
                            name: '可识别度',
                            max: 1000
                        }
                    ]
                },
                series: [{
                    type: 'radar',
                    symbolSize: 0,
                    data: [{
                        value: [800, 700, 600, 900, 500],
                        name: '数据',
                        itemStyle: {
                            normal: {
                                color: '#01D0FE'
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: '#0580f2'
                            }
                        }
                    }]
                }]
            })

            // 窗口尺寸变化时resize
            $(window).resize(function () {
                growthChart.resize()
                assetsChart.resize()
                serverChart.resize()
                healthChart.resize()
            });

        }
        renderList = () => {
            const colors = ['#2997EF', '#4155AB', '#1ACDA6', '#F0566D', '#FFA200', '#002DA4']
            $('.item-list .item').each((index, el) => {
                let i = index
                if (i > 5) {
                    i = i - 6
                }
                $(el).css('background-color', colors[i])
            })
        }
        rankInit = () => {
            const rankLst = [{
                rank: 1,
                title: '人员基本信息',
                score: 3500
            }, {
                rank: 2,
                title: '人员基本信息',
                score: 3200
            }, {
                rank: 3,
                title: '人员基本信息',
                score: 2900
            }, {
                rank: 4,
                title: '人员基本信息',
                score: 2850
            }, {
                rank: 5,
                title: '人员基本信息',
                score: 2500
            }, {
                rank: 6,
                title: '人员基本信息',
                score: 2400
            }, {
                rank: 7,
                title: '人员基本信息',
                score: 2200
            }, {
                rank: 8,
                title: '人员基本信息',
                score: 2150
            }, {
                rank: 9,
                title: '人员基本信息',
                score: 2050
            }, {
                rank: 10,
                title: '人员基本信息',
                score: 2000
            }, {
                rank: 11,
                title: '人员基本信息',
                score: 1900
            }]
            let rankEl = ''
            rankLst.map((item, index) => {
                rankEl += `
                    <div class="rank-item">
                    ${index < 3? `<img src="./assets/No.${index+1}.png" alt="" class="rank-icon">`:`<div class="rank-icon-bg">${index+1}</div>`}
                    <div class="progress-wrapper">
                        <p class="title">${item.title}</p>
                        <div class="progress">
                            <div class="progress-value"></div>
                        </div>
                    </div>
                    <div class="score">${item.score}</div>
                </div>`
            })
            $('.rank-list').append(rankEl)
            setTimeout(() => {
                rankLst.map((item, index) => {
                    $($('.rank-list .rank-item .progress-value')[index]).css('width', item.score /
                        4000 * 100 + '%')
                })
            }, 0);
        }
        dropDownInit = () => {
            // 点击本身节点外隐藏收起下来
            $('body').click(e => {
                const expandDrop = $('.isExpand')[0]
                if (!expandDrop) {
                    return
                }
                if ($.contains(e.currentTarget, expandDrop)) {
                    $(expandDrop).removeClass('isExpand')
                } else {
                    return
                }
            })
            $('.dropdown').click((e) => {
                setTimeout(() => {
                    if ($(e.currentTarget).hasClass('isExpand')) {
                        $(e.currentTarget).removeClass('isExpand')
                    } else {
                        $(e.currentTarget).addClass('isExpand')
                    }
                }, 0);
            })

            $('.dropdown .option-list').on('click', '.option', e => {
                setTimeout(() => {
                    $(e.currentTarget).parent().parent().find('.label')[0].innerText = e
                        .currentTarget.innerText;
                    let type = $(e.currentTarget).attr('value')
                    // 判断选择的类别来动态渲染echarts
                    $(e.currentTarget).parent().parent().removeClass('isExpand')
                }, 5);
            })
        }