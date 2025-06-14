import Header from 'src/components/ui/atoms/Header';
import MonitoringSummary from 'src/components/ui/organisms/MonitoringSummary';
import ToDoSummary from 'src/components/ui/molecules/ToDoSummary';
import CounterSummary from 'src/components/ui/molecules/CounterSummary';
import CategorySummary from 'src/components/ui/molecules/CategorySummary';
import { useSummaryData } from 'src/hook/useProcessData';

const HomeManagerPage: React.FC = () => {
	const { summaryData, subtitleText, hasRequestData, counterCategoryData } = useSummaryData();

	return (
		<>
			<Header title="Monitoreo de solicitudes" subtitle={subtitleText} />
			<MonitoringSummary>
				{hasRequestData && <CounterSummary {...summaryData?.data.request} />}
				{counterCategoryData && (
					<CategorySummary
						totalProcesos={summaryData?.data?.request?.totalProcesos}
						categorySumers={summaryData?.data?.categorySumers}
					/>
				)}
			</MonitoringSummary>
			<ToDoSummary />
		</>
	);
};

export default HomeManagerPage;
