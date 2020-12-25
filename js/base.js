/* 
 *各个网页均存在的JS  
 */
var width = document.documentElement.clientWidth;
var container = document.querySelector('#container');
! function () { //使用ifram的优化
    //标题添加“蒙大明的个人博客”
    var title = document.querySelector("title");
    if (title.innerText != "蒙大明的个人博客") {
        title.innerText = title.innerText + " - 蒙大明的个人博客"
    }

    // 防止iframe消失  刷新时---
    function GetUrlRelativePath() { //获取相对路径
        var url = document.location.toString();
        var arrUrl = url.split("//");
        var start = arrUrl[1].indexOf("/");
        var relUrl = arrUrl[1].substring(start); //stop省略，截取从start开始到结尾的所有字符
        if (relUrl.indexOf("?") != -1) {
            relUrl = relUrl.split("?")[0];
        }
        return relUrl;
    }
    if (!parent.document.body.querySelector("#iframe")) {
        window.location.href = "/" + "#" + GetUrlRelativePath(); //刷新时传递锚点
    }
    //地址栏  标题  主题
    window.parent.document.querySelector("title").innerHTML = document.querySelector("title").innerHTML
    window.parent.addEventListener("popstate", function (e) { //后退的优化
        window.history.back(-2);
    }, false);
    var stateObject = {};
    var title = document.querySelector("title").innerHTML
    var newUrl = document.location.href;
    if (GetUrlRelativePath() == "/index0.html") { //主页优化
        newUrl = window.location.origin
    }
    window.parent.history.pushState(stateObject, title, newUrl);
}()


! function () { //文字设置
    // 设置footer日期  设置到当前日期
    var date = new Date();
    document.querySelector('#now_date').innerHTML = (date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate());
    // 设置字数
    // 文章页

    //用word方式计算正文字数
    function fnGetCpmisWords(str) {
        sLen = 0;
        try {
            //先将回车换行符做特殊处理
            str = str.replace(/(\r\n+|\s+|　+)/g, "龘");
            //处理英文字符数字，连续字母、数字、英文符号视为一个单词
            str = str.replace(/[\x00-\xff]/g, "m");
            //合并字符m，连续字母、数字、英文符号视为一个单词
            str = str.replace(/m+/g, "*");
            //去掉回车换行符
            str = str.replace(/龘+/g, "");
            //返回字数
            sLen = str.length;
        } catch (e) {}
        return sLen;
    }
    if (document.querySelector('#word')) {
        var p = document.querySelector('.massage').textContent
        document.querySelector('#word').innerHTML = fnGetCpmisWords(p) + " 字"
    }
}()

! function () { //样式设置
    //随机边框颜色
    if (document.querySelector('main')) {
        document.querySelector('main').style.borderColor = "#" + Math.round(Math.random() * 0x1000000).toString(16);
    }
    // 添加进度条标签
    // if (document.querySelector("#top-menu")) {
        var progress = document.createElement("progress");
        progress.setAttribute("class", "top_progress");
        progress.setAttribute("value", "0");
        document.body.appendChild(progress);
    // }
    // 进度条的响应
    if (document.querySelector('.top_progress')) {
        window.onscroll = function () {
            document.querySelector('.top_progress').max = document.body.scrollHeight - window.screen.availHeight
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            document.querySelector('.top_progress').value = scrollTop
        }
    }
}();

//添加框架、画布、SVG
! function () {
    // add iframe  粒子文字
    var h = window.innerHeight / 2 - 50 + "px"
    if (!document.querySelector(".none-top-word")) {
        var iframe = document.createElement("iframe");
        iframe.setAttribute("id", "top_h")
        iframe.setAttribute("frameborder", "0")
        iframe.setAttribute("height", h)
        iframe.setAttribute("src", "../../../iframe/particle_word.html")
        container.insertBefore(iframe, container.childNodes[0]);
    }
    // add iframe  底部动画
    //随机几个
    var bottom_src = [
        "../../../iframe/bike.html",
        "../../../iframe/horse.html",
        "../../../iframe/train.html"
    ]
    if (document.querySelector(".no_particle")) { //首页几个页面footer有问题，独立添加
        document.querySelector("#bottom_frame").setAttribute("height", h)
        document.querySelector("#bottom_frame").setAttribute("src", bottom_src[Math.floor(Math.random() * bottom_src.length)])
    } else {
        var iframe = document.createElement("iframe");
        iframe.setAttribute("id", "bottom_frame")
        iframe.setAttribute("frameborder", "0")
        iframe.setAttribute("height", h)
        iframe.setAttribute("src", bottom_src[Math.floor(Math.random() * bottom_src.length)])
        container.insertBefore(iframe, document.querySelector(".footer"));
    }
}()

//置顶键、qq相应
! function () {

    // 改变QQ地址  （腾讯QQ的API移动端与PC端链接不同） PC优先

    if (width < 600) {
        document.querySelector('#qq').href = "mqqwpa://im/chat?chat_type=wpa&uin=790430354&version=1&src_type=web&web_src=oicqzone.com"
    }
    // 置顶键的响应（右下角）
    // window.onload = function () {
    var scrollTop = 0;
    document.onscroll = function () {
        if (scrollTop < (document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset)) { //判断页面滚动的方向
            //向下
            // document.querySelector('.top_progress').style.top = "0px"; //进度条
            // document.querySelector('#top-menu').style.top = "-62px"; //移动端
            // document.querySelector('.tabbed').style.top = "-62px"; //PC
            document.querySelector('.aside').style.right = -45 + "px"; //置顶键
        } else { //向上
            // document.querySelector('.top_progress').style.top = "60px"; //进度条
            // document.querySelector('#top-menu').style.top = "0px"; //移动端
            // document.querySelector('.tabbed').style.top = 0;
            document.querySelector('.aside').style.right = 5 + "px";
        }
        if (scrollTop < 250) {
            // document.querySelector('.top_progress').style.top = "60px"; //进度条
            // document.querySelector('#top-menu').style.top = "0px"; //移动端
            document.querySelector('.aside').style.right = -45 + "px";
            // document.querySelector('.tabbed').style.top = 0;
        }
        scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
    }
    // }
}()

//优化pc和移动端的代码，防止无效的执行
function addListSVg(params) { //移动端菜单键
    if (width < 783) {
        // 添加svg——菜单是否展示
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        svg.setAttribute("id", "list")
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute("d", "M30 18h-28c-1.1 0-2-0.9-2-2s0.9-2 2-2h28c1.1 0 2 0.9 2 2s-0.9 2-2 2zM30 6.25h-28c-1.1 0-2-0.9-2-2s0.9-2 2-2h28c1.1 0 2 0.9 2 2s-0.9 2-2 2zM2 25.75h28c1.1 0 2 0.9 2 2s-0.9 2-2 2h-28c-1.1 0-2-0.9-2-2s0.9-2 2-2z")
        svg.appendChild(path)
        document.body.appendChild(svg)
        svg.addEventListener('click', function (params) {
            if (document.querySelector('#side-nav').classList.contains('left')) {
                document.querySelector('#side-nav').classList.remove("left")
            } else {
                document.querySelector('#side-nav').classList.add("left")
            }
        })
    }
}

if (document.querySelector(".massage")) { //通过是否有标题判断是否要添加    推荐算法
    var xmlhttp = new XMLHttpRequest()
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var articles = JSON.parse(this.responseText).articles //例化
            // 顶部
            var card = document.createElement("div"),
                head = document.createElement("div");
            head.setAttribute("class", "h-htc")
            //   div.innerHTML="&lt;div></div>"
            var ul = document.createElement("ul")
            ul.setAttribute("class", "h-tablist-s")
            var str = ["站长推荐", "相关阅读", "随机阅读"]
            //由str的长度添加<li><a></a></li>
            //并设置文字  href
            for (let index = 0; index < str.length; index++) {
                var a = document.createElement("a");
                a.innerHTML = str[index]
                var li = document.createElement("li");
                if (index == 1) {
                    li.setAttribute("class", "active")
                }
                li.appendChild(a)
                ul.appendChild(li)
            }
            head.appendChild(ul)
            //底部列表
            var bottom = document.createElement("div")
            bottom.setAttribute("class", "b-htc")
            var ul = document.createElement("ul")
            for (let index = 0; index < 12; index++) {
                var a = document.createElement("a");
                var span = document.createElement("span");
                span.innerHTML = index + 1 //文章列表序号
                var li = document.createElement("li");
                li.appendChild(span)
                li.appendChild(a)
                ul.appendChild(li)
            }
            bottom.appendChild(ul)
            card.appendChild(head)
            card.appendChild(bottom)
            card.setAttribute("class", "bottom_card")
            var container = document.querySelector("#container")
            container.insertBefore(card, document.querySelector("#bottom_frame"));
            var list = document.querySelectorAll(".b-htc ul li")
            var text = new Array();
            if (document.querySelector(".title h2")) {
                var title = document.querySelector(".title h2").innerHTML
            } else {
                var title = document.querySelector(".title h1").innerHTML
            }
            var writer
            var tag = ""
            var time
            var classification
            var index_have = false //判断index.json中是否存在
            // 判断在json是否有对应的标题
            // 读取标题所对应的json的信息  将其序号加入text中
            for (let index = 0; index < articles.length; index++) {
                const element = articles[index];
                if (element.title == title) {
                    classification = element.classification
                    writer = element.writer
                    tag = element.tag
                    time = element.time
                    text.push(index)
                    index_have = true
                }
            }
            //设置标题下面的信息栏
            var spanHTML=document.querySelectorAll(".later")
            console.log();
            if (spanHTML) {
                spanHTML[0].innerHTML=tag;
                spanHTML[1].innerHTML=writer;
                spanHTML[2].innerHTML=time;
            }
            if (index_have) { //index.json中存在
                // 1 !text.includes(index)用于防止有同一篇文章
                // 提取标题中有同样文字的文章序号
                if (text.length < list.length + 1) {
                    var title_word = title.split(""); //剪辑成数组
                    for (let index = 0; index < articles.length; index++) {
                        var element = articles[index];
                        for (let i = 0; i < title_word.length; i++) { //遍历是否有对应的字
                            if (element.title.includes(title_word[i]) && text.length < list.length + 1 && !text.includes(index)) {
                                text.push(index)
                            }
                        }
                    }
                }
                // 提取同一个分类（classification）的文章序号
                if (text.length < list.length + 1) {
                    for (let index = 0; index < articles.length; index++) {
                        var element = articles[index];
                        if (element.classification == classification && text.length < list.length + 1 && !text.includes(index)) {
                            text.push(index)
                        }
                    }
                }
                // 提取同一个作者（writer）的文章序号
                if (text.length < list.length + 1) {
                    for (let index = 0; index < articles.length; index++) {
                        var element = articles[index];
                        if (element.writer == writer && text.length < list.length + 1 && !text.includes(index)) {
                            text.push(index)
                        }
                    }
                }
                // 提取同一个标签（tag）的文章序号
                if (text.length < list.length + 1) {
                    for (let index = 0; index < articles.length; index++) {
                        var element = articles[index];
                        if (element.tag == tag && text.length < list.length + 1 && !text.includes(index)) {
                            text.push(index)
                        }
                    }
                }
                // 提取同一个同一年（time）的文章序号
                if (text.length < list.length + 1) {
                    for (let index = 0; index < articles.length; index++) {
                        var element = articles[index];
                        if (element.time.substring(0, 4) == time.substring(0, 4) && text.length < list.length + 1 && !text.includes(index)) {
                            text.push(index)
                        }
                    }
                }

            } else { //index.json中不存在时
                // 提取标题中有同样文字的文章序号
                text.push("none")
                if (text.length < list.length + 1) {
                    var title_word = title.split(""); //剪辑成数组
                    for (let index = 0; index < articles.length; index++) {
                        var element = articles[index];
                        for (let i = 0; i < title_word.length; i++) { //遍历是否有对应的字
                            if (element.title.includes(title_word[i]) && text.length < list.length + 1 && !text.includes(index)) {
                                text.push(index)
                            }
                        }
                    }
                }
            }
            // 如果数量不够，随机添加
            while (text.length < list.length + 1) {
                var random = Math.floor(Math.random() * articles.length)
                if (!text.includes(random)) {
                    text.push(random)
                }
            }
            // 使用text数组添加，title和href
            for (let index = 0; index < list.length; index++) {
                var element = list[index];
                element.querySelector("a").innerHTML = articles[text[index + 1]].title //index+1是因为第一个是当前的文章的序号
                element.querySelector("a").href = articles[text[index + 1]].url
            }

            // 添加监听ul
            document.querySelector(".h-tablist-s").addEventListener("click", function name(e) {
                for (let index = 0; index < this.childNodes.length; index++) { //清空.active
                    if (this.childNodes[index].classList.contains('active')) {
                        this.childNodes[index].classList.remove("active")
                    }
                }
                // 防止触发源的不理想（好像不存在）  添加active
                if (e.target.localName == "a") {
                    e.target.parentNode.classList.add("active")
                } //else if (e.target.localName == "li") {
                //   e.target.classList.add("active")
                //  }
                if (e.target.innerHTML == "站长推荐") { //点击站长推荐
                    var num = new Array
                    for (let index = 0; index < articles.length; index++) {
                        var element = articles[index];
                        if (element.recommend) { //优先显示json中recommend=true的文章
                            num.push(index)
                        }
                    }
                    // 防止数量不够，随机添加
                    while (num.length < list.length) {
                        var random = Math.floor(Math.random() * articles.length)
                        if (!num.includes(random)) {
                            num.push(random)
                        }
                    }
                    // 添加底部展示信息
                    for (let index = 0; index < list.length; index++) {
                        var element = list[index];
                        element.querySelector("a").innerHTML = articles[num[index]].title
                        element.querySelector("a").href = articles[num[index]].url
                    }
                } else if (e.target.innerHTML == "相关阅读") { //点击相关阅读
                    // 利用数组text设置信息
                    for (let index = 0; index < list.length; index++) {
                        var element = list[index];
                        element.querySelector("a").innerHTML = articles[text[index + 1]].title
                        element.querySelector("a").href = articles[text[index + 1]].url
                    }
                } else if (e.target.innerHTML == "随机阅读") { //点击随机阅读
                    var Random = new Array
                    // 获取随机序号且无重复
                    while (Random.length < list.length) {
                        var random = Math.floor(Math.random() * articles.length)
                        if (!Random.includes(random)) {
                            Random.push(random)
                        }
                    }
                    // 设置信息
                    for (let index = 0; index < list.length; index++) {
                        var element = list[index];
                        element.querySelector("a").innerHTML = articles[Random[index]].title
                        element.querySelector("a").href = articles[Random[index]].url
                    }
                }
            })
        }
    }
    xmlhttp.open("GET", "../../../../json/index.json", true);
    xmlhttp.send();
}

function addLeftList(params) { // 生成左侧菜单栏   
    var contents = document.querySelectorAll(".contents")
    if (contents.length > 0) {
        var li = document.createElement("li")
        var ul = document.createElement("ul")
        var a = document.createElement("a")
        var container = document.querySelector('body');
        ul.id = "side-nav"
        li.appendChild(a)
        ul.appendChild(li)
        container.insertBefore(ul, container.lastChild);
        var id = ""

        for (let index = 0; index < contents.length; index++) { //生成侧边导航栏并设id、href
            var element = contents[index];
            var li = document.querySelector("#side-nav li").cloneNode(true) //克隆  true：子节点也克隆
            if (element.dataset.titleName != undefined) { //data-title-name 可以设置标题
                id = element.dataset.titleName
            } else {
                const l = 15
                if (element.children.length > 0) {
                    if (element.firstChild.innerHTML.replace(/\s+/g, "").length > l) {
                        //优化,字符串过长时截取前面的非空格字符
                        id = element.innerText.replace(/\s+/g, "").substring(0, l)
                    } else {
                        id = element.innerText //元素里面的所有文本，包括子结点
                    }
                } else {
                    if (element.innerHTML.replace(/\s+/g, "").length > l) { //优化
                        id = element.innerHTML.replace(/\s+/g, "").substring(0, l)
                    } else {
                        id = element.innerHTML
                    }
                }
            }
            li.firstChild.innerHTML = id
            li.firstChild.href = "#" + id
            element.setAttribute("id", id)
            ul.appendChild(li)
        }
        // 添加监听ul
        document.querySelector("#side-nav").addEventListener("click", function (e) {
            var t = this
            setTimeout(function () {
                for (let index = 0; index < t.childNodes.length; index++) { //清空.active
                    if (t.childNodes[index].classList.contains('active')) {
                        t.childNodes[index].classList.remove("active")
                    }
                }
                // 被点击后添加样式
                if (e.target.localName == "a") {
                    e.target.parentNode.classList.add("active")
                }
            }, 500);
        })
        window.addEventListener("scroll", function (e) { //监听滚动 便于active的响应
            // h获取被滚动的高度
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window
                .pageYOffset;
            for (let index = 0; index < document.querySelectorAll(".contents").length; index++) { // 遍历标题
                var element = document.querySelectorAll(".contents")[index]
                //element.getBoundingClientRect().top);可以直接获取元素到浏览器顶部的距离
                if (element.getBoundingClientRect().top < 120) { //如果滚到对应位置 && d - scrollTop < 200
                    for (let index = 0; index < document.querySelector("#side-nav").childNodes
                        .length; index++) { //清空.active
                        if (document.querySelector("#side-nav").childNodes[index].classList.contains(
                                'active')) {
                            document.querySelector("#side-nav").childNodes[index].classList.remove("active")
                        }
                    }
                    document.querySelector("#side-nav").childNodes[index + 1].classList.add("active")
                }
            }
            // 目录栏响应
            if (scrollTop > 250 && width > 800) { //防止移动端出现
                document.querySelector('#side-nav').classList.add("left")
            } else {
                document.querySelector('#side-nav').classList.remove("left")
            }
        })
        addListSVg()
    }
}

if (document.querySelector("#word") || document.querySelector("#write")) { //详情页
    addLeftList(); //添加目录
    // 添加来必力评论
    //添加html
    var main = document.querySelector("main"),
        h2 = document.createElement("h2"),
        div = document.createElement("div"),
        span = document.createElement("span");
    h2.innerText = "留言";
    span.innerText = "文明上网，理性发言";
    span.setAttribute('id', 'tips');
    h2.appendChild(span);
    div.setAttribute('id', 'lv-container');
    div.setAttribute('data-id', 'city');
    div.setAttribute('data-uid', 'MTAyMC80OTE3Mi8yNTY2Ng==');
    main.appendChild(h2);
    main.appendChild(div);
    //添加js
    (function (d, s) {
        var j, e = d.getElementsByTagName(s)[0];
        if (typeof LivereTower === 'function') {
            return;
        }
        j = d.createElement(s);
        j.src = 'https://cdn-city.livere.com/js/embed.dist.js';
        j.async = true;
        e.parentNode.insertBefore(j, e);
    })(document, 'script');
    // 顶部栏去掉id=active
    var tabbed = document.querySelectorAll(".tabbed ul li")
    for (let index = 0; index < tabbed.length; index++) {
        const element = tabbed[index];
        element.id = "";
    }
}

//底部栏优化
if (document.querySelector('#busuanzi_container_site_uv')) {
    document.querySelector('#busuanzi_container_site_uv').innerHTML = document.querySelector('#busuanzi_container_site_uv').innerHTML.slice(0, -1)
}

var _hmt = _hmt || [];
(function () { //百度统计
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?dfb2e9af2c4ea3536c96e73ddb3dc6b8";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();

(function () { // 代码块右上角添加复制按钮和功能
    if (document.querySelector('.md-fences')) {
        var codes = document.querySelectorAll('.md-fences');
        for (let index = 0; index < codes.length; index++) { //添加按钮
            const element = codes[index];
            element.classList.add('copy-code' + "-" + index)
            var div = document.createElement('div');
            div.classList.add('copy-button');
            div.setAttribute("data-clipboard-target", ".copy-code" + "-" + index)
            div.innerText = "复制代码"
            element.appendChild(div)
        }

        function loadScript(src, callback) { //添加clipboard.min.js
            var script = document.createElement('script'),
                head = document.getElementsByTagName('head')[0];
            script.type = 'text/javascript';
            script.charset = 'UTF-8';
            script.src = src;
            if (script.addEventListener) {
                script.addEventListener('load', function () {
                    callback();
                }, false);
            } else if (script.attachEvent) {
                script.attachEvent('onreadystatechange', function () {
                    var target = window.event.srcElement;
                    if (target.readyState == 'loaded') {
                        callback();
                    }
                });
            }
            head.appendChild(script);
        }

        loadScript('https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js', function () {
            // 加载完成以后的回调函数
            var clipboard = new ClipboardJS('.copy-button');
            clipboard.on('success', function (e) {
                if (e.trigger.innerText == '复制成功') {
                    e.trigger.innerText = '复制代码'
                    e.trigger.style.color = "#22222c"
                } else {
                    e.trigger.innerText = '复制成功'
                    e.trigger.style.color = "#9e9e9e"
                }
                e.clearSelection();
            });

            clipboard.on('error', function (e) {
                if (e.trigger.innerText == '复制失败') {
                    e.trigger.innerText = '复制代码'
                    e.trigger.style.color = "red"
                } else {
                    e.trigger.innerText = '复制失败'
                    e.trigger.style.color = "#9e9e9e"
                }
                e.clearSelection();
            });
        });
    }
})();


(function (params) {
    var navButton = document.querySelectorAll('.mobile-navbar li')
    for (let index = 1; index < navButton.length; index++) {
        const element = navButton[index];
        element.addEventListener("click", function (e) {
            if (this.classList.contains('second-menu-open') == true) { //如果已经展开
                this.classList.remove("second-menu-open") //关闭
            } else { //如果没展开
                this.classList.add("second-menu-open") //展开点击的地方
            }
            for (var j = 1; j < navButton.length; j++) { //把其他的关闭
                if (navButton[j] != this) {
                    navButton[j].classList.remove("second-menu-open")
                }
            }
        })

    }
})();


