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