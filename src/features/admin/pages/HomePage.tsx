import Header from '@feature/admin/components/molecules/Header';
import MonitoringSummary from '@feature/admin/components/organisms/MonitoringSummary';
import type { CategoryRequest, CounterRequest } from '../types/home.type';

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
			<MonitoringSummary categoryData={categoryExample} counterData={counterExample} />
			<section className="size-full container-base">a</section>
		</>
	);
};

export default HomeManagerPage;
