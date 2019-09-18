/**
 * 
 */
class CardApi extends CardNode {

	/**
	 * 
	 * @param {String} caption 
	 * @param {String} url 
	 * @param {Array} option 
	 */
	constructor( caption, url, option = [] ){
		this.type = CardType_Api;
		this.caption = caption;
		this.url = url;
		this.option = option
	}
}