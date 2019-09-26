/**
 * シナリオ分岐管理クラス
 */
class HangoutsManage
{
	constructor() {
		/**
		 * 枝番採番変数
		 */
		this.__branch_num = 0;

		this.list = [];
	}

	/**
	 * 分岐を作成
	 * @param {HangoutsScenario} parent 
	 */
	createBranch( parent = null ) {
		var num = this.getBranchID();
		var ret = new HangoutsScenario( this, parent, num );
		this.list.push( ret );
		return ret;
	}

	/**
	 * 分岐のリストを取得
	 */
	getBranchList() {
		return this.list;
	}

	/**
	 * 分岐番号を採番
	 */
	getBranchID() {
		this.__branch_num ++;
		return this.__branch_num;
	}

	/**
	 * 全てのシナリオ要素を取得
	 */
	getAllNode() {
		var ret = [];
		for( var n = 0; n < this.list.length; n ++ ) {
			ret = ret.concat( this.list[n].getAllArray() );
		}
		return ret;
	}
}