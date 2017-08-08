import React from 'react'
import Header from './components/header'
import Progress from './components/Progress'
class Root extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			progress: '-'
		};
	}
	componentWillMount(){
		$('#player').unbind();
		console.log('解绑成功')
	}
	componentDidMount(){
		$('#player').jPlayer({
			ready:function(){
				$(this).jPlayer('setMedia',{
					  /*mp3:'http://mp3.flash127.com/music/20607.mp3'*/
					mp3:'/static/music/num1.mp3'
				}).jPlayer('play')
			},
			supplied : 'mp3',
			wmode : 'window'
		});
		$('#player').bind($.jPlayer.event.timeupdate , (e)=>{
			this.setState({
				progress:Math.round(e.jPlayer.status.currentTime)
			})
		});
	}
	render(){
		return (
			<div>
				<Header />
				<Progress progress={this.state.progress} id="66"></Progress>
			</div>
		)
	}
};
export default Root;