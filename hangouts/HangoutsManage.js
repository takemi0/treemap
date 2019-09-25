class HangoutsManage
{
	constructor() {
		/**
		 * 枝番採番変数
		 */
		this.__branch_num = 1;

	}

	createBranch( parent = null ) {
		this.__branch_num ++;

		ret = new HangoutsScenario( this, parent, this.__branch_num );
		return ret;
	}
}