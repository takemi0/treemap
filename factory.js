class point {

	constructor( xx = 0, yy = 0) {
		this.x = xx;
		this.y = yy;
	}

	getStr(){
		return this.x + " " + this.y;
	}
}

/**
 * 描画要素
 */
class lines extends Node {

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

/**
 * Google hangouts 要素
 */
class HangoutsNode extends Node {
	constructor() {
		super();

		/**
		 * 次の要素を送信する待ち時間
		 */
		this.delay = 500;
		this.name = "";
	}

}

/**
 * Google Hangouts 応答要素
 *  メッセージ要素
 */
class Message extends HangoutsNode {
	constructor() {
		super();
		/**
		 * 表示テキスト
		 */
		this.text = "";
		this.x = 15;
		this.y = 10;
		this.width = 100;
		this.height= 100;
	}

}

const CardType_Text = 1; //カードの要素タイプ：テキスト
const CardType_Url = 2; //カードの要素タイプ：リンク
const CardType_Api = 10; //カードの要素タイプ：API

class CardNode extends Node {

	constructor( id, caption, message, type, option ) {
		super();

		this.id = id;

		//タイプ
		this.type = type;

		this.name = caption;

		//メッセージ
		this.message = message;

		//オプション
		this.option = option;

		this.height = 20;
		this.width = 100;
	}
}

/**
 * Google Hangouts 応答要素
 *  選択肢要素
 *  カード要素のファクトリー機能あり
 */
class Card extends HangoutsNode {

	constructor() {
		super();

		/**
		 * カードの要素
		 */
		this.items = [];
		
		this.x = 15;
		this.offset_x = 5;
		this.offset_y = 35;
		this.width = 100;
		this.height= 100;
	}

	/**
	 * カード要素の追加
	 * @param {*} type 
	 */
	AddByType( type, caption, message, option = [] ) {
		var tmp = null;
		var id = this.getID();

		switch( type ) {
			case CardType_Text :
			case 'text':
				tmp = new CardNode( id, caption + "", message + "", CardType_Text, option );
				break;

			case CardTeyp_Url :
			case 'url':
				tmp = new CardNode( id, caption + "", message + "", CardType_Text, option );
				break;

			case CardType_Api :
			case 'api':
				tmp = new CardNode( id, caption + "", message + "", CardType_Api, option );
				break;

		}

		//表示情報の設定
		tmp.x = this.offset_x;
		tmp.y = this.offset_y + ( tmp.id - 1 ) * 20;
		
		if( this.height < ( tmp.y + tmp.height) ) {
			this.height = ( tmp.y + tmp.height ) ;
		}

		this.items.push( tmp );
	}

	getID(){
		return this.items.length + 1;
	}
}

/**
 * 外部APIと連携する
 */
class Api extends HangoutsNode {
	constructor() {
		super();
	}
}

const NodeType_Message = 1;
const NodeType_Card = 2;
const NodeType_Api = 10;

/**
 * シナリオ要素管理
 */
class factory extends List {

	constructor() {
		super();
	}

	AddByType( type_name ){
		var ret = null;
		switch( type_name ) {
			case NodeType_Message :
			case "message":
				ret = new Message();
				this.add( ret );
				break;

		   case NodeType_Card:
		   case 'card':
				ret = new Card();
				this.add( ret );
				break;

			case NodeType_Api:
			case 'api':
				ret = new Api();
				this.add( ret );
				break;
		}
		return ret;
	}

}