/**
 * Created by ZJX on 2017/5/17.
 */
//total
var totalBookLists = [
    {message:'皮囊',author:'我',price:'1',img:'images/pinang.jpg',FL:'小说',fl:'xs',info:'别看了你是看不到有什么东西的了，因为我都没存进去，死心吧！'},
    {message:'英语美文口袋书',author:'我',price:'11',img:'images/img2.jpg',FL:'教育',fl:'jy',info:'别看了你是看不到有什么东西的了，因为我都没存进去，死心吧！'},
    {message:'追风筝的人',author:'我',price:'12',img:'images/img3.jpg',FL:'小说',fl:'xs',info:'别看了你是看不到有什么东西的了，因为我都没存进去，死心吧！'},
    {message:'牛奶可乐经济学',author:'我',price:'13',img:'images/img4.jpg',FL:'科技',fl:'kj',info:'别看了你是看不到有什么东西的了，因为我都没存进去，死心吧！'},
    {message:'大汗之国',author:'我',price:'14',img:'images/img5.jpg',FL:'心理学',fl:'xl',info:'别看了你是看不到有什么东西的了，因为我都没存进去，死心吧！'},
    {message:'执行力',author:'我',price:'15',img:'images/img6.jpg',FL:'历史',fl:'ls',info:'别看了你是看不到有什么东西的了，因为我都没存进去，死心吧！'},
    {message:'白说',author:'我',price:'16',img:'images/img10.jpg',FL:'科技',fl:'kj',info:'别看了你是看不到有什么东西的了，因为我都没存进去，死心吧！'},
    {message:'偷影子的人',author:'我',price:'17',img:'images/img8.jpg',FL:'科技',fl:'kj',info:'别看了你是看不到有什么东西的了，因为我都没存进去，死心吧！'},
    {message:'人类简史',author:'我',price:'18',img:'images/img9.jpg',FL:'小说',fl:'xs',info:'别看了你是看不到有什么东西的了，因为我都没存进去，死心吧！'},
];
var userR = [
    {id:'001',name:'jack',email:'baidu@gmail.com',password:'123456',coll:[totalBookLists[0]]},
    {id:'002',name:'haha',email:'110@gmail.com',password:'123456',coll:[totalBookLists[1]]}
];
for(let i = 0; i < totalBookLists.length; i++){
    if(!window.localStorage.getItem(totalBookLists[i].message)){
        window.localStorage.setItem(totalBookLists[i].message, JSON.stringify(totalBookLists[i]));
    }
}
for(let i = 0; i < userR.length; i++){
    if(!window.localStorage.getItem(userR[i].id)){
        window.localStorage.setItem(userR[i].id, JSON.stringify(userR[i]));
    }
}

//index
var bookListsIndex = totalBookLists;

var vmIndex = new Vue({
    el: '.mainIndex',
    data: {
        list: bookListsIndex.slice(0,6),
        newlist: bookListsIndex.slice(3,9)
    }
});


//classification
var bookLists = totalBookLists;

var filter = {
    all:function (list) {
        return list;
    },
    xs:function (list) {
        return list.filter(function (item) {
            return item.fl === 'xs';
        });
    },
    jy:function (list) {
        return list.filter(function (item) {
            return item.fl === 'jy';
        });
    },
    kj:function (list) {
        return list.filter(function (item) {
            return item.fl === 'kj';
        });
    },
    ls:function (list) {
        return list.filter(function (item) {
            return item.fl === 'ls';
        });
    },
    xl:function (list) {
        return list.filter(function (item) {
            return item.fl === 'xl';
        });
    }
};

var vmClass = new Vue({
    el: '.mainClass',
    data: {
        list: bookLists,
        visibility: 'all',
        bookfl: ''
    },
    computed: {
        filteredList: function () {
            return filter[this.visibility] ? filter[this.visibility](bookLists) : bookLists;
        },
        flBookName: function () {
            switch (this.visibility){
                case 'all': this.bookfl = '';
                break;
                case 'xs': this.bookfl = '小说';
                break;
                case 'jy': this.bookfl = '教育';
                break;
                case 'kj': this.bookfl = '科技';
                break;
                case 'ls': this.bookfl = '历史';
                break;
                case 'xl': this.bookfl = '心理学';
                break;
            }
            return this.bookfl;
        }
    }
});

function watchHashChange() {
    var hash = window.location.hash.slice(1);
    vmClass.visibility = hash;
}

watchHashChange();

window.addEventListener('hashchange',watchHashChange);



//hot


var bookLists1 = totalBookLists;

var vmHot = new Vue({
    el: '.mainHot',
    data: {
        list: bookLists1
    }
});



//person
var bookLists2 = totalBookLists;

var vmPerson = new Vue({
    el: '.mainPerson',
    data: {
        list: JSON.parse(window.localStorage.getItem(window.localStorage.getItem('status')))
    }
});



//bookDetails
function watchHash() {
    var vmBookHash = window.location.hash.slice(1);
    if(vmBookHash !== null){
        var tempList = JSON.parse(window.localStorage.getItem(vmBookHash));
        bookLists3 = [];
        bookLists3.push(tempList);
    }
}
var bookLists3 = totalBookLists;
watchHash();

var vmBook = new Vue({
    el: '.mainBook',
    data: {
        list: bookLists3,
        bookList: bookLists1.slice(0,5)//热门图书列表
    }
});