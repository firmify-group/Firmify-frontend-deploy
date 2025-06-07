interface MonitoringSummaryProps {
	children: React.ReactNode;
}

const MonitoringSummary: React.FC<MonitoringSummaryProps> = ({ children }) => {
	return (
		<article className="h-[28rem] w-full gap-4 flex flex-row place-content-center">
			{children}
		</article>
	);
};

export default MonitoringSummary;
