import type { FC } from 'react';
import { useState } from 'react';
import type { RequestModalProps } from 'src/utils/types/components.admin';
import { API_ENDPOINTS } from 'src/utils/constant/API';
import Input from 'src/components/ui/atoms/Input';
import Modal from 'src/components/ui/organisms/Modal';
import { usePrivateAPI } from 'src/config/api/PrivateRequest';
import { RequestFormData } from 'src/utils/types/components.client';

const RequestModalSimple: FC<RequestModalProps & { onStatusUpdate?: () => void }> = ({
  isOpen,
  onClose,
  cardId,
  onStatusUpdate,
}) => {
  const { post } = usePrivateAPI();

  const [, setFormData] = useState<RequestFormData>({
    id: 0,
    status: '',
  });

  const resetForm = () => {
    setFormData({ id: 0, status: '' });
  };

  const handleEvaluate = async (status: string) => {
    if (!cardId?.id) return;

    try {
      const url = `${API_ENDPOINTS.ADMIN_ADD_EVALUATION}?id=${cardId.id}&status=${status}`;
      await post(url);
      if (onStatusUpdate) onStatusUpdate();
      onClose();
      resetForm();
    } catch (error) {
      console.error('Error al evaluar la solicitud:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <header className="flex justify-center items-center header-4">
        <h2 className="text-[1.3rem] font-manrope font-bold text-font-1000">
          Detalles de la solicitud
        </h2>
      </header>

      <main className="size-full flex flex-col justify-start items-start gap-6 *:w-full *:fit *:gap-2">
        <section className="flex flex-col">
          <h3 className="text-[1.1rem] font-semibold font-manrope text-font-1000">
            Información del solicitante
          </h3>

          <div className="w-full h-fit flex flex-row gap-3 justify-between items-start">
            <Input
              id="requesterName"
              name="requesterName"
              label="Nombre del solicitante"
              type="text"
              placeholder="No se cuenta con el nombre"
              value={cardId?.name ?? ''}
              decoration="w-full flex flex-col"
              disabled
            />
            <Input
              id="requesterRut"
              name="requesterRut"
              label="RUT del solicitante"
              type="text"
              placeholder="No se cuenta con el RUT"
              value={cardId?.rut ?? ''}
              decoration="w-full flex flex-col"
              disabled
            />
          </div>

          <Input
            id="requesterEmail"
            name="requesterEmail"
            label="Correo del solicitante"
            type="text"
            placeholder="No se cuenta con el correo"
            value={cardId?.email ?? ''}
            decoration="w-full flex flex-col"
            disabled
          />
        </section>

        <section className="flex flex-col">
          <h3 className="header-6">Información de la solicitud</h3>

          <div className="w-full h-fit flex flex-row gap-3 justify-between items-start">
            <Input
              id="requestCategory"
              name="requestCategory"
              label="Tipo de solicitud"
              type="text"
              placeholder="No se cuenta con el tipo de solicitud"
              value={cardId?.category ?? ''}
              decoration="w-full flex flex-col"
              disabled
            />
            <Input
              id="requestStatus"
              name="requestStatus"
              label="Estado de la solicitud"
              type="text"
              placeholder="No se cuenta con el estado"
              value={cardId?.status ?? ''}
              decoration="w-full flex flex-col"
              disabled
            />
          </div>

          <div className="w-full h-fit flex flex-row gap-4 justify-between items-start">
            <Input
              id="startDate"
              name="startDate"
              label="Fecha de inicio"
              type="text"
              placeholder="No se cuenta con la fecha de inicio"
              value={cardId?.start_date ?? ''}
              decoration="w-full flex flex-col"
              disabled
            />
            <Input
              id="endDate"
              name="endDate"
              label="Fecha de finalización"
              type="text"
              placeholder="No se cuenta con la fecha de finalización"
              value={cardId?.end_date ?? ''}
              decoration="w-full flex flex-col"
              disabled
            />
          </div>
        </section>
      </main>

      <footer className="flex flex-col-reverse justify-between items-center w-full gap-3">
        <button
          type="button"
          onClick={onClose}
          className="button-slim body-2 button-primary-IDLE w-full"
        >
          Cancelar evaluación
        </button>

        <div className="h-fit flex flex-row justify-between items-center gap-3 w-full *:w-full">
          <button
            type="button"
            onClick={() => handleEvaluate('rechazada')}
            className="button-slim body-2 border-2 text-feedback-error-200 border-feedback-error-200 hover:font-semibold hover:text-feedback-error-200 hover:border-feedback-error-200 transition-all duration-300 ease-in-out active:scale-95 active:bg-feedback-error-200 active:text-font-100"
          >
            Rechazar
          </button>

          <button
            type="button"
            onClick={() => handleEvaluate('aprobada')}
            className="button-slim body-2 border-2 text-feedback-success-200 border-feedback-success-200 hover:font-semibold hover:text-feedback-success-200 hover:border-feedback-success-200 transition-all duration-300 ease-in-out active:scale-95 active:bg-feedback-success-200 active:text-font-100"
          >
            Aprobar
          </button>
        </div>
      </footer>
    </Modal>
  );
};

export default RequestModalSimple;
