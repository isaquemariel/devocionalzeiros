import { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemName?: string;
  description?: string;
  onConfirm: () => void;
  confirmLabel?: string;
}

export function ConfirmDeleteDialog({
  open,
  onOpenChange,
  itemName,
  description,
  onConfirm,
  confirmLabel = 'Excluir',
}: Props) {
  const firedRef = useRef(false);

  const handleOpenChange = (next: boolean) => {
    if (next) firedRef.current = false;
    onOpenChange(next);
  };

  const handleConfirm = () => {
    if (firedRef.current) return;
    firedRef.current = true;
    onConfirm();
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja realmente excluir?</AlertDialogTitle>
          <AlertDialogDescription>
            {description || (
              <>
                {itemName ? <><strong>{itemName}</strong> será movido para a Lixeira.</> : 'O item será movido para a Lixeira.'}
                {' '}Você poderá recuperá-lo a qualquer momento.
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

