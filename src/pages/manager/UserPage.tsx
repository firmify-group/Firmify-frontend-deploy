import Header from 'src/components/ui/atoms/Header';
import Input from 'src/components/ui/atoms/Input';
import UserTable from 'src/components/ui/molecules/UserTable';
import type { ProductProps } from 'src/utils/types/components.admin';

const mockProducts: ProductProps[] = [
	{
		id: '01',
		name: 'Pedro Pascal',
		rut: '11.111.111-1',
		email: 'email@example.cl',
		action: 1,
		category: 'Funcionario',
		state: 'Activo',
	},
	{
		id: '02',
		name: 'María González',
		rut: '22.222.222-2',
		email: 'maria.gonzalez@example.cl',
		action: 1,
		category: 'Funcionario',
		state: 'Activo',
	},
	{
		id: '03',
		name: 'Juan Pérez',
		rut: '33.333.333-3',
		email: 'juan.perez@example.cl',
		action: 1,
		category: 'Funcionario',
		state: 'Activo',
	},
	{
		id: '04',
		name: 'Ana Torres',
		rut: '44.444.444-4',
		email: 'ana.torres@example.cl',
		action: 1,
		category: 'Funcionario',
		state: 'Activo',
	},
	{
		id: '05',
		name: 'Carlos Silva',
		rut: '55.555.555-5',
		email: 'carlos.silva@example.cl',
		action: 1,
		category: 'Funcionario',
		state: 'Activo',
	},
	{
		id: '06',
		name: 'Lucía Fernández',
		rut: '66.666.666-6',
		email: 'lucia.fernandez@example.cl',
		action: 1,
		category: 'Funcionario',
		state: 'Activo',
	},
	{
		id: '07',
		name: 'Jorge Ramírez',
		rut: '77.777.777-7',
		email: 'jorge.ramirez@example.cl',
		action: 1,
		category: 'Funcionario',
		state: 'Activo',
	},
	{
		id: '08',
		name: 'Sofía Herrera',
		rut: '88.888.888-8',
		email: 'sofia.herrera@example.cl',
		action: 1,
		category: 'Funcionario',
		state: 'Activo',
	},
	{
		id: '09',
		name: 'Felipe Castro',
		rut: '99.999.999-9',
		email: 'felipe.castro@example.cl',
		action: 1,
		category: 'Funcionario',
		state: 'Activo',
	},
	{
		id: '10',
		name: 'Valentina Rojas',
		rut: '10.101.010-1',
		email: 'valentina.rojas@example.cl',
		action: 1,
		category: 'Funcionario',
		state: 'Activo',
	},
	{
		id: '11',
		name: 'Matías Soto',
		rut: '12.121.212-2',
		email: 'matias.soto@example.cl',
		action: 1,
		category: 'Funcionario',
		state: 'Activo',
	},
	{
		id: '12',
		name: 'Camila Morales',
		rut: '13.131.313-3',
		email: 'camila.morales@example.cl',
		action: 1,
		category: 'Funcionario',
		state: 'Activo',
	},
	{
		id: '13',
		name: 'Diego Reyes',
		rut: '14.141.414-4',
		email: 'diego.reyes@example.cl',
		action: 1,
		category: 'Funcionario',
		state: 'Activo',
	},
	{
		id: '14',
		name: 'Francisca Vega',
		rut: '15.151.515-5',
		email: 'francisca.vega@example.cl',
		action: 1,
		category: 'Funcionario',
		state: 'Activo',
	},
	{
		id: '15',
		name: 'Tomás Fuentes',
		rut: '16.161.616-6',
		email: 'tomas.fuentes@example.cl',
		action: 1,
		category: 'Funcionario',
		state: 'Activo',
	},
	{
		id: '16',
		name: 'Daniela Paredes',
		rut: '17.171.717-7',
		email: 'daniela.paredes@example.cl',
		action: 1,
		category: 'Funcionario',
		state: 'Activo',
	},
	{
		id: '17',
		name: 'Ignacio Bravo',
		rut: '18.181.818-8',
		email: 'ignacio.bravo@example.cl',
		action: 1,
		category: 'Funcionario',
		state: 'Activo',
	},
	{
		id: '18',
		name: 'Gabriela Salinas',
		rut: '19.191.919-9',
		email: 'gabriela.salinas@example.cl',
		action: 1,
		category: 'Funcionario',
		state: 'Activo',
	},
	{
		id: '19',
		name: 'Sebastián Muñoz',
		rut: '20.202.020-2',
		email: 'sebastian.munoz@example.cl',
		action: 1,
		category: 'Funcionario',
		state: 'Activo',
	},
	{
		id: '20',
		name: 'Antonia Navarro',
		rut: '21.212.121-2',
		email: 'antonia.navarro@example.cl',
		action: 1,
		category: 'Funcionario',
		state: 'Activo',
	},
];

const selectCardHandler = (product: (typeof mockProducts)[0]) => {
	alert(`Seleccionaste: ${product.id}`);
};

const RequestManagerPage: React.FC = () => {
	return (
		<>
			<Header
				title="Funcionarios registrados"
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

export default RequestManagerPage;
