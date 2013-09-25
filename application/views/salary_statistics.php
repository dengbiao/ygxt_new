<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>工资统计</title>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
		<!-- stylesheets -->
		<link rel="stylesheet" type="text/css" href="/static/css/reset.css" />
		<link rel="stylesheet" type="text/css" href="/static/css/style.css" media="screen" />
		<link rel="stylesheet" type="text/css" href="/static/css/salary.css" />
		<style type="text/css">

		.page {border-top:1px solid #dfdfdf; padding-top: 10px; text-align: left; margin-bottom: 10px; font-size: 14px;}
		.page a {margin: 0 5px 0 0; padding: 3px 6px; border: 1px solid #D1D1D1;}
		.page .current{margin: 0 5px 0 0; padding: 3px 6px; border: 1px solid #A4A4A4; background:#EBEBEB; }
		.page a { color:#333; text-decoration:none;}
		.page a:hover {border-color:#AAA !important; background:#FAFAFA; color: #000 !important; text-decoration:underline;}


		</style>
		<link id="color" rel="stylesheet" type="text/css" href="/static/css/colors/blue.css" />
		<!-- js (jquery) -->
		<script src="/static/js/jquery-1.4.2.min.js" type="text/javascript"></script>
		<!--[if IE]><script language="javascript" type="text/javascript" src="/static/js/excanvas.min.js"></script><![endif]-->
		<script src="/static/js/jquery-ui-1.8.custom.min.js" type="text/javascript"></script>
		<script src="/static/js/jquery.ui.selectmenu.js" type="text/javascript"></script>
		<script src="/static/js/jquery.flot.min.js" type="text/javascript"></script>
		<script src="/static/js/tiny_mce/tiny_mce.js" type="text/javascript"></script>
		<script src="/static/js/tiny_mce/jquery.tinymce.js" type="text/javascript"></script>

	</head>
	<body>
        <!-- content / right -->
        <div id="content">
            <!-- table -->
            <div class="box">
                <!-- box / title -->
                <div class="title">
                    <h5>工资统计</h5>
                </div>
                <div class="table">
                    <table class="statistics1">
                        <thead>
                            <tr>
                            <td>系统发出工资总额：<span style="color:red;"><?=$salarySum?></span>元</td>
                            </tr>
                        </thead>
                    </table>
                </div>
                    
                <div class="description">按年份统计</div>
    
                <!-- end box / title -->
                <div class="table">
                    <table class="statistics">
                        <thead>
                            <tr>
                                <th width="50%">年份</th><th width="50%">工资</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach($salaryYearSum as $key => $salary) { ?> 
                            <tr><td><?=$salary['year']?></td><td><?=$salary['yearSum']?>元</td></tr>
                            <?php } ?>
                        </tbody>
                    </table>
                    </table>
                </div>



                <div class="description">按单位统计</div>
    
                <!-- end box / title -->
                <div class="table">
                    <form action="" method="post">
                    <table class="statistics">
                        <thead>
                            <tr>
                                <th width="50%">单位</th><th width="50%">工资</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach($salaryDepartSum as $key => $salary) { ?> 
                            <tr><td width="50%"><?=$salary['department']?></td><td width="50%"><?=$salary['departSum']?>元</td></tr>
                            <?php } ?>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
        <!-- end content  -->
	</body>
</html>
