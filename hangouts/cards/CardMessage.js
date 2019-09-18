/**
 * 
 */
class CardMessage extends CardNode {

	/**
	 * 
	 * @param {String} caption 
	 */
	constructor( caption ) {
		this.type = CardType_Text;
		this.caption = caption;
	}
}