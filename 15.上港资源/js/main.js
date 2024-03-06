
$(function () {
});
// 公告轮播
function noticeScroll(){
    var scrollDiv = $(".notice-scroll"),
        $ul = scrollDiv.find("ul"),
        $li = scrollDiv.find("li"),
        $length = $li.length,
        $liHeight = $li.height(),
        num = 0;

    if(scrollDiv.length == 0) {
        return;
    }

    if($length > 1) {
        $ul.append($li.eq(0).clone());
        setInterval(
            function() {
                num++;
                $ul.addClass("animate-out").css("-webkit-transform", "translateY(-" + $liHeight * (num) + "px)");
                setTimeout(
                    function() {
                        if(num == $length) {
                            $ul.removeClass("animate-out").css("-webkit-transform", "translateY(0)");
                            num = 0;
                        }
                    }, 500);
            }, 5000);
    }
}


function menuInit() {
    const menuList = [{
        id: 'personal_center',
        name: '个人中心',
        icon: '&#xe60d;',
        router: 'personal_center',
        children: [{
            id: 'info_edit',
            name: '资料修改',
            router: 'info_edit'
        }, {
            id: 'audit',
            name: '新用户审核',
            router: 'audit'
        }]
    }, {
        id: 'notice_center',
        name: '公告栏',
        icon: '&#xe647;',
        router: 'notice_center',
        children: [{
            id: 'notification_management',
            name: '通知管理',
            router: 'notification_management'
        }, {
            id: 'announcement_management',
            name: '公告管理',
            router: 'announcement_management'
        }, {
            id: 'recycle_bin',
            name: '回收站',
            router: 'recycle_bin'
        }]
    }, {
        id: 'questions_management',
        name: '问题管理',
        icon: '&#xe605;',
        router: 'questions_management'
    }, {
        id: 'task_ticket',
        name: '任务工单',
        icon: '&#xe678;',
        router: 'task_ticket',
        children: [{
            id: 'create_work_orders',
            name: '发起工单',
            router: 'create_work_orders'
        }, {
            id: 'all_work_orders',
            name: '全部工单',
            router: 'all_work_orders'
        }, {
            id: 'my_work_orders',
            name: '我的工单',
            router: 'my_work_orders'
        }]
    }, {
        id: 'notification',
        name: '消息通知',
        icon: '&#xe66d;',
        router: 'notification'
    }]

    let currentPage = window.location.pathname.split('/')[1]
    currentPage = currentPage.split('.html')[0]
    // let menuNodes = null
    menuList.forEach((item, index) => {
        let menuNode =
            `<li class="menu-item ${item.router === currentPage ? 'active' : ''} ${(item.children && item.children.length>0)?'has-children':''}">
                <div class="menu-name collapsed" data-toggle="collapse" data-target="#${item.id}" aria-expanded="${index === 0 ? 'true' : 'false'}" aria-controls="collapseExample">
                    <span class="menu-icon iconfont">${item.icon}</span>
                    <span class="menu-label">${item.name || '-'}</span>
                </div>
            </li>`
        $('#menu').append(menuNode)
        if (item.children && item.children.length > 0) {
            let childrenWrapper =
                `<ul class="menu-childrens collapse clearfix" id="${item.id}">
                </ul>`
            $($('#menu .menu-item')[index]).append(childrenWrapper)
            item.children.forEach((child, c_index) => {
                if (child.router === currentPage) {
                    $($('#menu .menu-item')[index]).addClass('active')
                    $($('#menu .menu-item')[index]).find('.menu-childrens').addClass('show')
                    $($('#menu .menu-item')[index]).find('.menu-name').removeClass('collapsed')
                }
                let childNode =
                    `<li router="${child.router}" class="chid-menu ${child.router === currentPage ? 'active' : ''}">${child.name || '-'}</li>`
                $($('#menu .menu-item')[index]).find('.menu-childrens').append(childNode)
            })
        }
    })
    setTimeout(() => {
        $('#menu').on('click', '.chid-menu', function (e) {
            const index = $(this).index()
            const router = $(e.currentTarget).attr('router')
            window.location.href = `/${router}.html`
        })
    }, 0);
}
