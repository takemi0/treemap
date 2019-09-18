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
		//分岐はないためブランチを削除
		this.branch = null;
	}

}