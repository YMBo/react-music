import React from 'react'
import  './listitem.less'

class MusicListItem extends React.Component{
	render(){
		let musicItem = this.props.musicItem;
		return (
			<li className={`components-listitem row ${this.props.focus ? 'focus':''}`}>
				<p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
				<p className='-col-auto delete'></p>
			</li>
		)
	}
}

export default MusicListItem;