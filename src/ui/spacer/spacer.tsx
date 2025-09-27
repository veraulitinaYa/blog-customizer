type SpacerProps = {
	width?: number;
	height?: number;
};

export const Spacer = ({ width = 554, height = 50 }: SpacerProps) => {
	return <div style={{ width: `${width}px`, height: `${height}px` }} />;
};
