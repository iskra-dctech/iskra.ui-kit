import { useMemo, useState } from 'react';
import { Button, Checkbox, Modal, TextField, useIskraT } from '@iskra-ui/react';
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

function useDefaultScopes(): ApiKeyScope[] {
  const t = useIskraT();
  return useMemo(
    () => [
      {
        id: 'devices:read',
        name: 'devices:read',
        description: t('dci.apiKey.scopes.devicesRead'),
      },
      {
        id: 'devices:write',
        name: 'devices:write',
        description: t('dci.apiKey.scopes.devicesWrite'),
      },
      {
        id: 'metrics:read',
        name: 'metrics:read',
        description: t('dci.apiKey.scopes.metricsRead'),
      },
    ],
    [t],
  );
}

/**
 * ApiKeyModal — domain dialog for minting a scoped API key. Built on the
 * foundation `Modal`, `TextField`, `Checkbox` and `Button`. Submit is disabled
 * until a name and at least one scope are provided.
 */
export function ApiKeyModal({
  open,
  onClose,
  onCreate,
  scopes: scopesProp,
  title,
  submitLabel,
  cancelLabel,
}: ApiKeyModalProps) {
  const t = useIskraT();
  const defaultScopes = useDefaultScopes();
  const scopes = scopesProp ?? defaultScopes;
  const resolvedTitle = title ?? t('dci.apiKey.title');
  const resolvedSubmitLabel = submitLabel ?? t('dci.apiKey.submit');
  const resolvedCancelLabel = cancelLabel ?? t('common.cancel');

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
      title={resolvedTitle}
      description={t('dci.apiKey.description')}
      size="m"
      footer={
        <>
          <Button variant="ghost" onClick={handleClose}>
            {resolvedCancelLabel}
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={!canSubmit}>
            {resolvedSubmitLabel}
          </Button>
        </>
      }
    >
      <div className="dci-apikey-form">
        <TextField
          label={t('dci.apiKey.nameLabel')}
          placeholder={t('dci.apiKey.namePlaceholder')}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <fieldset className="dci-apikey-scopes">
          <legend className="dci-apikey-scopes-legend">{t('dci.apiKey.scopesLegend')}</legend>
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
