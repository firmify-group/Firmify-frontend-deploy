import Header from 'src/components/ui/atoms/Header';
import MonitoringSummary from 'src/components/ui/organisms/MonitoringSummary';
import ToDoSummary from 'src/components/ui/molecules/ToDoSummary';
import CounterSummary from 'src/components/ui/molecules/CounterSummary';
import CategorySummary from 'src/components/ui/molecules/CategorySummary';
import type { CategoryRequest, CounterRequest } from '../../utils/types/home.type';

const categoryExample: CategoryRequest = {
	total_procesos: 100,
	category_sumers: [
		{ name: '01', total: 40 },
		{ name: '02', total: 65 },
		{ name: '03', total: 20 },
		{ name: '04', total: 85 },
	],
};

const counterExample: CounterRequest = {
	total_resueltos: 30,
	total_pendientes: 50,
	total_objeciones: 40,
	total_procesos: 120,
};

const HomeManagerPage: React.FC = () => {
	return (
		<>
			<Header
				title="Monitoreo de solicitudes"
				subtitle="Ultima actualización hoy a las 12:00hrs"
			/>

			<MonitoringSummary>
				<CounterSummary {...counterExample} />
				<CategorySummary {...categoryExample} />
			</MonitoringSummary>

			<ToDoSummary />
		</>
	);
};

export default HomeManagerPage;
