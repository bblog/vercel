function writePCNav() {
    document.write(" <div class='tabbed round'>");
    document.write("<a href=\"..\/..\/..\/..\/\" class=\"logo\">");
    document.write("    <img src=\"https:\/\/s3.ax1x.com\/2020\/11\/18\/DneSpV.png\" class=\"logo-img\">");
    document.write("    <span class=\"logo-text\">Less is more<\/span>");
    document.write("<\/a>");
    document.write("        <ul>");
    document.write("            <li><a><\/a><\/li>");
    document.write("        <\/ul>");
    document.write("        <h1 class=\"t_nav\"><span id=\"hitokoto\">虽说路途遥远，但已经上路，正在走来，告诉你，它绝不会后退，也不会停下。 <\/span><\/h1>");
    document.write(" <\/div");
}

function writeMobileTopBar() {
    document.write("<div id=\"top-menu\">");
    document.write("			<div class=\"menubar\">");
    document.write("				<svg>");
    document.write("					<path class=\"line--1\" d=\"M0 40h62c18 0 18-20-17 5L31 55\"><\/path>");
    document.write("					<path class=\"line--2\" d=\"M0 50h80\"><\/path>");
    document.write("					<path class=\"line--3\" d=\"M0 60h62c18 0 18 20-17-5L31 45\"><\/path>");
    document.write("				<\/svg>");
    document.write("			<\/div>");
    document.write("			<div class=\"top-title\">");
    document.write("				<div><a href=\"..\/..\/..\/..\/\" class=\"logo\"> <img src=\"https:\/\/s3.ax1x.com\/2020\/11\/18\/DneSpV.png\" class=\"logo-img\"> <span class=\"logo-text\">Blue<\/span><\/a><\/div>");
    document.write("			<\/div>");
    document.write("<a href=\"..\/..\/..\/..\/about\/search.html\"><span class=\"search-button\"><\/span><\/a>");
    document.write("		<\/div>");
}

function writeMobileNav() {
    document.write("<div class=\"nav-container\">");
    document.write("		<div class=\"mobile-navbar\">");
    document.write("			<ul>");
    document.write("				<li><a><\/a><\/li>");
    document.write("			<\/ul>");
    document.write("			<h1 class=\"t_nav\"><span id=\"hitokoto\">爱欲于人，犹如执炬，逆风而行，必有烧手之患<\/span><\/h1>");
    document.write("		<\/div>");
    document.write("<\/div>");
}

var width = document.documentElement.clientWidth;
var container = document.querySelector('#container');
// 加载左上角句子的script 不用一个一个添加   一言API
var secScript = document.createElement("script");
secScript.setAttribute("type", "text/javascript");
secScript.setAttribute("src", "https://v1.hitokoto.cn/?c=d&c=i&c=k&encode=js&select=%23hitokoto"); //一言c参数可以设置句子类型
document.body.insertBefore(secScript, document.body.lastChild);

function setNav() { //导航栏设置
    if (width < 1200) { //移动端菜单栏
        writeMobileNav();
        writeMobileTopBar();
        // 监听菜单键
        document.querySelector(".menubar").addEventListener("click", //
            // 手机端菜单键点击后执行的函数
            function () {
                if (document.querySelector(".menubar").classList.contains('arrow')) {
                    document.querySelector(".menubar").classList.remove("arrow");
                    document.querySelector(".nav-container").style.display = "none";
                } else {
                    document.querySelector(".menubar").classList.add("arrow");
                    document.querySelector(".nav-container").style.display = "block";
                }
            })


        var str = [ //导航栏文字
            "首页",
            "好物收录",
            "我的原创",
            "查找文章",
            "关于",
            "发现更多"
        ]
        var href = [ //链接 
            "../../../../index0.html",
            "javascript:void(0);",
            "javascript:void(0);",
            "javascript:void(0);",
            "javascript:void(0);",
            "javascript:void(0);"
        ]
        while (document.querySelectorAll(".mobile-navbar ul li").length < str.length) { //li的数量为6
            var last = document.querySelectorAll(".mobile-navbar ul li")[0].cloneNode(true);
            document.querySelector(".mobile-navbar ul").appendChild(last);
        }
        var mobileNavbar = document.querySelectorAll(".mobile-navbar ul li")
        for (let index = 0; index < mobileNavbar.length; index++) {
            //为每个li设置文字与链接
            const element = mobileNavbar[index];
            element.querySelector("a").innerHTML = str[index]
            element.querySelector("a").href = href[index]
        }

        // 第2个的展开页
        var ul = document.querySelector(".mobile-navbar ul")
        var article_li = ul.children[1]
        var ul2 = document.createElement("ul");
        ul2.setAttribute("class", "second-menu")
        var str = [
            "经典文章",
            "技术文章",
            "美句收录"
        ]
        var href = [ //链接
            "../../../../article",
            "javascript:void(0);",
            "../../../../sentence"
        ]
        for (let index = 0; index < str.length; index++) {
            //由str的长度添加<li><a></a></li>
            //并设置文字  href
            var a = document.createElement("a");
            a.innerHTML = str[index]
            a.href = href[index]
            var li1 = document.createElement("li");
            li1.appendChild(a)
            ul2.appendChild(li1)
        }
        article_li.appendChild(ul2)

        // 第3个的展开页
        var article_li = ul.children[2]
        var ul2 = document.createElement("ul");
        ul2.setAttribute("class", "second-menu")
        var str = [
            "我的文章",
            "个人感悟",
            "闲言碎语"
        ]
        var href = [ //链接
            "../../../../about/classification.html",
            "../../../../sentence",
            "javascript:void(0);"
        ]
        for (let index = 0; index < str.length; index++) {
            //由str的长度添加<li><a></a></li>
            //并设置文字  href
            var a = document.createElement("a");
            a.innerHTML = str[index]
            a.href = href[index]
            var li1 = document.createElement("li");
            li1.appendChild(a)
            ul2.appendChild(li1)
        }
        article_li.appendChild(ul2)

        // 第4个的展开页
        var article_li = ul.children[3]
        var ul2 = document.createElement("ul");
        ul2.setAttribute("class", "second-menu")
        var str = [
            "分类查找",
            "标签",
            "存档",
            "搜索"
        ]
        var href = [
            "../../../../about/classification.html",
            "../../../../about/tags.html",
            "../../../../about/file.html",
            "../../../../about/search.html#我的",
        ]
        for (let index = 0; index < str.length; index++) {
            //由str的长度添加<li><a></a></li>
            //并设置文字  href
            var a = document.createElement("a");
            a.innerHTML = str[index]
            a.href = href[index]
            var li1 = document.createElement("li");
            li1.appendChild(a)
            ul2.appendChild(li1)
        }
        article_li.appendChild(ul2)

        // 第5个的展开页
        var article_li = ul.children[4]
        var ul2 = document.createElement("ul");
        ul2.setAttribute("class", "second-menu")
        var str = [
            "关于本站",
            "更新日志",
            "本站统计",
            "本站代码结构",
            "关于发文",
            "留言板"
        ]
        var href = [
            "../../../../about",
            "../../../../about/timeline.html",
            "https://tongji.baidu.com/web/welcome/ico?s=dfb2e9af2c4ea3536c96e73ddb3dc6b8",
            "../../../../about/structure.html",
            "../../../../about/docs.html",
            "../../../../about/guestbook.html"
        ]
        for (let index = 0; index < str.length; index++) {
            //由str的长度添加<li><a></a></li>
            //并设置文字  href

            var a = document.createElement("a");
            a.innerHTML = str[index]
            a.href = href[index]
            if (str[index] == "本站统计") {
                a.target = "_blank";
            }
            var li1 = document.createElement("li");
            li1.appendChild(a)
            ul2.appendChild(li1)
        }
        article_li.appendChild(ul2)


        // 第6个的展开页

        var article_li = ul.children[5]
        //article_li.classList.add("li-list")
        var ul2 = document.createElement("ul");
        ul2.setAttribute("class", "second-menu")
        var str = [
            "首个网站",
            "每日明记",
            "计时器"
        ]
        var href = [
            "https://mdming.github.io",
            "../../../../diary",
            "../../../../tools/timer"
        ]
        for (let index = 0; index < str.length; index++) {
            //由str的长度添加<li><a></a></li>
            //并设置文字  href
            var a = document.createElement("a");
            a.innerHTML = str[index]
            a.href = href[index]
            a.target = "_blank"; //新页面
            var li1 = document.createElement("li");
            li1.appendChild(a)
            ul2.appendChild(li1)
        }
        article_li.appendChild(ul2)

    } else { //PC端导航栏

        //设置导航栏文字
        writePCNav();

        var str = [ //导航栏文字
            "首页",
            "好物收录",
            "我的原创",
            "查找文章",
            "关于",
            "发现更多"
        ]
        var href = [ //链接 
            "../../../../index0.html",
            "javascript:void(0);",
            "javascript:void(0);",
            "../../../../about/search.html",
            "../../../../about",
            "javascript:void(0);"
        ]

        while (document.querySelectorAll(".tabbed ul li").length < str.length) { //li的数量为6
            var last = document.querySelectorAll(".tabbed ul li")[0].cloneNode(true);
            document.querySelector(".tabbed ul").appendChild(last);
        }
        var tabbed = document.querySelectorAll(".tabbed ul li")
        for (let index = 0; index < tabbed.length; index++) {
            //为每个li设置文字与链接
            const element = tabbed[index];
            element.querySelector("a").innerHTML = str[index]
            element.querySelector("a").href = href[index]
        }

        // 第2个的展开页
        var ul = document.querySelector(".tabbed ul")
        var article_li = ul.children[1]
        var ul2 = document.createElement("ul");
        ul2.setAttribute("class", "ul_c")
        var str = [
            "经典文章",
            "技术文章",
            "美句收录"
        ]
        var href = [ //链接
            "../../../../article",
            "javascript:void(0);",
            "../../../../sentence"
        ]
        for (let index = 0; index < str.length; index++) {
            //由str的长度添加<li><a></a></li>
            //并设置文字  href
            var a = document.createElement("a");
            a.innerHTML = str[index]
            a.href = href[index]
            var li1 = document.createElement("li");
            li1.appendChild(a)
            ul2.appendChild(li1)
        }
        article_li.appendChild(ul2)

        // 第3个的展开页
        var article_li = ul.children[2]
        var ul2 = document.createElement("ul");
        ul2.setAttribute("class", "ul_c")
        var str = [
            "我的文章",
            "个人感悟",
            "闲言碎语"
        ]
        var href = [ //链接
            "../../../../about/classification.html",
            "../../../../sentence",
            "javascript:void(0);"
        ]
        for (let index = 0; index < str.length; index++) {
            //由str的长度添加<li><a></a></li>
            //并设置文字  href
            var a = document.createElement("a");
            a.innerHTML = str[index]
            a.href = href[index]
            var li1 = document.createElement("li");
            li1.appendChild(a)
            ul2.appendChild(li1)
        }
        article_li.appendChild(ul2)

        // 第4个的展开页
        var article_li = ul.children[3]
        var ul2 = document.createElement("ul");
        ul2.setAttribute("class", "ul_c")
        var str = [
            "分类查找",
            "标签",
            "存档",
            "搜索"
        ]
        var href = [
            "../../../../about/classification.html",
            "../../../../about/tags.html",
            "../../../../about/file.html",
            "../../../../about/search.html#我的",
        ]
        for (let index = 0; index < str.length; index++) {
            //由str的长度添加<li><a></a></li>
            //并设置文字  href
            var a = document.createElement("a");
            a.innerHTML = str[index]
            a.href = href[index]
            var li1 = document.createElement("li");
            li1.appendChild(a)
            ul2.appendChild(li1)
        }
        article_li.appendChild(ul2)

        // 第5个的展开页
        var article_li = ul.children[4]
        //article_li.classList.add("li-list")
        var ul2 = document.createElement("ul");
        ul2.setAttribute("class", "ul_c")
        var str = [
            "关于本站",
            "更新日志",
            "本站统计",
            "本站代码结构",
            "关于发文",
            "留言板"
        ]
        var href = [
            "../../../../about",
            "../../../../about/timeline.html",
            "https://tongji.baidu.com/web/welcome/ico?s=dfb2e9af2c4ea3536c96e73ddb3dc6b8",
            "../../../../about/structure.html",
            "../../../../about/docs.html",
            "../../../../about/guestbook.html"
        ]
        for (let index = 0; index < str.length; index++) {
            //由str的长度添加<li><a></a></li>
            //并设置文字  href

            var a = document.createElement("a");
            a.innerHTML = str[index]
            a.href = href[index]
            if (str[index] == "本站统计") {
                a.target = "_blank";
            }
            var li1 = document.createElement("li");
            li1.appendChild(a)
            ul2.appendChild(li1)
        }
        article_li.appendChild(ul2)


        // 第6个的展开页

        var article_li = ul.children[5]
        //article_li.classList.add("li-list")
        var ul2 = document.createElement("ul");
        ul2.setAttribute("class", "ul_c")
        var str = [
            "首个网站",
            "每日明记",
            "计时器"
        ]
        var href = [
            "https://mdming.github.io",
            "../../../../diary",
            "../../../../tools/timer"
        ]
        for (let index = 0; index < str.length; index++) {
            //由str的长度添加<li><a></a></li>
            //并设置文字  href
            var a = document.createElement("a");
            a.innerHTML = str[index]
            a.href = href[index]
            a.target = "_blank"; //新页面
            var li1 = document.createElement("li");
            li1.appendChild(a)
            ul2.appendChild(li1)
        }
        article_li.appendChild(ul2)
    }
};

setNav();

window.onresize = function () {
    location.reload();
}