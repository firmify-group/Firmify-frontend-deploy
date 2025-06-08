import Header from '@feature/admin/components/atoms/Header';
import KanvanBoard from '@feature/admin/components/organisms/KanvanBoard';

const RequestManagerPage: React.FC = () => {
	return (
		<>
			<Header
				title="Solicitudes ingresadas"
				subtitle="Ultima actualización hoy a las 12:00hrs"
			/>
			<KanvanBoard />
		</>
	);
};

export default RequestManagerPage;
