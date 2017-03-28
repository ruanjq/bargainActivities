
/**
 * [ 时间戳格式过滤器 ]
 * @param  {[type]} d      [ 时间戳 ]
 * @param  {[type]} format [ String ]
 * @return {[type]}        [description]
 */
module.exports = function(d, format) {
    /*const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];*/
    if(d  == undefined || d == "") return "";
    let result = '';
    const monthNames = [
            "Jan", "Feb", "Mar",
            "Apr", "May", "Jun", "Jul",
            "Aug", "Sep", "Oct",
            "Nov", "Dec"
    ];
    let date = new Date(parseInt(d) * 1000);
    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();
    let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

    // 匹配格式
    switch (format) {
        case 'HH:mm MM/dd/YYYY':
            result = `${hours}:${minutes} ${monthNames[monthIndex]} ${day} ${year}`;
            break;
    }
    return result;
};
