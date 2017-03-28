module.exports = {
    bind: function() {
        console.log('demo bound!');
    },
    update: function(value) {
        value = parseFloat(value) * 100;
        let prcent = (value || 0) / 100;
        setTimeout(() => {
            if(this.el == null) return;
            let pWidth = this.el.clientWidth; // 进度条宽度
            let tElem = this.el.querySelector(".progress-tip"); // 提示信息
            let cElem = this.el.querySelector(".circle"); // 圆形
            // console.log(pWidth, tElem.clientWidth, prcent);
            // console.log(prcent * pWidth, tElem.clientWidth)
            if (prcent * pWidth <= tElem.clientWidth) {
                // console.log("左边");
                tElem.style.left = '0';
            } else {
                // console.log('右边');
                tElem.style.right = '0';
                tElem.style.left = 'inherit';
            }
            // 获取html font-size；
            let fontSize = parseFloat(document.getElementsByTagName("html")[0].style.fontSize);

            let triangleElem = this.el.querySelector(".triangle");
            if (0.48 * fontSize >= prcent * pWidth) {
                cElem.style.left = '0';
                triangleElem.style.left = 0.24 - 0.146667 + 'rem';
            } else {
                cElem.style.right = '0';
                cElem.style.left = 'inherit';

                triangleElem.style.right = 0.24 - 0.146667 + 'rem';
                triangleElem.style.left = 'inherit';
            }


        });
    }
};
