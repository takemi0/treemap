/**
 * 
 */

 /**
 * 数値をカンマ区切りに変換する
 */
function number_format(num, decimals)
{
    //小数点以下の表示桁数
    var _decimals = decimals | 0;

    //指定桁以下を切り捨てた数値
    var _shift = Math.pow(10, _decimals);
    var _floor = Math.floor(num * _shift) / _shift;

    //整数部と小数部に分ける
    var _integerPart = Math.floor(_floor);
    var _decimalPart = (_floor.toString().split('.').length > 1) ? _floor.toString().split('.')[1] : '';

    //整数部にカンマを付与
    var _num = Math.abs(_integerPart).toString().split(/(?=(?:\d{3})+$)/).join();

    //小数部を付与
    if (_decimals > 0) {
        var zeroStr = '';
        for (var i = 0; i < _decimals; i ++) zeroStr += '0';
        _num += '.' + (zeroStr + _decimalPart).slice(-_decimals);
    }

    //負の記号を付与して返却
    return (num < 0) ? ('-' + _num) : _num;
}

/**
 * 日付判定
 * @param string val 
 */
function isDate(val)
{
	var tmp = new Date(val);
	if( tmp ) return true;
	return false;
}