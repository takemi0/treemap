/**
 * カード要素API
 */
class CardApi extends CardNode {

	/**
	 * コンストラクタ
	 * @param {String} caption 
	 * @param {String} url 
	 * @param {Card} parent 
	 * @param {Array} option 
	 */
	constructor( caption, url, parent, option = [] ){
		super();

		this.type = CardType_Api;
		this.caption = caption;
		this.url = url;
		this.option = option
		this.parent = parent;
	}
}