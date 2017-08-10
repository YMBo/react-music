import React from 'react';
import Header from './components/header';
import Player from './player/player';
import { MUSIC_LIST } from './config/musiclist';
import Musiclist from './player/musiclist';
import {  hashHistory  ,Router, Route, IndexRoute } from 'react-router'

class App extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			musiclist : MUSIC_LIST,
			currentMusicItem: MUSIC_LIST[0]
		};
	}
	componentDidMount(){
		$('#player').jPlayer({
			ready:function(){
				$(this).jPlayer('setMedia',{
					  /*mp3:'http://mp3.flash127.com/music/20607.mp3'*/
					mp3:MUSIC_LIST[0].file
				}).jPlayer('play')
			},
			supplied : 'mp3',
			wmode : 'window'
		});
	}
	render(){
		return (
			<div>
				<Header />
				{ React.cloneElement(this.props.children , this.state) }
			</div>
		)
	}
}

class Root extends React.Component {
	render(){
		return (
			<Router history={hashHistory}>
				<Route path='/' component={App}>
					<IndexRoute component={Player} />
					<Route path='/list' component={Musiclist}></Route>
				</Route>
			</Router>
		)
	}
}

export default Root;