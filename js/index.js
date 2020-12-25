/*
    *加载主页和sentence的内容AJAX　　
    * 即异步加载json的数据到HTMl中
    *json数据将会随页码变化  网页不跳转
    *<li>将在HTML中设置  这里不再设置  要十个
    *文件只有一个函数
    调用方法：
    *调用函数：getArticleData(file_name)
    *参数：file_name为json文件名（带json后缀）
    
    更多：
    *卡片数量可以动态更改：
    *修改per_page_amount即可
 */
function getArticleData(file_name) { //file_name为要加载的json文件名  需要在相应的HTML中调用
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var articles = JSON.parse(this.responseText).articles //例化
            var per_page_amount = 10 //决定每页卡片数量  可以调整
            var nth_page = 0 //第几页  
            document.querySelector(".pagination").addEventListener("click", function (e) { //监听页码点击事件 确定在第几页为nth_page赋值
                for (let index = 0; index < document.querySelectorAll('.pagination li').length; index++) {
                    document.querySelectorAll(".pagination li")[index].classList.remove("active") //清除之前就存在的active
                    if (document.querySelectorAll(".pagination li")[index] == e.target.parentElement || document.querySelectorAll(".pagination li")[index] == e.target.parentElement.parentElement) {
                        // 确定触发源
                        if (index == 0) { //到首页
                            nth_page = 0
                        } else if (index == document.querySelectorAll('.pagination li').length - 1) { //到有页码的页
                            nth_page = document.querySelectorAll('.pagination li').length - 3
                        } else { //到末页
                            nth_page = index - 1
                        }
                    }
                }
                document.querySelectorAll(".pagination li")[nth_page + 1].classList.add("active") //显示是第几页
                setCardHTML(nth_page); //设置对应的HTML
            })
            // ==================HTML的设置函数
            var top = new Array; //存储top的序号
            var art = new Array; //存储没有top的所有序号
            var i, //json中的序号
                art_index; //art数组的序号
            for (let index = 0; index < articles.length; index++) {
                if (articles[index].top == true) { //用数组来分类  取序号
                    top.push(index)
                } else {
                    art.push(index)
                }
            }

            function setCardHTML(nth_page) { //每次点击页码就执行，更新内容
                if (nth_page == 0) {
                    art_index = art.length - per_page_amount * nth_page; //
                } else {
                    art_index = art.length - per_page_amount * nth_page + top.length; //第二页开始的art数组的索引
                }
                var articlesHTML = document.querySelectorAll("#article_ul li") //卡片
                // var start_card = articles.length - 1 - per_page_amount * nth_page //该页起始的json里面的序号
                // var nth_li //nth_li是HTML里的序号
                // var nth_card = 5;
                // for (let nth_card = start_card; nth_card > start_card - per_page_amount; nth_card--) { //遍历所有的十个json对象
                //nth_card是json中的序号
                for (let index = 0; index < articlesHTML.length; index++) { //遍历一页的卡片
                    const element = articlesHTML[index];
                    // nth_li = start_card - nth_card
                    if (art_index > 0) { //还存在json对象数据
                        if (index < top.length && nth_page == 0) { //第一页显示置顶的文章
                            i = top[index]
                            // 设置置顶项的值
                            element.querySelector("span a").href = articles[i].url //图片的目的链接
                            element.querySelector("span a img").src = articles[i].img_url //图片链接src用于图片显示
                            element.querySelector(".blogtitle a").innerHTML = "【置顶】" + articles[i].title //标题
                            element.querySelector(".blogtitle a").href = articles[i].url //标题的目的链接
                            element.querySelector(".bloginfo p").innerHTML = articles[i].introduction //文章简介
                            element.querySelector(".lm a").innerHTML = articles[i].tag //标签
                            element.querySelector(".lm a").href = '../../../../about/search.html' + '#' + articles[i].tag
                            element.querySelector(".dtime a").innerHTML = articles[i].time //发表时间
                            element.querySelector(".dtime a").href = '../../../../about/search.html' + '#' + articles[i].time
                            element.querySelector(".writer a").innerHTML = articles[i].writer //作者
                            element.querySelector(".writer a").href = '../../../../about/search.html' + '#' + articles[i].writer
                        } else { //非置顶的文章
                            art_index--;
                            i = art[art_index] //取数组的值
                            // 设置未置顶项的值
                            element.querySelector("span a").href = articles[i].url //图片的目的链接
                            element.querySelector("span a img").src = articles[i].img_url //图片链接src用于图片显示
                            element.querySelector(".blogtitle a").innerHTML = articles[i].title //标题
                            element.querySelector(".blogtitle a").href = articles[i].url //标题的目的链接
                            element.querySelector(".bloginfo p").innerHTML = articles[i].introduction //文章简介
                            element.querySelector(".lm a").innerHTML = articles[i].tag //标签
                            element.querySelector(".lm a").href = '../../../../about/search.html' + '#' + articles[i].tag
                            element.querySelector(".dtime a").innerHTML = articles[i].time //发表时间
                            element.querySelector(".dtime a").href = '../../../../about/search.html' + '#' + articles[i].time
                            element.querySelector(".writer a").innerHTML = articles[i].writer //作者
                            element.querySelector(".writer a").href = '../../../../about/search.html' + '#' + articles[i].writer
                        }

                    } else { //无数据，加载默认内容
                        element.querySelector("span a img").src = "https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture"
                        // 图片采用必应API 图片动态更新
                        // 延时几毫秒使图片不同？  待实现
                        element.querySelector(".blogtitle a").innerHTML = "敬请期待！"
                        element.querySelector(".bloginfo p").innerHTML = "敬请期待！"
                        element.querySelector(".lm a").innerHTML = "暂无"
                        element.querySelector(".dtime a").innerHTML = "2012-12-12"
                        element.querySelector(".writer a").innerHTML = "无"
                    }
                }
            }
            setCardHTML(0); //未点击前自动加载第一页
        }

    }
    xmlhttp.open("GET", file_name, true);
    xmlhttp.send();
}