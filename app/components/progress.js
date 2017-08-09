import React from 'react'
import './progress.less'

class Progress extends React.Component {
	constructor(props) {
		super(props);
		this.changeProgress=this.changeProgress.bind(this)
	}
	changeProgress(e){
		let progressBar = this.progressBar;
		let progressP =(e.clientX - progressBar.getBoundingClientRect().left)/progressBar.clientWidth;
		/*解释一下上面为什么要用bind传this，因为这个函数是在浏览器全局对象执行的，此时this不指向react组件部分
		React.createClass这种方式中事件是默认绑定到当前类中，但是使用es6语法的话，需要手动绑定。*/
		this.props.onProgressChange && this.props.onProgressChange(progressP)
	}
	render(){
		return (
			<div className="components-progress" ref={ (progressBar) => {this.progressBar = progressBar} } onClick={this.changeProgress}>
				<div className="progress" style={{width:`${this.props.progress}%`, background:this.props.barColor}}></div>
			</div>
		)
	}
}
export default Progress;