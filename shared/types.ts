export type ElementType = 'div' | 'input' | 'button';

export interface BaseElement {
  type: ElementType;
}

export interface DivElement extends BaseElement {
  type: 'div';
  header?: string;
  children?: UIElement[];
}

export interface InputElement extends BaseElement {
  type: 'input';
  name: string;
  placeholder?: string;
}

export interface ButtonElement extends BaseElement {
  type: 'button';
  label: string;
}

export type UIElement = DivElement | InputElement | ButtonElement;
export type UISchema = UIElement[];

export interface SaveUIRequest {
  uiName: string;
  schema: UISchema;
}

export interface SaveUIResponse {
  success: boolean;
  message: string;
  uiName: string;
}

export interface GetUIResponse {
  uiName: string;
  schema: UISchema;
  createdAt?: string;
}

export interface ListUIsResponse {
  uis: Array<{
    name: string;
    createdAt?: string;
  }>;
}

