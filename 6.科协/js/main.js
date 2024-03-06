$(function () {
    liTouch()
    btnTouch()
    iconTouch()
    refreshDropDown()
    dropDownCollapse()
    registerDialogHide()
});

function liTouch() {
    $('.list-item').bind({
        'touchstart': function () {
            const index = $(this).index()
            $('.list-item')[index].style.backgroundColor = "#f9f9f9"
        },
        'touchend': function () {
            const index = $(this).index()
            $('.list-item')[index].style.backgroundColor = "#fff"
        }
    })
}
// touch效果
function btnTouch() {
    $('.save-button').each((index, el) => {
        el.addEventListener('touchstart', () => {
            el.style.backgroundColor = "#2f7cff"
        })
        el.addEventListener('touchend', () => {
            el.style.backgroundColor = "#4E8FFF"
        })
    })
    // 添加按钮touch
    $('.addStep').each((index, el) => {
        el.addEventListener('touchstart', () => {
            el.style.backgroundColor = "#e6e6e6"
            el.style.color = "#ccc"
        })
        el.addEventListener('touchend', () => {
            el.style.backgroundColor = "#f6f6f6"
            el.style.color = "#dcdcdc"
        })
    })
}

function iconTouch() {
    $('.add-icon').each((index, el) => {
        el.addEventListener('touchstart', () => {
            el.style.transform = "scale(0.95)"
        })
        el.addEventListener('touchend', () => {
            el.style.transform = "scale(1)"
        })
    })
    $('.minus-icon').each((index, el) => {
        el.addEventListener('touchstart', () => {
            el.style.transform = "scale(0.95)"
        })
        el.addEventListener('touchend', () => {
            el.style.transform = "scale(1)"
        })
    })
}

// 点击本身节点外隐藏收起下来
function dropDownCollapse() {
    $('body').click(e => {
        const expandDrop = $('.expand')[0]
        if (!expandDrop) {
            return
        }
        if (e.target.parentNode === expandDrop) {
            return
        } else {
            $('.expand')[0].classList.remove('expand')
        }
    })
}
// select组件点击事件/事件委托方式，
function refreshDropDown() {
    // 找到复制节点的父节点
    const boxParent = $('.dropdown').parent().parent().parent().parent()
    // 事件委托到父节点
    $(boxParent).on('click', '.dropdown .option', function (e) {
        setTimeout(() => {
            const index = $(this).index()
            const el = e.target
            const drop = e.target.parentNode
            if (index === 0) {
                // 控制下拉展开收起
                if (!drop.classList.contains('expand')) {
                    drop.classList.add('expand')
                } else {
                    drop.classList.remove('expand')
                }
            } else {
                // 获取选中的值展示
                drop.children[0].innerText = el.innerText
                drop.classList.remove('expand')
            }
        }, 0);
    })
    // $('.dropdown').each((listIndex, list)=>{
    //     $(list).find('.option').each((index,el)=>{
    //         $(el).click(e=>{
    //             setTimeout(() => {
    //                 const drop = el.parentNode
    //                 if(index === 0){
    //                     if(!drop.classList.contains('expand')){
    //                         drop.classList.add('expand')
    //                     } else {
    //                         drop.classList.remove('expand')
    //                     }
    //                 } else {
    //                     drop.children[0].innerText = el.innerText
    //                     drop.classList.remove('expand')
    //                 }
    //             }, 0);
    //         })
    //     })
    // $(el).find('.option').bind({
    //     'click': function(e){
    //         setTimeout(() => {
    //             const index = $(this).index()
    //             const el = e.target
    //             const drop = e.target.parentNode
    //             if(index === 0){
    //                 if(!drop.classList.contains('expand')){
    //                     drop.classList.add('expand')
    //                 } else {
    //                     drop.classList.remove('expand')
    //                 }
    //             } else {
    //                 drop.children[0].innerText = el.innerText
    //                 drop.classList.remove('expand')
    //             }
    //         }, 0);
    //     }
    // })
    // })
}

function goback() {
    window.location.href = '/index.html'
}

function linkTo(href) {
    window.location.href = href
}

function dialogShow(callback) {
    setTimeout(() => {
        $('#dialog').css('display', 'block')
        $('#dialog #dialog-confirm').click(e => {
            callback()
        })
    }, 0);
}

function registerDialogHide() {
    $('body').click(e => {
        // 弹窗
        if (!$('#dialog')[0]) {
            return false
        }
        const dialogNode = $('#dialog #dialog-content')[0]
        if (!dialogNode.contains(e.target)) {
            $('#dialog').css('display', 'none')
        }
    })
}