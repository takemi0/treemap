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

	/**
	 * 先の要素を１次元配列で取得
	 * @param {*} top 
	 */
	getAllLines( top = null )
	{
		var ret = [];
		var tmp = null;
		var loop_max = 0;

		if( top == null ) {
			tmp = this.top;
			loop_max =  this.hasNum;
		} else {
			loop_max = top.length;
		}

		//要素が2個以上の時に,線の情報を作成する
		if( loop_max >= 2 ) {

			var befor = new point();

			if( top != null ){
				tmp = top.child[0];
			}
			//最初の情報をスワップ
			befor.x = tmp.width / 2 + tmp.x ;
			befor.y = tmp.height + tmp.y ;

			for( var n = 1; n < loop_max; n ++ ) {
				if( top != null ) {
					tmp = top[n];
				} else {
					tmp = tmp.next;
				}

				//線を引く座標を生成する
				ret.push ( new lines( [
					Object.assign( {}, befor ),
					new point(
			 				tmp.width / 2 + tmp.x ,
			 				tmp.y 
					),
				] ) );

				if( tmp.type == NodeType_Card ) {
					for( var na = 0; na < tmp.items.length; na ++ ) {
						var item = tmp.items[na];
						if( item.child != null ) {
							//線を引く座標を生成する
							ret.push ( new lines( [
								new point(
									tmp.x + tmp.width / 2,
									tmp.y + tmp.height
								),
								new point(
 									(tmp.items[na].child[0].width / 2 )+ tmp.items[na].child[0].x ,
 									tmp.items[na].child[0].y 
								),
							] ) );
							var res = this.getAllLines( item.child );
							for( var nb = 0; nb < res.length; nb ++ ) ret.push( res[nb] );
						}
					}
				}

				//一つ前の情報をスワップ
				befor.x = tmp.width / 2 + tmp.x ;
				befor.y = tmp.height + tmp.y ;
			}
		}
		return ret;
	}
}