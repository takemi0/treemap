/**
 * カードの要素
 */
class CardNode extends CanvasNode {

	constructor( id, caption, message, type, option ) {
		super( id );

		//タイプ
		this.type = type;

		this.caption = caption;

		//メッセージ
		this.message = message;

		//オプション
		this.option = option;

		this.height = 20;
		this.width = 100;
	}
}