<!DOCTYPE html>
<html>

<head>
    <meta charset=utf-8>
    <meta name=viewport content="width=device-width,initial-scale=1,user-scalable=none">
    <title>非标组开发模板</title>
    <link href="/static_resource/dist/static/css/app.css?v=<?php echo Yii::app()->params['version']; ?>" rel=stylesheet>
</head>

<body>
    <div id=app></div>
    <script type=text/javascript src=//res.wx.qq.com/open/js/jweixin-1.0.0.js></script>
    <script type=text/javascript src="/static_resource/dist/static/js/manifest.js?v=<?php echo Yii::app()->params['version']; ?>"></script>
    <script type=text/javascript src="/static_resource/dist/static/js/vendor.js?v=<?php echo Yii::app()->params['version']; ?>"></script>
    <script type=text/javascript src="/static_resource/dist/static/js/app.js?v=<?php echo Yii::app()->params['version']; ?>"></script>
</body>

</html>
