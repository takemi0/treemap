/**
 * Google Hangouts 応答要素
 *  選択肢要素
 *  カード要素のファクトリー機能あり
 */
class Card extends HangoutsNode {

	constructor() {
		super();

		this.x = 15;
		this.offset_x = 5;
		this.offset_y = 35;
		this.width = 100;
		this.height= 100;
		/**
		 * カードのアイテム配列
		 */
		this.items = [];
	}

	/**
	 * カード要素の追加
	 * @param CardType type 
	 * @param string caption 
	 * @param string message 
	 * @param arrya option 
	 */
	AddByType( type, caption, message, option = [] ) {
		var tmp = null;

		switch( type ) {
			case CardType_Text :
			case 'text':
				tmp = new CardMessage( message, this );
				break;

			case CardTeyp_Url :
			case 'url':
				tmp = new CardURL( caption, message, this, option );
				break;

			case CardType_Api :
			case 'api':
				tmp = new CardApi( caption, message, this, option );
				break;
		}

		//表示情報の設定
		tmp.x = this.offset_x;
		tmp.y = this.offset_y + ( tmp.id - 1 ) * 20;
		
		if( this.height < ( tmp.y + tmp.height) ) {
			this.height = ( tmp.y + tmp.height ) ;
		}

		this.items.push( tmp );
	}

}