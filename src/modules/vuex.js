/**
 * 
 * @authors ruanjq 
 * @date    2016-09-12 13:55:59
 * @version 
 */


import Vuex from 'vuex';


const state = {
	count:0
};

const matations = {
	increment(state){
		state.count ++;
	}
};

export default new Vuex.Store({
	state,
  	matations
});
