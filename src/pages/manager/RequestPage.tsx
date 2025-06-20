import Header from 'src/components/ui/atoms/Header';
import FilterBar from 'src/components/ui/molecules/FilterBar';
import KanvaColumn from 'src/components/ui/molecules/KanvaColum';
import RequestModal from 'src/components/ui/molecules/KanvaModal';
import { useProcessData } from 'src/config/api/ProcessDataServices';
import { useFilteredData } from 'src/hook/useFilteredData';
import { useGroupedByStatus } from 'src/hook/useStatus';
import { useModal } from 'src/hook/useModal';

const RequestManagerPage: React.FC = () => {
	const { processes, categories, subtitleText } = useProcessData();
	const { filters, filteredData, updateFilters } = useFilteredData(processes);
	const { pending, rejected, completed } = useGroupedByStatus(filteredData);
	const { isModalOpen, selectedCardId, handleCardClick, handleCloseModal } = useModal();

	return (
		<>
			<Header title="Solicitudes ingresadas" subtitle={subtitleText} />

			<FilterBar
				filters={filters}
				onChange={updateFilters}
				availableCategories={categories}
			/>

			<article className="flex flex-row justify-between items-start gap-4 size-full relative">
				<KanvaColumn
					name="Pending"
					low="#FCE3CD"
					higt="#F28D35"
					id="Pending"
					cards={pending.map((card) => ({
						...card,
						id: card.id !== undefined ? String(card.id) : undefined,
					}))}
					onCardClick={handleCardClick}
				/>
				<KanvaColumn
					name="Rejected"
					low="#F6D1DB"
					higt="#E37692"
					id="Rejected"
					cards={rejected.map((card) => ({
						...card,
						id: card.id !== undefined ? String(card.id) : undefined,
					}))}
					onCardClick={handleCardClick}
				/>
				<KanvaColumn
					name="Completed"
					low="#BEF1D6"
					higt="#22BD6B"
					id="Completed"
					cards={completed.map((card) => ({
						...card,
						id: card.id !== undefined ? String(card.id) : undefined,
					}))}
					onCardClick={handleCardClick}
				/>
			</article>

			<RequestModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				cardId={selectedCardId ?? undefined}
			/>
		</>
	);
};

export default RequestManagerPage;
