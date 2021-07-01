import { DataFrame, Field, Vector } from '@grafana/data';

export interface PanelOptions {
  threshold: number;
  text: string;
}

export const defaults: PanelOptions = {
  threshold: 12,
  text: '',
};

export interface Buffer extends Vector {
  buffer: number[];
}

export interface FieldBuffer extends Field<any, Vector> {
  values: Buffer;
}

export interface Frame extends DataFrame {
  fields: FieldBuffer[];
}
