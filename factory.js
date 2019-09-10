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
	}

}

const CardType_Text = 1; //カードの要素タイプ：テキスト
const CardType_Url = 2; //カードの要素タイプ：リンク
const CardType_Api = 10; //カードの要素タイプ：API

class CardNode {

	constructor( id, caption, message, type, option ) {
		this.id = id;
		this.caption = caption;
		this.message = message;
		this.type = type;
		this.option = option;
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
				tmp = new CardNode( id, caption, message, CardType_Text, option );
				break;

			case CardTeyp_Url :
			case 'url':
				tmp = new CardNode( id, caption, message, CardType_Text, option );
				break;

			case CardType_Api :
			case 'api':
				tmp = new CardNode( id, caption, message, CardType_Api, option );
				break;

		}

		this.items.push( tmp );
	}

	getID(){
		return this.items.length;
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