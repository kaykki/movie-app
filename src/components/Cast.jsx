import React from 'react'

function Cast({ member, avatar }) {
	return (
		<article className='cast-card'>
			{member.profile_path && (
				<img src={`https://image.tmdb.org/t/p/w500${member.profile_path}`} alt={member.name} />
			)}
			<div className={member.profile_path ? '' : 'cast-no-img'}>
				{!member.profile_path && <img src={avatar} alt={member.name} />}
				<h3>{member.name}</h3>
				<p>{member.character}</p>
			</div>
		</article>
	)
}
export default Cast