import loading from '/assets/gifs/loader.gif';

function Loading() {
	return (
		<div className='loader'>
			<img src={loading} alt="Looking.." />
		</div>
	)
}

export default Loading