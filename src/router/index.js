import Vue from 'vue';
import Router from 'vue-router';
import Loading from '@/components/Loading';
import Home from '@/components/Home'


Vue.use(Router);

export default new Router({
	routes: [{
		path: '/',
		component: Loading,
	},{
        path: '/Home',
		component: Home,
    }],
});
