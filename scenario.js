/**
 * シナリオ要素の編集
 */

 var vue_scenario = new Vue({
	 el : '#scenario',
	 data : {
		scenario : null,

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
		 * 入力INPUTの値
		 */
		input : {
			id : "",
			title : "",
			type : "",
			node_message : new Message(),
			node_card : new Card(),
			node_api : new Api(),
		},

		/**
		 * 要素タイプセレクトボックスのアイテム
		 */
		scenario_type : [ 
			{ index: "",				caption : "選択してください" },
			{ index: NodeType_Message,	caption : 'メッセージ'},
			{ index: NodeType_Card,		caption : 'カード'},
			{ index: NodeType_Api,	 	caption : 'API' },
		],

		/**
		 * 表示の補足情報
		 */
		canvas_info : {
			offset_x : 5,
			offset_y : 35,
		},

		/**
		 * カード要素タイプセレクトボックスのアイテム
		 */
		card_type : [
			{ index: "", caption : "選択してください" },
			{ index: CardType_Text,	caption : 'メッセージ' },
			{ index: CardType_Url,	caption : 'URL' },
			{ index: CardType_Api,	caption : 'API' },
		],
	 }, 
	 methods : {
		/**
		 * タイプ：カードのとき、カードの要素を追加
		 * @param object event 
		 */
		item_add : function( event ) {
		 	this.input.node_card.AddByType( 'text', "", "", [] );
		},
		/**
		 * 表示エリアに要素を反映
		 */
		node_add : function() {
			if( this.input.type == "" ) return;

			var tmp = this.scenario.AddByType( this.input.type );
			tmp.name = this.input.title;
			tmp.type = this.input.type;

			switch( this.input.type ) {
				case NodeType_Message :
					tmp.x =  this.input.node_message.x; 
					tmp.y =  this.input.node_message.y; 
					tmp.width =  this.input.node_message.width; 
					tmp.height =  this.input.node_message.height; 
					//改行対応　https://oar.st40.xyz/article/311
					//ここで改行でスプリットしてtspanタグで囲ってSVG上で改行させる
					tmp.text = this.input.node_message.text.split("\n");
					break;

				case NodeType_Card :
					tmp.x =  this.input.node_card.x; 
					tmp.y =  this.input.node_card.y; 
					tmp.width =  this.input.node_card.width; 
					tmp.height =  this.input.node_card.height; 
					tmp.items = [];
					for( var n = 0; n < this.input.node_card.items.length; n ++ ){
						tmp.items.push( Object.assign( {}, this.input.node_card.items[n] ) );
					}
					break;

				case NodeType_Api  :
					break;
			}

			//カードかつbranchがtrueの場合、小データを作成する
			if( tmp.type == NodeType_Card ) {
				for( var n = 0; n < tmp.items.length; n ++ )  {
					var node = tmp.items[n];
					if( node.branch == true ) {

						//小データを作成する
						node.child = [];

						//カードの要素ごとに生成を分岐
						var cnode = new Message();

						cnode.id = node.id + "-1";
						cnode.x = tmp.x + tmp.width + 20;
						cnode.y = tmp.y + tmp.height + 20;
						cnode.width = 100;
						cnode.height = 100;
						cnode.parent = tmp;
						node.child.push( cnode );

					}
				}
			}
		}
	 },
	 watch : {

	 },
	 filters : {
		 branch_flat_id : function( val ) {
			 return 'branch_flag_' + val;
		 }
	 },
	 created : function() {

		 //スクリーンのシナリオと同期
		 this.scenario = vue_screen.scenario;

	 }
 });