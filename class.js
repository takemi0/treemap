/**
 * 
 */

 /**
  * リスト様相
  */
 class Node {
	 /**
	  * コンストラクタ
	  */
	constructor( id ){
		/**
		 * ID
		 */
		this.id = id;

		/**
		 * 要素名
		 */
		this.name = "";
		/**
		 *  値
		 */
		this.value = null;

		/**
		 * 次の要素
		 */
		this.next = null;

		/**
		 * 子供の要素
		 */
		this.child = null;

		//x, y, width, height
		this.x = 0;
		this.y = 0;

		this.width = 0;
		this.height= 0;

		this.offset_x = 0;
		this.offset_y = 0;
		return;
	}

	dump() {
		console.log( "id:" + this.id );
	}
 }

 /**
  * 
  */
 /*
 class A_Node extends Node {
	constructor( id ){
		super( id );
		this.name = "A_Node";
	}

	dump() {
		console.log( "A_Node id:" + this.id + " name:" + this.name );
	}
 }
 */
 
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
					 return ;
				 } else {
					 befor.next = tmp.next;
					 tmp = null;
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

	 getAllArray() {
		 var ret = [];
		 var tmp = this.top;
		 for( var n = 0; n < this.hasNum; n ++ ){
			 ret.push( tmp );
			 if( tmp.next == null ) break;
			 tmp = tmp.next;
		 }
		 return ret;
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

 /** 
 var list = new List();

 list.add( new A_Node(1) );
 list.add( new Node(2) );
 list.add( new Node(3) );
 list.add( new Node(5), 2 );

 list.dump();
 console.log("");

 list.del( 2 );
 list.dump();
 console.log("");

 var foo = list.getNode(3);

 foo.value = 100;

 console.log( "get Node:" + foo.id );
 
 foo = list.getNode( 3 );

 console.log( "[2] get Node:" + foo.value );
 */
/*
 var node = new Node();

 console.log( node.value );
 */