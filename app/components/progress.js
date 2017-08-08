import React from 'react'
import './header.less'

class Progress extends React.Component {
	render(){
		return (
			<div className="components-progress row">
				{ this.props.progress }s
			</div>
		)
	}
}
export default Progress;