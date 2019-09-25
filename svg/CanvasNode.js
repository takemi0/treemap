 /**
  * キャンバス描画オブジェクトの基底クラス
  */
 class CanvasNode {
	 /**
	  * コンストラクタ
	  */
	constructor( id ){
		this.id = id;

		/**
		 * 子供の要素
		 */
		this.child = null;

		/**
		 * 枝番号
		 */
		this.branch = 0;

		/**
		 * 親のハンドル
		 */
		this.parent = null;

		//x, y, width, height
		this.x = 0;
		this.y = 0;

		this.width = 0;
		this.height= 0;

		this.offset_x = 0;
		this.offset_y = 0;
	}

 }