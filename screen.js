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
		scenario : null,
		scenario_manage : new HangoutsManage(),
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

		//アクティブオブジェクト
		active_object : null,

		//変更確認フラグ
		edit_confirm_flag : false,
	},
	methods : {
		getAllArray : function(){
			return this.scenario_manage.getAllNode();
		},
		getAllLines : function(){
			return [];
		},
		//表示要素がクリックされたときに実行
		item_click : function( event ) {
			//変更後に別のオブジェクトをクリックした場合は、変更を破棄しますか？の確認ダイアログを表示する
			if( this.edit_confirm_flag ) {
				if( confirm('編集したデータを破棄しますか？') == false ) {
					return ;
				}
			}

			//アクティブオブジェクトを非アクティブ化
			this.object_disactive( this.active_object );
			//クリックオブジェクトからIDを抽出し、itemリストからクリックデータを特定
			let id = $(event.target).attr('id');

			//クリックオブジェクトをアクティブ化
			this.object_acitve( this.active_object );

			//クリックオブジェクトのデータをフォームに反映
			this.object_setForm( this.active_object );

			//ツリーに追加ボタンをデータ反映ボタンに変更し、フォーム変更内容を対象データに反映させる
			$('#btnSubmit').html('データを更新');

		},
		//オブジェクトをアクティブ化
		object_active : function( object ){

		},
		//オブジェクトを非アクティブ化
		object_disactive : function ( object ) {

		},
		//オブジェクトの内容をフォームに反映
		object_setForm : function ( object ){

		}
	},
	watch : {
		'canvas.width' : function( val ) {
			 this.canvas.viewbox = "0 0 " + val + " " + this.canvas.height;
		},
		 'canvas.height' : function( val ){
			 this.canvas.viewbox = "0 0 " + this.canvas.width + " " + val;
		},
		'scenario.hasNum' : function( val ) {

			this.items = this.getAllArray();
			var max_wi = 0;
			var max_hi = 0;
			for( var n = 0; n < this.items.length; n ++ ){
				var tmp = this.items[n];
				var wi = tmp.x + tmp.width;
				var hi = tmp.y + tmp.height;
				if( max_wi < wi ) max_wi = wi;
				if( max_hi < hi ) max_hi = hi;
			}

			//キャンバスの高さを調整
			if( max_wi > this.canvas.width ){
				this.canvas.width = max_wi + this.offset_x;
			}
			if( max_hi > this.canvas.height ){
				this.canvas.height = max_hi + this.offset_y;
			}

			this.lines = [];
			this.lines = this.getAllLines();

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
	 },
	 created : function(){
		 if( !this.scenario_manage )  this.scenario_manage = new HangoutsManage();
		 this.scenario = this.scenario_manage.createBranch(null);
	 }
 });