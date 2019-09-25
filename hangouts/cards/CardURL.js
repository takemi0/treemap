/**
 * 
 */
class CardURL extends CardNode {

	/**
	 * 
	 * @param {String} caption	表示テキスト
	 * @param {String*} url 	遷移先URL
	 */
	constructor( caption, url, parent = null, option = null ) {
		super();

		this.type = CardType_Url;
		this.caption = caption;
		this.parent = parent;
	}
}