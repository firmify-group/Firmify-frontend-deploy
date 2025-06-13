import { Slot } from "src/utils/types/components.public";

const MonitoringSummary: React.FC<Slot> = ({ children }) => {
	return (
		<article className="h-[28rem] w-full gap-4 flex flex-row place-content-center">
			{children}
		</article>
	);
};

export default MonitoringSummary;
