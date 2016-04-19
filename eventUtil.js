
//EventUtil对象用于处理重复使用到的函数以及函数兼容性问题

var EventUtil = {
    //跨浏览器的事件绑定程序
	addHandler : function(element, eventType, handler) {
		//如果支持DOM2级事件处理程序
		if (element.addEventListener) {
			element.addEventListener(eventType, handler, false);
		//如果支持IE事件处理程序	
		} else if (element.attachEvent) {
			element.attachEvent('on'+ eventType, handler);
		//如果支持DOM0级事件处理程序	
		} else {
			element['on'+ eventType] = handler;
		}
	},

	//跨浏览器的事件移除程序
	removeHandler : function(element, eventType, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(eventType, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent('on'+ eventType, handler);
		} else {
			element['on'+ eventType] = null;
		}
	},

	//获取event对象
	getEvent : function(event) {
		return event || window.event;
	},

	//通过event对象的target来获取触发事件的实际元素
	getTarget : function(event) {
		return event.target || event.srcElement;
	},

	//阻止浏览器默认事件
	preventDefault : function(event) {
		//如果是DOM中的事件对象
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			//如果是IE中的事件对象	
			event.returnValue = false;
		}
	},

	//阻止冒泡
	stopPropagation : function(event) {
		//如果是DOM中的事件对象
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			//如果是IE中的事件对象	
			event.cancelBubble = true;
		}
	},

	//添加class类名
	addClass : function(elememt, className) {
		//获取 class 内容
		var originClass = element.className;
		//判断获取到的 class 是否为空, 如果不为空在前面加个'空格'
		var blank = (originClass != '') ? ' ' : '';
		//组合原来的 class 和需要添加的 class
		var added = originClass + blank + className;
		//替换原来的 class.
		element.className = added;
	},

	//获取某class名称的元素集合
	getClassName : function(tagName,className) {
		//如果浏览器支持getElementsByClassName方法
		if (document.getElementsByClassName) {
			return document.getElementsByClassName(className);	
		} else { 
		//IE8以及以下不支持getElementsByClassName的解决方法
			var tags = document.getElementsByTagName(tagName);
			var classArr = [];
			for (var i = 0,tagsLen = tags.length; i<tagsLen; i++) {
				if (tags[i].className = className) {
					classArr.push(tags[i]);
				}
			}
			return classArr;
		}
	},

	//触发mousedown/mouseup事件时获取鼠标按钮
	getButton : function(event) {
		//通过hasFeature方法检测是否支持DOM鼠标事件
		if (document.implementation.hasFeature('MouseEvents','2.0')) {
			//DOM中event.button 
			//0:鼠标左键
			//1：鼠标滚轮按钮
			//2：鼠标右键
			return event.button; 
		//兼容IE的处理方案	
		} else {
			switch (event.button) {
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
					return 0;
				case 2:	
				case 6:
					return 2
				case 4:
				    return 1; 	
			}
		}
	}
	};