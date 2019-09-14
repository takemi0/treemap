/**
 * シナリオ要素の表示を制御する
 */
 var vue_screen = new Vue({
	 el : '#screen',
	 data : {
 		/**
		 * 要素のタイプ定数
		 */
		NodeType_Message : NodeType_Message,
		NodeType_Card : NodeType_Card,
		NodeType_Api : NodeType_Api,

		/**
		 * カードの要素タイプ定数
		 */
		CardType_Text : CardType_Text,
		CardType_Url : CardType_Url,
		CardType_Api : CardType_Api,

		/**
		 * 
		 */
		scenario : new factory(),
		offset_x : 10,
		offset_y : 30,

		//表示エリア制御変数
		canvas : {
			//表示エリアの幅
			width : 640,
			//表示エリアの高さ
			height: 500,
			min_height : 500,
			min_width : 640,
			viewbox : "0 0 640 480",
		},

		//表示要素の格納リスト
		items : [],

		//要素と要素をつなぐ線の描画要素リスト
		lines : [],
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
			var hi = 0;
			for( var n = 0; n < this.items.length; n ++ ) {
				var tmp = this.items[n];
				if( n == 0 ) {
					hi = tmp.y + tmp.height;
					continue;
				}
				tmp.y = hi + this.offset_y;
				hi = tmp.y + tmp.height;
			}
			//キャンバスの高さを調整
			if( hi > this.canvas.height ){
				 this.canvas.height = hi + this.offset_y;
			 }

			this.lines = [];
			//this.lines = this.scenario.getAllLines();

			//要素が2個以上の時に,線の情報を作成する
			///*
			if( this.items.length >= 2 ) {

				var befor = new point();

				//最初の情報をスワップ
				befor.x = this.items[0].width / 2 + this.items[0].x ;
				befor.y = this.items[0].height + this.items[0].y ;

				for( var n = 1; n < this.items.length; n ++ ) {

					//線を引く座標を生成する
					this.lines.push ( new lines( [
						Object.assign( {}, befor ),
						new point(
				 				this.items[n].width / 2 + this.items[n].x ,
				 				this.items[n].y 
						),
					] ) );

					//一つ前の情報をスワップ
					befor.x = this.items[n].width / 2 + this.items[n].x ;
					befor.y = this.items[n].height + this.items[n].y ;
				}
			}
			//*/
		 }
	 },
	 filters : {
		 'lh' : function(val){
			 return val * 20 + 35;
		 },
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