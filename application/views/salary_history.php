<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>历史数据查询</title>
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
                    <h5>历史数据</h5>
                </div>
                <div class="table">
                <form action="<?php echo site_url()?>/salary/history" method="post">
                    <table class="statistics1">
                        <thead>
                            <tr>
                                <td>请选择要查询的年份和月份：
                                    年份：
                                    <select name="year">
                                    <?php 
                                        $system_year = date('Y');
                                        for($i=$system_year;$i>=2012;$i--) { 
                                    ?>
                                        <option value="<?=$i?>" <?php if(isset($year) && $i==$year) echo "selected='selected'";?>><?=$i?></option>
                                    <?php }?>
                                    </select>
                                    月份:
                                    <select name="month">
                                        <?php for($i=1;$i<=12;$i++) { ?>
                                            <option value="<?=$i?>"  <?php if(isset($month) && $i==$month) echo "selected='selected'";?>><?=$i?></option>
                                        <?php } ?>
                                    </select>
                                    <input type="submit" value="确定">
                                    &nbsp;&nbsp;<a href="">生成工资单</a>
                                </td>
                            </tr>
                        </thead>
                    </table>
                    </form>
                </div>
                    
                <!-- end box / title -->

                <div class="table" <?php if(!isset($init)) echo "style='display:none;'"?> >
                    <table class="statistics">
                        <thead>
                            <tr>
                                <th >姓名</th>
                                <th >校园卡号</th>
                                <th >工资</th>
                                <th >备注</th>
                                <th >状态</th>
                                <th >单位</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if(isset($init)){ ?>
                            <?php foreach($salaryList as $key => $salary ){ ?> 
                            <tr>
                                <td><?=$salary['name']?></td>
                                <td><?=$salary['stuno']?></td>
                                <td><?=$salary['salary']?>元</td>
                                <td><?=$salary['remark']?></td>
                                <td><?php
                                    switch($salary['status'])
                                    {
                                    case 0:
                                        echo "未参与审核";
                                        break;
                                    case 1:
                                        echo "未提交";
                                        break;
                                    case 2:
                                        echo "未审核";
                                        break;
                                    case 3:
                                        echo "已审核";
                                        break;
                                    case 4:
                                        echo "已完成";
                                        break;
                                    default:
                                        echo "状态异常";
                                        break;
                                    }
                                    ?>
                                </td>
                                <td><?=$salary['department']?>
                                </td>
                            </tr>
                            <?php }?>
                            <?php }?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- end content  -->
	</body>
</html>
