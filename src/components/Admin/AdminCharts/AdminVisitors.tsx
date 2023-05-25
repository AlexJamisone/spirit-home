const AdminVisitors = () => {
	return (
		<>
			<iframe
				src={process.env.NEXT_PUBLIC_VISITORS_LINKS}
				loading="lazy"
				style={{
					width: '1px',
					minWidth: '100%',
					height: '1600px',
					background: 'transperent',
				}}
			></iframe>
			<div
				style={{
					fontSize: '14px',
					paddingBottom: '14px',
				}}
			></div>
			<script async src="https://plausible.io/js/embed.host.js"></script>
		</>
	);
};

export default AdminVisitors;
