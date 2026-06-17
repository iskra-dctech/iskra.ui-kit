import { useMemo, useState } from 'react';
import { Button, Checkbox, Modal, TextField } from '@iskra-ui/react';
import './ApiKeyModal.css';

export interface ApiKeyScope {
  id: string;
  name: string;
  description?: string;
}

export interface ApiKeyDraft {
  name: string;
  scopes: string[];
}

export interface ApiKeyModalProps {
  open: boolean;
  onClose: () => void;
  /** Called with the validated draft when the user confirms creation. */
  onCreate: (draft: ApiKeyDraft) => void;
  scopes?: ApiKeyScope[];
  title?: string;
  submitLabel?: string;
  cancelLabel?: string;
}

const DEFAULT_SCOPES: ApiKeyScope[] = [
  { id: 'devices:read', name: 'devices:read', description: 'Чтение состояния устройств' },
  { id: 'devices:write', name: 'devices:write', description: 'Применение конфигураций и sync' },
  { id: 'metrics:read', name: 'metrics:read', description: 'Доступ к метрикам и спарклайнам' },
];

/**
 * ApiKeyModal — domain dialog for minting a scoped API key. Built on the
 * foundation `Modal`, `TextField`, `Checkbox` and `Button`. Submit is disabled
 * until a name and at least one scope are provided.
 */
export function ApiKeyModal({
  open,
  onClose,
  onCreate,
  scopes = DEFAULT_SCOPES,
  title = 'Новый API-ключ',
  submitLabel = 'Создать ключ',
  cancelLabel = 'Отмена',
}: ApiKeyModalProps) {
  const [name, setName] = useState('');
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const chosen = useMemo(
    () => scopes.filter((s) => selected[s.id]).map((s) => s.id),
    [scopes, selected],
  );
  const canSubmit = name.trim().length > 0 && chosen.length > 0;

  const reset = () => {
    setName('');
    setSelected({});
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    onCreate({ name: name.trim(), scopes: chosen });
    reset();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={title}
      description="Ключ будет показан один раз после создания."
      size="m"
      footer={
        <>
          <Button variant="ghost" onClick={handleClose}>
            {cancelLabel}
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={!canSubmit}>
            {submitLabel}
          </Button>
        </>
      }
    >
      <div className="dci-apikey-form">
        <TextField
          label="Название ключа"
          placeholder="например, ci-deploy-bot"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <fieldset className="dci-apikey-scopes">
          <legend className="dci-apikey-scopes-legend">Права доступа</legend>
          {scopes.map((scope) => (
            <div className="dci-apikey-scope" key={scope.id}>
              <Checkbox
                checked={Boolean(selected[scope.id])}
                onChange={(e) => setSelected((prev) => ({ ...prev, [scope.id]: e.target.checked }))}
                label={<span className="dci-apikey-scope-name">{scope.name}</span>}
                description={scope.description}
              />
            </div>
          ))}
        </fieldset>
      </div>
    </Modal>
  );
}
