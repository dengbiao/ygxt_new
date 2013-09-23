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
                        <form action="" method="post">
                            <div class="input">
                                <span style="font-weight:bold;">输入用户名:</span>
                                <input type="text" id="info" name="info" />
                            </div>
                            <div class="button">
                                <input type="submit" name="submit" value="查 询" style="height:23px;width:50px;"/>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- end box / title -->
                <div class="table">
                    <form action="" method="post">
                    <table>
                        <thead>
                            <tr>
                                <th>姓名</th>
                                <th>学号</th>
                                <th>性别</th>
                                <th>专业</th>
                                <th>年级</th>
                                <th>校园卡号</th>
                                <th>工资</th>
                                <th>备注</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr align="center">
                                <!-- <td class="selected last"><input type="checkbox" /></td> -->
                                <td>邓彪</td>
                                <td>124611157</td>
                                <td>男</td>
                                <td>计算机科学与技术</td>
                                <td>2012</td>
                                <td>108830</td>
                                <td>2000</td>
                                <td>给多点，干活认真</td>
                                <td>										
                                    <a href="">修改</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                                    <a href="">删除</a>
                                </td>
                            </tr>


                            <tr align="center">
                                <!-- <td class="selected last"><input type="checkbox" /></td> -->
                                <td>邓彪</td>
                                <td>124611157</td>
                                <td>男</td>
                                <td>计算机科学与技术</td>
                                <td>2012</td>
                                <td>108830</td>
                                <td>2000</td>
                                <td>给多点，干活认真</td>
                                <td>										
                                    <a href="">修改</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                                    <a href="">删除</a>
                                </td>
                            </tr>

                            <tr align="center">
                                <!-- <td class="selected last"><input type="checkbox" /></td> -->
                                <td>邓彪</td>
                                <td>124611157</td>
                                <td>男</td>
                                <td>计算机科学与技术</td>
                                <td>2012</td>
                                <td>108830</td>
                                <td>2000</td>
                                <td>给多点，干活认真</td>
                                <td>										
                                    <a href="">修改</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                                    <a href="">删除</a>
                                </td>
                            </tr>


                            <tr align="center">
                                <!-- <td class="selected last"><input type="checkbox" /></td> -->
                                <td>邓彪</td>
                                <td>124611157</td>
                                <td>男</td>
                                <td>计算机科学与技术</td>
                                <td>2012</td>
                                <td>108830</td>
                                <td>2000</td>
                                <td>给多点，干活认真</td>
                                <td>										
                                    <a href="">修改</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                                    <a href="">删除</a>
                                </td>
                            </tr>





















                        </tbody>
                    </table>
                    <!-- pagination -->
                    <div class="pagination pagination-left">
                        <div class="results">
                            <span>总共15条目</span>
                        </div>
                        <ul class="pager">
                            <?php echo $pager?>
                            </ul>
                    </div>
                    <div style="float:right">
                        <a href="/csueye/admin/admin/toAdminAdd"><b> + 添加用户</b></a> &nbsp;&nbsp;
                    </div>
                    <!-- end pagination -->
                    </form>
                </div>
            </div>
        </div>
        <!-- end content  -->
	</body>
</html>
