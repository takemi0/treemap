/**
 * シナリオ要素管理
 */
class HangoutsScenario extends HangoutsNode{

	/**
	 * コンストラクタ
	 * @param {HangoutsScenarioManeger} mane 
	 * @param {HangoutsNode} parent 
	 * @param {Integer} branch_num 
	 */
	constructor( mane, parent = null, branch_num = null ) {

		super();
		/**
		 * シナリオ要素配列
		 */
		this.node = [];

		/**
		 * 
		 */
		this.__mane = mane;
		/**
		 * 親要素
		 */
		this.parent = parent;
		/**
		 * 要素別発番IDの発番値
		 */
		this.__id = 0;
		/**
		 * IDのPrefix
		 */
		this.__id_prefix = "";
		/**
		 * 保持要素数
		 */
		this.hasNum = 0;

		if( parent ) {
			this.__id_prefix = parent.id + "_";
		}

		if( branch_num == null ){
			this.branch_num = 1;
		}

		this.__node_offset_x = 30;
		this.__node_offset_y = 30;

		if( branch_num == null ) {
			this.x = 5;
			this.y = 5;
		} else {
			this.x = parent.x + parent.width + this.__node_offset_x;
			this.y = parent.y + parent.height + this.__node_offset_y;
		}

	}

	/**
	 * シナリオ要素生成及びツリーへの追加
	 * @param {Integer|String} type_name 
	 */
	AddByType( type_name ){
		var ret = null;
		switch( type_name ) {
			case NodeType_Message :
			case "message":
				ret = new Message();
				break;

			case NodeType_Card:
			case 'card':
				ret = new Card();
				break;

			case NodeType_Api:
			case 'api':
				ret = new Api();
				break;
		}
		//初期値セット
		ret.id = this.createID();
		ret.branch_num = this.branch_num;
		if( this.parent ) ret.parent = this.parent;

		this.add( ret );
		this.updateLoacation();

		this.hasNum = this.node.length;

		return ret;
	}

	/**
	 * SVG描画用の座標計算
	 */
	updateLoacation() {
		var tmp_height = this.__node_offset_y;
		var max_width = 0;
		for( var n = 0; n < this.node.length; n ++ ) {
			var tmp = this.node[n];
			if( max_width < ( tmp.x + tmp.width ) ) {
				max_width = tmp.x + tmp.width;
			}

			if( this.parent ) {
				tmp.x = this.parent.x + this.parent.width + this.__node_offset_x;
			} else {
				tmp.x = this.x;
			}

			tmp.y = tmp_height;
			tmp_height = tmp.y + tmp.height + this.__node_offset_y;
		}
		this.width = max_width - this.x;
		this.height = tmp_height;
	}

	/**
	 * 要素を追加
	 * @param {HangoutsNode} node 
	 * @param {Integer} idx 
	 */
	add( node, idx = null ) {
		if( node == null ) return;

		//末尾に追加
		if( idx == null ) {
			this.node.push( node );
			return;
		}

		//先頭に追加
		if( idx == -1 ){
			this.node.unshift( node );
			return;
		}

		//指定個所に追加
		this.node.splice( idx, 0, node );

		this.updateLoacation();
	}

	/**
	 * 指定要素のHangoutsNodeを取得
	 * @param {Integer} index 
	 */
	getNodeForIndex( index ) {
		return this.node[ index ];
	}

	/**
	 * 指定IDの要素を取得
	 * @param {String} id 
	 */
	getNodeForID( id ) {
		for( var n = 0; n < this.node.length; n ++ ){
			if( id == this.node[n].id ) return this.node[n];
		}
	}

	/**
	 * ID生成
	 */
	createID(){
		this.__id ++;
		return this.__id_prefix + this.__id;
	}

}