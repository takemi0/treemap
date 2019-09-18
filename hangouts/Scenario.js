/**
 * Hangoutsのシナリオ管理
 */
class Scenario {
	constructor(){
		this.list = new Tree();
	}

	/**
	 * シナリオ要素を生成し、listに追加する
	 * @param NodeType type 
	 */
	factory( type, id = "" ) {
		var tmp = null;

		switch( type ){
			case NodeType_Message:
				tmp = new Message();
				break;

			case NodeType_Card:
				tmp = new Card();
				break;

			case NodeType_Api:
				tmp = new Api();
				break;

			default :
				tmp = new HangoutsNode();
				break;
		}
		this.list.add( tmp );
		return tmp;
	}
}