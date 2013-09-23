<div id="left">
	<div id="menu">
		<h6 id="h-menu-products" class="selected"><span>栏目管理</span></h6>
		<ul id="menu-events" class="opened">
			<li><a href="<?php echo site_url('index.php/subject/subjectList/pid/1')?>">学院概况</a></li>
			<li><a href="<?php echo site_url('index.php/subject/subjectList/pid/2')?>">教育教学</a></li>
			<li><a href="<?php echo site_url('index.php/subject/subjectList/pid/3')?>">科学研究</a></li>
			<li><a href="<?php echo site_url('index.php/subject/subjectList/pid/4')?>">学生风采</a></li>
			<li><a href="<?php echo site_url('index.php/subject/subjectList/pid/5')?>">招生就业</a></li>
			<li class='last'><a href="<?php echo site_url('index.php/subject/subjectList/pid/6')?>">下载中心</a></li>
		</ul>			
		<?php 
			$login = $this->session->userdata('login');
			if($login->isRoot!=0){ ?>
		<h6 id='h-menu-events' class='selected'><span>用户信息</span></h6>
		<ul id='menu-events' class='opened'>
			<li><a href="<?php echo site_url('index.php/toAdminAdd')?>">添加用户</a></li>
			<li class='last'><a href="<?php echo site_url('index.php/adminList')?>">用户管理</a></li></ul>
		<?php };?>
	</div>
	<div id="date-picker"></div>
</div>
