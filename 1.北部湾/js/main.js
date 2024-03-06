
$(function () {
    menuChange()
});

function menuSwitch(el){
    if($(el).parent().hasClass('collapse')){
        $(el).parent().removeClass('collapse')
        resizeMain()
    }else {
        $(el).parent().addClass('collapse')
        resizeMain()
    }
};
function menuChange(){
    $('.menu-list .menu-item').each((index,e)=>{
        let currentPage = window.location.pathname.split('/')[1]
        currentPage = currentPage.split('.html')[0]
        const menuName = $(e).attr('data-name')
        if(menuName === currentPage){
            $(e).addClass('active')
        }
    })

    
    $('.menu-list').on('click', 'li', (e)=>{
        let menuItem = $(e.currentTarget)
        let menuName = $(e.currentTarget).attr('data-name')
        // 取消其他选中状态
        $('.menu-list .active').removeClass('active')
        menuItem.addClass('active')     
        activeMenu = menuItem
        if(menuName === 'leader'){
            if(window.location.pathname !== '/leader.html'){
                window.location.href = '/leader.html'
            }
        } else if(menuName === 'employee'){
            if(window.location.pathname !== '/employee.html'){
                window.location.href = '/employee.html'
            }
        }
    })
}
function resizeMain(){
        const sliderWidth = $('.slidebar').width()
        if(sliderWidth === 50){
            $('.content .main').css('width', 'calc(100% - 200px)')
        } else {
            $('.content .main').css('width', 'calc(100% - 50px)')
        }
}