<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>中南大学爱尔眼科学院网站后台管理系统</title>
<link href="images/login.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="scripts/jquery.min.js"></script>
<script type="text/javascript">
	$(function(){
		$('.captcha').focus(function(){
			$('.yzm-box').show();
			});
			
		$('.captcha').focusout(function(){
			$('.yzm-box').hide();
			});
		})
</script>

</head>

<body>
<div id="message-box"> 用户名或密码错误！ </div>
<div id="wrap">
	
	<div id="header"> </div>
    <div class="login-head"><p>中南大学爱尔眼科学院网站后台管理系统</p></div>
    <div id="content-wrap">
    	<div class="space"> </div>
   	  <form action="index.php/admin/login" method="post"><div class="content">
        <div class="field"><label>账　户：</label><input class="username" name="account" type="text" /></div>
		<div class="field"><label>密　码：</label><input class="password" name="password" type="password" /><br /></div>
        <!-- <div class="field"><label>验证码：</label><input class="captcha" maxlength="6" name="" value="DDZTJ" type="text" /><br /> -->
        <!-- <div class="yzm-box"> </div> -->
        </div>
        <div class="btn"><input name="" type="submit" class="login-btn" value="" /></div>
      </div></form>
    </div>
    <div id="footer"> </div>
</div>
</body>
</html>
