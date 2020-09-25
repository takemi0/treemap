
const CardType_None = 0; //カードの要素タイプ：なし
const CardType_Text = 1; //カードの要素タイプ：テキスト
const CardType_Url = 2; //カードの要素タイプ：リンク
const CardType_Api = 10; //カードの要素タイプ：API

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
				tmp = new CardMessage( caption, message, CardType_Text, option );
				break;

			case CardTeyp_Url :
			case 'url':
				tmp = new CardURL( caption, message, CardType_Text, option );
				break;

			case CardType_Api :
			case 'api':
				tmp = new CardApi( caption, message, CardType_Api, option );
				break;
		}

		tmp.parent = this;

		//表示情報の設定
		tmp.x = this.offset_x;
		tmp.y = this.offset_y + ( tmp.id - 1 ) * 20;
		
		if( this.height < ( tmp.y + tmp.height) ) {
			this.height = ( tmp.y + tmp.height ) ;
		}

		this.branch.add( tmp );
	}

}