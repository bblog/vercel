/*！
 *1.设置名人名言、个人感悟两个板块的卡片
 *2.通过json传送数据给卡片
 */

function getYiyan(nth_li) { // 用一言api添加  没有json数据的卡片
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText); //获得字符串形式的响应数据。
            document.querySelectorAll("#columns li")[nth_li].querySelector("p").innerHTML = data.hitokoto //加载句子
            document.querySelectorAll("#columns li")[nth_li].querySelectorAll("p")[1].innerHTML = "————《" + data.from + "》" //加载来源并格式化
        }
    }
    xhr.open('get', " https://international.v1.hitokoto.cn/?c=b&c=i&c=k"); //c参数可以的设置不同类型的句子
    xhr.send();
}
// 封装Ajax加载函数  形参为加载的json文件名
function getSentenceData(file_name) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var sentence = JSON.parse(this.responseText).sentence
            var per_page_amount = 20 //决定每页卡片数量
            var nth_page = 0 //第几页
            setCardHTML(0);
            document.querySelector(".pagination").addEventListener("click", function (e) {
                for (let index = 0; index < document.querySelectorAll('.pagination li').length; index++) {
                    document.querySelectorAll(".pagination li")[index].classList.remove("active")
                    if (document.querySelectorAll(".pagination li")[index] == e.target.parentElement || document.querySelectorAll(".pagination li")[index] == e.target.parentElement.parentElement) {
                        if (index == 0) {
                            nth_page = 0
                        } else if (index == document.querySelectorAll('.pagination li').length - 1) {
                            nth_page = document.querySelectorAll('.pagination li').length - 3
                        } else {
                            nth_page = index - 1
                        }
                    }
                }
                document.querySelectorAll(".pagination li")[nth_page + 1].classList.add("active") //显示是第几页
                setCardHTML(nth_page);
            })
            function setCardHTML(nth_page) {
                // var start_card = per_page_amount * nth_page //该页起始的序号
                var start_card = sentence.length - 1 - per_page_amount * nth_page //json该页起始的序号
                //清空li元素
                var child = document.querySelector("#columns").lastElementChild;
                while (child) {
                    document.querySelector("#columns").removeChild(child);
                    child = document.querySelector("#columns").lastElementChild;
                }
                // 生成li
                for (let index = 0; index < per_page_amount; index++) {
                    var li = document.createElement('li')
                    document.querySelector('#columns').appendChild(li)
                }
                var sentenceHtml = document.querySelectorAll("#columns li") //生成后再遍历
                for (var nth_li = 0; nth_li < per_page_amount; nth_li++) { //遍历所有的li
                    var nth_card = start_card - nth_li //nth_card是json的序号
                    if (start_card >= 0 && nth_card >= 0) { //如果json还有数据
                        //nth_card是json中的序号
                        // 添加img
                        if (sentence[nth_card].img_url) {
                            var img = document.createElement('img')
                            document.querySelectorAll('#columns li')[nth_li].appendChild(img)
                            document.querySelectorAll('#columns li')[nth_li].querySelector("img").src = sentence[nth_card].img_url
                        }
                        var content_length = sentence[nth_card].content.length
                        for (let index = 0; index < content_length + 1; index++) {
                            //每个li添加对应数量的p元素
                            var p = document.createElement('p')
                            document.querySelectorAll('#columns li')[nth_li].appendChild(p)
                        }
                        for (let nth_para = 0; nth_para < content_length; nth_para++) { //遍历content
                            sentenceHtml[nth_li].querySelectorAll("p")[nth_para].innerHTML = sentence[nth_card].content[nth_para]
                        }
                        //作家
                        sentenceHtml[nth_li].querySelector("p:last-child").innerHTML = "———— " + sentence[nth_card].writer
                    } else { //用一言api添加
                        var img = document.createElement('img') //add img
                        document.querySelectorAll('#columns li')[nth_li].appendChild(img)
                        document.querySelectorAll('#columns li')[nth_li].querySelector("img").src = "https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture" //必应图片
                        var p = document.createElement('p') //添加<p></p>
                        document.querySelectorAll('#columns li')[nth_li].appendChild(p)
                        var p = document.createElement('p')
                        document.querySelectorAll('#columns li')[nth_li].appendChild(p)
                        getYiyan(nth_li); //调用一言API
                    }
                }
            }
        }
    }
    xmlhttp.open("GET", file_name, true);
    xmlhttp.send();
}