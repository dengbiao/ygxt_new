<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>工资考核</title>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
		<!-- stylesheets -->
		<link rel="stylesheet" type="text/css" href="/static/css/reset.css" />
		<link rel="stylesheet" type="text/css" href="/static/css/style.css" media="screen" />
		<link rel="stylesheet" type="text/css" href="/static/css/checkSalary.css" />
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
                    <h5>工资考核</h5>
                    <div class="search">
                        2013年9月份
                    </div>
                </div>
                <!-- end box / title -->
                <div class="table">
                    <form action="" method="post">
                    <table>
                        <thead>
                            <tr>
                                <th>姓名</th><th>学号</th><th>性别</th><th>专业</th>
                                <th>年级</th><th>校园卡号</th><th>工资</th><th>备注</th><th>操作</th>
                            </tr>
                        </thead>
                        <tbody>


                        <?php foreach($salaryList as $key => $salary ) { ?>
                                <!--//不考核 -->
                        <?php       if($salary['status'] == 0) { ?>
                                        <tr align="center" class="out">
                        <?php       }else {?> 
                                        <tr align="center" >
                        <?php }?> 
                                <td><?=$salary['name']?></td>
                                <td><?=$salary['stuno']?></td>
                                <td><?=$salary['sex']?></td>
                                <td><?=$salary['college']?></td>
                                <td><?=$salary['grade']?></td>
                                <td><?=$salary['stuCard']?></td>
                        <?php if($salary['status'] == 0) {?>
                                <td ><input type="text" value="0" disabled="true"/></td>
                        <?php }else {?> 
                                <td><input type="text" value="<?=$salary['salary']?>"/></td>
                        <?php }?> 
                                <td><?=$salary['remark']?></td>
                                <td>										
                        <?php if($salary['status'] != 0) {?>
                                    <a href="">加入考核</a>
                        <?php }else {?> 
                                    <a href="">不予考核</a>
                        <?php }?> 
                                </td>
                            </tr>
                        <?php
                          }
                        ?>

                        </tbody>
                    </table>
                    <!-- pagination -->
                    <div class="pagination pagination-left">
                        <div class="results">
                        总共<span style="color:red">15</span>位员工&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;总考核工资：<span style="color:red;">14220</span>元
                        </div>
                    </div>
                    <!-- end pagination -->
                        <div class="submit">
                            <input type="submit" value="暂存数据"> 
                            <input type="submit" value="提交数据">
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- end content  -->
	</body>
</html>
