/**
 * 
 */
class CardMessage extends CardNode {

	/**
	 * 
	 * @param {String} caption 
	 * @param {Card} parent 
	 */
	constructor( caption, parent = null ) {
		super();
		this.type = CardType_Text;
		this.caption = caption;
		this.parent = parent;
	}
}