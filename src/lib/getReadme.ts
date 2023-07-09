const getReadme = async () => {
	const res = await fetch('/readme.md');
	return await res.text();
};

export default getReadme;
