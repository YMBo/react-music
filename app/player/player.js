import React from 'react'
import Progress from '../components/progress'
import  './Player.less'
import { Link } from 'react-router'

/*总时间*/
let duration = null;
class Player extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			progress: 0,
			volume: 0,
			isPlay:true
		};
	}
	componentDidMount(){
		$('#player').bind($.jPlayer.event.timeupdate, (e)=>{
			/*总时间*/
			console.log('66')
			duration=e.jPlayer.status.duration;
			this.setState({
				volume : e.jPlayer.options.volume * 100,
				progress: e.jPlayer.status.currentPercentAbsolute
			})
		});
	}
	componentWillUnmount(){
		$('#player').unbind($.jPlayer.event.timeupdate);
	}
	progressChangeHandler(progress){
		$('#player').jPlayer(this.state.isPlay?'play':'pause',duration * progress);
	}
	changeVolumeHanler(progress){
		$('#player').jPlayer('volume',progress)
	}
	play(){
		this.state.isPlay ? $('#player').jPlayer('pause') : $('#player').jPlayer('play');
		this.setState({
			isPlay:!this.state.isPlay
		})
	}
	render(){
		return (
			<div className='player-page'>
				<h1 className='caption'><Link to='/list'>我的私人音乐坊</Link> </h1>
				<div className="mt20 row">
					<div className="controll-wrapper">
						<h2 className="music-title">{this.props.currentMusicItem.title}</h2>
						<h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
						<div className="row mt20">
							<div className="left-time -col-auto">-2:00</div>
							<div className="volume-container">
								<i className="icon-volume rt" style={{top:5,left:-5}}></i>
								<div className="volume-wrapper">
									<Progress progress={this.state.volume} barColor="red" onProgressChange={this.changeVolumeHanler} />
								</div>
							</div>
						</div>
						<div style={{height:10,lineHeight:'10px'}}>
							<Progress progress={this.state.progress} onProgressChange={this.progressChangeHandler.bind(this)} />
						</div>
			                		<div className="mt35 row">
			                			<div>
				                			<i className="icon prev"></i>
				                			<i className={`icon ml20 ${this.state.isPlay?'pause':'play'}`} onClick={this.play.bind(this)}></i>
				                			<i className="icon next ml20"></i>
			                			</div>
			                			<div className="-col-auto">
			                				<i className="icon repeat-cycle"></i>
			                			</div>
			                		</div>
					</div>
					<div className="-col-auto cover">
						<img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
					</div>
				</div>
			</div>
		)
	}	
}

export default Player;