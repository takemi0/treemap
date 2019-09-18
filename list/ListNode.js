 /**
  * リスト用要素
  */
 class ListNode {
	 /**
	  * コンストラクタ
	  */
	constructor( id ){
		/**
		 * ID
		 */
		this.id = id;

		/**
		 * 要素名
		 */
		this.name = "";
		/**
		 *  値
		 */
		this.value = null;

		/**
		 * 次の要素
		 */
		this.next = null;

	}

	dump() {
		console.log( "id:" + this.id );
	}
 }