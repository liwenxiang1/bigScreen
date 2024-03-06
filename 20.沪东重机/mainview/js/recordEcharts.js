radarInit = () => {
  let recordment = echarts.init(document.getElementById(`recordDiv`));


  const HEIGHT_RATIO = 0.6;
  const DIM_CATEGORY_INDEX = 0;
  const DIM_TIME_ARRIVAL = 1;
  const DIM_TIME_DEPARTURE = 2;
  const ACTUAL_TIME_ARRIVAL = 3;
  const _cartesianXBounds = [];
  const _cartesianYBounds = [];
  const rowData = {
    flight: flightData
  };

  function clipRectByRect(params, rect) {
    return echarts.graphic.clipRectByRect(rect, {
      x: params.coordSys.x,
      y: params.coordSys.y,
      width: params.coordSys.width,
      height: params.coordSys.height,
    });
  }

  function renderGanttItem(params, api) {
    const categoryIndex = api.value(DIM_CATEGORY_INDEX);
    const timeStart = api.coord([api.value(DIM_TIME_ARRIVAL), categoryIndex]);
    const timeEnd = api.coord([api.value(DIM_TIME_DEPARTURE), categoryIndex]);
    const actualTimeArrival = api.coord([
      api.value(ACTUAL_TIME_ARRIVAL),
      categoryIndex,
    ]);
    const {
      coordSys
    } = params;
    _cartesianXBounds[0] = coordSys.x;
    _cartesianXBounds[1] = coordSys.x + coordSys.width;
    _cartesianYBounds[0] = coordSys.y;
    _cartesianYBounds[1] = coordSys.y + coordSys.height;
    const barLength1 = timeEnd[0] - timeStart[0];
    const barLength2 = timeEnd[0] - actualTimeArrival[0];
    const barLength3 = actualTimeArrival[0] - timeEnd[0];
    // Get the heigth corresponds to length 1 on y axis.
    const barHeight = api.size([0, 1])[1] * HEIGHT_RATIO;

    const rectNormal = clipRectByRect(params, {
      x: timeStart[0],
      y: timeStart[1] - 70,
      width: barLength1,
      height: 20,
    });
    const rectAfter = clipRectByRect(params, {
      x: timeEnd[0],
      y: timeEnd[1] - 70,
      width: barLength3,
      height: 20,
    });

    const rectText = clipRectByRect(params, {
      x: timeStart[0],
      y: timeEnd[1] - 70,
      width: barLength1 + barLength3,
      height: 20
    });
    return {
      type: "group",
      children: [{
          type: "rect",
          ignore: !rectNormal,
          shape: rectNormal,
          style: api.style({
            fill: "#0985c1"
          }), // 蓝色区域-当前完成进度
        },
        {
          type: "rect",
          ignore: !rectAfter,
          shape: rectAfter,
          style: api.style({
            fill: "#414E62"
          }), // 灰色区域-剩余时间进度
        },
        {
          type: 'rect',
          ignore: !rectText,
          shape: rectText,
          style: api.style({
            fill: 'transparent',
            stroke: 'transparent',
            text: ((api.value(2) - api.value(1)) / (api.value(3) - api.value(1)) * 100).toFixed() + '%', //计算完成进度百分比
            textFill: '#fff'
          })
        }
      ],
    };
  }

  function makeOption() {
    return {

      animation: false,
      grid: {
        show: false,
        top: 100,
        bottom: 20,
        left: 40,
        right: 20,
        backgroundColor: "#fff",
        borderWidth: 0,
      },
      dataZoom: [{
          type: "slider",
          xAxisIndex: 0,
          filterMode: "weakFilter",
          height: 20,
          bottom: 0,
          start: 0,
          end: 100,
          handleIcon: "path://M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
          handleSize: "80%",
          showDetail: false,
        },
        {
          type: "inside",
          id: "insideX",
          xAxisIndex: 0,
          filterMode: "weakFilter",
          start: 0,
          end: 100,
          zoomOnMouseWheel: false,
          moveOnMouseMove: true,
        },
        {
          type: "slider",
          yAxisIndex: 0,
          zoomLock: true,
          width: 0,
          right: 0,
          top: 70,
          bottom: 20,
          start: 100,
          end: 0,
          handleSize: 0,
          showDetail: false,
        },
        {
          type: "inside",
          id: "insideY",
          yAxisIndex: 0,
          start: 95,
          end: 100,
          zoomOnMouseWheel: false,
          moveOnMouseMove: true,
          moveOnMouseWheel: true,
        },
      ],
      xAxis: {
        type: "time",
        position: "top",
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
          lineStyle: {
            color: "#929ABA",
          },
        },
        splitLine: {
          alignWithLabel: true,
          show: true,
          lineStyle: {
            color: ["#929ABA"],
          },
        },
        axisLabel: {
          color: "#929ABA",
          inside: false,
          align: "center",
          formatter: (param) => {
            const formatDate = new Date(param);
            return `${formatDate.getFullYear()}-${
            formatDate.getMonth() + 1
          }-${formatDate.getDate()}`;
          },
        },
        axisPointer: {
          show: true,
          label: {
            backgroundColor: "#004f53",
            margin: -20,
          },
          lineStyle: {
            color: "#9fbfcd",
            type: "solid",
            width: 1.5,
          },
        },
      },
      yAxis: {
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        min: 0,
        axisPointer: {
          show: false,
        },
        max: 25,
      },
      series: [{
          id: "flightData1",
          type: "custom",
          name: "当前进度",
          renderItem: renderGanttItem,
          encode: {
            x: [DIM_TIME_ARRIVAL, DIM_TIME_DEPARTURE, ACTUAL_TIME_ARRIVAL],
            y: DIM_CATEGORY_INDEX,
            tooltip: [DIM_TIME_ARRIVAL, DIM_TIME_DEPARTURE, ACTUAL_TIME_ARRIVAL],
          },
          data: rowData.flight,
        },
        {
          id: "flightData2",
          type: "custom",
          name: "预期时间",
          renderItem: renderGanttItem,
          encode: {
            x: [DIM_TIME_ARRIVAL, DIM_TIME_DEPARTURE, ACTUAL_TIME_ARRIVAL],
            y: DIM_CATEGORY_INDEX,
            tooltip: [DIM_TIME_ARRIVAL, DIM_TIME_DEPARTURE, ACTUAL_TIME_ARRIVAL],
          },
          data: rowData.flight,
        },
      ],
    };
  }

  option = makeOption();
  recordment.setOption(option)
}