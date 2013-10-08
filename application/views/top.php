<html>
    <head> 
        <link rel="stylesheet" type="text/css" href="<?php echo base_url()?>/static/css/reset.css">
        <link rel="stylesheet" type="text/css" href="<?php echo base_url()?>/static/css/style.css" media="screen">
        <link id="color" rel="stylesheet" type="text/css" href="<?php echo base_url()?>/static/css/colors/blue.css">
    </head>
<body>
    <div id="header" style="background-color:white">
        <!-- logo -->
        <div id="logo">
            <h1><img src="<?php echo base_url()?>/static/images/logo.jpg" alt="中南大学爱尔眼科学院网站后台管理系统" /></h1>
        </div>
        <!-- end logo -->
        <!-- user -->
        <ul id="user">
            
            <li class="first">当前用户：<b><i>admin</i></b> 
                [普通管理员]</li>
            <li class="highlight last"><a href="" onclick="return confirm('您确定要退出系统？')">注销登录</a></li>
        </ul>
        <!-- end user -->
        <div id="header-inner">
            <div id="home">
                <a href="#" title="Home" target="_blank"></a>
            </div>
            <div class="corner tl"></div>
            <div class="corner tr"></div>
        </div>
    </div>
</body>

</html>
