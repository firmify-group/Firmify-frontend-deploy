import Header from '@feature/admin/components/atoms/Header';
import FilterBar from '@feature/admin/components/molecules/FilterBar';
import KanvaColumn from '@feature/admin/components/molecules/KanvaColum';

const RequestManagerPage: React.FC = () => {
	return (
		<>
			<Header
				title="Solicitudes ingresadas"
				subtitle="Ultima actualización hoy a las 12:00hrs"
			/>

			<FilterBar />

			<article className="flex flex-row justify-between  items-start gap-4 size-full">
				<KanvaColumn
					name="Pendientes"
					low="#FCE3CD"
					higt="#F28D35"
					id="Pendientes"
					key="Pendientes"
				/>
				<KanvaColumn
					name="Objetados"
					low="#F6D1DB"
					higt="#E37692"
					id="Objetados"
					key="Objetados"
				/>
				<KanvaColumn
					name="Concluidos"
					low="#BEF1D6"
					higt="#22BD6B"
					id="Concluidos"
					key="Concluidos"
				/>
			</article>
		</>
	);
};

export default RequestManagerPage;
