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

		this.height = 20;
		this.width = 100;

		/**
		 * 分岐先のシナリオID
		 */
		this.next_index = "";
	}
}