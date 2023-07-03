const WaitingData = ({
	loading,
	error,
	dataNotExist,
}: {
	loading: boolean
	error: boolean
	dataNotExist: boolean
}) => {
	if (loading) {
		return <div>loading...</div>
	}

	if (error) {
		return <div>error</div>
	}

	if (dataNotExist) {
		return <div>data not exist</div>
	}
}

export default WaitingData
