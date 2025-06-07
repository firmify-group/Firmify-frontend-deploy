import CategorySummary from '@feature/admin/components/molecules/CategorySummary';
import CounterSummary from '@feature/admin/components/molecules/CounterSummary';
import type { MonitoringSummaryProps } from '@feature/admin/types/home.type';

const MonitoringSummary: React.FC<MonitoringSummaryProps> = ({ categoryData, counterData }) => {
	const { total_procesos, category_sumers } = categoryData;

	return (
		<article className="h-[28rem] w-full gap-4 flex flex-row place-content-center">
			<CounterSummary
				total_objeciones={counterData.total_objeciones}
				total_pendientes={counterData.total_pendientes}
				total_procesos={counterData.total_procesos}
				total_resueltos={counterData.total_resueltos}
			/>
			<CategorySummary category_sumers={category_sumers} total_procesos={total_procesos} />
		</article>
	);
};

export default MonitoringSummary;
