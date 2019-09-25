 /**
  * リスト制御クラス
  */
 class List {

	 constructor( prefix = "" ){
		/**
		 * 先頭の要素
		 */
		this.top = null;
		/**
		 * addを高速化するための末尾の要素のハンドル
		 */
		this.last = null;
		this.hasNum = 0;
		this.id_prefix = prefix;
		this.max_id = 0;
	 }

	/**
	 * 末尾に要素を追加
	 * @param {*} node 
	 * @param int id   指定したIDの後ろに追加する
	 */
	add( node, id = null){

		if( id == null ) {
			id = this.create_id();
		}
		node.id = id;

		//初回のみ
		if( this.top == null ){
			this.top = node;
			this.last = node;
			this.hasNum ++;
		} else {
			this.last.next = node;
			this.last = node;
			this.hasNum ++;
		}

		//追加した要素に続きがあった場合
		if( node.next != null ) {
			this.last = this.getLast( node, true );
		}
	}

	/**
	 * リスト要素の最後の要素を取得
	 * @param {ListNode} node 
	 * @param {boolean} cnt_flag; 
	 */
	getLast( node, cnt_flag = false ) {
		if( node == null ) return null;
		while( node.next != null ) {
			if( cnt_flag ) this.hasNum ++;
			node = node.next;
		}
		return node;
	}

	/**
	 *  指定したIDの要素を削除
	 * @param {Int} id 
	 */
	del( id ) {
		var tmp = null;

		//先頭の場合
		if( this.top.id == id ) {
			tmp = this.top.next;
			this.top = null;
			this.top = tmp;
			this.hasNum --;
			if( this.top == null ) this.last = null;
			return true;
		}

		var ret = this.getNode( id, true );
		if( ret == null ) return false;
		tmp = ret[0];
		var befor = ret[1];
		var next = tmp.next;

		//削除が最後の要素の場合
		if( this.last.id == tmp.id ){
			tmp = null;
			befor.next = null;
			this.last = befor;
			this.hasNum --;
			return true;
		}

		//削除要素が途中の場合
		befor.next = next;
		tmp = null;
		this.hasNum --;
		return true;
	}

	/**
	 * IDで要素を取得
	 * @param {int} id 
	 * @param {boolean} flag 取得したハンドルの前の要素を返却するフラグ
	 */
	getNode( id, flag = false ) {
		 var tmp = this.top;
		 var befor = null;
		 for( var n = 0; n < this.hasNum; n ++ ){
			 if( tmp.id == id ) {
				 if( flag ) return [ tmp, befor ];
				 else return tmp;
			 }

			 if( tmp.next == null ) break;
			 befor = tmp;
			 tmp = tmp.next;
		 }
		 return null;
	}

	/**
	 * idの要素をnodeで置き換える
	 * @param {int} id 
	 * @param {ListNode} node 
	 */
	updateNode( id, node ){
		node.id = id;
		var tmp = this.getNode( id, true);

		node.next = tmp[0].next;
		tmp[1].next = node;
		tmp = null;
	}

	/**
	 * 要素名で要素を取得
	 * @param {String} name 
	 * @param {Boolean} flag 
	 */
	getNodeByName( name, flag = false ) {
		var tmp = this.top;
		var befor=null;
		for( var n = 0; n < this.hasNum; n ++ ){
			if( tmp.name == name ) {
				if( flag ) return [ tmp, befor ];
				else return tmp;
			}

			if( tmp.next == null ) break;
			befor = tmp;
			tmp = tmp.next;
		}
		return null;
	}

	getAllArray( top = null ) {
		var ret = [];
		var tmp = this.top;
		while( tmp.next != null ) {
			ret.push( tmp );
			tmp = tmp.next;
		}
		return ret;
	}

	/**
	 * IDを発番
	 */
	create_id() {
		this.max_id ++;
		if( this.id_prefix ) return this.id_prefix + "- " + this.max_id;
		return this.max_id;
	}

	/**
	 * リスト要素に枝番号をつける
	 */
	updateBranch( top = null, branch = 0 )
	{
		var tmp = null;
		var loop_max = 0;
		var max_branch = branch;

		if( top == null ) {
			tmp = this.top;
			loop_max =  this.hasNum;
			branch = 1;
		} else {
			loop_max = top.length;
		}

		for( var n = 0; n < loop_max; n ++ ){

			if( top == null ) {
				tmp.branch = 1;
			} else {
				tmp = top[n];
				tmp.branch = branch;
			}

			if( tmp.child != null ) {
				max_branch ++;
				this.updateBranch( tmp.child, max_branch );
			}

			if( tmp.type == NodeType_Card ) {
				for( var na = 0; na < tmp.items.length; na ++ ) {
					var item = tmp.items[na];
					if( item.child != null ) {
						max_branch ++;
						this.updateBranch( item.child, max_branch );
					}
				}
			}

			if( top == null && tmp.next == null ) break;
			if( top == null ) tmp = tmp.next;
		}

		return max_branch;
	}

	dump() {
		 var tmp = this.top;
		 for( var n = 0; n < this.hasNum; n ++ ){
			 tmp.dump();
			 if( tmp.next == null ) break;
			 tmp = tmp.next;
		 }
	}

 }