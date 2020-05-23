$(document).ready(function(){
    // FORM FUNCTION
    removePlaceholderSelect();

    // THEME FUNCTION
    localStorage.getItem('dashboard_admin_dark_theme') == "true" ? $('body').addClass('theme-dark') : $('body').removeClass('theme-dark');

    $('.statistic-item .card').each(function(){
        $(this).hover(function(){
            $('.statistic-item .card').removeClass('bg-danger text-white');
            $(this).addClass('bg-danger text-white');
        });
    })
});


$('#btnChangeTheme').click(function(){ 
    const themeStatus = localStorage.getItem('dashboard_admin_dark_theme');
    console.log(themeStatus);
    if(themeStatus == "true"){
        $('body').removeClass('theme-dark');
        localStorage.setItem('dashboard_admin_dark_theme', false);
    }else{
        $('body').addClass('theme-dark');
        localStorage.setItem('dashboard_admin_dark_theme', true);
    }
});

const removePlaceholderSelect = () => {
    $('.select-placeholder').css('display', 'none');
}

const copyImagePath = (param) => {
    const path = $(param).val();
    const host = window.location.origin;

    $(param).val(host+path);
    $(param).select();
    document.execCommand("copy");
}