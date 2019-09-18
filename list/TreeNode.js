/**
 * ツリーの要素
 */
class TreeNode extends ListNode {

	constructor(id ) {
		super(id);
		//枝の要素
		this.branch = new List(id);
		//階層
		this.layer = 0;
		//自分の枝番号
		this.branch_num = 0;
	}

	/**
	 * 枝を追加
	 * @param {TreeNode} tmp 
	 */
	addBranch( tmp ) {
		this.branch.add( tmp ) ;
	}

	/**
	 * 保持している枝の数を取得
	 */
	getBranchHasNum() {
		return this.branch.hasNum;
	}

}