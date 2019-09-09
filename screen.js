/**
 * シナリオ要素の表示を制御する
 */

 var vue_screen = new Vue({
	 el : '#screen',
	 data : {
		scenario : new factory(),
		offset_x : 10,
		offset_y : 10,
		canvas : {
			width : 640,
			height: 500,
			min_height : 500,
			min_width : 640,
			viewbox : "0 0 640 480",
		},
		items : []
	 },
	 methods : {

	 },
	 watch : {
		 'canvas.width' : function( val ) {
			 this.canvas.viewbox = "0 0 " + val + " " + this.canvas.height;
		 },
		 'canvas.height' : function( val ){
			 this.canvas.viewbox = "0 0 " + this.canvas.width + " " + val;
		 },
		 'scenario.hasNum' : function( val ) {
			this.items = this.scenario.getAllArray();
			 var height = val * 120 + this.offset_y;
			 if( height > this.canvas.height ){
				 this.canvas.height = height;
			 }
		 }
	 },
	 filters : {
		 'x_position' : function(val) {
			 return vue_screen.offset_x;
		 },
		 'y_position' : function(val) {
			 return vue_screen.offset_y + ( (val-1) * 120 ) ;
		 },
		 'node_id' : function( val ) {
			 var tmp = vue_screen.scenario.getNode( val );
			 if( tmp == null ) return '';
			 return tmp.id;
		 }
	 }
 });