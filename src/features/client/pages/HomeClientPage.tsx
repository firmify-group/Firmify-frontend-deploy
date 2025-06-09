import Header from '@feature/client/components/atoms/Header';
import Input from '@feature/client/components/atoms/Input';
import UserTable from '@feature/client/components/molecules/UserTable';

const mockProducts = [
	{ id: '01', category: 'Vacaciones', state: 'Pendiente', action: 1 },
	{ id: '02', category: 'Juan Pérez', state: 'Aprobado', action: 1 },
	{ id: '03', category: 'María González', state: 'Rechazado', action: 1 },
	{ id: '04', category: 'Ana Torres', state: 'Pendiente', action: 1 },
	{ id: '05', category: 'Luis Martínez', state: 'Aprobado', action: 1 },
	{ id: '06', category: 'Sofía Ramírez', state: 'Pendiente', action: 1 },
	{ id: '07', category: 'Carlos Díaz', state: 'Rechazado', action: 1 },
	{ id: '08', category: 'Valentina Rojas', state: 'Pendiente', action: 1 },
	{ id: '09', category: 'Javier Castro', state: 'Aprobado', action: 1 },
	{ id: '10', category: 'Camila Herrera', state: 'Pendiente', action: 1 },
	{ id: '11', category: 'Martín Silva', state: 'Pendiente', action: 1 },
	{ id: '12', category: 'Fernanda Morales', state: 'Aprobado', action: 1 },
	{ id: '13', category: 'Diego Fuentes', state: 'Pendiente', action: 1 },
	{ id: '14', category: 'Paula Reyes', state: 'Rechazado', action: 1 },
	{ id: '15', category: 'Matías Soto', state: 'Pendiente', action: 1 },
	{ id: '16', category: 'Gabriela Vega', state: 'Aprobado', action: 1 },
	{ id: '17', category: 'Tomás Paredes', state: 'Pendiente', action: 1 },
	{ id: '18', category: 'Daniela Navarro', state: 'Pendiente', action: 1 },
	{ id: '19', category: 'Ignacio Contreras', state: 'Aprobado', action: 1 },
	{ id: '20', category: 'Josefa Salazar', state: 'Pendiente', action: 1 },
	{ id: '21', category: 'Felipe Bravo', state: 'Rechazado', action: 1 },
	{ id: '22', category: 'Antonia Carrasco', state: 'Pendiente', action: 1 },
	{ id: '23', category: 'Vicente Espinoza', state: 'Aprobado', action: 1 },
	{ id: '24', category: 'Emilia Araya', state: 'Pendiente', action: 1 },
	{ id: '25', category: 'Francisco Godoy', state: 'Pendiente', action: 1 },
];

const selectCardHandler = (product: (typeof mockProducts)[0]) => {
	alert(`Seleccionaste: ${product.id}`);
};

const HomeClientPage: React.FC = () => {
	return (
		<>
			<Header
				title="Gestionar solicitudes"
				subtitle="Ultima actualización hoy a las 12:00hrs"
			/>
			<main className="size-full container-base flex flex-col justify-between items-center gap-5 ">
				<section className="w-full h-16  flex flex-row justify-between items-center">
					<div className="flex flex-row gap-4 w-[30rem] items-center">
						<Input
							decoration="flex flex-col gap-1 w-1/2"
							id="name"
							name="name"
							placeholder='Ej: "Juan Perez"'
							type="text"
						/>
						<Input
							decoration="flex flex-col gap-1 w-1/2"
							id="rut"
							name="rut"
							placeholder='Ej: "11.111.111-1"'
							type="text"
						/>
					</div>
					<button type="button" className="button button-primary-IDLE">
						+ Agregar
					</button>
				</section>
				<section className="size-full">
					<UserTable products={mockProducts} selectCardHandler={selectCardHandler} />
				</section>
			</main>
		</>
	);
};

export default HomeClientPage;
