String.prototype.format = function () {
	var values = arguments;
	return this.replace(/\{(\d+)\}/g,function(match,index){
		if(values.length > index){
			if(values[index] || values[index] == 0) return values[index];
			else return '';
		}else{
			return "";
		}
	});
};
function layerEnd(text) {//建议使用，弹出成功提示，并关闭当前弹窗页
	if(text){
		parent.layer.msg(text);
	}
	cancel();
}

function cancel() {//关闭当前弹窗页
	parent.layer.close(parent.layer.getFrameIndex(window.name));
}

function thIndex(val, row, index){
	row.index = index;
	return index+1;
}

function thColors(val, row, index, field){
	var html = '<span style="{0}">{1}</span>'.format(getColor(this.colors,val),val);
	return html;
}
function getColor(colors,text){
	var result = '';
	if(colors){
		$.each(colors.split(','),function(i,e){
			var cols = e.split(':');
			if(cols[0] == text){result = 'color:'+cols[1]+';'; return false;}
		});
	}
	return result;
}
function thInput(val){
	return '<input type="text" class="form-control" value="{0}" />'.format(val);
}