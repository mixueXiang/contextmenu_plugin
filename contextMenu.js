window.onload = function () {
	/*组件说明
	  该菜单组件以面向对象编程思想为基础，
	  利用原型和构造函数模式来创建;
	  使用时只需创建实例对象并传入自己的菜单数据对象,
	  如：var menuExample = new ContextMenu(self_menuItem);
	  再调用init()方法，传入初始化配置对象,如：
	  menuExample.init({
	                  target: document.getElementById("box"),//开启自定义右键菜单的目标,
	                  hasTitle: true,//是否需要标题
	                  autoHide: true,//是否自动隐藏右键菜单        
	              });
    */
	
    var self_menuItem =  {//菜单选项配置
        title: {//标题配置
            content: "课表操作菜单"//标题内容
        },
        items: [//菜单项配置
            {
                content: "添加课程",//菜单项内容
                action: function (e, item) {//菜单项单击和快捷键触发事件
                    alert(item.content);
                },
            },
            {
                content: "修改课程",
                action: function (e, item) {
                    alert("====>" + item.content);
                },
            },
            {
                content: "删除课程",
                action: function (e, item) {
                    alert("====>" + item.content);
                },
            },
            {
                content: "设置教学班",
                action: function (e, item) {
                    alert("====>" + item.content);
                },
            },
        ]
    };

    //创建构造函数，并传入自己的菜单选项配置
    function ContextMenu(self_menu) {
    	this.menu = self_menu;
    }
    
    //菜单初始化配置
    ContextMenu.prototype.init = function(obj) {
    	this.target = obj.target;
    	this.hasTitle = obj.hasTitle;
    	this.autoHide = obj.autoHide;
        //初始化时是否自动隐藏菜单
    	if (this.autoHide) {
 			this.hideMenu();
    	} else {
            //不自动隐藏则创建菜单并初始化显示位置
            this.createMenu({
                positionX:this.positionX,
                positionY:this.positionY
            });
        }
        this.showMenu(); //显示菜单

    };
   
   //动态创建菜单
    ContextMenu.prototype.createMenu = function(position) {
        var menuItems = this.menu.items;
        var example = this;
    	var itemsLength = menuItems.length;
    	var body = document.getElementsByTagName('body')[0];
    	var menu = document.createElement('ul');
        menu.className = 'menuBox';
        //是否传入右击目标，有则在该目标区域创建菜单，无则在body区域
    	if (this.target) {
    		this.target.appendChild(menu);
    	} else {
    		body.appendChild(menu);
    	}
    	//根据传入参数（鼠标点击的位置）确定菜单显示的位置
        menu.style.left = position.positionX + 'px';
        menu.style.top = position.positionY + 'px';
        //是否显示菜单标题
    	if (this.hasTitle) {
    		var title = document.createElement('li');
    		title.innerText = this.menu.title.content;
    		title.className = 'menuTitle';
    		menu.appendChild(title);
    	} 
    	//创建菜单选项
    	for (var i = 0; i < itemsLength; i++) {
    		var item = document.createElement('li');
    		item.innerHTML = menuItems[i].content;
    		item.className = 'menuItem menuItemCon';
    		menu.appendChild(item);
    	}
        example.menuAction();
    };

    //右击时隐藏前一次显示的菜单
    ContextMenu.prototype.hideMenu = function() {
    	//调用EventUtil.getClassName()方法获取class名为menuBox的元素
        var menuBox = EventUtil.getClassName('ul', 'menuBox'); 
        for (var i = 0, menuBoxLen = menuBox.length; i < menuBoxLen; i++) {
            var parent = menuBox[i].parentNode;
            parent.removeChild(menuBox[i]);
        }
    };
    
    //显示菜单
    ContextMenu.prototype.showMenu = function() {
    	var element = this.target || document.getElementsByTagName('body')[0];
    	//example先获取到实例对象，避免后面的this混淆
    	var example = this;
        //阻止右击目标对象时浏览器的默认事件
        this.target.oncontextmenu = function(event) {
        	var event = EventUtil.getEvent();
        	EventUtil.preventDefault(event);
        };
    	EventUtil.addHandler(element,'mousedown',function(event) {
    		//右击时先隐藏前一次显示的菜单
            example.hideMenu();
    		var event = EventUtil.getEvent(event);
    		var getButton = EventUtil.getButton(event);
    		if (getButton == 2) {  
                //根据鼠标当前点击的位置改变菜单显示的位置  			
    			example.positionX = event.clientX - example.target.offsetLeft;
    			example.positionY = event.clientY - example.target.offsetTop;
    			example.createMenu({
                    positionX:example.positionX,
                    positionY:example.positionY
                });
    		}
    	});
    };

    //菜单选项执行的动作(函数)
    ContextMenu.prototype.menuAction = function() {
        var menuItems = this.menu.items;
        var menuItem = EventUtil.getClassName('li', 'menuItem'); 
        for (var i = 0, menuItemLen = menuItem.length; i < menuItemLen; i++) {
            EventUtil.addHandler(menuItem[i], 'click', function() {
                menuItems[i].action(event,this);
            });
        }
    };

    //创建对象实例
    var menuExample = new ContextMenu(self_menuItem);
    //调用init()函数初始化菜单
    menuExample.init({
                target: document.getElementById("box"),//开启自定义右键菜单的目标,
                hasTitle: true,//是否需要标题
                autoHide: false,//是否自动隐藏右键菜单   
                positionX: 20,//如果初始化时显示菜单，菜单相对于右击目标的水平偏移
                positionY: 20 //如果初始化时显示菜单，菜单相对于右击目标的垂直偏移  
            });
};