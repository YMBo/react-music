import React from 'react'
import Header from './components/header'
import Player from './player/player'
import { MUSIC_LIST } from './config/musiclist'


class Root extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
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
				<Player currentMusicItem={this.state.currentMusicItem} />
			</div>
		)
	}
};
export default Root;