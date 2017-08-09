import React from 'react'
import MusicListItem from '../components/musicListItem'

class Musiclist extends React.Component{
	render(){
		let listEle=null;
		listEle = this.props.musiclist.map((item) => {
			return <MusicListItem key={item.id} musicItem={item} focus={item === this.props.currentMusicItem} />
		});
		return (
			<ul>
				{ listEle }
			</ul>
		)
	}
}

export default Musiclist;