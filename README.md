# contextmenu_plugin
一款可扩展菜单选项的菜单组件，基于面向对象的编程思想，利用原型和构造函数模式实现

### 组件说明：
	  该菜单组件以面向对象编程思想为基础，
	  利用原型和构造函数模式来创建;
    解决了主流浏览器兼容性问题。
### 文件说明：
    contextMenu.css : 决定菜单的样式
    eventUtil.js : 定义了EventUtil对象，对象里封装了多个方法，解决方法重用以及浏览器兼容性问题
    contextMenu.js ：菜单的主逻辑
### 使用方法：
  	  1.在contextMenu.js中创建实例对象并传入自己的菜单数据对象,
    	  如：var menuExample = new ContextMenu(self_menuItem);
    	  菜单选项的配置说明 如：
    	  var self_menuItem =  {//菜单选项配置
          title: {//标题配置
              content: "课表操作菜单"//标题内容
          },
          items: [//菜单项配置
              {
                  content: "添加课程",//菜单项内容
                  action: function (e, item) {//菜单项单击和快捷键触发事件
                    //do something
                  },
              },
              
              {
                  content: "删除课程",
                  action: function (e, item) {
                     //do something
                  },
              },
          ]
      };
  	  再调用init()方法，传入初始化配置对象,如：
    	  menuExample.init({
          target: document.getElementById("box"),//开启自定义右键菜单的目标,
          hasTitle: true,//是否需要标题
          autoHide: false,//是否自动隐藏右键菜单   
          positionX: 20,//如果初始化时显示菜单，菜单相对于右击目标的水平偏移
          positionY: 20 //如果初始化时显示菜单，菜单相对于右击目标的垂直偏移  
          });
      2、在html中引入contectMenu.css、contextMenu.js、eventUtil.js文件
      
