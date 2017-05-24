import axios from 'axios';
import store from '../store';
import utils from '../utils';
import * as workBenchAction from '../actions/workbench-action';

export function getMainData(){
	const tilesData = [
		{
			img: 'images/grid-list/morning-819362_640.jpg',
			title: 'Morning',
			author: 'fancycrave1',
		},
		{
			img: 'images/grid-list/hats-829509_640.jpg',
			title: 'Hats',
			author: 'Hans',
		},
		{
			img: 'images/grid-list/honey-823614_640.jpg',
			title: 'Honey',
			author: 'fancycravel',
		},
		{
			img: 'images/grid-list/vegetables-790022_640.jpg',
			title: 'Vegetables',
			author: 'jill111',
		},
		{
			img: 'images/grid-list/camera-813814_640.jpg',
			title: 'Camera',
			author: 'Danson67',
		},
		{
			img: 'images/grid-list/burger-827309_640.jpg',
			title: 'Tasty burger',
			author: 'pashminu',
		},
		{
			img: 'images/grid-list/00-52-29-429_640.jpg',
			title: 'Breakfast',
			author: 'jill111',
		},
		{
			img: 'images/grid-list/water-plant-821293_640.jpg',
			title: 'Water plant',
			author: 'BkrmadtyaKarki',
		},
		{
			img : 'https://www.stylewe.com/image_cache/resize/250x333/image/catalog/0713VC/DIYA-3-23/H16XL-288-1.JPG'
			,title : 'DIYA'
			,author : 'Dress'
		}
		,{
			img : 'https://www.stylewe.com/image_cache/resize/250x333/image/catalog/2016-12-30%20ELENYUN/R2908-8.JPG'
			,title : 'DIYA'
			,author : 'Dress'
		}
		,{
			img : 'https://www.stylewe.com/image_cache/resize/250x333/image/catalog/2015-12-18-NATURAL-HOUSE/150901-2.jpg'
			,title : 'DIYA'
			,author : 'Dress'
		}
		,{
			img : 'https://www.stylewe.com/image_cache/resize/250x333/image/catalog/20170120-manifique/20170111%20%286%29.jpg'
			,title : 'DIYA'
			,author : 'Dress'
		}
	];

	//store.dispatch(workBenchAction.getWorkBenchDataSuccess(tilesData))
	return  axios.get('/api/4/news/latest')
		.then((dt) => {
			console.log(dt)
		})
	/*return axios.get(utils.kindomUrl('/my/info'))
		.then((dt) => {
			store.dispatch(userActions.getUsersSuccess(dt['data']))
			store.dispatch(userActions.loginStatus(dt['data']))

		})
		.catch((error) => {
			store.dispatch(userActions.loginStatus({success:false}))
		})*/

}

export function getMainMore(){
	const titlesData = [
		{
			img: 'images/grid-list/camera-813814_640.jpg',
			title: 'Camera',
			author: 'Danson67',
		},
		{
			img: 'images/grid-list/burger-827309_640.jpg',
			title: 'Tasty burger',
			author: 'pashminu',
		},
		{
			img: 'images/grid-list/00-52-29-429_640.jpg',
			title: 'Breakfast',
			author: 'jill111',
		},
		{
			img: 'images/grid-list/water-plant-821293_640.jpg',
			title: 'Water plant',
			author: 'BkrmadtyaKarki',
		},
	]
	var origin = []
	store.getState().workbenchState.products.map(function(data){
		origin.push(data)
	})
	console.log(store.getState(),'this is store')
	store.dispatch(workBenchAction.getWorkBenchDataSuccess(origin.concat(titlesData)))

}





