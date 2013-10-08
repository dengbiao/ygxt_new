<html>
    <head> 
        <link rel="stylesheet" type="text/css" href="<?php echo base_url()?>/static/css/reset.css">
        <link rel="stylesheet" type="text/css" href="<?php echo base_url()?>/static/css/style.css" media="screen">
        <link rel="stylesheet" type="text/css" href="<?php echo base_url()?>/static/css/colors/blue.css">
    </head>
<body>
    <div id="content">
        <div id="left">
            <div id="menu">
                <h6 id="h-menu-products" class="selected"><span>栏目管理</span></h6>
                <ul id="menu-events" class="opened">
                <li><a href="<?php echo site_url() ?>/salary/check" target="right">工资考核</a></li>
                <li><a href="<?php echo site_url() ?>/salary/statistics" target="right">统计信息</a></li>
                <li><a href="<?php echo site_url() ?>/salary/history" target="right">历史数据查询</a></li>
                    <li><a href="">科学研究</a></li>
                    <li><a href="">学生风采</a></li>
                    <li><a href="">招生就业</a></li>
                    <li class='last'><a href="">下载中心</a></li>
                </ul>			
                <h6 id='h-menu-events' class='selected'><span>用户信息</span></h6>
                <ul id='menu-events' class='opened'>
                    <li><a href="">添加用户</a></li>
                    <li class='last'><a href="">用户管理</a></li></ul>
            </div>
            <div id="date-picker"></div>
        </div>
    </div>
</body>

</html>
