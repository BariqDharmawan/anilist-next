const WaitingData = ({ loading, error }) => {
	if (loading) {
		return <div>loading...</div>
	}

	if (error) {
		return <div>error</div>
	}
}

export default WaitingData
