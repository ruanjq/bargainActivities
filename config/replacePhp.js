const fs = require('fs');
fs.readFile(__dirname + '/../dist/index.html', { flag: 'r+', encoding: 'utf8' }, function(err, data) {
    if (err) {
        console.error(err);
        return;
    }

    // 目标php 文件路径
    let phpPath = __dirname + '/../../../../views/wap/splash/index.php';
  
    // 替换js 目录
    data = data.replace(/src=\/static/ig, "src=<?= Yii::$app->params['static_url'] ;?>");

    // 替换css 目录
    data = data.replace(/link=\/static/ig, "link=<?= Yii::$app->params['static_url'] ;?>");
    // 清空文件信息
    fs.truncate(phpPath, 0, function() { console.log('clear cussess') });
    fs.writeFile(phpPath, data, { flag: 'a' }, function(err) {
        if (err) {
            console.error(err);
        } else {
            console.log('php file replace success');
        }
    });
});
