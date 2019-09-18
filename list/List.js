 /**
  * リスト制御クラス
  */
 class List {
	 constructor(){
		//this.top = new Node();
		//this.hasNum = 1;
		this.top = null;
		this.hasNum = 0;
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
			this.hasNum ++;
			return;
		}

		var tmp = this.top;
		for( var n = 0; n < this.hasNum; n ++ ){
			if( tmp.next == null ) break;
			 
			if( id && tmp.id == id  ) {
				var next = tmp.next;
				tmp.next = node;
				node.next = next;
				this.hasNum ++;
				return;
			}
			tmp = tmp.next;
		}

		this.hasNum ++;
		tmp.next = node;
	}

	 /**
	  *  指定したIDの要素を削除
	  * @param {*} id 
	  */
	 del( id ) {
		 var tmp = this.top;
		 var befor = this.top;
		 for( var n = 0; n < this.hasNum; n ++ ){
			 if( tmp.id == id ) {
				 if( tmp == befor ){
					 //初回
					 this.top = tmp.next;
					 tmp = null;
					 break_flag = true;
					 this.hasNum --;
					 return ;
				 } else {
					 befor.next = tmp.next;
					 tmp = null;
					 this.hasNum --;
					 return ;
				 }
			 }
			 if( tmp.next == null ) break;
			 befor = tmp;
			 tmp = tmp.next;
		 }
	 }

	 /**
	  * IDで要素を取得
	  * @param {} id 
	  */
	getNode( id ) {
		 var tmp = this.top;
		 for( var n = 0; n < this.hasNum; n ++ ){
			 if( tmp.id == id ) return tmp;

			 if( tmp.next == null ) break;
			 tmp = tmp.next;
		 }
		 return null;
	}

	 /**
	  * 要素名で要素を取得
	  * @param {*} name 
	  */
	 getNodeByName( name ) {
		 var tmp = this.top;
		 for( var n = 0; n < this.hasNum; n ++ ){
			 if( tmp.name == name ) return tmp;

			 if( tmp.next == null ) break;
			 tmp = tmp.next;
		 }
		 return null;
	 }

	/**
	 * シナリオの要素を１次元配列で取得
	 */
	getAllArray( top = null )
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

		for( var n = 0; n < loop_max; n ++ ){
			if( top == null ) {
				ret.push( tmp );
			} else {
				tmp = top[n];
				ret.push( tmp )
			}

			if( tmp.child != null ) {
				var res = this.getAllArray( tmp.child );
				for( var na = 0; na < res.length; na ++ ) ret.push( res[na] );
			}

			if( tmp.type == NodeType_Card ) {
				for( var na = 0; na < tmp.items.length; na ++ ) {
					var item = tmp.items[na];
					if( item.child != null ) {
						var res = this.getAllArray( item.child );
						for( var nb = 0; nb < res.length; nb ++ ) ret.push( res[nb] );
					}
				}
			}

			if( top == null && tmp.next == null ) break;
			if( top == null ) tmp = tmp.next;

		}

		return ret;
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

	 create_id() {
		 return this.hasNum + 1;
	 }
 }