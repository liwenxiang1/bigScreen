layui.config({ base: './echarts/' }).use('echarts', function () { // 需确保您的 layui.js 是引入的构建后的版本（即官网下载或 git 平台的发行版）
  //直接可得到各种内置模块
  const echarts = layui.echarts
  const layer = layui.layer
  const $ = layui.jquery
  const laypage = layui.laypage;
  const color = ['#258DFF', '#66DAA7', '#FDBE59', '#67BBFF', '#C56FF9']
  // 详情页loading 只要是打开详情页，都能用
  const detailsLoading = (isStart) => {
    if (isStart) {
      $(".detailsLoading").css({ 'display': 'flex' })
    } else {
      $(".detailsLoading").css({ 'display': 'none' })
    }
  }
  // 全屏loading
  const viewLoading = (isStart) => {
    if (isStart) {
      $(".viewLoading").css({ 'display': 'flex' })
    } else {
      $(".viewLoading").css({ 'display': 'none' }) 
    }
  }

  const getTagData = () => {
    // do()
    // 模拟数据
    let res = {
      user: '16,532',
      visitedAll: '112,265',
      visitedDay: '1,897'
    }
    $("#user").text(res.user)
    $("#visitedAll").text(res.visitedAll)
    $("#visitedDay").text(res.visitedDay)
  }
  const getOtherData = () => {
    // do()
    // 模拟数据
    let res = {
      // 对应html中的id名，若字段不一致，修改完这里后同步修改html中的id名，必须一致
      xmxt: 1,
      sjk: 2,
      schema: 3,
      sjb: 4,
      zd: 5,
      yba: 6,
      ybaPre: '90%',
      wba: 7,
      sjzl: 8,
      sjccl: 9,
      sjccsyl: '92%',
      wlqy: 10,
      wlqyt: 11,
      zfbm: 12,
      zfbmt: 13,
      jrjg: 14,
      jrjgt: 15,
      dsfpt: 16,
      dsfptt: 17,
      ywxt: 18,
      ywxtt: 19,
      ywpz: 20,
      ywpzt: 21,
      xmxt3: 22,
      schema2: 23,
      sjb2: 24,
      zd2: 25,
      yba2: 26,
      yba2Pre: '90%',
      wba2: 27,
      ztk: 28,
      sjxq: 29,
      sjfw: 30,
      sjfwn: 31,
      sjfww: 32,
      sjcp: 33,
      hxzc: 34,
      zyzc: 35,
      sjst: 36,
      sjmx: 37,
      jcbz: 38,
      zbbz: 39,
      bwbz: 40,
    }
    for (let item in res) {
      setIdNum(item, res[item])
    }
  }
  const setIdNum = (text, num) => {
    let id = `#${text}`
    $(id).text(num)
  }
  const getTooltipData = () => {
    // mock 数据
    let res = {
      xmxtTab: '项目系统的简介项目系统的简介项目系统的简介',
      sjkTab: "数据库数据库数据库",
      schemaTab: "schemaschemaschemaschema",
      sjbTab: "sjbTabsjbTabsjbTabsjbTab",
      wlqyTab: '物流类企业的说明物流类企业的说明物流类企业的说明物流类企业的说明物流类企业的说明物流类企业的说明物流类企业的说明物流类企业的说明'
    }
    Array.from($(".layui-panel-tab")).forEach(item => {
      $(`#${item.id}`).prop('data-tooltip', res[item.id])
    })
  }
  // 三个标签
  getTagData();
  // 公司总览 大数据平台
  getOtherData();
  // 获取标签
  getTooltipData()
  // 请求详情数据
  const cardData = (paramsType) => {
    let params = {
      type: paramsType,
      pageNum: 1,
      pageSize: 12
    }
    // do()
    // 模拟数据
    let res = []
    let total = 50
    for (let i = 0; i < 12; i++) {
      res.push({
        name:'项目系统'+i+1,
        sum:98*(i+1)
      })
    }
    // mock 数据产品数据
    if (paramsType === 'd8') {
      res = [{
        name: '数据产品', sum: '33'
      }]
      total = 1
    }
    // 在此处进行第一次数据请求，得到请求数据后执行下面的页码渲染操作
    let html = ''
    res.forEach(item => {
      html += `<div class="layui-col-md3 ">
                <div class="card-b">
                    <span class="card-b-title">${item.name}</span>
                    <span class="card-b-sum">${item.sum}</span>
                </div>
            </div>`
    })
    $('#card-box').append(html)
    laypage.render({
      elem: 'laypage',
      count: total, //数据中的总条数在这里--赋值--
      limit: 12,
      jump: function (obj, first) {
        //首次不执行，因为已经在外部执行了
        $('.layui-laypage-prev').text("<")
        $('.layui-laypage-next').text(">")
        if (!first) {
          $('#card-box').children().remove()
          // do()
          console.log('页码切换时在这里进行数据请求', '并相应的赋值');
          let element = ''
          res.forEach(item => {
            element += `<div class="layui-col-md3 ">
                      <div class="card-b">
                          <span class="card-b-title">${item.name}</span>
                          <span class="card-b-sum">${item.sum}</span>
                      </div>
                  </div>`
          })
          $('#card-box').append(element)
        }
      }
    });
  }
  // 主题库数据
  const themeData = (paramsType) => {
    // 启动loading
    detailsLoading(true)
    // 模拟请求数据，延时2s，注意要删除settimeout
    setTimeout(() => {
      let data = [{
        name: '海港物流',
        child: [{
          name: '船',
          sum: 100
        }, {
          name: '船',
          sum: 100
        }, {
          name: '船',
          sum: 100
        }, {
          name: '船',
          sum: 100
        }, {
          name: '船',
          sum: 100
        }, {
          name: '船',
          sum: 100
        }, {
          name: '船',
          sum: 100
        }, {
          name: '船',
          sum: 100
        }, {
          name: '船',
          sum: 100
        }, {
          name: '船',
          sum: 100
        },]
      }, {
        name: '空港物流',
        child: [{
          name: '船',
          sum: 100
        }, {
          name: '船',
          sum: 100
        }, {
          name: '船',
          sum: 100
        }, {
          name: '船',
          sum: 100
        }, {
          name: '船',
          sum: 100
        }, {
          name: '船',
          sum: 100
        }, {
          name: '船',
          sum: 100
        }, {
          name: '船',
          sum: 100
        }, {
          name: '船',
          sum: 100
        }, {
          name: '船',
          sum: 100
        },]
      }]
      // 在此处进行第一次数据请求，得到请求数据后执行下面的页码渲染操作
      let html = ''
      data.forEach(item => {
        html += `<div class="indexed layui-col-md12">${item.name}</div>`
        item.child.forEach(it => {
          html += `<div class="layui-col-md3 ">
                  <div class="card-b">
                      <span class="card-b-title">${it.name}</span>
                      <span class="card-b-sum">${it.sum}</span>
                  </div>
              </div>`
        })
      })
      $('#laypage').css({ "display": 'none' })
      $('.pop-content').css({ "overflow-y": 'scroll' })
      // 关闭loading
      detailsLoading(false)
      $('#card-box').append(html)
    }, 1000)
  }
  // 数据实体和数据模型的echarts
  const echartsData = (paramsType) => {
    // do()
    // 模拟数据
    let popEcharts = null;
    let popEchartsOption = {};

    popEcharts = echarts.init(document.getElementById('popEcharts'));
    popEchartsOption = {
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
          name: '(个)',
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
          stack: '趋势图',
          emphasis: {
            focus: 'series'
          },
          data: []
        },
        // {
        //   name: '服务量1',
        //   type: 'bar',
        //   barWidth: 16,
        //   stack: '趋势图',
        //   emphasis: {
        //     focus: 'series'
        //   },
        //   data: []
        // },
        {
          name: '新增量',
          type: 'bar',
          barWidth: 16,
          stack: '趋势图',
          emphasis: {
            focus: 'series'
          },
          data: []
        }
      ]
    };
    // // 服务量
    // popEchartsOption.series[1].data = [120, 132, 101, 134, 290, 230]
    // 数据实体
    if (paramsType === 'd9') {
      popEchartsOption.xAxis[0].data = ['空港物流', '海港', '货物贸易', '报关单', '自贸区']
      // 总量
      popEchartsOption.series[0].data = [620, 732, 701, 734, 1090, 1130]
      // 新增量
      popEchartsOption.series[1].data = [60, 72, 71, 74, 190, 130]
    } else {
      // 数据模型d10
      // 6个月
      popEchartsOption.xAxis[0].data = ['1月', '2月', '3月', '4月', '5月', '6月']
      // 总量
      popEchartsOption.series[0].data = [620, 732, 701, 734, 1090, 1130]
      // 新增量
      popEchartsOption.series[1].data = [60, 72, 71, 74, 190, 130]
    }
    popEcharts.setOption(popEchartsOption);

  }

  const echartsData_1 = (paramsType) => {
    // do()
    // 模拟数据
    let popEcharts = null;
    let popEchartsOption = {};

    popEcharts = echarts.init(document.getElementById('popEcharts'));
    popEchartsOption = {
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
          stack: '趋势图',
          emphasis: {
            focus: 'series'
          },
          data: []
        },
        // {
        // name: '服务量',
        // type: 'bar',
        // barWidth: 16,
        // stack: '趋势图',
        // emphasis: {
        // focus: 'series'
        // },
        // data: []
        // },
        {
          name: '新增量',
          type: 'bar',
          barWidth: 16,
          stack: '趋势图',
          emphasis: {
            focus: 'series'
          },
          data: []
        }
      ]
    };
    // 6个月
    popEchartsOption.xAxis[0].data = ['1月', '2月', '3月', '4月', '5月', '6月']
    // 总量
    popEchartsOption.series[0].data = [620, 732, 701, 734, 1090, 1130]
    // 服务量
    //popEchartsOption.series[1].data = [120, 132, 101, 134, 290, 230]
    // 新增量
    popEchartsOption.series[1].data = [60, 72, 71, 74, 190, 130]
    popEcharts.setOption(popEchartsOption);

  }
  // 详情页面-打开pop
  const handleDetails = (e, id, paramsType) => {
    $('#card-box').children().remove()
    $('#popEcharts').remove()
    $('#pop-box').removeClass('pop-right-small-view')
    // $('#popEcharts').css({ "display": 'none' })
    // 视图宽度
    const viewWidth = $('#home').width();
    // 弹框宽度
    const popWidth = $('#pop-box').width()//864
    const offset = $(id).offset()
    let isBigView = true
    if (viewWidth > 1550) {
      isBigView = true
    } else {
      isBigView = false
    }
    if ((viewWidth - offset.left) > (popWidth + 72 + 8)) {
      console.log('优先右侧');
      let top = offset.top - 3
      let left = offset.left + 72 + 8
      $('#pop-box').css({ "top": `${top}px`, "left": `${left}px`, "display": 'block' })
      $("#pop-mask").addClass('pop-mask')
      $('#pop-back').removeClass('pop-back-right')
      $('#pop-back').addClass('pop-back-left')
      $('#pop-box').removeClass('pop-right-small-view')
    } else {
      console.log('只能在左侧或者中间');
      if (isBigView) {
        let top = offset.top - 3
        let left = offset.left - popWidth - 8
        $('#pop-box').css({ "top": `${top}px`, "left": `${left}px`, "display": 'block' })
        $("#pop-mask").addClass('pop-mask')
        $('#pop-back').removeClass('pop-back-left')
        $('#pop-back').addClass('pop-back-right')
        $('#pop-box').removeClass('pop-right-small-view')
      } else {
        console.log('=====小屏')
        if (popWidth > offset.left) {
          // 转移到右侧
          console.log('转移到右侧', '并且减小宽度')
          let top = offset.top - 3
          let left = offset.left + 72 + 8
          $('#pop-box').css({ "top": `${top}px`, "left": `${left}px`, "display": 'block' })
          $("#pop-mask").addClass('pop-mask')
          $('#pop-back').removeClass('pop-back-right')
          $('#pop-back').addClass('pop-back-left')
          $('#pop-box').addClass('pop-right-small-view')
        } else {
          let top = offset.top - 3
          let left = offset.left - popWidth - 8
          // 在左侧。基本碰不到
          $('#pop-box').css({ "top": `${top}px`, "left": `${left}px`, "display": 'block' })
          $("#pop-mask").addClass('pop-mask')
          $('#pop-back').removeClass('pop-back-left')
          $('#pop-back').addClass('pop-back-right')
          $('#pop-box').removeClass('pop-right-small-view')
        }
      }
    }
    // echarts详情
    const echartsDetails = ['#details9', '#details10']
    const echartsDetails_1 = ['#details11', '#details12']
    if (!echartsDetails.includes(id)) {
      // 区分大数据平台归集 的详情页面
      if (!echartsDetails_1.includes(id)) {
        // 卡片详情进行数据请求
        $('#card-box').css({ "display": 'block' })
        $('#laypage').css({ "display": 'flex' })
        // #details7 打开主题库
        if (id !== '#details7') {
          cardData(paramsType)
        } else {
          themeData(paramsType)
        }
      } else {
        console.log('内嵌echarts',);
        $('#card-box').css({ "display": 'none' })
        $('#laypage').css({ "display": 'none' })
        $("#pop-content").append(`<div id="popEcharts"></div>`)
        echartsData_1(paramsType)
      }
    } else {
      console.log('内嵌echarts',);
      $('#card-box').css({ "display": 'none' })
      $('#laypage').css({ "display": 'none' })
      $("#pop-content").append(`<div id="popEcharts"></div>`)
      // $('#popEcharts').css({ "display": 'block' })
      echartsData(paramsType)
    }
  }
  // 鼠标移入展示tooltip
  $('.layui-panel-tab').mouseenter((e) => {
    let tooltipWidth = $('.tooltip-box').innerWidth()
    let tooltipHeight = e.currentTarget.offsetWidth + 'px'
    let top = e.pageY - e.offsetY - tooltipWidth
    let left = e.pageX - e.offsetX
    let text = e.currentTarget['data-tooltip']
    if (!text) return false
    if (e.eventPhase !== 3) {
      top += 'px'
      left += 'px'
      $('.tooltipText').text(text)
      $('.tooltip-box').css({ 'display': 'block', 'top': top, 'left': left, 'width': tooltipHeight })
    } else {
      // 注意详情的定位影响了他
      let detailsTop = 10;
      let detailsLeft = 242
      let id = ''
      if (e.target.className === 'details-box') {
        id = e.target.id;
      } else if (e.target.className === 'details') {
        id = e.target.parentNode.id
      } else {
        // console.log(e.target, '未排查的定位问题,暂未影响功能')
      }
      if (id) {
        detailsLeft = $(`#${id}`).css('left').substring(0, $(`#${id}`).css('left').length - 2);
        detailsTop = $(`#${id}`).css('top').substring(0, $(`#${id}`).css('top').length - 2);
        top = top - detailsTop + 'px'
        left = left - detailsLeft + 'px'
        $('.tooltipText').text(text)
        $('.tooltip-box').css({ 'display': 'block', 'top': top, 'left': left, 'width': tooltipHeight })
      }
    }
  })
  $('.layui-panel-tab').mouseleave((e) => {
    // console.log(e, '鼠标移出')
    $('.tooltipText').text('')
    $('.tooltip-box').css({ 'display': 'none', 'top': 0, 'left': 0, 'width': '100px' })
  })
  // 下面是点击事件
  $('#details1').click((e) => {
    // #details1 为绑定的元素id
    // d1为请求接口的传参，联调时根据后端要求进行修改
    handleDetails(e, '#details1', 'd1')
  })
  $('#details2').click((e) => {
    handleDetails(e, '#details2', 'd2')
  })
  $('#details3').click((e) => {
    handleDetails(e, '#details3', 'd3')
  })
  $('#details4').click((e) => {
    handleDetails(e, '#details4', 'd4')
  })
  $('#details5').click((e) => {
    handleDetails(e, '#details5', 'd5')
  })
  $('#details6').click((e) => {
    handleDetails(e, '#details6', 'd6')
  })
  $('#details7').click((e) => {
    handleDetails(e, '#details7', 'd7')
  })
  $('#details8').click((e) => {
    handleDetails(e, '#details8', 'd8')
  })
  $('#details9').click((e) => {
    handleDetails(e, '#details9', 'd9')
  })
  $('#details10').click((e) => {
    handleDetails(e, '#details10', 'd10')
  })
  $('#details11').click((e) => {
    handleDetails(e, '#details11', 'd11')
  })
  $('#details12').click((e) => {
    handleDetails(e, '#details12', 'd12')
  })
  $('#details13').click((e) => {
    handleDetails(e, '#details13', 'd13')
  })
  $('#details14').click((e) => {
    handleDetails(e, '#details14', 'd14')
  })
  $('#details15').click((e) => {
    handleDetails(e, '#details15', 'd15')
  })
  $("#pop-back").click(() => {
    $('#pop-box').css({ "display": 'none' })
    $('#pop-box').removeClass('pop-right-small-view')
    $("#pop-mask").removeClass('pop-mask')
    $('#card-box').children().remove()
    $('.pop-content').css({ "overflow-y": 'hidden' })
  })
});