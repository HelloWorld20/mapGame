非标组外包项目开发模板

### 技术栈

vue2 + vue-router

可根据需要引入`axios`以及`vuex`

此开发模板修改了`webpack`的部分配置，方便我们把项目发布到平台上。

## 更新

### 2017.11.11更新

删除了无用依赖，关闭了webpack图片自动转换为base64。

新引进了eslint规范，使用的是airbnb规范，相关的eslint配置可以参考下面的文档。

### 2017.11.14更新

添加了hwlever。具体文档见：[https://github.com/HelloWorld20/hwLever](https://github.com/HelloWorld20/hwLever)

### 2017.11.22更新

1. 添加了Preload子组件。用于图片、音乐预加载。
2. 添加了配置文件。存放前端代码中一切需要配置的东西如预加载图片、微信分享文案等。
3. 添加了微信分享设置

### 使用说明

下载到本地后

`yarn` 安装依赖

`yarn run dev`本地调试

### 线上发布

 如果需要发布版本到线上，到平台上调试，比如需要调用微信`jssdk`等，流程如下。

把文件夹的名字修改如下

game_template =>  name_id

其中的`name`是本项目的名字，无特别要求。`id`是本项目的唯一`id`，不可重复，在平台现有模板`id`基础上递增。

文件夹文字修改完毕后，通过`yarn run build`完成打包，然后把分支推送到github上，构建之后通过

`http://test.24haowan.com/webCustom/addCustomGame/tpl_id/id`

`id`修改为自己的游戏`id`，便可以创建游戏进行测试。

### eslint配置说明

为了提升非标组项目内部的协同开发效率，同时也是为了约束大家的代码规范，故引入Airbnb规范约束大家的代码风格。目前处于测试阶段，故需要大家共同维护相关的eslint配置。

eslint的配置也比较简单，在`vs-code`中下载`ESLint`插件即可，这样便可以对我们的js文件进行检测了。但是因为我们还需要约束Vue里面的js代码，所以还需要打开设置(可以通过`Command+,`直接打开，或者在左上角中自己手动打开)，加入以下配置。

```
"eslint.validate": [
    "javascript",
    "javascriptreact",
    {
        "language": "html",
        "autoFix": true
    },
    {
        "language": "vue",
        "autoFix": true
    }
],
"eslint.autoFixOnSave": true
```

上面的配置分别是指开启Vue的检查，同时也能实现在保存的时候自动的去修复一部分的错误。

平时开发时如果遇到eslint的错误，可以在`https://eslint.org/docs/rules/`网站上搜索详细的错误说明。

脚手架中已经集成了部分eslint的配置，写在`.eslintrc.js`中。这也是eslint的配置文件，可以看到在配置文件中我们写了`extends: 'airbnb-base'`，这也是表明我们的这份eslint配置是基于Airbnb规范的。

如果开发过程中遇到了不赞同的eslint约束，可以通过修改`.eslintrc.js`文件去掉相关约束。另外，因为我已经去掉了webpack中的eslint检查，所以就算在vscode中存在eslint的报错，还是可以正常打包预览的，甚至直接应用于生产环境。但是项目正式上线的时候，还是尽量的解决掉相关的错误。
