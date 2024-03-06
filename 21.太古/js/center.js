
// total 总数
// pageNum  当前页码
// pageSize 条数
let allPageNum = 0
// 渲染分页
function createPagination(total, pageNum, pageSize) {
    $(".centerPagination").children().remove()
    let allPageNums = Math.ceil(total / pageSize)
    allPageNum = allPageNums
    $(".pagination-total").text(`共${total}条`)
    let paginationHtml = `<li class="disabled" data-disabled='true'><span>上一页</span></li>`
    // 左侧按钮
    if (pageNum === 1) {
        paginationHtml = `<li class="disabled" data-disabled='true'><span>上一页</span></li>`
    } else {
        paginationHtml = `<li><span>上一页</span></li>`
    }
    if (allPageNums > 5) {
        // 普通页码按钮
        if (pageNum < 5) {
            for (let i = 0; i < 5; i++) {
                let node = ``
                if (((i + 1) === pageNum)) {
                    node = `<li class="disabled pageChoose" data-disabled='true'><span>${i + 1}</span></li>`
                } else {
                    node = `<li><span>${i + 1}</span></li>`
                }
                paginationHtml += node
            }
            paginationHtml += `<li><span data-direction='right'>...</span></li>`
            paginationHtml += `<li><span>${allPageNums}</span></li>`
        } else if ((allPageNums - 4)<pageNum) {
            paginationHtml += `<li><span>1</span></li>`
            paginationHtml += `<li><span data-direction='left'>...</span></li>`
            for (let i = 5; i > 0; i--) {
                let node = ``
                if (((allPageNums - i + 1) === pageNum)) {
                    node = `<li class="disabled pageChoose" data-disabled='true'><span>${allPageNums - i + 1}</span></li>`
                } else {
                    node = `<li><span>${allPageNums - i + 1}</span></li>`
                }
                paginationHtml += node
            }
        } else {
            paginationHtml += `<li><span>1</span></li>`
            paginationHtml += `<li><span data-direction='left'>...</span></li>`
            let max = pageNum + 2;
            let min = pageNum - 2
            for(let i = min;i<max+1;i++){
                let node = ``
                if (((i ) === pageNum)) {
                    node = `<li class="disabled pageChoose" data-disabled='true'><span>${i }</span></li>`
                } else {
                    node = `<li><span>${i }</span></li>`
                }
                paginationHtml += node
            }
            paginationHtml += `<li><span data-direction='right'>...</span></li>`
            paginationHtml += `<li><span>${allPageNums}</span></li>`

        }

    } else {
        // 普通页码按钮
        for (let i = 0; i < allPageNums; i++) {
            let node = ``
            if (((i + 1) === pageNum)) {
                node = `<li class="disabled pageChoose" data-disabled='true'><span>${i + 1}</span></li>`
            } else {
                node = `<li><span>${i + 1}</span></li>`
            }
            paginationHtml += node
        }
    }
    // 右侧按钮
    if (pageNum === allPageNums) {
        paginationHtml += `<li class="disabled" data-disabled='true'><span>下一页</span></li>`
    } else {
        paginationHtml += `<li><span>下一页</span></li>`
    }
    $(".centerPagination").append(paginationHtml)
}
let page = 0
function onlyNumber(event){
    let keyCode = event.keyCode;    
     if ((keyCode >= 48 && keyCode <= 57))    
    {    
         event.returnValue = true;    
     } else {    
           event.returnValue = false;    
    }  
}
// 日期选择器--开始
let startDate = ''
let endDate = ''
function updateConfig() {
    // 执行
    let options = {
        locale: {
            format: 'YYYY-MM-DD',
            separator: ' ~ ',
            applyLabel: "选择",
            cancelLabel: "删除",
        }
    };
    $('#config-demo').daterangepicker(options, function(start, end, label) { 
        let beginTimeStore = start.format('YYYY-MM-DD');
        let endTimeStore = end.format('YYYY-MM-DD');
        startDate = beginTimeStore
        endDate = endTimeStore
    }).click();
    $('#config-demo').on('cancel.daterangepicker', function(ev, picker) {
        console.log('删除', '=====')
        $('#config-demo').val('');
        startDate = ''
        endDate = ''
    });
}
// 选择起止日期
function selectDate(){
    updateConfig()
}
// 日期选择器--结束
// 搜索
function searchCenterParams(){
    let searchParams = {
        startDate,
        endDate,
        searchValue:$("#searchValue").val()
    }
    centerPageNum = 1
    console.log(centerType,centerPageSize,centerPageNum,true)
    // getCenterData(centerType,centerPageSize,centerPageNum,true)
    
}