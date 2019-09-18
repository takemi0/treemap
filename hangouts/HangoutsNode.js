const NodeType_None = 0;
const NodeType_Message = 1;
const NodeType_Card = 2;
const NodeType_Api = 10;

/**
 * Google hangouts 要素
 */
class HangoutsNode extends CanvasObject {
	constructor() {
		super();

		/**
		 * 次の要素を送信する待ち時間
		 */
		this.delay = 500;
		this.name = "";
		this.type = NodeType_None;
	}

}