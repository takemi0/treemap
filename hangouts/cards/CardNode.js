//カードの要素タイプ：なし
const CardType_None = 0; 
 //カードの要素タイプ：テキスト
const CardType_Text = 1;
//カードの要素タイプ：リンク
const CardType_Url = 2; 
//カードの要素タイプ：API
const CardType_Api = 10; 

/**
 * カードの要素
 */
class CardNode extends CanvasNode {

	constructor() {
		super();

		/**
		 * カードタイプ
		 */
		this.type = CardType_None;

		/**
		 * 親のハンドル
		 */
		this.parent = null;
		/**
		 * 親のID
		 */
		this.parent_id = "";

		/**
		 * 分岐先のID
		 */
		this.next_index = "";

		/**
		 * 分岐先のハンドル
		 */
		this.next = null;
	}
}