/**
 * 
 */
class Tree extends List {

	constructor() {
		super();
		/**
		 * ブランチの開始要素のハンドルを格納
		 * 分岐アクセスの効率化
		 */
		this.map = [ this ];
		this.max_branch = 0;
		this.max_id = 0;
		this.top = null;
	}

	/**
	 * 要素を追加
	 * @param {TreeNode} node 
	 * @param {String} id 
	 */
	add( node, id = "" ) {
		if( id == "" ) {
			return super.add( node );
		}
		
		var tmp = this.getNode( id );
		var ids = id.split('-');

		//偶数は続きに追加、奇数はブランチに追加
		if( ids.length % 2 == 0 ) {
			tmp.add( node );
		} else {
			tmp.branch.add( node, this.id );
			this.map.push( node );
		}
	}

	/**
	 * 要素を削除
	 * @param {String} id 
	 */
	del( id ){
		var ids = id.split('-');

		if( ids.length == 1 ) {
			return this.del( id );
		}

		var node = this.getNode( id );
		var del_id = ids[ ids.length - 1 ];
		if( node.parent ) node = node.parent;

		//偶数は要素を削除、奇数はブランチの要素を削除
		if( ids.length  % 2 == 0 ) {
			node.del( del_id );
		} else {
			node.branch.del( del_id );
		}	
	}

	addBranch( node ) {
		this.map.push( node );
		this.max_branch = this.map.length;
	}

	delBranch( id ) {
		this.map[id] = null;
		//max_branchは更新しない
	}

	/**
	 * 要素を取得
	 * @param {String} id 
	 * @param {Boolean} flag 
	 */
	getNode( id, flag = false ) {
		var ids = id.split('-');
		var node = this;
		for( var n = 0; n < ids.length; n ++ ) {
			//偶数はList,奇数はbranch
			if( n % 2 == 0 ) {
				node = node.getNode( ids[n], flag );
			} else {
				node = node.branch.getNode( ids[n],flag );
			}
			if( node == null ) return null;
		}
		return node;
	}

	getAllArray()
	{
		var ret = this.getAllArray();
		for( var n = 0; n < this.map.length; n ++ ) {
			if( this.map[n] != null ) {
				ret.push( this.map[n].getAllArray() );
			}
		}
		return ret;
	}
}