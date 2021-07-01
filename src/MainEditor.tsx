import React, { useState } from 'react';
//@ts-ignore
import { FormField, PanelOptionsGroup } from '@grafana/ui';
import { PanelEditorProps } from '@grafana/data';

import { PanelOptions } from './types';

export const MainEditor: React.FC<PanelEditorProps<PanelOptions>> = ({ options, onOptionsChange }) => {
  const [inputs, setInputs] = useState(options);

  const onSubmit = () => {
    onOptionsChange({ ...inputs });
  };

  return (
    <PanelOptionsGroup>
      <div className="editor-row">
        <div className="section gf-form-group">
          <FormField
            label="Max Threshold"
            labelWidth={10}
            inputWidth={40}
            type="number"
            name="threshold"
            value={inputs.threshold}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputs({ ...inputs, threshold: parseInt(e.target.value) })
            }
          />
          <FormField
            label="Text"
            labelWidth={10}
            inputWidth={40}
            type="text"
            name="text"
            value={inputs.text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputs({ ...inputs, text: e.target.value })}
          />
        </div>
      </div>
      <button className="btn btn-primary" onClick={onSubmit}>
        Submit
      </button>
    </PanelOptionsGroup>
  );
};
