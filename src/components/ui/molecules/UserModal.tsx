import Modal from 'src/components/ui/organisms/Modal';
import type { RequestModalProps } from 'src/utils/types/components.admin';

const UserModal: React.FC<RequestModalProps> = ({ isOpen, onClose }) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div>
				<h2>User Modal</h2>
			</div>
		</Modal>
	);
};

export default UserModal;
