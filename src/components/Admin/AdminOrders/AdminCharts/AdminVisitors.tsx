const AdminVisitors = () => {
	return (
		<>
			<iframe
				plausible-embed
				src="https://plausible.io/share/spirit-home.ru?auth=_mk7aDgoNAZQrObhg7JkC&embed=true&theme=light"
				scrolling="no"
				// frameborder="0"
				loading="lazy"
				style={{
					width: '1px',
					minWidth: '100%',
					height: '1600px',
				}}
			></iframe>
			<div
				style={{
					fontSize: '14px',
					paddingBottom: '14px',
				}}
			>
				Stats powered by{' '}
				<a
					target="_blank"
					style={{
						color: '#4F46E5',
						textDecoration: 'underline',
					}}
					href="https://plausible.io"
				>
					Plausible Analytics
				</a>
			</div>
			<script async src="https://plausible.io/js/embed.host.js"></script>
		</>
	);
};

export default AdminVisitors;
