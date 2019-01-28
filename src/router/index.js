import Vue from 'vue';
import Router from 'vue-router';
import Loading from '@/components/Loading';
// import Home from '@/components/Home';
import Home from '@/components/HomeTwo'
import Entry from '@/components/Entry'


Vue.use(Router);

export default new Router({
	routes: [{
		path: '/',
		component: Entry,
	},{
        path: '/Loading',
		component: Loading,
    },{
        path: '/Home',
		component: Home,
    }],
});
