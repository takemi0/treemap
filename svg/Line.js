/**
 * 描画要素
 */
class Line extends CanvasNode {

	constructor( arg_node = [] ) {
		super();
		//座標
		this.node = arg_node;

		//SVGに出力する座標文字列
		this.points = "";
		if( this.node.length > 0 ) {
			this.points = this.getStr();
		}
	}

	getStr() {
		if( this.node.length == 0 ) return "";
		var items = [];
		for( var n = 0; n < this.node.length; n ++ ) {
			items.push( this.node[n].x + " " + this.node[n].y );
		}
		return items.join(',');
	}
}