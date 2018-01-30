import React from 'react'
import Progress from '../components/progress'
import Cover from '../components/cover.js';
import  './Player.less'
import { Link } from 'react-router'
import Pubsub from 'pubsub-js'

/*总时间*/
let duration = 0;
/*当前进度*/
let current=0;
/*播放状态*/
let isPlayNow=true;
let currentWidth=0;
class Player extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			progress: 0,
			volume: 0,
			time:0,
			isPlay:true
		};
	}
	componentWillMount(){
		if(this.props.isPlay){
			console.log(this.props.isPlay)
			isPlayNow=this.props.isPlay
		}
		this.setState({
			time:current,
			isPlay:isPlayNow,
			progress:currentWidth
		});
	}
	componentDidMount(){
		$('#player').bind($.jPlayer.event.timeupdate, (e)=>{
			/*总时间*/
			duration=e.jPlayer.status.duration;
			current=e.jPlayer.status.currentTime;
			currentWidth=e.jPlayer.status.currentPercentAbsolute;
			this.setState({
				volume : e.jPlayer.options.volume * 100,
				time :e.jPlayer.status.currentTime,
				progress: e.jPlayer.status.currentPercentAbsolute,
			})
		});
	}
	componentWillUnmount(){
		$('#player').unbind($.jPlayer.event.timeupdate);
		isPlayNow=this.state.isPlay;
	}
	progressChangeHandler(progress){
		$('#player').jPlayer(this.state.isPlay?'play':'pause',duration * progress);
	}
	changeVolumeHanler(progress){
		$('#player').jPlayer('volume',progress);
		this.setState({
			volume:progress*100
		})
	}
	play(){
		this.state.isPlay ? $('#player').jPlayer('pause') : $('#player').jPlayer('play');
		this.setState({
			isPlay:!this.state.isPlay
		})
	}
	playPrev(){
		Pubsub.publish('PLAY_PREV');
		this.setState({
			isPlay:true
		})
	}
	playNext(){
		Pubsub.publish('PLAY_NEXT');
		this.setState({
			isPlay:true
		})
	}
	render(){
		return (
			<div>
				<Cover bg={this.props.currentMusicItem.cover}/>
				<div className='player-page'>
					<h1 className='caption'><Link to='/list'>我的私人音乐坊</Link> </h1>
					<div className="mt20 row">
						<div className="controll-wrapper">
							<h2 className="music-title">{this.props.currentMusicItem.title}</h2>
							<h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
							<div className="row mt20">
								<div className="volume-container">
									<i className="icon-volume rt" style={{top:5,left:-5}}></i>
									<div className="volume-wrapper">
										<Progress progress={this.state.volume} barColor="red" onProgressChange={this.changeVolumeHanler.bind(this)} />
									</div>
								</div>
							</div>
							<div style={{height:10,lineHeight:'10px'}}>
								<Progress progress={this.state.progress} onProgressChange={this.progressChangeHandler.bind(this)} />
								<div className="left-time -col-auto">{(this.state.time/60).toFixed(0)>10?10:'0'+(this.state.time/60).toFixed(0)} : {((this.state.time).toFixed(0)%60<10) ? '0'+(this.state.time).toFixed(0)%60 : (this.state.time).toFixed(0)%60} s</div>
							</div>
				                		<div className="mt35 row">
				                			<div>
					                			<i className="icon prev" onClick={this.playPrev.bind(this)}></i>
					                			<i className={`icon ml20 ${Math.ceil(this.state.time)>= Math.ceil(duration) ? 'play' : this.state.isPlay ? 'pause':'play'}`} onClick={this.play.bind(this)}></i>
					                			<i className="icon next ml20" onClick={this.playNext.bind(this)}></i>
				                			</div>
				                			<div className="-col-auto">
				                				<i className="icon repeat-cycle"></i>
				                			</div>
				                		</div>
						</div>
						<div className='-col-auto cover' >
							<img className={`${Math.ceil(this.state.time)>= Math.ceil(duration) ? 'pause' : this.state.isPlay ? '':'pause'}`} src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
						</div>
					</div>
				</div>
			</div>
		)
	}	
}

export default Player;