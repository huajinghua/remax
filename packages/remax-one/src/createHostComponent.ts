import * as React from 'react';
import {
  TapEvent,
  TouchEvent,
  EventTarget,
  EventCurrentTarget,
  ImageLoadEvent,
  ImageErrorEvent,
  InputEvent,
  FormEvent,
} from './types';

export function createTarget(target: any, detail: any): EventTarget {
  return {
    id: target.id,
    offsetLeft: target.offsetLeft,
    offsetTop: target.offsetTop,
    dataset: target.targetDataset || target.dataset,
    value: detail?.value,
  };
}

export function createCurrentTarget(currentTarget: any): EventCurrentTarget {
  return {
    id: currentTarget.id,
    offsetLeft: currentTarget.offsetLeft,
    offsetTop: currentTarget.offsetTop,
    dataset: currentTarget.dataset,
  };
}

export const createTapEvent = (originalEvent: any): TapEvent => ({
  type: originalEvent.type,
  stopPropagation: originalEvent.stopPropagation,
  target: createTarget(originalEvent.target, originalEvent.detail),
  currentTarget: createCurrentTarget(originalEvent.currentTarget),
  originalEvent,
});

export const createTouchEvent = (originalEvent: any): TouchEvent => ({
  type: originalEvent.type,
  target: createTarget(originalEvent.target, originalEvent.detail),
  currentTarget: createCurrentTarget(originalEvent.currentTarget),
  touches: originalEvent.touches,
  changedTouches: originalEvent.touches,
  originalEvent,
});

export const createImageEvent = (originalEvent: any): ImageLoadEvent | ImageErrorEvent => ({
  type: originalEvent.type,
  target: createTarget(originalEvent.target, originalEvent.detail),
  currentTarget: createCurrentTarget(originalEvent.currentTarget),
  originalEvent,
});

export function createCallback(fn: Function | undefined, eventCreator: Function) {
  if (typeof fn !== 'function') {
    return undefined;
  }

  return (originalEvent: any) => fn(eventCreator(originalEvent));
}

export const createInputEvent = (originalEvent: any): InputEvent => ({
  type: originalEvent.type,
  target: createTarget(originalEvent.target, originalEvent.detail),
  currentTarget: createCurrentTarget(originalEvent.currentTarget),
  originalEvent,
});

export const createFormEvent = (originalEvent: any): FormEvent => ({
  type: originalEvent.type,
  target: createTarget(originalEvent.target, originalEvent.detail),
  currentTarget: createCurrentTarget(originalEvent.currentTarget),
  originalEvent,
});

export default function createHostComponent<P = any>(name: string) {
  const Component: React.ForwardRefRenderFunction<any, P> = (props: any, ref: React.Ref<any>) => {
    const inputProps = {
      ...props,
    };

    if (props.onLongTap) {
      inputProps.onLongTap = createCallback(inputProps.onLongTap, createTapEvent);
    }
    if (inputProps.onTap) {
      inputProps.onTap = createCallback(inputProps.onTap, createTapEvent);
    }

    if (inputProps.onTouchStart) {
      inputProps.onTouchStart = createCallback(inputProps.onTouchStart, createTouchEvent);
    }

    if (inputProps.onTouchMove) {
      inputProps.onTouchMove = createCallback(inputProps.onTouchMove, createTouchEvent);
    }

    if (inputProps.onTouchEnd) {
      inputProps.onTouchEnd = createCallback(inputProps.onTouchEnd, createTouchEvent);
    }

    if (inputProps.onTouchCancel) {
      inputProps.onTouchCancel = createCallback(inputProps.onTouchCancel, createTouchEvent);
    }

    if (inputProps.onChange) {
      inputProps.onChange = createCallback(inputProps.onChange, createInputEvent);
    }

    if (inputProps.onInput) {
      inputProps.onInput = createCallback(inputProps.onInput, createInputEvent);
    }

    if (inputProps.onConfirm) {
      inputProps.onConfirm = createCallback(inputProps.onConfirm, createInputEvent);
    }

    if (inputProps.onFocus) {
      inputProps.onFocus = createCallback(inputProps.onFocus, createInputEvent);
    }

    if (inputProps.onBlur) {
      inputProps.onBlur = createCallback(inputProps.onBlur, createInputEvent);
    }

    if (inputProps.onSubmit) {
      inputProps.onSubmit = createCallback(inputProps.onSubmit, createFormEvent);
    }

    if (inputProps.onReset) {
      inputProps.onReset = createCallback(inputProps.onReset, createFormEvent);
    }

    if (name === 'image') {
      if (inputProps.onLoad) {
        inputProps.onLoad = createCallback(props.onLoad, createImageEvent);
      }
      if (inputProps.onError) {
        inputProps.onError = createCallback(props.onError, createImageEvent);
      }
    }

    return React.createElement(name, { ...inputProps, ref });
  };
  return React.forwardRef<any, React.PropsWithChildren<P>>(Component);
}
